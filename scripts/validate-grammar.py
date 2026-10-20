#!/usr/bin/env python3
"""Перевіряє JSON граматичного тренажера (data/grammar/*.json).

Запуск:
  python3 scripts/validate-grammar.py                  # усі рівні
  python3 scripts/validate-grammar.py data/grammar/b2.json

Перевіряє структуру тем і завдань, ключі відповідей, пропуски й фрагменти,
кількість топіків у картках grammar-trainer.html, а також «маркери застарівання»
(роки, назви соцмереж і застосунків, новинні сюжети), щоб приклади лишалися актуальними.
Повертає код 1 і список помилок, якщо щось не так.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "grammar"
PAGE = ROOT / "grammar-trainer.html"
LEVELS = ["b1", "b2", "c1", "c2"]

ITEMS_PER_TOPIC = 10
SEGMENT_RE = re.compile(r"\[\[([^\]]+)\]\]")
ID_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")

# Слова й шаблони, що прив'язують приклад до конкретного часу.
DATED = [
    r"\b(1[89]|20)\d{2}\b",
    r"\bcovid", r"\bpandemic", r"\blockdown", r"\bcoronavirus",
    r"\btwitter\b", r"\btweet", r"\btiktok", r"\binstagram", r"\bfacebook", r"\bwhatsapp",
    r"\byoutube", r"\bnetflix", r"\bchatgpt", r"\bopenai", r"\bmetaverse", r"\bnft\b",
    r"\biphone", r"\bandroid", r"\bzoom\b", r"\bskype", r"\bcrypto", r"\bbitcoin",
    r"\bselfie", r"\binfluencer",
]
DATED_RE = re.compile("|".join(DATED), re.IGNORECASE)

# Кілька частих русизмів і кальок в українських поясненнях.
RUSSISMS = [
    "являється", "являються", "слідуючий", "слідуюч", "на протязі", "приймати участь",
    "приймає участь", "в залежності від", "співпадає", "співпадають", "міроприємств",
    "згідно до", "так як ", "любий варіант", "получається",
]

errors = []


def err(where, message):
    errors.append(f"{where}: {message}")


def norm(text):
    s = str(text).lower().replace("’", "'").replace("‘", "'")
    s = re.sub(r"[.,!?;:\"«»“”]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"\bcan't\b", "cannot", s)
    s = re.sub(r"\bwon't\b", "will not", s)
    s = re.sub(r"n't\b", " not", s)
    for a, b in (("'ve", " have"), ("'ll", " will"), ("'re", " are")):
        s = re.sub(a + r"\b", b, s)
    s = re.sub(r"\bi'm\b", "i am", s)
    return re.sub(r"\s+", " ", s).strip()


def check_text(where, text):
    if not isinstance(text, str) or not text.strip():
        err(where, "порожній текст")
        return
    m = DATED_RE.search(text)
    if m:
        err(where, f"маркер застарівання «{m.group(0)}»")
    low = text.lower()
    for r in RUSSISMS:
        # Межа слова: «з’являється» не має спрацьовувати як «являється».
        if re.search(r"(?<![\w’'ʼ])" + re.escape(r), low):
            err(where, f"можливий русизм «{r.strip()}»")
    if text.count("*") % 2:
        err(where, "непарна кількість зірочок (*…*)")


def check_item(where, item, seen_prompts):
    t = item.get("type")
    prompt = item.get("prompt", "")
    check_text(where + ".prompt", prompt)
    check_text(where + ".explanation", item.get("explanation", ""))
    if item.get("context"):
        check_text(where + ".context", item["context"])
    if item.get("task"):
        check_text(where + ".task", item["task"])
    key = norm(prompt)
    if key in seen_prompts:
        err(where, "повторюється речення з іншого завдання " + seen_prompts[key])
    seen_prompts[key] = where

    if t == "choice":
        if prompt.count("___") != 1:
            err(where, "у завданні choice має бути рівно один пропуск ___")
        opts = item.get("options", [])
        if not 3 <= len(opts) <= 4:
            err(where, "має бути 3–4 варіанти")
        if len({norm(o) for o in opts}) != len(opts):
            err(where, "варіанти повторюються")
        if not isinstance(item.get("answer"), int) or not 0 <= item["answer"] < len(opts):
            err(where, "answer поза межами варіантів")
        for o in opts:
            check_text(where + ".option", o)
    elif t == "input":
        if prompt.count("___") != 1:
            err(where, "у завданні input має бути рівно один пропуск ___")
        answers = item.get("answers", [])
        if not answers:
            err(where, "немає прийнятних відповідей")
        # Скорочену й повну форму (doesn't / does not) свідомо подаємо поруч, тож порівнюємо без нормалізації.
        if len({str(a).strip().lower() for a in answers}) != len(answers):
            err(where, "прийнятні відповіді дублюються")
        if any(not str(a).strip() for a in answers):
            err(where, "порожня відповідь")
    elif t == "error":
        if "___" in prompt:
            err(where, "у завданні error не має бути пропуску ___")
        segs = SEGMENT_RE.findall(prompt)
        if not 3 <= len(segs) <= 4:
            err(where, f"має бути 3–4 фрагменти [[…]], знайдено {len(segs)}")
        if not isinstance(item.get("answer"), int) or not 0 <= item["answer"] < len(segs):
            err(where, "answer поза межами фрагментів")
        elif norm(item.get("fix", "")) == norm(segs[item["answer"]]):
            err(where, "виправлення збігається з помилковим фрагментом")
        if not str(item.get("fix", "")).strip():
            err(where, "немає fix")
    else:
        err(where, f"невідомий тип «{t}»")


def check_level(path):
    level = path.stem
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as e:  # noqa: BLE001
        err(path.name, f"не вдалося прочитати JSON: {e}")
        return None
    if data.get("level", "").lower() != level:
        err(path.name, "поле level не збігається з назвою файлу")
    check_text(path.name + ".description", data.get("description", ""))
    topics = data.get("topics", [])
    if not topics:
        err(path.name, "немає тем")
    ids = set()
    seen_prompts = {}
    for ti, topic in enumerate(topics, 1):
        tw = f"{path.name} тема {ti} ({topic.get('id')})"
        tid = topic.get("id", "")
        if not ID_RE.match(tid):
            err(tw, "id має складатися з малих латинських літер, цифр і дефісів")
        if tid in ("test", "mistakes"):
            err(tw, "id зарезервовано для маршрутів")
        if tid in ids:
            err(tw, "id теми повторюється")
        ids.add(tid)
        for f in ("title", "summary"):
            check_text(f"{tw}.{f}", topic.get(f, ""))
        theory = topic.get("theory") or {}
        check_text(tw + ".theory.intro", theory.get("intro", ""))
        if not theory.get("blocks"):
            err(tw, "у теорії немає блоків")
        for bi, block in enumerate(theory.get("blocks", []), 1):
            check_text(f"{tw}.block{bi}.title", block.get("title", ""))
            check_text(f"{tw}.block{bi}.text", block.get("text", ""))
            for ex in block.get("examples", []):
                if not (isinstance(ex, list) and len(ex) == 2):
                    err(f"{tw}.block{bi}", "приклад має бути парою [англійською, українською]")
                    continue
                check_text(f"{tw}.block{bi}.example", ex[0])
                check_text(f"{tw}.block{bi}.example", ex[1])
        if not theory.get("traps"):
            err(tw, "немає пасток для україномовних")
        for trap in theory.get("traps", []):
            check_text(tw + ".trap", trap)

        items = topic.get("items", [])
        if len(items) != ITEMS_PER_TOPIC:
            err(tw, f"має бути {ITEMS_PER_TOPIC} завдань, а не {len(items)}")
        item_ids = set()
        types = set()
        for ii, item in enumerate(items, 1):
            iw = f"{tw} завдання {item.get('id', ii)}"
            if str(item.get("id")) in item_ids:
                err(iw, "id завдання повторюється")
            item_ids.add(str(item.get("id")))
            types.add(item.get("type"))
            check_item(iw, item, seen_prompts)
        if len(types) < 2:
            err(tw, "у темі має бути щонайменше два типи завдань")
    return level, len(topics), sum(len(t.get("items", [])) for t in topics)


def check_page(counts):
    if not PAGE.exists():
        return
    html = PAGE.read_text(encoding="utf-8")
    for level, n_topics, _ in counts:
        m = re.search(rf'data-level-progress="{level}" data-topics="(\d+)"', html)
        if not m:
            err(PAGE.name, f"немає картки рівня {level}")
        elif int(m.group(1)) != n_topics:
            err(PAGE.name, f"рівень {level}: у картці data-topics={m.group(1)}, а тем {n_topics}")


def main():
    files = [Path(a) for a in sys.argv[1:]] or [DATA / f"{lv}.json" for lv in LEVELS]
    counts = [c for c in (check_level(f) for f in files) if c]
    if not sys.argv[1:]:
        check_page(counts)
    if errors:
        print("Знайдено помилки:")
        for e in errors:
            print(" -", e)
        sys.exit(1)
    total_t = sum(c[1] for c in counts)
    total_i = sum(c[2] for c in counts)
    for level, t, i in counts:
        print(f"{level.upper()}: тем {t}, завдань {i}")
    print(f"Разом: тем {total_t}, завдань {total_i}. Помилок немає.")


if __name__ == "__main__":
    main()
