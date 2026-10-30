# Interactive English Studio — Panoramic B1

Сейчас готов **Unit 1 «Interactions»** целиком: Student Book pp.11–20, Grammar Reference & Practice pp.132–133, Workbook pp.156–161. Ключи и аудиоскрипты взяты из Teacher’s Guide.

Платформа для индивидуальных занятий (1 ученик + 1 преподаватель). Статический сайт без сервера и без ключей API — готов к GitHub Pages.

## Публикация на GitHub Pages
1. Создайте репозиторий (например `english-studio`) и загрузите **содержимое** этой папки в корень.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
3. Через 1–2 минуты сайт будет по адресу `https://0011nvg.github.io/english-studio/`.
Все пути относительные. Сборка не нужна. Папка `tests/` на работу сайта не влияет.

> Материалы учебника на сайте используются для занятий. Страница закрыта от поисковиков (`noindex`), но репозиторий GitHub Pages на бесплатном тарифе публичный — учитывайте права на материалы.

## Структура
```
index.html            оболочка
css/app.css           дизайн (палитра #F7F4ED, #3D3BFF, #FF4FA3, #FFD400, #FF7A00)
js/core.js            хранилище, профили, проверка ответов
js/data-unit1.js      ВСЁ содержание уроков (задания, ключи, аудио)
js/data-vocab.js      словарь модуля
js/exercises.js       движок упражнений
js/vocab.js           Vocabulary Lab + интервальное повторение
js/app.js             страницы и навигация
assets/               шрифты (OFL), Кекс, favicon
audio/                сюда кладутся аудиофайлы
tests/qa.js           автотест Playwright (133 проверки)
tests/coverage.js     генерирует COVERAGE.md из данных
```

## Как добавить аудио
См. `audio/README.md`. Без файла показывается «Audio will be added soon» — фиктивных кнопок нет.
Для заданий без ключа (`answers: null`) сейчас преподаватель ставит ✓/✗. Когда появится ключ:
- MCQ: замените `answers: null` на ничего и добавьте `a: <индекс>` каждому вопросу;
- Gaps: замените `{n:1}` на `{a:['ответ','вариант']}` и уберите `answers: null`.

## Как добавить следующий урок
Скопируйте объект `LESSONS['u1-1']` в `data-unit1.js`, задайте новый `id`, добавьте его в `BOOK.units[0].lessons`, слова — в `data-vocab.js` с `lesson: '<id>'`.
Типы заданий: `gaps` (ввод, выпадающий список, свободный ответ, пример), `mcq` (в т.ч. cloze с текстом), `listen`, `inline`, `underline`, `tapfind`, `multi`, `rulebox`, `match`, `order`, `open`, `rank`, `discuss`, `checklist`, `scores`, `reference`, `interview`, `writing`, `review`.

## Проверка ответов
Регистр, лишние пробелы, типографские апострофы и сокращения (’m, ’re, ’s, don’t) не считаются ошибками.
Орфография, форма слова и порядок слов — считаются. Похожий, но неверный ответ не принимается: он подсвечивается оранжевым «almost».

## Прогресс
Хранится в localStorage этого браузера, отдельно для каждого ученика (Tutor Mode → Students). Синхронизации между устройствами нет — для переноса используйте Export JSON. New Student / Reset All — в My Progress.

## Интервальное повторение
Коробки 0–5, интервалы: сразу → 10 мин → 1 день → 3 дня → 7 дней → 16 дней. Повышение коробки — только за ответ по памяти (Type, Spelling, Context, Boss, Review), когда слово «созрело». Слово «выучено» с коробки 4, т. е. минимум после 4 правильных ответов в разные сессии. Ошибка возвращает слово в коробку 1 и в Difficult Words.

## Тест
```
python3 -m http.server 8765 &
node tests/qa.js http://localhost:8765/
```
