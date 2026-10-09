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

## Тренажер НМТ з англійської (`nmt-trainer.html`)

Сторінка `nmt-trainer.html`, логіка — `nmt-trainer.js`, стилі — розділ «Тренажер НМТ» у `service-page.css` плюс `quiz/quiz.css`.
Усі завдання лежать у `data/nmt-trainer.json`, код їх лише відображає.

**Структура JSON:** `variants[]` → `parts[]` (`reading`, `use-of-english`) → `tasks[]` → `questions[]`.

| Завдання | `type` | Номери | Варіанти |
|---|---|---|---|
| Task 1 | `matching` — короткі тексти (`text`) + спільні `options` і `stem` | 1–5 | 8 (A–H), 3 зайві |
| Task 2 | `multiple-choice` — текст `passage`, у кожного запитання `prompt` і власні `options` | 6–10 | 4 (A–D) |
| Task 3 | `matching` | 11–16 | 8 (A–H), 2 зайві |
| Task 4 | `gapped-text` — `passage` з пропусками `{{17}}` + спільні `options` | 17–22 | 8 (A–H), 2 зайві |
| Task 5–6 | `cloze` — `passage` з пропусками `{{23}}`, у кожного запитання власні `options` | 23–32 | 4 (A–D) |

У кожного запитання: `number`, `key` (правильна літера), `trap` (найімовірніший дистрактор) і `explanation`
(2–3 речення українською, з фразою «Пастка — X: …»).

**Як додати варіант:** скопіюйте об’єкт наявного варіанта в масив `variants`, дайте йому новий `id` і `title`,
замініть тексти, варіанти, ключі й пояснення. Потім запустіть перевірку:

```sh
python3 scripts/validate-nmt-trainer.py
```

Скрипт перевіряє номери 1–32, типи й порядок завдань, кількість варіантів, унікальність ключів і кількість зайвих
варіантів у відповідностях, пропуски в текстах і довжину пояснень. Новий варіант з’явиться на сторінці без змін у коді.

Тривалість пробного тесту (`meta.durationMinutes`) і поріг (`meta.thresholdScore`) також беруться з JSON.
Відповіді нікуди не надсилаються: прогрес і найкращі результати зберігаються в `localStorage` (ключ `nmt-trainer`),
а в Google Analytics після завершення йде лише подія `nmt_trainer_complete` з `variant_id` і `mode`.
