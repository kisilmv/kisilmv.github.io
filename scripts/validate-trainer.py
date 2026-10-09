#!/usr/bin/env python3
"""Перевіряє JSON тренажера (НМТ або B2 First) на відповідність формату іспиту.

Запуск:
  python3 scripts/validate-trainer.py                      # обидва файли з data/
  python3 scripts/validate-trainer.py data/b2-first-trainer.json

Формат визначає поле meta.exam: "nmt-2026", "b2-first" або "level-test".
Повертає код 1 і список помилок, якщо щось не так.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_FILES = [ROOT / "data" / "nmt-trainer.json", ROOT / "data" / "b2-first-trainer.json", ROOT / "data" / "level-test.json"]

# (частина, тип, номери, кількість варіантів, балів за запитання, зайвих варіантів)
LAYOUTS = {
    # Загальна характеристика НМТ-2026 з англійської мови (УЦОЯО)
    "nmt-2026": {
        "maxScore": 32,
        "tasks": [
            ("reading", "matching", range(1, 6), 8, 1, 3),
            ("reading", "multiple-choice", range(6, 11), 4, 1, None),
            ("reading", "matching", range(11, 17), 8, 1, 2),
            ("reading", "gapped-text", range(17, 23), 8, 1, 2),
            ("use-of-english", "cloze", range(23, 28), 4, 1, None),
            ("use-of-english", "cloze", range(28, 33), 4, 1, None),
        ],
    },
    # B2 First Handbook for Teachers, Reading and Use of English
    "b2-first": {
        "maxScore": 70,
        "tasks": [
            ("reading-use-of-english", "cloze", range(1, 9), 4, 1, None),
            ("reading-use-of-english", "open-cloze", range(9, 17), 0, 1, None),
            ("reading-use-of-english", "word-formation", range(17, 25), 0, 1, None),
            ("reading-use-of-english", "transformation", range(25, 31), 0, 2, None),
            ("reading-use-of-english", "multiple-choice", range(31, 37), 4, 2, None),
            ("reading-use-of-english", "gapped-text", range(37, 43), 7, 2, 1),
            ("reading-use-of-english", "multiple-matching", range(43, 53), 0, 1, None),
        ],
    },
    # Тест рівня: по 8 завдань на рівні A1, A2, B1, B2, C1
    "level-test": {
        "maxScore": 40,
        "passageOptional": True,
        "levels": ["A1", "A2", "B1", "B2", "C1"],
        "tasks": [("level-test", "multiple-choice", range(n, n + 8), 4, 1, None) for n in (1, 9, 17, 25, 33)],
    },
}

GAP_RE = re.compile(r"\{\{(\d+)\}\}")
LETTERS = "ABCDEFGH"


def sentences(text):
    return [s for s in re.split(r"(?<=[.!?…])\s+(?=[А-ЯІЇЄҐA-Z«])", text.strip()) if s]


# Та сама нормалізація й оцінка, що в exam-trainer.js
def normalize(text):
    s = str(text or "").lower()
    s = re.sub(r"[‘’`´]", "'", s)
    s = re.sub(r"[.,!?;:\"«»]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"\bcan't\b", "cannot", s)
    s = re.sub(r"\bwon't\b", "will not", s)
    s = re.sub(r"\bshan't\b", "shall not", s)
    s = re.sub(r"n't\b", " not", s)
    s = re.sub(r"'ve\b", " have", s)
    s = re.sub(r"'ll\b", " will", s)
    s = re.sub(r"'re\b", " are", s)
    s = re.sub(r"\bi'm\b", "i am", s)
    return re.sub(r"\s+", " ", s).strip()


def word_count(norm):
    if not norm:
        return 0
    return sum(1 + (1 if re.search(r"'[sd]$", w) and len(w) > 2 else 0) for w in norm.split(" "))


def score_transformation(question, raw):
    answer = normalize(raw)
    if not 2 <= word_count(answer) <= 5:
        return 0
    key = normalize(question["keyword"])
    if f" {key} " not in f" {answer} ":
        return 0
    best = 0
    for alt in question["answers"]:
        for a in map(normalize, alt["parts"][0]):
            for b in map(normalize, alt["parts"][1]):
                if answer == f"{a} {b}":
                    score = 2
                else:
                    score = min(1, int(answer == a or answer.startswith(a + " "))
                                + int(answer == b or answer.endswith(" " + b)))
                best = max(best, score)
    return min(best, question.get("points", 1))


def check_explanation(qw, q, errors, trap_label):
    expl = q.get("explanation", "")
    n = len(sentences(expl))
    if not 2 <= n <= 3:
        errors.append(f"{qw}: пояснення має 2–3 речення, а не {n}")
    if f"Пастка — {trap_label}".lower() not in expl.lower():
        errors.append(f"{qw}: у поясненні не названо пастку {trap_label}")


def check_variant(variant, layout, errors):
    where = f"Варіант {variant.get('id', '?')}"
    tasks = [(part.get("id"), task) for part in variant.get("parts", []) for task in part.get("tasks", [])]
    if len(tasks) != len(layout["tasks"]):
        errors.append(f"{where}: має бути {len(layout['tasks'])} завдань, а є {len(tasks)}")
        return
    total = 0

    for (part_id, task), (exp_part, exp_type, exp_numbers, exp_opts, exp_points, exp_unused) in zip(tasks, layout["tasks"]):
        tw = f"{where}, {task.get('label', task.get('id'))}"
        if part_id != exp_part:
            errors.append(f"{tw}: має належати до частини {exp_part}, а не {part_id}")
        if task.get("type") != exp_type:
            errors.append(f"{tw}: тип має бути {exp_type}, а не {task.get('type')}")
            continue
        if not task.get("instruction"):
            errors.append(f"{tw}: немає інструкції")

        questions = task.get("questions", [])
        numbers = [q.get("number") for q in questions]
        if numbers != list(exp_numbers):
            errors.append(f"{tw}: номери запитань {numbers}, очікувалося {list(exp_numbers)}")

        # Текст із пропусками
        if exp_type in ("gapped-text", "cloze", "open-cloze", "word-formation"):
            text = " ".join((task.get("passage") or {}).get("paragraphs", []))
            gaps = [int(n) for n in GAP_RE.findall(text)]
            if gaps != list(exp_numbers):
                errors.append(f"{tw}: пропуски в тексті {gaps}, очікувалося {list(exp_numbers)}")
        if exp_type == "multiple-choice" and not layout.get("passageOptional") and not (task.get("passage") or {}).get("paragraphs"):
            errors.append(f"{tw}: немає тексту")

        # Спільні варіанти (відповідність, речення в тексті, розділи тексту)
        shared = None
        if exp_type in ("matching", "gapped-text"):
            shared = task.get("options") or []
            if len(shared) != exp_opts:
                errors.append(f"{tw}: має бути {exp_opts} спільних варіантів, а є {len(shared)}")
        if exp_type == "multiple-matching":
            sections = task.get("sections") or []
            if not 4 <= len(sections) <= 6:
                errors.append(f"{tw}: має бути від 4 до 6 розділів тексту, а є {len(sections)}")
            if any(not s.get("paragraphs") or not s.get("title") for s in sections):
                errors.append(f"{tw}: у розділу немає назви чи тексту")
            shared = [{"letter": s.get("letter"), "text": s.get("title")} for s in sections]
        if shared is not None and exp_unused is not None:
            keys = [q.get("key") for q in questions]
            if len(set(keys)) != len(keys):
                errors.append(f"{tw}: ключі повторюються: {keys}")
            unused = len(shared) - len(set(keys))
            if unused != exp_unused:
                errors.append(f"{tw}: зайвих варіантів {unused}, очікувалося {exp_unused}")
        if exp_type == "multiple-matching":
            used = {q.get("key") for q in questions}
            if used != {o["letter"] for o in shared}:
                errors.append(f"{tw}: не кожен розділ тексту є відповіддю хоча б на одне запитання")

        for q in questions:
            qw = f"{where}, № {q.get('number')}"
            points = q.get("points", 1)
            total += points
            if points != exp_points:
                errors.append(f"{qw}: має давати {exp_points} бал(и), а не {points}")

            if exp_type in ("open-cloze", "word-formation"):
                answers = q.get("answers") or []
                normalized = [normalize(a) for a in answers]
                if not answers or any(" " in a or not a for a in normalized):
                    errors.append(f"{qw}: має бути щонайменше одна відповідь з одного слова")
                if exp_type == "word-formation":
                    stem = normalize(q.get("stem", ""))
                    if not stem:
                        errors.append(f"{qw}: немає слова-основи")
                    if stem in normalized:
                        errors.append(f"{qw}: відповідь не може збігатися зі словом-основою")
                    gap_count = len(GAP_RE.findall(" ".join(task["passage"]["paragraphs"])))
                    if not gap_count:
                        errors.append(f"{qw}: немає тексту")
                trap = q.get("trap", "")
                if not trap or normalize(trap) in normalized:
                    errors.append(f"{qw}: пастка «{trap}» не повинна бути серед прийнятних відповідей")
                check_explanation(qw, q, errors, f"«{trap}»")
                continue

            if exp_type == "transformation":
                for field in ("lead", "keyword", "before", "after"):
                    if not q.get(field):
                        errors.append(f"{qw}: немає поля {field}")
                key = normalize(q.get("keyword", ""))
                for alt in q.get("answers", []):
                    parts = alt.get("parts", [])
                    if len(parts) != 2 or not all(parts):
                        errors.append(f"{qw}: відповідь має складатися з двох частин")
                        continue
                    for a in parts[0]:
                        for b in parts[1]:
                            full = normalize(f"{a} {b}")
                            if not 2 <= word_count(full) <= 5:
                                errors.append(f"{qw}: «{a} {b}» має {word_count(full)} слів замість 2–5")
                            if f" {key} " not in f" {full} ":
                                errors.append(f"{qw}: у «{a} {b}» немає ключового слова")
                            if score_transformation(q, f"{a} {b}") != 2:
                                errors.append(f"{qw}: «{a} {b}» не отримує повних балів")
                trap = q.get("trap", "")
                if not trap or score_transformation(q, trap) == 2:
                    errors.append(f"{qw}: пастка «{trap}» не може бути повною правильною відповіддю")
                check_explanation(qw, q, errors, f"«{trap}»")
                continue

            # Завдання з вибором
            options = shared if shared is not None else q.get("options")
            if exp_type == "multiple-matching" and not q.get("prompt"):
                errors.append(f"{qw}: немає запитання")
            if exp_type == "multiple-choice" and not q.get("prompt"):
                errors.append(f"{qw}: немає запитання")
            if not options or (exp_opts and len(options) != exp_opts):
                errors.append(f"{qw}: має бути {exp_opts} варіантів відповіді")
                continue
            letters = [o.get("letter") for o in options]
            if letters != list(LETTERS[:len(options)]):
                errors.append(f"{qw}: літери варіантів {letters}")
            texts = [str(o.get("text", "")).strip().lower() for o in options]
            if len(set(texts)) != len(texts) or not all(texts):
                errors.append(f"{qw}: варіанти відповіді порожні або повторюються")
            if q.get("key") not in letters:
                errors.append(f"{qw}: ключ {q.get('key')!r} не серед варіантів")
            if q.get("trap") not in letters or q.get("trap") == q.get("key"):
                errors.append(f"{qw}: дистрактор-пастка {q.get('trap')!r} має бути іншим варіантом")
            if exp_type == "matching" and not (q.get("text") or {}).get("body"):
                errors.append(f"{qw}: немає тексту для відповідності")
            check_explanation(qw, q, errors, q.get("trap"))

    if layout.get("levels"):
        got = [task.get("level") for _, task in tasks]
        if got != layout["levels"]:
            errors.append(f"{where}: рівні частин {got}, очікувалося {layout['levels']}")

    if total != layout["maxScore"]:
        errors.append(f"{where}: сума балів {total}, очікувалося {layout['maxScore']}")


def validate(path):
    errors = []
    try:
        data = json.loads(Path(path).read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        return [f"Не вдалося прочитати {path}: {exc}"], 0

    meta = data.get("meta", {})
    layout = LAYOUTS.get(meta.get("exam"))
    if not layout:
        return [f"meta.exam має бути одним із {sorted(LAYOUTS)}"], 0
    for field in ("maxScore", "durationMinutes"):
        if not isinstance(meta.get(field), int):
            errors.append(f"meta.{field} має бути цілим числом")
    if layout.get("levels"):
        ids = [lv.get("id") for lv in meta.get("levels", [])]
        if ids != layout["levels"] or any(not lv.get("description") or not isinstance(lv.get("pass"), int) for lv in meta["levels"]):
            errors.append("meta.levels має містити рівні A1–C1 з полями pass і description")
        if not (meta.get("belowLevels") or {}).get("description"):
            errors.append("немає meta.belowLevels")
    if meta.get("maxScore") != layout["maxScore"]:
        errors.append(f"meta.maxScore має бути {layout['maxScore']}")

    variants = data.get("variants", [])
    if not variants:
        errors.append("Немає жодного варіанта")
    ids = [v.get("id") for v in variants]
    if len(set(ids)) != len(ids):
        errors.append(f"Ідентифікатори варіантів повторюються: {ids}")
    for variant in variants:
        check_variant(variant, layout, errors)
    return errors, len(variants)


def main():
    paths = [Path(p) for p in sys.argv[1:]] or [p for p in DEFAULT_FILES if p.exists()]
    failed = False
    for path in paths:
        errors, count = validate(path)
        if errors:
            failed = True
            print(f"{path.name}: знайдено помилки")
            for e in errors:
                print(" -", e)
        else:
            print(f"{path.name}: OK, варіантів: {count}, формат відповідає іспиту.")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
