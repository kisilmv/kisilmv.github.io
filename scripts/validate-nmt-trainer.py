#!/usr/bin/env python3
"""Перевіряє data/nmt-trainer.json на відповідність формату НМТ з англійської мови.

Запуск: python3 scripts/validate-nmt-trainer.py [шлях до JSON]
Повертає код 1 і список помилок, якщо щось не так.
"""
import json
import re
import sys
from pathlib import Path

DEFAULT_PATH = Path(__file__).resolve().parent.parent / "data" / "nmt-trainer.json"

# Формат НМТ-2026 за загальною характеристикою УЦОЯО:
# частина, тип завдання, номери запитань, кількість варіантів відповіді.
LAYOUT = [
    ("reading", "matching", range(1, 6), 8),
    ("reading", "multiple-choice", range(6, 11), 4),
    ("reading", "matching", range(11, 17), 8),
    ("reading", "gapped-text", range(17, 23), 8),
    ("use-of-english", "cloze", range(23, 28), 4),
    ("use-of-english", "cloze", range(28, 33), 4),
]

GAP_RE = re.compile(r"\{\{(\d+)\}\}")


def sentences(text):
    return [s for s in re.split(r"(?<=[.!?])\s+(?=[А-ЯІЇЄҐA-Z«])", text.strip()) if s]


def check_variant(variant, errors):
    vid = variant.get("id", "?")
    where = f"Варіант {vid}"
    tasks = []
    for part in variant.get("parts", []):
        for task in part.get("tasks", []):
            tasks.append((part.get("id"), task))

    if len(tasks) != len(LAYOUT):
        errors.append(f"{where}: має бути {len(LAYOUT)} завдань, а є {len(tasks)}")
        return

    for (part_id, task), (exp_part, exp_type, exp_numbers, exp_opts) in zip(tasks, LAYOUT):
        tw = f"{where}, {task.get('label', task.get('id'))}"
        if part_id != exp_part:
            errors.append(f"{tw}: має належати до частини {exp_part}, а не {part_id}")
        if task.get("type") != exp_type:
            errors.append(f"{tw}: тип має бути {exp_type}, а не {task.get('type')}")
        if not task.get("instruction"):
            errors.append(f"{tw}: немає інструкції")

        questions = task.get("questions", [])
        numbers = [q.get("number") for q in questions]
        if numbers != list(exp_numbers):
            errors.append(f"{tw}: номери запитань {numbers}, очікувалося {list(exp_numbers)}")

        shared = task.get("options")
        if exp_type in ("matching", "gapped-text"):
            if not shared or len(shared) != exp_opts:
                errors.append(f"{tw}: має бути {exp_opts} спільних варіантів відповіді")
                continue
            letters = [o["letter"] for o in shared]
            keys = [q.get("key") for q in questions]
            if len(set(keys)) != len(keys):
                errors.append(f"{tw}: у відповідностях ключі повторюються: {keys}")
            unused = len(letters) - len(set(keys))
            if unused != exp_opts - len(exp_numbers):
                errors.append(f"{tw}: зайвих варіантів {unused}, очікувалося {exp_opts - len(exp_numbers)}")

        if exp_type in ("multiple-choice", "gapped-text", "cloze"):
            passage = task.get("passage") or {}
            text = " ".join(passage.get("paragraphs", []))
            if not text:
                errors.append(f"{tw}: немає тексту")
            if exp_type != "multiple-choice":
                gaps = [int(n) for n in GAP_RE.findall(text)]
                if gaps != list(exp_numbers):
                    errors.append(f"{tw}: пропуски в тексті {gaps}, очікувалося {list(exp_numbers)}")

        for q in questions:
            qw = f"{where}, № {q.get('number')}"
            options = shared if exp_type in ("matching", "gapped-text") else q.get("options")
            if not options or len(options) != exp_opts:
                errors.append(f"{qw}: має бути {exp_opts} варіантів відповіді")
                continue
            letters = [o.get("letter") for o in options]
            if letters != list("ABCDEFGH"[:exp_opts]):
                errors.append(f"{qw}: літери варіантів {letters}")
            texts = [o.get("text", "").strip().lower() for o in options]
            if len(set(texts)) != len(texts) or not all(texts):
                errors.append(f"{qw}: варіанти відповіді порожні або повторюються")
            if q.get("key") not in letters:
                errors.append(f"{qw}: ключ {q.get('key')!r} не серед варіантів")
            if q.get("trap") not in letters or q.get("trap") == q.get("key"):
                errors.append(f"{qw}: дистрактор-пастка {q.get('trap')!r} має бути іншим варіантом")
            if exp_type == "matching" and not (q.get("text") or {}).get("body"):
                errors.append(f"{qw}: немає тексту для відповідності")
            if exp_type == "multiple-choice" and not q.get("prompt"):
                errors.append(f"{qw}: немає запитання")
            expl = q.get("explanation", "")
            n = len(sentences(expl))
            if not 2 <= n <= 3:
                errors.append(f"{qw}: пояснення має 2–3 речення, а не {n}")
            if f"Пастка — {q.get('trap')}" not in expl:
                errors.append(f"{qw}: у поясненні не названо пастку {q.get('trap')}")


def main():
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PATH
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"Не вдалося прочитати {path}: {exc}")
        return 1

    errors = []
    meta = data.get("meta", {})
    for field in ("maxScore", "thresholdScore", "durationMinutes"):
        if not isinstance(meta.get(field), int):
            errors.append(f"meta.{field} має бути цілим числом")

    variants = data.get("variants", [])
    if not variants:
        errors.append("Немає жодного варіанта")
    ids = [v.get("id") for v in variants]
    if len(set(ids)) != len(ids):
        errors.append(f"Ідентифікатори варіантів повторюються: {ids}")
    for variant in variants:
        check_variant(variant, errors)

    if errors:
        print("Знайдено помилки:")
        for e in errors:
            print(" -", e)
        return 1
    print(f"OK: {len(variants)} варіант(и), по 32 завдання, формат відповідає НМТ.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
