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

## Тренажери: НМТ з англійської і B2 First

| Сторінка | Дані | Ключ `localStorage` | Подія Google Analytics |
|---|---|---|---|
| `nmt-trainer.html` | `data/nmt-trainer.json` | `nmt-trainer` | `nmt_trainer_complete` |
| `b2-first-trainer.html` | `data/b2-first-trainer.json` | `b2-first-trainer` | `b2_first_trainer_complete` |
| `level-test.html` | `data/level-test.json` | `level-test` | `level_test_complete` |

Обидві сторінки працюють на спільному рушії `exam-trainer.js`; стилі — розділ «Тренажери» в `service-page.css`
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
Перед порівнянням відповідь зводиться до малих літер, а скорочення розгортаються (didn’t → did not, can’t → cannot).

### Тест рівня (`meta.exam: "level-test"`)

П’ять частин `multiple-choice` по 8 завдань; у кожної частини є поле `level` (A1, A2, B1, B2, C1). Завдання з коротким
текстом мають поле `text`, як у НМТ. Рівень визначає `meta.levels`: рівень зараховано, якщо в його частині й у всіх
нижчих набрано щонайменше `pass` балів (зараз 6 із 8); `description` — що означає рівень. Якщо не зараховано
жодного, показується `meta.belowLevels`, а `meta.unevenNote` додається, коли вищий рівень пройдено попри
непройдений нижчий. Поріг і описи можна змінювати в JSON без змін у коді.

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
