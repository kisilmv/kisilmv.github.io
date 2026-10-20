## Hi there 👋

<!--
**kisilmv/kisilmv** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->

## Тренажери: НМТ з англійської, B2 First і C1 Advanced

| Сторінка | Дані | Ключ `localStorage` | Подія Google Analytics |
|---|---|---|---|
| `nmt-trainer.html` | `data/nmt-trainer.json` | `nmt-trainer` | `nmt_trainer_complete` |
| `b2-first-trainer.html` | `data/b2-first-trainer.json` | `b2-first-trainer` | `b2_first_trainer_complete` |
| `c1-advanced-trainer.html` | `data/c1-advanced-trainer.json` | `c1-advanced-trainer` | `c1_advanced_trainer_complete` |
| `level-test.html` | `data/level-test.json` | `level-test` | `level_test_complete` |

Усі сторінки працюють на спільному рушії `exam-trainer.js`; стилі — розділ «Тренажери» в `service-page.css`
плюс `quiz/quiz.css`. Сторінка передає рушію налаштування атрибутами `data-src`, `data-storage-key` і `data-event`
на `#trn-app`; `data-modes="test"` вимикає режим тренування (так працює тест рівня). Код лише відображає завдання з JSON, тому новий варіант додається без змін у коді.

**Структура JSON:** `meta` (`exam`, `maxScore`, `durationMinutes`, для НМТ ще `thresholdScore`) і
`variants[]` → `parts[]` → `tasks[]` → `questions[]`. У кожного запитання є `number`, `trap` (найімовірніша пастка)
і `explanation` (2–3 речення українською з фразою «Пастка — …»); `points` — якщо запитання дає більше 1 балу.

### НМТ (`meta.exam: "nmt-2026"`)

| Завдання | `type` | Номери | Варіанти |
|---|---|---|---|
| Task 1 | `matching` — короткі тексти (`text`) + спільні `options` і `stem` | 1–5 | 8 (A–H), 3 зайві |
| Task 2 | `multiple-choice` — текст `passage`, у кожного запитання `prompt` і власні `options` | 6–10 | 4 (A–D) |
| Task 3 | `matching` | 11–16 | 8 (A–H), 2 зайві |
| Task 4 | `gapped-text` — `passage` з пропусками `{{17}}` + спільні `options` | 17–22 | 8 (A–H), 2 зайві |
| Task 5–6 | `cloze` — `passage` з пропусками `{{23}}`, у кожного запитання власні `options` | 23–32 | 4 (A–D) |

У завданнях з вибором правильна літера записана в `key`, а `trap` — це літера дистрактора.

### B2 First, Reading and Use of English (`meta.exam: "b2-first"`)

| Частина | `type` | Номери | Відповідь | Бали |
|---|---|---|---|---|
| Part 1 | `cloze` | 1–8 | 4 варіанти, `key` | 1 |
| Part 2 | `open-cloze` | 9–16 | одне слово, усі прийнятні — в `answers` | 1 |
| Part 3 | `word-formation` | 17–24 | одне слово від `stem`, прийнятні — в `answers` | 1 |
| Part 4 | `transformation` | 25–30 | `lead`, `keyword`, `before`, `after`; `answers` — варіанти з двох частин | 2 |
| Part 5 | `multiple-choice` | 31–36 | 4 варіанти, `key` | 2 |
| Part 6 | `gapped-text` | 37–42 | 7 речень (A–G), одне зайве | 2 |
| Part 7 | `multiple-matching` | 43–52 | розділи тексту `sections` (A–D), літера може повторюватися | 1 |

У частинах 2–4 `trap` — це типова неправильна відповідь (рядок). Відповідь у Part 4 описують так:
`{"parts": [["has been", "'s been"], ["learning"]]}`. Повна відповідь — перша частина + друга; кожна частина
окремо дає 1 бал, як у Cambridge. Без ключового слова або з довжиною поза межами 2–5 слів — 0 балів.

### C1 Advanced, Reading and Use of English (`meta.exam: "c1-advanced"`)

| Частина | `type` | Номери | Відповідь | Бали |
|---|---|---|---|---|
| Part 1 | `cloze` | 1–8 | 4 варіанти, `key` | 1 |
| Part 2 | `open-cloze` | 9–16 | одне слово, усі прийнятні — в `answers` | 1 |
| Part 3 | `word-formation` | 17–24 | одне слово від `stem`, прийнятні — в `answers` | 1 |
| Part 4 | `transformation` | 25–30 | як у B2 First, але 3–6 слів | 2 |
| Part 5 | `multiple-choice` | 31–36 | 4 варіанти, `key` | 2 |
| Part 6 | `multiple-matching` | 37–40 | чотири тексти різних авторів (`sections` A–D), запитання на зіставлення думок | 2 |
| Part 7 | `gapped-text` | 41–46 | 7 абзаців (A–G), один зайвий | 2 |
| Part 8 | `multiple-matching` | 47–56 | розділи тексту `sections` (A–D), літера може повторюватися | 1 |

