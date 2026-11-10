/* Визуальный слой: фото учебника в шапках уроков и на обложках разделов, значки секций.
   Учебное содержание здесь не хранится. Фото — фрагменты страниц Student’s Book (assets/book/). */
window.VISUALS = {
  units: {
    st: { photo: 'assets/book/st-people.webp', pos: '50% 30%', tag: 'Who we are' },
    u1: { photo: 'assets/book/u1-opener.webp', pos: '50% 55%', tag: 'House and home' }
  },
  lessons: {
    'st-1': { photo: 'assets/book/st-people.webp', pos: '35% 30%', items: ['🧑‍🎨'], alt: '' },
    'st-2': { photo: 'assets/book/st-habits.webp', pos: '50% 40%', items: ['👟'] },
    'st-3': { photo: 'assets/book/st-asleep.webp', pos: '50% 50%', items: ['😴'] },
    'st-4': { photo: 'assets/book/st-twins.webp', pos: '50% 35%', items: ['👯'] },
    'st-ref': { c: 'navy', lay: 'row', items: ['📘', '🧠', '🔤', '📝', '✨'] },
    'u1-1': { photo: 'assets/book/u1-opener.webp', pos: '50% 60%', items: ['🏠'] },
    'u1-2': { photo: 'assets/book/u1-glasshouse.webp', pos: '50% 60%', items: ['⏳'] },
    'u1-3': { photo: 'assets/book/u1-house.webp', pos: '50% 50%', items: ['🏡'] },
    'u1-4': { photo: 'assets/book/u1-yurt.webp', pos: '50% 50%', items: ['⛺'] },
    'u1-5': { photo: 'assets/book/u1-cassette.webp', pos: '50% 50%', items: ['📼'] },
    'u1-6': { photo: 'assets/book/u1-bedroom-girl.webp', pos: '50% 50%', items: ['🗣️'] },
    'u1-7': { photo: 'assets/book/u1-houseboat.webp', pos: '50% 60%', items: ['⛵'] },
    'u1-8': { photo: 'assets/book/u1-friends.webp', pos: '30% 50%', items: ['✍️'] },
    'u1-ref': { c: 'navy', lay: 'row', items: ['📘', '🏠', '🔤', '📝', '🗣️'] }
  },
  sections: { book: '📘', vocab: '📚', train: '🏋️', review: '🏁', ref: '📖', refv: '🔤', refw: '📝', voc2: '🔤', voc3: '🔗', gram1: '⚙️', gram2: '⚙️', phr: '🧩', wp: '🧩', task: '✍️' },
  items: {},
  words: {}
};
