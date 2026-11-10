/* =========================================================
   OPTIMISE STARS B1 · структура всего курса
   Источник: Student’s Book, Contents pp. 4–5.
   ready: true  — раздел полностью перенесён на сайт;
   soon:  true  — раздел есть в учебнике, на сайте появится позже (уроков и заданий нет).
   Чтобы добавить Unit N: создайте js/data-unitN.js (по образцу data-unit1.js),
   впишите id уроков в lessons, поставьте ready: true и уберите soon.
   ========================================================= */
window.BOOK = {
  title: 'Optimise Stars B1',
  subtitle: 'Interactive English Studio',
  level: 'B1',
  units: [
    { id: 'st', num: 'S', label: 'Starter', title: 'Starter', topic: 'Who we are', pages: '6–9', ready: true,
      skills: [['Vocabulary', 'Appearance and personality · nouns with -ity / -ness · collocations with adjectives'], ['Reading', 'An article · Fact files'], ['Grammar', 'Present simple, present continuous, stative verbs · quantifiers']],
      lessons: ['st-1', 'st-2', 'st-3', 'st-4', 'st-ref'] },
    { id: 'u1', num: 1, title: 'How we live', topic: 'House and home', pages: '10–19', ready: true,
      skills: [['Reading', 'Understanding reference words · Gapped text'], ['Grammar', 'Past simple and past continuous · used to and would'], ['Vocabulary', 'The house and home · phrasal verbs · word patterns'], ['Listening', 'Predicting · 3-option multiple choice'], ['Speaking', 'Saying where things are · Extended turn'], ['Language in Use', 'Result clauses · 4-option multiple-choice cloze'], ['Writing', 'Using the right style · An article']],
      lessons: ['u1-1', 'u1-2', 'u1-3', 'u1-4', 'u1-5', 'u1-6', 'u1-7', 'u1-8', 'u1-ref'] },
    { id: 'u2', num: 2, title: 'Around the world', topic: 'Travel and transport', pages: '20–29', soon: true,
      skills: [['Reading', 'Skimming'], ['Grammar', 'Present perfect simple and continuous · countable and uncountable nouns'], ['Vocabulary', 'Holidays · adjectives with un- / im- / il- / ir- / dis-']], lessons: [] },
    { id: 'r12', review: true, label: 'Review 1–2', title: 'Review Units 1 and 2', topic: 'Optimise your well-being: Take a moment · Revise grammar and vocabulary', pages: '30–31', soon: true, lessons: [] },
    { id: 'u3', num: 3, title: 'Time out', topic: 'New experiences', pages: '32–41', soon: true,
      skills: [['Reading', 'Identifying text type'], ['Grammar', 'will and be going to · present tenses for future'], ['Vocabulary', 'Outdoor activities · collocations with free time']], lessons: [] },
    { id: 'u4', num: 4, title: 'Healthy living', topic: 'Health', pages: '42–51', soon: true,
      skills: [['Reading', 'Scanning'], ['Grammar', 'Modals (1) and (2)'], ['Vocabulary', 'Health and illness · have, take, make, do']], lessons: [] },
    { id: 'r34', review: true, label: 'Review 3–4', title: 'Review Units 3 and 4', topic: 'Optimise your well-being: Be active · Revise grammar and vocabulary', pages: '52–53', soon: true, lessons: [] },
    { id: 'u5', num: 5, title: 'On the menu', topic: 'Food and drink', pages: '54–63', soon: true,
      skills: [['Reading', 'Identifying synonyms'], ['Grammar', 'Relative clauses · articles'], ['Vocabulary', 'Food · word formation']], lessons: [] },
    { id: 'u6', num: 6, title: 'Shopping around', topic: 'Shopping and services', pages: '64–73', soon: true,
      skills: [['Reading', 'Identifying paraphrasing'], ['Grammar', 'Past perfect simple and continuous · comparatives and superlatives'], ['Vocabulary', 'Shopping · idioms for shopping and spending']], lessons: [] },
    { id: 'r56', review: true, label: 'Review 5–6', title: 'Review Units 5 and 6', topic: 'Optimise your well-being: The gift of giving · Revise grammar and vocabulary', pages: '74–75', soon: true, lessons: [] },
    { id: 'u7', num: 7, title: 'Your own style', topic: 'Fashion', pages: '76–85', soon: true,
      skills: [['Reading', 'Understanding implication'], ['Grammar', 'The passive · question tags'], ['Vocabulary', 'Clothes and accessories · word formation']], lessons: [] },
    { id: 'u8', num: 8, title: 'Your best shot', topic: 'Sport', pages: '86–95', soon: true,
      skills: [['Reading', 'Understanding time words and phrases'], ['Grammar', 'Conditionals (1) · time clauses'], ['Vocabulary', 'People in sport · do, play and go']], lessons: [] },
    { id: 'r78', review: true, label: 'Review 7–8', title: 'Review Units 7 and 8', topic: 'Optimise your well-being: Connect with others · Revise grammar and vocabulary', pages: '96–97', soon: true, lessons: [] },
    { id: 'u9', num: 9, title: 'Let’s have fun!', topic: 'Entertainment', pages: '98–107', soon: true,
      skills: [['Reading', 'Understanding attitude and opinion'], ['Grammar', 'Conditionals (2): third conditional · the causative'], ['Vocabulary', 'People in the media · word patterns']], lessons: [] },
    { id: 'u10', num: 10, title: 'Learning better', topic: 'Education', pages: '108–117', soon: true,
      skills: [['Reading', 'Understanding linking words and phrases'], ['Grammar', 'Reported speech · reported questions'], ['Vocabulary', 'Studying · idioms for education and learning']], lessons: [] },
    { id: 'r910', review: true, label: 'Review 9–10', title: 'Review Units 9 and 10', topic: 'Optimise your well-being: Lifelong learning · Revise grammar and vocabulary', pages: '118–119', soon: true, lessons: [] }
  ]
};
window.LESSONS = {};
window.VOCAB = [];
