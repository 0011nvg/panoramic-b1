# Аудио

Файлы Student Book Panoramic B1. Имя файла = номер трека (`audio/NN.mp3`), путь вписывается в поле `audio.file` в `js/data-unitN.js`.
Если у трека `file: null`, на сайте честная заглушка без кнопок воспроизведения.

## Подключено

| Трек | Задание | Файл |
|---|---|---|
| 01 | Unit 1 opener, Ex.1 p.11 | audio/01.mp3 |
| 02 | Unit 1 opener, Ex.2 p.11 (та же запись, что 01) | audio/01.mp3 |
| 03 | 1.1 Ex.4 p.12 | audio/03.mp3 |
| 04 | 1.1 Ex.5 p.12 | audio/04.mp3 |
| 05 | 1.1 Ex.6 p.12 | audio/05.mp3 |
| 06 | 1.2 Ex.6 p.14 (текст статьи) | audio/06.mp3 |
| 07 | 1.3 Ex.9 | audio/07.mp3 |
| 08 | 1.4 Ex.2 | audio/08.mp3 |
| 09 | 1.5 Ex.2 | audio/09.mp3 |
| 10 | 1.5 Ex.3 (та же запись, что 09) | audio/09.mp3 |
| 11 | Unit 2 opener, Ex.1 p.21 | audio/11.mp3 |
| 12 | Unit 2 opener, Ex.2 p.21 (та же запись, что 11) | audio/11.mp3 |
| 13 | 2.1 Ex.2 p.22 | audio/13.mp3 |
| 14 | 2.1 Ex.6 p.23 (Pronunciation) | audio/14.mp3 |
| 15 | 2.3 Ex.6 p.27 | audio/15.mp3 |
| 16 | 2.3 Ex.7 p.27 | audio/16.mp3 |
| 17 | 2.3 Ex.8 p.27 | audio/17.mp3 |
| 18 | 2.4 Ex.2 p.28 | audio/18.mp3 |
| 19 | Unit 3 opener, Ex.1 p.31 | audio/19.mp3 |
| 20 | Unit 3 opener, Ex.2 p.31 | audio/20.mp3 |
| 21 | 3.1 Ex.4 p.32 | audio/21.mp3 |
| 22 | 3.2 Ex.3 p.34 | audio/22.mp3 |
| 23 | 3.2 Ex.4 p.34 | audio/23.mp3 |
| 24 | 3.2 Ex.5 p.34 | audio/24.mp3 |
| 25 | 3.2 Ex.11 p.35 (Pronunciation) | audio/25.mp3 |
| 26 | 3.4 Ex.2 p.38 | audio/26.mp3 |
| 27 | 3.5 Ex.2 p.39 | audio/27.mp3 |
| 28 | 3.5 Ex.3 p.39 (та же запись, что 27) | audio/27.mp3 |
| 131 | WB Unit 1 Reading Ex.2 p.159 | audio/131.mp3 |
| 132 | WB Unit 1 Listening Ex.2 p.160 | audio/132.mp3 |
| 133 | WB Unit 1 Listening Ex.3 p.160 | audio/133.mp3 |
| 134 | WB Unit 1 Listening Ex.4 p.160 | audio/134.mp3 |
| 135 | WB Unit 2 Reading p.165 | audio/135.mp3 |
| 136 | WB Unit 2 Listening Ex.2 p.166 | audio/136.mp3 |
| 137 | WB Unit 2 Listening Ex.3 p.166 | audio/137.mp3 |
| 138 | WB Unit 2 Listening Ex.4 p.166 | audio/138.mp3 |
| 139 | WB Unit 2 Listening Ex.5 p.166 | audio/139.mp3 |
| 140 | WB Unit 3 Reading p.171 | audio/140.mp3 |
| 141 | WB Unit 3 Listening Ex.2 p.172 | audio/141.mp3 |
| 142 | WB Unit 3 Listening Ex.3 p.172 | audio/142.mp3 |
| 143 | WB Unit 3 Listening Ex.4 p.172 | audio/143.mp3 |

Треки 01=02, 09=10, 11=12 и 27=28 — побайтно одинаковые файлы (в учебнике запись звучит дважды), поэтому хранится одна копия.

## Entry Book (audio/entry/)

Подключены все треки E01–E26 (Reading/Listening юнитов E1–E12).

## Ещё не подключено

Entry Book и Units 1–3 подключены полностью. Для новых модулей: положить `audio/NN.mp3` и вписать путь в `audio.file`.

Имена файлов — латиницей, без пробелов (GitHub Pages чувствителен к регистру).
`tests/qa.js` проверяет, что каждый подключённый файл загружается, и что в Units 1–3 не осталось треков без файла. Заглушка для треков без файла сохраняется в коде (js/exercises.js) для будущих модулей.
