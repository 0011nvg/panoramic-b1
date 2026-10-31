# Код режима преподавателя
В `js/core.js` хранится только хэш кода (TUTOR_HASH, TUTOR_FNV), сам код в репозитории не записан.
Сменить код: попросите Claude или выполните
`printf 'panoramic-b1:НОВЫЙКОД' | sha256sum` — результат в TUTOR_HASH, и
`node -e "let h=2166136261;for(const c of 'panoramic-b1:НОВЫЙКОД'){h^=c.charCodeAt(0);h=Math.imul(h,16777619)>>>0}console.log(h.toString(16))"` — в TUTOR_FNV.
Ограничение: сайт статический, поэтому это защита от учеников, а не от специалиста, который станет разбирать код страницы.