Межі довжини відповіді в Part 4 рушій бере з `meta.transformationWords` (`{"min": 3, "max": 6}`); якщо поля немає,
діють межі B2 First (2–5). Разом 78 балів, пробний тест — 90 хвилин.
Перед порівнянням відповідь зводиться до малих літер, а скорочення розгортаються (didn’t → did not, can’t → cannot).

### Тест рівня (`meta.exam: "level-test"`)

П’ять частин `multiple-choice` по 8 завдань; у кожної частини є поле `level` (A1, A2, B1, B2, C1). Завдання з коротким
текстом мають поле `text`, як у НМТ. Рівень визначає `meta.levels`: рівень зараховано, якщо в його частині й у всіх
нижчих набрано щонайменше `pass` балів (зараз 6 із 8); `description` — що означає рівень. Якщо не зараховано
жодного, показується `meta.belowLevels`, а `meta.unevenNote` додається, коли вищий рівень пройдено попри
непройдений нижчий. Необов’язкове поле `next` у рівні (і в `meta.belowLevels`) — список `{href, label}`: під результатом з’являється рядок «Що підійде на цьому рівні:» із цими посиланнями. Поріг, описи й посилання можна змінювати в JSON без змін у коді.

### Як додати варіант

Скопіюйте об’єкт наявного варіанта в масив `variants`, дайте йому новий `id` і `title`, замініть тексти, варіанти,
ключі й пояснення. Потім запустіть перевірку:

```sh
python3 scripts/validate-trainer.py
```

Скрипт перевіряє обидва файли: номери й порядок частин, кількість варіантів і балів, унікальність ключів і кількість
зайвих варіантів, пропуски в текстах, слова-основи, кількість слів і ключове слово в Part 4, а також те, що пастка
не зараховується як правильна відповідь і названа в поясненні.

Відповіді нікуди не надсилаються: прогрес і найкращі результати зберігаються лише в `localStorage`,
а в Google Analytics після завершення спроби йде тільки подія з `variant_id` і `mode`.

## Граматичний тренажер B1–C2

| Сторінка | Дані | Рушій | Ключ `localStorage` | Подія Google Analytics |
|---|---|---|---|---|
| `grammar-trainer.html` | `data/grammar/b1.json`, `b2.json`, `c1.json`, `c2.json` | `grammar-trainer.js` | `grammar-trainer` | `grammar_trainer_complete` |

Стилі — розділ «Граматичний тренажер» наприкінці `service-page.css`. Рушій вантажить лише JSON обраного рівня.
Кожна тема має власну адресу, яку можна давати студентам: `grammar-trainer.html#b2/reported-speech`;
`#c1/test` — змішаний тест рівня (20 завдань, порівну з усіх тем), `#c1/mistakes` — робота над помилками.

**Структура JSON рівня:** `level`, `title`, `description`, `topics[]`. Тема: `id` (латиницею, через дефіс;
`test` і `mistakes` зарезервовано), `title`, `titleEn`, `summary`, `theory` і рівно 10 `items`.
`theory`: `intro`, `blocks[]` (`title`, `text`, `examples` — пари `[англійською, українською]`) і `traps[]` —
пастки для україномовних. У текстах `*англійський фрагмент*` виводиться курсивом із `lang="en"`.

| `type` | Що бачить учень | Поля |
|---|---|---|
| `choice` | речення з одним пропуском `___` і 3–4 варіанти (перемішуються) | `options`, `answer` — індекс правильного |
| `input` | речення з полем для введення на місці `___`; підказка-основа в дужках | `answers` — усі прийнятні варіанти |
| `error` | речення з 3–4 фрагментами `[[…]]`, один із них помилковий | `answer` — індекс фрагмента, `fix` — виправлення |

Спільні поля: `id`, `prompt`, `explanation` (українською), необов’язкові `task` (власне формулювання завдання)
і `context` (рядок перед реченням). Перевірка введення ігнорує регістр, крапку в кінці й різницю між повною і
скороченою формою (*doesn’t* = *does not*); скорочення з *’s* і *’d* варто вписувати в `answers` окремо.

Мовна норма — американська англійська. Приклади не мають «старіти»: без років, назв застосунків і новинних сюжетів.
Перевірка:

```sh
python3 scripts/validate-grammar.py
```

Скрипт перевіряє структуру й ключі, кількість пропусків і фрагментів, повтори речень, кількість тем у картках
`grammar-trainer.html`, а також «маркери застарівання» (роки, назви соцмереж, пандемію тощо) й кілька частих русизмів.
