/* Самооценка в конце урока (добавлено для платформы, не из учебника). */
(function () {
  const CANDO = {
    'st-1': ['I can describe hair, face and height.', 'I can name 11 personality adjectives.', 'I can describe a person without saying their name.'],
    'st-2': ['I can find the main ideas in an article quickly.', 'I can decide if statements are true or false.', 'I can make nouns with -ity and -ness.'],
    'st-3': ['I can choose between the present simple and the present continuous.', 'I know which verbs are stative.', 'I can use six collocations with adjectives.'],
    'st-4': ['I can complete a fact file from a text.', 'I can use each, every, both, most, many, all (of).'],
    'u1-1': ['I can find reference words and understand what they refer to.', 'I can do a gapped-text task.', 'I can talk about tiny homes.'],
    'u1-2': ['I can use the past simple and the past continuous in a story.', 'I can talk about an action that was interrupted.'],
    'u1-3': ['I can name 12 parts of a house.', 'I can use 8 phrasal verbs about homes.', 'I can use word patterns: keen on, worth doing, make sb do…'],
    'u1-4': ['I can predict what I will hear.', 'I can do a 3-option multiple-choice listening task.'],
    'u1-5': ['I can talk about past habits with used to and would.', 'I can make negatives and questions with used to.'],
    'u1-6': ['I can say where things are in a photo.', 'I can describe a photo for about one minute.'],
    'u1-7': ['I can use so, such, too and enough.', 'I can do a 4-option multiple-choice cloze.'],
    'u1-8': ['I can choose the right style for an article.', 'I can plan and write an article of about 100 words.']
  };
  Object.keys(CANDO).forEach(id => {
    const L = LESSONS[id]; if (!L) return;
    L.sections.push({ id: 'review', title: 'Lesson review', items: [{ id: id + '-review', source: 'added', type: 'review', title: 'Can do? · самооценка', instruction: 'Оцени себя: 😕 not yet · 🙂 almost · 😃 yes!', cando: CANDO[id] }] });
  });
})();
