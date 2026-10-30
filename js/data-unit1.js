/* =========================================================
   PANORAMIC B1 · UNIT 1 "Interactions"
   Student Book pp.11–20 · Grammar Reference & Form pp.132–133 · Workbook pp.156–161
   Keys and audio scripts: Panoramic B1 Teacher's Guide pp.32–37, 104, 119–122.
   Rules: original numbering/order; nothing shortened.
   source:'added' = NOT from the book (warm-ups, OGE, extra vocabulary work).
   ========================================================= */
window.BOOK = {
  title: 'Panoramic B1',
  subtitle: 'Interactive English Studio',
  level: 'B1',
  units: [
    {
      id: 'u1', num: 1, title: 'Interactions', pages: '11–20 · 132–133 · 156–161',
      skills: [
        ['Listening', 'Guessing meaning from context'], ['Reading', 'Skimming'],
        ['Writing', 'Checking your work: punctuation'], ['Speaking', 'Showing interest'],
        ['Grammar', 'Present Simple and Present Continuous; Question forms; Question tags'],
        ['Vocabulary', 'Hang-out spaces; Body language and gestures; Modifying adverbs']
      ],
      lessons: ['u1-opener', 'u1-1', 'u1-2', 'u1-3', 'u1-4', 'u1-5', 'u1-6', 'u1-gr', 'u1-wb'],
      pending: []
    }
  ]
};
window.LESSONS = {};

const T_OPENER = `<p><b>Interviewee</b> I took this photo in Devon in the UK in a large garden that belongs to the Royal Horticultural Society. It was a very hot day, but there were many bees and butterflies feeding on the nectar of flowers and cooling themselves near the lakes and in the shade.</p><p><b>Presenter</b> Are you a “people person”, or do you prefer time on your own?</p><p><b>Interviewee</b> I love people! I’m a big talker and I love to meet and socialise. Still though, sometimes I like time on my own. I like to do things like reading a book or going swimming in the sea. Time in nature is so important.</p><p><b>Presenter</b> How important is technology in your interactions with other people?</p><p><b>Interviewee</b> I personally prefer to meet with people face to face and experience things in real life. But I usually need to use technology to organise that. You need technology to arrange everything, even just to invite a friend for dinner.</p>`;
const T_03 = `<p><b>Anchor</b> It’s probably fair to say that most British cities don’t offer enough opportunities for teens. Young people often say that it’s difficult to find safe and free hang-outs. When the weather is good, perhaps it’s fine to hang out in squares or on pavements. Obviously, some families can afford a costly membership for the local leisure centre or gym, but others don’t have the money to attend classes. That’s why the work of youth clubs and places such as the Open Youth Forum centre in Norwich are so important, so we’re taking a look at its work. Our reporter, Karen Gilligan, is in Norwich now.</p>`;
const T_04 = `<p>1 Obviously, some families can afford a <b>costly</b> membership for the local leisure centre or gym, but others don’t have the money to attend classes.</p><p>2 Obviously, some families can afford a costly membership for the local leisure centre or gym, but others don’t have the money to <b>attend</b> classes.</p><p>3 …so we’re taking a <b>look</b> at its work. Our reporter, Karen Gilligan, is in Norwich now.</p><p>4 …so we’re taking a look at its work. Our <b>reporter</b>, Karen Gilligan, is in Norwich now.</p>`;
const T_05 = T_03 + `<p><b>Reporter</b> Thanks, Gary. Yes, here in the centre, just five minutes’ walk from the shopping centre, the castle and the cathedral, we find the Open Youth Forum – it’s a youth club but also a great space for the community. This week it’s celebrating its 10th anniversary! The charity Open Youth Forum manages it with young local people – they want the design, activities and services to be exactly what young people need.</p><p>The result of their work is incredible. This building is, in fact, an old bank, but now there are lots of fun and modern spaces for young people to enjoy. There’s a huge hall for live music, for example. It has space for 1,200 people and they plan to increase that to a space for 1,800 people. There’s also a café and lots of casual spaces so young people can hang out or play billiards.</p><p>Are you feeling full of energy? Then maybe you want to try the climbing wall, spend some time in the dance studio or go to the gym! For you and me, Gary, the gym costs £10 a month, but for anyone between the ages of 11 and 18, it’s free to use! The gym is not available for under 11s to use.</p><p>There is a lot going on at this centre, and they’re always organising fun events for the community. At the moment, they’re organising an “escape the zombie” event for this weekend. As I understand, all the lights are off for the event and you try to find a key and escape, but remember to avoid the zombies! You can visit their website for more information on other events, too. They usually don’t cost much, and generally they are free for anyone under the age of 25. It’s a great place, and lots of local businesses and public organisations pay to use the space for meetings, and the money from that goes back into the community. Everybody wins! So, let’s go inside and have a look!</p>`;
const T_BIKE = `<p>Meet Alex. He lives and works in New York but he doesn’t have a desk or an office – he works all over the city. Alex is a bike messenger.</p><p>Each day starts at 7.30 a.m. Alex has a quick breakfast and gets ready. He doesn’t have a uniform but he wears special clothes because he works outside all day. He wears a waterproof jacket, a baseball cap and, of course, a helmet. He always carries his phone, too.</p><p>Alex enjoys riding his bike. He likes it because it’s light and comfortable and this is really important. After all, he spends most of his day cycling. But before he does anything, he has a coffee. He reads the paper and waits for his first delivery. His work begins with his first delivery. He always tries to deliver the packages on time. He cycles quickly and sometimes he takes risks. Because there is so much traffic in New York his job is dangerous, but he still enjoys it.</p><p>He knows most of New York’s streets, parks and public squares. He’s smiling today because the sun is out. It’s a tiring job but it keeps Alex fit and healthy. He does a lot of exercise while he’s working.</p><p>In the evenings, he prepares a healthy meal and talks to his girlfriend online. Then, at the end of the day, he plays the guitar. It’s a great way to relax, so he’s ready for another day tomorrow.</p>`;
const T_131 = `<p><b>Gestures.</b> We use gestures every day, often without noticing. But what exactly are they? According to the Concise Oxford Dictionary, in the past “gesture” referred to “a significant movement of limb or body”. This definition, including the way a person stands or moves, was the original meaning of the word. Today, however, it means something different. It refers to the movement of the head (including facial expressions) or of the arms and hands.</p><p>Zero, example. A gesture may be something we don’t know that we are doing. This includes going red in the face, playing with one’s hair, etc. Another type is the deliberate gesture. <i>One.</i> This type includes nodding, waving, etc. We use many gestures instead of spoken words. <i>Two.</i> Sign languages of the deaf and dumb and other communities are special examples of autonomous gestures. The ethologist Desmond Morris wrote about these gestures. <i>Three.</i> Since the 1970s, most research has focused on gestures that we use at the same time as speech (“gesticulation”). <i>Four.</i> An interesting example of this is when speakers use their hands to beat time to the rhythm of the words. You can see this when a politician makes a speech, but we all do it.</p>`;
const T_132 = `<p><b>Host</b> So, Dr Wong. What makes a good friend?</p><p><b>Dr Wong</b> Friends are the people you can talk to about anything, and people who will help you with problems. Good friendships last many years, even a lifetime. As a psychologist, I’ve seen that true friends have a great influence on each other. They are sympathetic, give support, are fun to hang out with, and help us remember the good times.</p>`;
const T_133 = T_132 + `<p><b>Host</b> So, how do we choose our friends? They’re often people like us, aren’t they?</p><p><b>Dr Wong</b> Yes, we’re often attracted to people like us, but research shows that we can gradually become closer and more similar over time. Even our brains change as a result of a friendship. One study showed that when one of our friends feels fear or anger, our brains show that we feel the same way. Because we experience the same thing emotionally, we want to help each other. That’s a good indication of a real friendship.</p><p><b>Host</b> You said “our real friends.” Does that mean not everyone we think is a friend actually is?</p><p><b>Dr Wong</b> That’s right. A study of friendships showed that we’re actually quite bad at judging who our genuine friends are. In a study, people made a list of their so-called friends, but it turned out that only about half of those people on the list thought the other person was their friend, too.</p><p><b>Host</b> Wow, so, in 50% of the relationships, the friendship was only in one direction rather than shared?</p><p><b>Dr Wong</b> Exactly! However, as we age, we often get better at friendship. We usually keep in touch with the good ones, and say goodbye to the others.</p>`;

const FACIAL = [
  '**The 43 muscles in our face can make 10,000 facial expressions!** ¹Can this wide range of expressions mean the same thing everywhere in the world? ²Do facial expressions mean different things in different cultures? ³Is it possible to use our expressions to be dishonest about how we are feeling?',
  'Charles Darwin looks at some of these questions in his book *The Expression of the Emotions in Man and Animals* (1872). According to Darwin, people everywhere share five basic facial expressions. These expressions show we are angry, scared, sad, disgusted, and happy. Darwin also noted that all animals of the same type communicate their feelings with the same movements of their bodies.',
  'So, does this mean we can always understand what people are feeling by looking at their faces? No, it doesn’t. We generally learn to control our facial expressions from a young age, in order to follow social rules. For example, usually when people lose a competition, they politely hide the fact they’re upset.',
  'What’s more, the social rules often depend on the culture. For example, some studies show that in certain situations, Japanese people smile to hide negative emotions; this is polite in their culture. In the same situation, though, American people generally don’t smile.',
  'However, it isn’t always easy to hide our emotions, because it isn’t always possible to control the muscles we use to make expressions. For example, you can try to look happy when you are disappointed at a gift, but fake smiles are usually easy to notice. That’s because during an honest smile, we use muscles to make our eyes narrow (Fig. A), but these muscles are difficult to control (Fig. B). So, it’s best to find a real reason to feel happy first!'
];
const facialHtml = () => '<div class="article"><div class="art-kicker">REFERENCE POINT · THE BODY › COMMUNICATION</div><h4 class="art-h">Facial Expressions</h4>' + FACIAL.map(p => '<p>' + Core.md(p).replace(/\*(.+?)\*/g, '<i>$1</i>') + '</p>').join('') + '<p class="src">Adapted from The Oxford Companion to the Body by Colin Blakemore and Sheila Jennett</p></div>';

const CHLOE = ['Hey Oliver,', 'How are things? I hope you’re enjoying life in your new town. I’m sure it’s a little strange and it probably isn’t easy to start a new school, is it? I hope you’re starting to feel at home.', 'Anyway, it’s my birthday party next Saturday and I obviously want you to come. You remember Aleisha, don’t you? She’s planning to come so are Rob and his friends. They’re very nice. I know it’s quite far away, but you can come, can’t you? It starts at 7 p.m. Let me know – it would be totally awesome to see you!', 'From, Chloe'];
const OLIVER = ['Hi Chloe,', 'It’s great to hear from you. Yes, things are going fairly well. I love the new town – it’s absolutely amazing! But you’re right – it isn’t easy at the new school. I’m studying extremely hard this week, as we have a test, and I’m completely behind in my studies.', 'Anyway, thank you for the invitation, Chloe. I’d be really happy to come tomorrow – I highkey miss you guys. The only problem is I have a basketball match until 8.00. I could get a train and be there by about 9.30, but that’s a bit late, isn’t it? Let me know. You don’t have my new number, do you? It’s 0744 673 459.', 'Speak soon,', 'Oliver', 'P.S. Of course I remember Aleisha. Say hi from me! 🙂'];
const BOLD = ['a little', 'very', 'quite', 'totally', 'fairly', 'absolutely', 'extremely', 'completely', 'really', 'a bit'];
function mailHtml(from, date, subj, lines) {
  const b = s => { let x = Core.esc(s); BOLD.forEach(w => { x = x.replace(new RegExp('(?<![\\w-])(' + w + ')(?![\\w-])'), '<b>$1</b>'); }); return x; };
  return `<div class="mail"><div class="mail-h"><span>FROM: ${from}</span><span>${date}</span></div><div class="mail-s">SUBJECT: ${subj}</div>${lines.map(l => '<p>' + b(l) + '</p>').join('')}</div>`;
}
const EMAILS_HTML = () => '<div class="mailbox"><div class="mail-bar">MY MAIL</div>' + mailHtml('Chloe', 'Wed 16th Nov 4.32', 'My Birthday!', CHLOE) + '<div class="mail-reply">REPLY</div>' + mailHtml('Oliver', 'Fri 25th Nov 12.35', 'Re: My Birthday!', OLIVER) + '</div>';

const DIALOGUE = [
  ['Alesha', 'Hi, I’m Alesha. I’m new.'], ['Max', 'Hi Alesha. Nice to meet you. Sorry – I’m Max.'],
  ['Alesha', 'Max. It’s great to meet you. You know, this canteen is great.'], ['Max', 'Really? It’s OK… I guess.'],
  ['Alesha', 'Come on! It’s got a great menu and the food is fantastic. I love chicken curry!'], ['Max', 'Me too! But the salad’s a bit boring, isn’t it?'],
  ['Alesha', 'That’s true. But they’ve got a fruit salad for dessert and it looks amazing. I hope there’s some left!'],
  ['Max', 'So do I! … I’m, er, I’m playing tennis tomorrow. I’m in the final of a competition.'],
  ['Alesha', 'How exciting! That sounds fun… but I’m not really into sport. I’m more into music and books, stuff like that. I make videos too.'],
  ['Max', 'Oh yeah? That’s interesting. What kind of videos do you make?'], ['Alesha', 'Just vlogs. I have my own channel. I have around 800 followers.'],
  ['Max', 'That sounds amazing! What do you talk about?'],
  ['Alesha', 'Anything I’m interested in really. I make them with my neighbour, Mia. She goes to this school actually. Do you know her? Mia Harris?'],
  ['Max', 'No way! She’s my friend, too.'], ['Alesha', 'Really?! That’s awesome! … Hey, let’s go and get that dessert! Quick!'], ['Max', 'Good idea!']
];
const dialogueHtml = () => '<div class="dlg">' + DIALOGUE.map(([w, t]) => `<p><b>${w}</b> ${Core.esc(t)}</p>`).join('') + '</div>';

/* ---------------- 1.0 UNIT OPENER · p.11 ---------------- */
LESSONS['u1-opener'] = {
  id: 'u1-opener', unit: 'u1', code: '1', title: 'Interactions', kicker: 'Unit opener', pages: '11', accent: 'yellow', time: '15–20 min',
  goal: 'Talk about how you communicate with people.',
  sections: [
    { id: 'warm', title: 'Warm-up', items: [
      { id: 'u1o-w', source: 'added', type: 'discuss', core: true, title: 'Keks asks',
        instruction: 'Look at the unit title “Interactions” and the photo on page 11 (bees on a flower). What do you think the unit is about?',
        prompts: ['Who do you talk to most every day?', 'Do you prefer talking or texting?', 'Is it easy for you to meet new people?'],
        followUp: ['Why do you think so?', 'Can you give an example?'],
        tutorNote: 'Добавлено (не из учебника). 2–3 минуты, без исправлений — цель разговорить ученика.' }
    ]},
    { id: 'book', title: 'Textbook exercises', items: [
      { id: 'u1o-1', page: 11, num: '1', tags: ['THINK', 'WATCH', 'LISTEN'], type: 'listen', core: true,
        audio: { track: '01', file: 'audio/01.mp3', video: true, transcript: T_OPENER },
        instruction: 'THINK · WATCH or LISTEN. Is the photographer a “people person” or does she prefer time on her own?',
        photo: 'Фото на с. 11: пчёлы на оранжевом цветке (Story behind the photo).',
        inner: { type: 'mcq', questions: [{ q: 'The photographer…', options: ['is a “people person” (but sometimes likes time on her own)', 'prefers time on her own'], a: 0 }] },
        explanation: 'She says: “I love people! I’m a big talker and I love to meet and socialise. Still though, sometimes I like time on my own.”' },
      { id: 'u1o-2', page: 11, num: '2', tags: ['WATCH', 'LISTEN'], type: 'listen', core: true,
        audio: { track: '02', file: 'audio/01.mp3', video: true, transcript: T_OPENER },
        instruction: 'WATCH or LISTEN again. Answer the questions.',
        inner: { type: 'open', questions: ['What was the weather like?', 'What outdoor activity does Melodie enjoy?', 'According to Melodie, why do we need technology for socialising?'],
          key: ['It was a very hot day.', 'She likes going swimming in the sea.', 'She needs technology to organise her social life.'] },
        tutorNote: 'Ответы свободные — сверяйте с ключом («Показать ключ») и отмечайте ✓/✗.' },
      { id: 'u1o-3', page: 11, num: '3', tags: ['CITIZENSHIP', 'SPEAK'], type: 'rank', core: true,
        instruction: 'Choose the top three ways you communicate with other people. Number them 1 to 3 (1 = most important). Compare your answers and give reasons.',
        adapted: 'В учебнике: “In pairs”. Ученик и преподаватель ранжируют отдельно и сравнивают.',
        options: ['phone calls', 'online gaming', 'text messages', 'social media', 'video chat', 'face-to-face'],
        followUp: ['Why is number 1 the most important for you?', 'Which one do you never use? Why?', 'Do you agree with my top three?'] }
    ]},
    { id: 'review', title: 'Lesson review', items: [
      { id: 'u1o-r', source: 'added', type: 'review', core: true, cando: ['I can say how I usually communicate with people.', 'I can explain what a “people person” is.'] }
    ]}
  ]
};

/* ---------------- 1.1 LISTENING · Social spaces · pp.12–13 ---------------- */
LESSONS['u1-1'] = {
  id: 'u1-1', unit: 'u1', code: '1.1', title: 'Social spaces', kicker: 'Listening', pages: '12–13', accent: 'blue', time: '2 × 60 min', sdg: '11 Sustainable cities and communities',
  goal: 'Talk about hang-outs. Guess meaning from context. Use Present Simple and Present Continuous.',
  split: 'Занятие 1: упр. 1–6. Занятие 2: упр. 7–12, Viewpoints, OGE.',
  sections: [
    { id: 'warm', title: 'Warm-up', items: [
      { id: 'u11-1', page: 12, num: '1', tags: ['THINK'], type: 'discuss', core: true,
        instruction: 'A hang-out is a social space and people often go there to meet up with friends. Where are your hang-outs? What do you do there?',
        prompts: ['Where are your hang-outs?', 'What do you do there?'],
        followUp: ['Who do you usually go there with?', 'How often do you go?', 'Is it free or costly?', 'Tell me more.'],
        tutorNote: 'Введите hang-out (n) vs hang out (v). Запишите места ученика — пригодятся в Viewpoints.' }
    ]},
    { id: 'book', title: 'Textbook exercises', items: [
      { id: 'u11-2', page: 12, num: '2', tags: ['VOCABULARY'], type: 'gaps', core: true,
        instruction: 'Read the blog post about hang-outs in Toronto and complete the text with the words below.',
        bank: ['fountain', 'gym', 'leisure centre', 'pavements', 'shopping centre', 'skatepark', 'square', 'Youth Club'], uniqueBank: true,
        frame: 'blog', frameTitle: 'Travel Blog', heading: 'My Top 6 Toronto hang-outs!', meta: 'Posted 12 June',
        paras: [
          ['**1 Go skateboarding!** Have you got a skateboard? Come to the Underpass ', { a: ['skatepark'] }, ' and practise your tricks under King Street Bridge.'],
          ['**2 The Yorkdale** Are you looking for some new clothes and accessories? Or maybe you want to go for pizza or get a milkshake with friends. The Yorkdale ', { a: ['shopping centre'] }, ' is a great option for wet weather!'],
          ['**3 LAN Lords** Do you like playing video games? This is a ', { a: ['leisure centre'] }, ' for e-sports (gaming) only!'],
          ['**4 Get active** I go the HartHouse ', { a: ['gym'] }, ' with friends to do exercise, do martial arts like tae kwon do, and to play squash. Next week I want to try a yoga class!'],
          ['**5 New friends, new skills** When I’m bored, I always come to the St Alban’s Boys and Girls ', { a: ['Youth Club'] }, '. There is always a lot going on. In the holidays, there are music and art workshops here so you can learn new skills and meet new people of the same age!'],
          ['**6 Chill on a hot day** When I want to hang out with friends and chat, Nathan Philips ', { a: ['square'] }, ' is my favourite place to come. You can sit down on the ', { a: ['pavements'] }, ' and enjoy watching everyone around you. On a really hot day, you can put your feet in the water of the ', { a: ['fountain'] }, ' and eat an ice cream!']
        ],
        links: [['See Vocabulary p.158', 'u1-wb', 'u1wb-v1']],
        hint: 'Look at the words around each gap: clothes + pizza → a big building with shops; tricks + skateboard → …',
        extra: 'Write about a hang-out in your town in the style of the blog: a title + 3–4 sentences. Use at least two words from the box.' },
      { id: 'u11-3', page: 12, num: '3', tags: ['SPEAK'], type: 'discuss', core: true,
        instruction: 'You are visiting Toronto. Agree on the best three places to visit from the blog. Why do you think they are good places to hang out?',
        adapted: 'В учебнике: “In groups”. Ученик выбирает 3 места, преподаватель — свои 3, затем договариваетесь.',
        choose: { from: ['the Underpass skatepark', 'The Yorkdale shopping centre', 'LAN Lords', 'HartHouse', 'St Alban’s Youth Club', 'Nathan Philips square'], pick: 3 },
        prompts: ['My top three places are… because…'], followUp: ['Do you agree with my choice?', 'Which place is good for a rainy day?'] },
      { id: 'u11-4', page: 12, num: '4', tags: ['LISTEN'], type: 'listen', core: true,
        audio: { track: '03', file: 'audio/03.mp3', transcript: T_03 },
        instruction: 'LISTEN to the introduction to a radio show. Is the show about a person, a city, or a building?',
        inner: { type: 'mcq', questions: [{ q: 'The show is about…', options: ['a person', 'a city', 'a building'], a: 2 }] } },
      { id: 'u11-5', page: 12, num: '5', tags: ['LISTEN'], type: 'listen', core: true,
        audio: { track: '04', file: 'audio/04.mp3', transcript: T_04 },
        boxes: [{ title: 'LISTENING SKILL · Guessing meaning from context', html: '<p>When you are listening and don’t understand words or a sentence, you can use information you do understand (about the situation, who is speaking, and the other words), to help you. Think about the unknown part of speech, and try to think of another word or phrase that could replace it.</p>' }],
        instruction: 'Read the Listening skill. Then listen to two sentences from the introduction. Choose the correct part of speech and meaning of the four words.',
        inner: { type: 'mcq', questions: [
          { q: '1 costly', options: ['A hard (adv)', 'B expensive (adj)'], a: 1 }, { q: '2 attend', options: ['A go to (v)', 'B wait (v)'], a: 0 },
          { q: '3 look', options: ['A see (v)', 'B view (n)'], a: 1 }, { q: '4 reporter', options: ['A journalist (n)', 'B report (v)'], a: 0 }] } },
      { id: 'u11-6', page: 12, num: '6', tags: ['P', 'LISTEN'], type: 'listen', core: true,
        audio: { track: '05', file: 'audio/05.mp3', transcript: T_05 },
        instruction: 'LISTEN to the report about Open Youth Forum. For each question, write the correct answer in the gap. Write one or two words, or a number, or a date, or a time.',
        inner: { type: 'gaps', paras: [
          ['You can walk from the castle to the OPEN centre in ', { a: ['five minutes', '5 minutes'] }, '.'],
          ['The hall for live music has space for ', { a: ['1,200', '1200', '1 200', 'one thousand two hundred'] }, ' people.'],
          ['The OPEN centre is a type of ', { a: ['youth club'] }, '.'],
          ['The gym is ', { a: ['free'] }, ' for under 18s.'],
          ['The “escape the zombie” event is happening ', { a: ['this weekend'] }, '.'],
          ['Public organisations and ', { a: ['local businesses'] }, ' pay to use the space.']] },
        tutorNote: 'P — формат Cambridge B1 Preliminary, Listening Part 3: обычно одно слово, число или короткая фраза.' },
      { id: 'u11-7', page: 13, num: '7', tags: ['GRAMMAR'], type: 'underline', core: true,
        instruction: 'Look at the sentences from the listening and underline the verbs. What are the names of the tenses?',
        tenses: ['Present simple', 'Present continuous'],
        sentences: [
          { label: 'A', tokens: ['…most', 'British', 'cities', 'don’t', 'offer', 'enough', 'opportunities', 'for', 'teens.'], verbs: [3, 4], tense: 0 },
          { label: 'B', tokens: ['…most', 'young', 'people', 'don’t', 'have', 'the', 'money…'], verbs: [3, 4], tense: 0 },
          { label: 'C', tokens: ['All', 'this', 'week,', 'it', 'is', 'celebrating', 'its', '10th', 'anniversary.'], verbs: [4, 5], tense: 1 },
          { label: 'D', tokens: ['…and', 'so', 'today', 'we', '’re', 'taking', 'a', 'look', 'at', 'its', 'work.'], verbs: [4, 5], tense: 1 }],
        hint: 'Tap every word of the verb form, including don’t / is / ’re.' },
      { id: 'u11-8', page: 13, num: '8', tags: ['GRAMMAR'], type: 'rulebox', core: true,
        instruction: 'Look at the sentences in Ex. 7 again. Complete the Grammar in context box. Write Present simple or Present continuous.',
        box: 'GRAMMAR IN CONTEXT · Present simple and Present continuous',
        rules: [{ n: 1, a: 'Present simple', uses: ['to talk about routines and things that are always true.', 'with verbs that describe feelings, thoughts, states and senses.'] },
          { n: 2, a: 'Present continuous', uses: ['to talk about things happening right now.', 'to talk about things happening around now.'] }],
        options: ['Present simple', 'Present continuous'], practice: 'PRACTICE EXERCISES › Grammar Form pp.132–133 › Grammar Use p.156',
        links: [['Grammar Form pp.132–133', 'u1-gr'], ['Grammar Use p.156', 'u1-wb', 'u1wb-1']] },
      { id: 'u11-9', page: 13, num: '9', tags: ['GRAMMAR'], type: 'match', core: true,
        instruction: 'Match a sentence from Ex. 7 to each rule from the Grammar in context box.',
        left: ['1 · routines and things that are always true', '1 · feelings, thoughts, states and senses', '2 · things happening right now', '2 · things happening around now'],
        right: ['A …most British cities don’t offer enough opportunities for teens.', 'B …most young people don’t have the money…', 'C All this week, it is celebrating its 10th anniversary.', 'D …and so today we’re taking a look at its work.'],
        rightShort: ['A', 'B', 'C', 'D'], answers: [0, 1, 3, 2],
        explanation: 'Key (Teacher’s Guide): Rule 1 — A and B; Rule 2 — D and C.' },
      { id: 'u11-10', page: 13, num: '10', tags: ['GRAMMAR'], type: 'gaps', core: true,
        instruction: 'Complete the sentences with the Present simple or Present continuous form of the verb in brackets.', numbered: true,
        paras: [['My friends and I ', { a: ['like'] }, ' (like) playing video games.'], ['We ', { a: ['are sitting'] }, ' (sit) in a very quiet classroom.'],
          ['My best friend ', { a: ['hangs'] }, ' (hang) out with me after school.'], ['I ', { a: ['am not spending'] }, ' (not spend) much free time outdoors at the moment.'],
          ['My mum ', { a: ['is playing'] }, ' (play) video games right now.'], ['I ', { a: ['do not know'] }, ' (not know) the answer to this question.']],
        hint: 'right now, at the moment → continuous. “like”, “know” are state verbs.',
        extra: 'Write 3 true sentences about your family: one routine, one thing happening right now, one with a state verb.' },
      { id: 'u11-11', page: 13, num: '11', tags: ['CITIZENSHIP', 'READ'], type: 'inline', core: true,
        instruction: 'READ the text and choose the correct alternative.', frameTitle: 'MY JOURNAL', heading: 'Theatre Square, Rotterdam', meta: 'Posted 12 June',
        text: ['Hi, I’m Daan. I’m from Rotterdam in the Netherlands. Today my friends and I ', { o: ['hang out', 'are hanging out'], a: 1 }, ' at Theatre Square. Lots of groups of young people ', { o: ['come', 'are coming'], a: 0 }, ' here and today it’s full of people! Some people ', { o: ['chat', 'are chatting'], a: 1 }, ' and some girls over there ', { o: ['skate', 'are skating'], a: 1 }, '. Why ', { o: ['do we hang out', 'are we hanging out'], a: 1 }, ' here? Well, we ', { o: ['make', '’re making'], a: 1 }, ' a new Tik Tok video. In general, I think people ', { o: ['love', 'are loving'], a: 0 }, ' it here because it ', { o: ['feels', 'is feeling'], a: 0 }, ' like a fun and safe place to meet up with friends. When you climb the steps, you feel that you ', { o: ['walk', 'are walking'], a: 1 }, ' onto a stage. There are water fountains, seats to relax on, and unusual red lights like long arms. In my opinion, every city ', { o: ['needs', 'is needing'], a: 0 }, ' a place like this!'],
        links: [['See Vocabulary p.158', 'u1-wb', 'u1wb-v1']],
        extra: 'Imagine you are at your favourite hang-out right now. Write a short journal post (4–5 sentences) like Daan’s.' },
      { id: 'u11-12', page: 13, num: '12', tags: ['SPEAK'], type: 'order', core: true,
        instruction: 'Write the questions. Then ask and answer them.', adapted: 'В учебнике: “in pairs”. Ученик задаёт вопросы преподавателю и отвечает на его вопросы.',
        items: [{ cue: 'Where / you / hang out / after school / later?', a: ['Where are you hanging out after school later?', 'Where are you hanging out later after school?'] },
          { cue: 'What classes / you / take / this term?', a: ['What classes are you taking this term?'] },
          { cue: 'What / you / usually / do / at weekends?', a: ['What do you usually do at weekends?', 'What do you usually do on weekends?'] },
          { cue: 'it / rain / today?', a: ['Is it raining today?'] },
          { cue: 'What / you / do / at break today?', a: ['What are you doing at break today?'] }],
        hint: 'later / this term / today → are you …ing? usually → do you …?', followUp: ['Now answer my questions!', 'And what about you?'] },
      { id: 'u11-vp', page: 13, num: 'VP', tags: ['VIEWPOINTS'], type: 'discuss', core: true,
        instruction: 'What are the best places for teens in your town? What new facilities would you like to have?', model: 'My friends and I like going to the café near the main square.',
        prompts: ['What are the best places for teens in your town?', 'What new facilities would you like to have?'],
        followUp: ['Is there a youth club in your town?', 'Do you agree that every city needs a place like Theatre Square?'] }
    ]},
    { id: 'oge', title: 'OGE Practice — Exam Skills', items: [
      { id: 'u11-oge1', source: 'added', oge: 'builder', type: 'gaps', core: false, title: 'Exam Skills Builder · Grammar transformation',
        instruction: 'Read the text. Change the word in capitals so that it fits the gap grammatically.',
        ogeNote: 'Авторское задание в формате грамматических преобразований ОГЭ. Не из банка ФИПИ.', heading: 'Our favourite hang-out', numbered: true,
        paras: [['Every Saturday my friends and I ', { a: ['meet'] }, ' at the skatepark near our school. — MEET'], ['It ', { a: ['is'] }, ' the biggest skatepark in our town. — BE'],
          ['Right now, my best friend Max ', { a: ['is practising', 'is practicing'] }, ' a new trick on his board. — PRACTISE'], ['Look! The other boys ', { a: ['are watching'] }, ' him. — WATCH'],
          ['Max ', { a: ['likes'] }, ' skateboarding more than video games. — LIKE'], ['This week we ', { a: ['are not going'] }, ' to the park because it is raining every day. — NOT GO']] },
      { id: 'u11-oge2', source: 'added', oge: 'builder', type: 'gaps', core: false, title: 'Exam Skills Builder · Word formation',
        instruction: 'Form a word from the word in capitals so that it fits the gap.', ogeNote: 'Авторское задание в формате словообразования ОГЭ. Не из банка ФИПИ.', numbered: true,
        paras: [['The new skatepark is really ', { a: ['exciting'] }, '. — EXCITE'], ['The skatepark is free, so it is ', { a: ['affordable'] }, ' for everyone. — AFFORD'],
          ['It’s ', { a: ['important'] }, ' for teens to have a safe place to meet friends. — IMPORTANCE'], ['The ', { a: ['manager'] }, ' of the leisure centre says it opens at 8 am. — MANAGE'],
          ['The people in the square are very ', { a: ['friendly'] }, '. — FRIEND'], ['Teenagers often feel ', { a: ['bored'] }, ' when there is nothing to do. — BORE']] }
    ]},
    { id: 'review', title: 'Lesson review', items: [
      { id: 'u11-r', source: 'added', type: 'review', core: true, cando: ['I can name 8 hang-out places.', 'I can guess the meaning of a new word from context.', 'I can choose between Present simple and Present continuous.', 'I can ask questions about now and about routines.'] }
    ]}
  ]
};

/* ---------------- 1.2 READING · Talking without words · pp.14–15 ---------------- */
LESSONS['u1-2'] = {
  id: 'u1-2', unit: 'u1', code: '1.2', title: 'Talking without words', kicker: 'Reading', pages: '14–15', accent: 'pink', time: '60–80 min',
  goal: 'Body language and gestures. Skim a text. Question forms: subject and object questions.',
  sections: [
    { id: 'warm', title: 'Warm-up', items: [
      { id: 'u12-1', page: 14, num: '1', tags: ['THINK'], type: 'discuss', core: true,
        instruction: 'Read the Quick quote. Use gestures and expressions to communicate the ideas. Do not use words. Can your partner guess what you are “saying”?',
        model: '“Apparently, 80 per cent of what you understand in a conversation is read through the body, not the words.” — Deborah Bull, dancer',
        adapted: 'В учебнике: “In pairs”. Ученик показывает жестами — преподаватель угадывает, и наоборот.',
        choose: { from: ['Be quiet.', 'Come here.', 'I don’t agree.', 'Well done!', 'We’re late.'], pick: 5 },
        followUp: ['Was it easy to guess?', 'Which idea was the most difficult to show?'] }
    ]},
    { id: 'book', title: 'Textbook exercises', items: [
      { id: 'u12-2', page: 14, num: '2', tags: ['VOCABULARY'], type: 'gaps', core: true,
        instruction: 'Match the phrases below to the photos.',
        photo: 'Фото A–F — в учебнике на с. 14. Здесь они заменены значками.',
        intro: ['cross your arms · hug someone · kiss someone · point at something · smile at someone · wave goodbye'], noNums: true,
        paras: [['**A** 😘 a woman and a man at a party → ', { sel: ['cross your arms', 'hug someone', 'kiss someone', 'point at something', 'smile at someone', 'wave goodbye'], a: 'kiss someone' }],
          ['**B** 👋 an old man at a window → ', { sel: ['cross your arms', 'hug someone', 'kiss someone', 'point at something', 'smile at someone', 'wave goodbye'], a: 'wave goodbye' }],
          ['**C** 🙅‍♀️ a young woman, unhappy face → ', { sel: ['cross your arms', 'hug someone', 'kiss someone', 'point at something', 'smile at someone', 'wave goodbye'], a: 'cross your arms' }],
          ['**D** 🤗 two happy girls → ', { sel: ['cross your arms', 'hug someone', 'kiss someone', 'point at something', 'smile at someone', 'wave goodbye'], a: 'hug someone' }],
          ['**E** 👉 a young man, surprised → ', { sel: ['cross your arms', 'hug someone', 'kiss someone', 'point at something', 'smile at someone', 'wave goodbye'], a: 'point at something' }],
          ['**F** 😊 a woman and a man at a table → ', { sel: ['cross your arms', 'hug someone', 'kiss someone', 'point at something', 'smile at someone', 'wave goodbye'], a: 'smile at someone' }]],
        links: [['See Vocabulary p.158', 'u1-wb', 'u1wb-v3']], tutorNote: 'Лучше показать ученику фото в учебнике (с. 14) и выполнять по ним.' },
      { id: 'u12-3', page: 14, num: '3', tags: ['SPEAK'], type: 'discuss', core: true,
        instruction: 'Which emotions can you see in the photos in Ex. 2? Use the words below to describe the people. Why do you think they are feeling this way?',
        model: 'She is kissing him on the cheek, so I think she is happy to see him.', choose: { from: ['angry', 'happy', 'sad', 'scared'], pick: 4 },
        prompts: ['Photo A…', 'Photo C…', 'Photo E…'], followUp: ['Why do you think so?', 'What happened before the photo?'] },
      { id: 'u12-4', page: 14, num: '4', tags: ['MEDIATION'], type: 'open', core: true,
        boxes: [{ title: 'READING SKILL · Skimming', html: '<p><i>Skimming</i> means reading a text quickly to understand the main ideas. It is useful when you want to get the general idea of a text. When you skim read, go from the beginning to the end of the text so you look at the ideas in the text in order, but do not read every word. Focus on the important words (especially nouns and adjectives) and the first lines of each paragraph. Don’t stop if you see a word you don’t know.</p>' }],
        instruction: 'Read the Reading skill. Then write five rules of skimming.',
        questions: ['Rule 1', 'Rule 2', 'Rule 3', 'Rule 4', 'Rule 5'], rows: 1,
        key: ['Read quickly.', 'Look at the ideas in order.', 'Don’t read every word.', 'Focus on important words and the first lines of each paragraph.', 'Don’t stop if you don’t understand a word.'] },
      { id: 'u12-5', page: 14, num: '5', tags: ['READ'], type: 'discuss', core: true,
        instruction: 'READ the first paragraph of the Facial Expressions text. Discuss the questions.', adapted: 'В учебнике: “in pairs” — обсуждаем с преподавателем.',
        boxes: [{ title: 'Facial Expressions — paragraph 1', html: '<p>' + Core.md(FACIAL[0]) + '</p>' }],
        prompts: ['¹Can this wide range of expressions mean the same thing everywhere in the world?', '²Do facial expressions mean different things in different cultures?', '³Is it possible to use our expressions to be dishonest about how we are feeling?'] },
      { id: 'u12-6', page: 14, num: '6', tags: ['READ', 'LISTEN'], type: 'mcq', core: true,
        audio: { track: '06', file: 'audio/06.mp3' },
        boxes: [{ title: 'Facial Expressions (p.15)', kind: 'article-box', html: facialHtml() }],
        instruction: 'READ and LISTEN. Skim the rest of the text. Find the answers to the questions in the first paragraph. Write yes or no.',
        questions: [{ q: '1 (same thing everywhere?)', options: ['yes', 'no'], a: 0 }, { q: '2 (different things in different cultures?)', options: ['yes', 'no'], a: 0 }, { q: '3 (possible to be dishonest?)', options: ['yes', 'no'], a: 1 }],
        tutorNote: 'Ключ TG: 1 yes 2 yes 3 no. Аудио 06 — это текст статьи.' },
      { id: 'u12-7', page: 14, num: '7', tags: ['I', 'READ'], type: 'gaps', core: true,
        instruction: 'READ the text about facial expressions again, then answer the questions (1–6) using a maximum of four words. The first one (0) has been done for you.',
        noNums: true,
        paras: [['**0** How many muscles does our face have? ', { given: '43' }],
          ['**1** Who wrote a book about facial expressions in 1872? ', { a: ['Charles Darwin', 'Darwin'] }],
          ['**2** What do people around the world share? ', { a: ['five basic facial expressions', '5 basic facial expressions', 'basic facial expressions', 'five facial expressions'] }],
          ['**3** How do all animals of the same type communicate their feelings? ', { a: ['with the same movements', 'the same movements', 'with the same body movements', 'same movements'] }],
          ['**4** When do people learn to control facial expressions? ', { a: ['from a young age', 'at a young age'] }],
          ['**5** What do Japanese people sometimes hide? ', { a: ['negative emotions', 'their negative emotions'] }],
          ['**6** What is it difficult to do in a fake smile? ', { a: ['make our eyes narrow', 'make the eyes narrow', 'make eyes narrow'] }]],
        tutorNote: 'I — формат INVALSI Reading: ответ не длиннее 4 слов. Текст — в упр. 6.' },
      { id: 'u12-8', page: 15, num: '8', tags: ['GRAMMAR'], type: 'gaps', core: true,
        instruction: 'Read the Grammar in context box. Complete the rules with the words below.',
        frame: 'gram', frameTitle: 'GRAMMAR IN CONTEXT · Question forms', noNums: true,
        paras: [['We normally answer yes / no questions with ¹', { sel: ['object', 'question word', 'short answers', 'subject'], a: 'short answers' }, '.'],
          ['*Does this mean we can always understand what people are feeling? No, it doesn’t.*'],
          ['When a question starts with a ²', { sel: ['object', 'question word', 'short answers', 'subject'], a: 'question word' }, ' (e.g. what, who, why, how many), we usually give a full answer.'],
          ['*How many muscles does our face have? Our face has 43 muscles.*'],
          ['These questions are either object questions or subject questions. In object questions, the question word refers to the ³', { sel: ['object', 'question word', 'short answers', 'subject'], a: 'object' }, ' of the sentence.'],
          ['*What do people around the world share?*'],
          ['In subject questions, the question word refers to the ⁴', { sel: ['object', 'question word', 'short answers', 'subject'], a: 'subject' }, '.'],
          ['*Who wrote a book about facial expressions in 1872?*']],
        links: [['Grammar Form pp.132–133', 'u1-gr'], ['Grammar Use pp.156–157', 'u1-wb', 'u1wb-4']] },
      { id: 'u12-9', page: 15, num: '9', tags: ['GRAMMAR', 'SPEAK'], type: 'gaps', core: true,
        instruction: 'Complete the questions with the words in brackets. Then ask and answer them.', numbered: true,
        paras: [['How many kisses ', { a: ['do you give'] }, ' (you / give) a person when you meet them?'], ['', { a: ['Are you'] }, ' (you / be) angry very often?'],
          ['', { a: ['What is'] }, ' (what / be) often a sign that someone is lying?'], ['', { a: ['Who smiles'] }, ' (who / smile) the most in your class?'], ['', { a: ['Do animals use'] }, ' (animals / use) facial expressions?']],
        followUp: ['Now answer the questions!', 'And what about you?'] },
      { id: 'u12-10', page: 15, num: '10', tags: ['GRAMMAR', 'WRITE'], type: 'open', core: true,
        instruction: 'Choose a topic from this unit and write 10 quiz questions about it. Write five subject and five object questions.',
        adapted: 'В учебнике — в парах с обменом викторинами. Ученик пишет 10 вопросов, преподаватель на них отвечает; потом можно поменяться.',
        questions: ['Subject question 1', 'Subject question 2', 'Subject question 3', 'Subject question 4', 'Subject question 5', 'Object question 1', 'Object question 2', 'Object question 3', 'Object question 4', 'Object question 5'], rows: 1,
        tutorNote: 'Проверьте: subject — без do/does (Who wrote…?), object — с вспомогательным глаголом (What do people share?).' },
      { id: 'u12-vp', page: 15, num: 'VP', tags: ['VIEWPOINTS'], type: 'discuss', core: true,
        instruction: 'Some people use a lot of facial expressions. Others don’t. Is it useful to show or hide facial expressions? Give reasons for your answers.',
        prompts: ['Is it useful to show facial expressions?', 'When is it better to hide them?'], followUp: ['Do you use a lot of facial expressions?', 'Can you give an example?'] }
    ]},
    { id: 'oge', title: 'OGE Practice — Exam Skills', items: [
      { id: 'u12-oge1', source: 'added', oge: 'builder', type: 'interview', read: true, core: false, title: 'Exam Skills Builder · Reading aloud',
        instruction: 'Prepare for 1.5 minutes, then read the text aloud. You have 2 minutes to read.',
        ogeNote: 'По модели задания 1 устной части ОГЭ (чтение вслух). Текст — абзацы 3–4 статьи из учебника, не из банка ФИПИ.',
        prep: 90, seconds: 120, questions: [FACIAL[2] + ' ' + FACIAL[3]],
        checklist: ['Correct pronunciation of words', 'Correct word stress', 'Intonation: falling at the end of statements', 'Pauses at commas and full stops', 'Finished in time'] }
    ]},
    { id: 'review', title: 'Lesson review', items: [
      { id: 'u12-r', source: 'added', type: 'review', core: true, cando: ['I can name 6 gestures.', 'I can skim a text for the main ideas.', 'I can ask subject and object questions.'] }
    ]}
  ]
};

/* ---------------- 1.3 WRITING · Staying in touch · pp.16–17 ---------------- */
LESSONS['u1-3'] = {
  id: 'u1-3', unit: 'u1', code: '1.3', title: 'Staying in touch', kicker: 'Writing', pages: '16–17', accent: 'yellow', time: '2 × 60 min',
  goal: 'Informal emails. Modifying adverbs. Question tags. Checking punctuation.',
  split: 'Занятие 1: упр. 1–8. Занятие 2: упр. 9–14, Viewpoints, OGE.',
  sections: [
    { id: 'warm', title: 'Warm-up', items: [
      { id: 'u13-1', page: 16, num: '1', tags: ['THINK'], type: 'discuss', core: true,
        instruction: 'Are you still in touch with friends from primary school? Why is it sometimes difficult to stay friends as we grow older?',
        prompts: ['Are you still in touch with friends from primary school?', 'Why is it sometimes difficult to stay friends as we grow older?'], followUp: ['How do you keep in touch?', 'Tell me more.'] }
    ]},
    { id: 'book', title: 'Textbook exercises', items: [
      { id: 'u13-2', page: 16, num: '2', tags: ['READ'], type: 'open', core: true,
        boxes: [{ title: 'MY MAIL', kind: 'mail-box', html: EMAILS_HTML() }, { title: 'KEY PHRASES', kind: 'phr', html: '<ul class="cols"><li>Hi [name], / Hey [name],</li><li>It’s great to hear from you.</li><li>How are things?</li><li>Things are going (fairly well)…</li><li>I hope you’re enjoying life.</li><li>I’d be (really happy to come)…</li><li>Let me know.</li><li>From [your name]</li></ul>' }],
        instruction: 'READ the emails and answer the questions.',
        questions: ['Why is Chloe writing to Oliver?', 'Do the two friends live in the same town?', 'Is Oliver planning to go to the party?'],
        key: ['She’d like to invite him to a birthday party.', 'No, they don’t.', 'He doesn’t know yet.'] },
      { id: 'u13-3', page: 16, num: '3', type: 'reference', core: true,
        instruction: 'Look at the words in bold in the emails. Then read the Vocabulary development.',
        html: '<div class="vdev"><div class="vdev-h">VOCABULARY DEVELOPMENT · Modifying adverbs</div><p>Some adverbs can give adjectives a weaker meaning. For example: <i>a little, a bit, fairly, quite</i>.</p><p>Others give adjectives a stronger meaning. For example: <i>very, really, extremely, totally, completely, absolutely</i>.</p><p>We don’t use <i>very</i> with adjectives with an extreme meaning. Instead, we can use <i>absolutely</i>.</p><p class="vex">It’s absolutely amazing! NOT <s>It’s very amazing!</s></p></div>' },
      { id: 'u13-4', page: 16, num: '4', type: 'gaps', core: true,
        instruction: 'Replace the **bold** words in the messages with an alternative modifying adverb. Do not use *very*. Sometimes more than one option is possible.',
        frame: 'chat', frameTitle: 'Morgan',
        paras: [['**Morgan 4.53** Just a quick note to say sorry for not replying, Alex. I’m ¹**very** → ', { a: ['really', 'extremely'] }, ' busy this week. Things are ²**totally** → ', { a: ['really', 'completely', 'absolutely'] }, ' mad at school, with the Christmas concert rehearsals and exams.'],
          ['**Alex 4.56** That sounds ³**extremely** → ', { a: ['really'] }, ' difficult! I’m ⁴**a bit** → ', { a: ['a little', 'fairly', 'quite'] }, ' busy, too, to be ⁵**really** → ', { a: ['totally', 'completely', 'absolutely'] }, ' honest. Let’s plan something for January.'],
          ['**Morgan 5.03** Thanks! You’re ⁶**totally** → ', { a: ['absolutely'] }, ' amazing.']],
        noNums: true, links: [['See Vocabulary p.158', 'u1-wb', 'u1wb-v4']], tutorNote: 'Варианты — по ключу Teacher’s Guide. Если ученик предлагает другой разумный вариант, обсудите.' },
      { id: 'u13-5', page: 16, num: '5', type: 'mcq', core: true,
        instruction: 'Find *highkey* in Oliver’s email. What do you think it means? Read the Street speak to find out.',
        boxes: [{ title: 'STREET SPEAK', kind: 'street', html: '<p><i>Highkey</i> or <i>hi-key</i> is an informal way to say <i>absolutely</i> or <i>a lot</i>. The opposite (<i>lowkey</i>) means <i>not really</i> or <i>secretly</i>.</p>' }],
        questions: [{ q: '“I **highkey** miss you guys” means…', options: ['I miss you a lot', 'I secretly miss you', 'I don’t really miss you'], a: 0 }],
        tutorNote: 'В учебнике это открытый вопрос; варианты ответа добавлены для проверки. Ключ TG: ‘absolutely’ / ‘a lot’. Сначала спросите устно, потом откройте Street speak.' },
      { id: 'u13-6', page: 17, num: '6', tags: ['GRAMMAR'], type: 'inline', core: true,
        instruction: 'Look at the examples from the emails in the Grammar in context box. Then choose the correct alternative to complete the rules.',
        frameTitle: 'GRAMMAR IN CONTEXT · Question tags', heading: '', meta: 'We usually use question tags to check something is true, or to ask people if they agree with us. — You remember Aleisha, don’t you? It probably isn’t easy to start a new school, is it?',
        text: ['We use a ', { o: ['positive', 'negative'], a: 1 }, ' question tag after a positive statement. We use a ', { o: ['positive', 'negative'], a: 0 }, ' question tag after a negative statement.'],
        links: [['Grammar Form pp.132–133', 'u1-gr', 'u1gr-5'], ['Grammar Use p.157', 'u1-wb', 'u1wb-8']] },
      { id: 'u13-7', page: 17, num: '7', tags: ['GRAMMAR'], type: 'tapfind', core: true,
        instruction: 'Read the emails in Ex. 2 again. Underline three more question tags.',
        hint: 'The two examples from the Grammar box (don’t you? / is it?) don’t count. Tap both words of each tag.',
        frame: 'mailtf',
        paras: [{ static: true, t: 'FROM: Chloe · SUBJECT: My Birthday!' }].concat(CHLOE.map(t => ({ t }))).concat([{ static: true, t: 'FROM: Oliver · SUBJECT: Re: My Birthday!' }]).concat(OLIVER.map(t => ({ t }))),
        ignore: ['is it?', 'don’t you?'], targets: ['can’t you?', 'isn’t it?', 'do you?'] },
      { id: 'u13-8', page: 17, num: '8', tags: ['GRAMMAR'], type: 'gaps', core: true,
        instruction: 'Write the correct question tags.', numbered: true,
        paras: [['Chloe lives close to Oliver, ', { a: ['doesn’t she'] }, '?'], ['Chloe and Oliver aren’t friends, ', { a: ['are they'] }, '?'], ['Oliver doesn’t know Aleisha, ', { a: ['does he'] }, '?'], ['Oliver can go to the party, ', { a: ['can’t he'] }, '?'], ['Chloe isn’t planning a birthday party, ', { a: ['is she'] }, '?']] },
      { id: 'u13-9', page: 17, num: '9', type: 'reference', core: true,
        audio: { track: '07', file: 'audio/07.mp3', transcript: '<p>Oliver is happy in his new school, isn’t he? ↗ (rising — checking)</p><p>Oliver is happy in his new school, isn’t he? ↘ (falling — agreeing / reminding)</p>' },
        instruction: '07 Read the Pronunciation box. Listen to the examples. Then listen and repeat.',
        html: '<div class="vdev blue"><div class="vdev-h">PRONUNCIATION · Natural English</div><p>For question tags, the intonation can change. It rises at the end of question tags when you are checking information because you aren’t sure.</p><p class="vex">Oliver is happy in his new school, isn’t he? <b>↗</b></p><p>When we are inviting someone to agree with our opinion, or reminding someone of a fact, the intonation falls.</p><p class="vex">Oliver is happy in his new school, isn’t he? <b>↘</b></p></div>', doneLabel: 'Listened & repeated ✓' },
      { id: 'u13-10', page: 17, num: '10', type: 'gaps', core: true,
        instruction: 'Write the question tags. Then read the questions with rising or falling intonation. Use the notes in brackets to help you.', numbered: true,
        paras: [['Staying in touch isn’t easy, ', { a: ['is it'] }, '? (opinion) ', { sel: ['↗ rising', '↘ falling'], a: '↘ falling', ph: 'intonation' }],
          ['Most teens send over 100 messages a day, ', { a: ['don’t they'] }, '? (need to check) ', { sel: ['↗ rising', '↘ falling'], a: '↗ rising', ph: 'intonation' }],
          ['We can’t drive, ', { a: ['can we'] }, '? (fact) ', { sel: ['↗ rising', '↘ falling'], a: '↘ falling', ph: 'intonation' }],
          ['A bus ticket costs €1,10, ', { a: ['doesn’t it'] }, '? (need to check) ', { sel: ['↗ rising', '↘ falling'], a: '↗ rising', ph: 'intonation' }],
          ['I’m an absolutely amazing friend, ', { a: ['aren’t I'] }, '? (belief) ', { sel: ['↗ rising', '↘ falling'], a: '↘ falling', ph: 'intonation' }]],
        followUp: ['Now read each question aloud with the right intonation.'] },
      { id: 'u13-11', page: 17, num: '11', type: 'open', core: true,
        boxes: [{ title: 'WRITING SKILL · Checking your work: punctuation', html: '<p>Punctuation shows the reader the structure of the sentence and makes it easier for readers to understand your writing. Making mistakes with punctuation gives a bad impression, and you lose marks for this in an exam.</p><ul class="cols"><li><b>!</b> exclamation mark</li><li><b>,</b> comma</li><li><b>?</b> question mark</li><li><b>’</b> apostrophe</li><li><b>.</b> full stop</li><li><b>A</b> capital letter</li><li><b>–</b> dash (use a colon in formal writing)</li></ul>' }],
        instruction: 'Read the Writing skill. Then look at the emails in Ex. 2 and find one example of each type of punctuation.',
        questions: ['! exclamation mark', ', comma', '? question mark', '’ apostrophe', '. full stop', 'A capital letter', '– dash'], rows: 1,
        key: ['My Birthday! / it’s absolutely amazing!', 'Hey Oliver,', 'How are things?', 'it’s / I’m / don’t', 'I hope you’re starting to feel at home.', 'Chloe / Oliver / Saturday', 'Let me know – it would be…'],
        links: [['Ex. 2 emails', 'u1-3', 'u13-2']] },
      { id: 'u13-12', page: 17, num: '12', type: 'order', core: true, strict: true,
        instruction: 'Rewrite the sentence with correct punctuation.',
        items: [{ cue: 'oliver says he cant come he has a basketball match it’s a shame isn’t it', a: ['Oliver says he can’t come – he has a basketball match. It’s a shame, isn’t it?', 'Oliver says he can’t come: he has a basketball match. It’s a shame, isn’t it?', 'Oliver says he can’t come. He has a basketball match. It’s a shame, isn’t it?', 'Oliver says he can’t come because he has a basketball match. It’s a shame, isn’t it?'] }],
        tutorNote: 'Проверка строгая: регистр, запятые, точки и апострофы учитываются. Принимаются тире, двоеточие или точка после come.' },
      { id: 'u13-13', page: 17, num: '13', tags: ['OTE', 'WRITE'], type: 'writing', core: true,
        instruction: 'WRITE 80–130 words. Your friend Chloe is having a party this weekend. First, read the email from Aleisha. Then write an email to Aleisha, including the three notes you have made. Use the expressions in the Key phrases box on page 16 to help you.',
        letter: ['**FROM: Aleisha · SUBJECT: PARTY!**', 'Hello,', 'How are you? It’s Chloe’s party on Saturday and Oliver said he thinks he can come, too! Great news, right? Anyway, I wanted to ask you some questions about Saturday.', '*Do you already have a present for Chloe?* → **Say yes and give details.**', 'I think Oliver said that you do! *Do you have any ideas for something I can buy her?* → **Suggest…**', 'My mum usually drives me to Chloe’s house. *Do you want us to take you, too?* → **Explain and accept.**', 'See you on Saturday.', 'From Aleisha'],
        min: 80, max: 130, links: [['Key phrases p.16', 'u1-3', 'u13-2']],
        tutorNote: 'OTE — Oxford Test of English, Writing Part 1. Перед письмом 2–3 минуты на план (идеи, фразы).' },
      { id: 'u13-14', page: 17, num: '14', tags: ['CHECK & REFLECT'], type: 'checklist', core: true,
        instruction: 'Read your partner’s email. Suggest improvements for his / her email.', adapted: 'На занятии 1:1 ученик проверяет своё письмо (упр. 13) по чек-листу, затем преподаватель.',
        items: ['Do they include information about all the notes?', 'Is the reason for the email clear?', 'Do they use modifying adverbs correctly?', 'Do they use modifying adverbs with suitable adjectives or verbs?', 'Can you see any punctuation mistakes?'] },
      { id: 'u13-vp', page: 17, num: 'VP', tags: ['VIEWPOINTS'], type: 'discuss', core: true,
        instruction: 'It is important to stay in touch with old friends, isn’t it? How realistic is this?', prompts: ['Is it important to stay in touch with old friends?', 'How realistic is this?'], followUp: ['Do you agree?', 'Can you give an example?'] }
    ]},
    { id: 'oge', title: 'OGE Practice — Exam Skills', items: [
      { id: 'u13-oge1', source: 'added', oge: 'builder', type: 'writing', core: false, title: 'Exam Skills Builder · Email to a friend',
        instruction: 'You have received an email from your English-speaking pen-friend Sam:',
        letter: '…In my town there is a new skatepark and I go there every weekend with my friends. Where do you usually hang out with your friends? What do you do there? What new place for teenagers would you like to have in your town?…',
        task: 'Write an email to Sam and answer his 3 questions. Write 100–120 words. Remember the rules of email writing.', min: 100, max: 120,
        ogeNote: 'Формат электронного письма ОГЭ (100–120 слов, ответы на 3 вопроса). Письмо Сэма авторское. Содержание и язык оценивает преподаватель по критериям ФИПИ; сайт проверяет только формальные признаки.',
        criteria: ['Решение коммуникативной задачи (ответы на 3 вопроса, неофициальный стиль)', 'Организация текста (обращение, благодарность, ссылка на предыдущее письмо, надежда на контакт, завершающая фраза, подпись, абзацы)', 'Языковое оформление (лексика, грамматика, орфография, пунктуация)'] }
    ]},
    { id: 'review', title: 'Lesson review', items: [
      { id: 'u13-r', source: 'added', type: 'review', core: true, cando: ['I can write an informal email.', 'I can use modifying adverbs (quite, really, absolutely…).', 'I can make question tags with the right intonation.', 'I can check punctuation.'] }
    ]}
  ]
};

/* ---------------- 1.4 SPEAKING · Small talk · p.18 ---------------- */
LESSONS['u1-4'] = {
  id: 'u1-4', unit: 'u1', code: '1.4', title: 'Small talk', kicker: 'Speaking', pages: '18', accent: 'blue', time: '45–60 min',
  goal: 'Make small talk and show interest.',
  sections: [
    { id: 'warm', title: 'Warm-up', items: [
      { id: 'u14-1', page: 18, num: '1', tags: ['THINK'], type: 'open', core: true,
        boxes: [{ title: 'small talk (noun) [uncountable]', html: '<p>polite conversation about normal and unimportant subjects, especially at parties and other social events</p>' }],
        instruction: 'Read the definition of *small talk*. Answer the questions.', questions: ['What are some typical topics of small talk?', 'Is small talk important? Why or why not?'],
        key: ['weather, sports, free time, food, events, family, school, work, holidays, house, etc.', 'Students’ own answers'] }
    ]},
    { id: 'book', title: 'Textbook exercises', items: [
      { id: 'u14-2', page: 18, num: '2', tags: ['WATCH', 'LISTEN', 'READ'], type: 'listen', core: true,
        audio: { track: '08', file: 'audio/08.mp3', video: true, transcript: dialogueHtml() },
        boxes: [{ title: 'Dialogue (READ)', kind: 'dlg-box', html: dialogueHtml() }],
        instruction: 'WATCH, LISTEN or READ. Choose the topics the speakers mention.',
        inner: { type: 'multi', options: ['hometown', 'family', 'holiday', 'school', 'work', 'sports', 'weather', 'free time'], answers: [3, 5, 7] } },
      { id: 'u14-3', page: 18, num: '3', type: 'tapfind', core: true,
        boxes: [{ title: 'SPEAKING SKILL · Showing interest', html: '<p>Showing interest in what people are saying will encourage them and help to keep the conversation going.</p><p><b>KEY PHRASES</b> Really? / Oh yeah? · No way! · That sounds fun / amazing. · That’s true / awesome. · How exciting! · Me too! / So do I!</p>' }],
        instruction: 'Read the Speaking skill. Then underline the key phrases in the dialogue.',
        paras: DIALOGUE.map(([who, t]) => ({ who, t })),
        ignore: ['Really? It’s'],
        targets: ['Me too!', 'That’s true.', 'So do I!', 'How exciting!', 'That sounds fun…', 'Oh yeah?', 'That sounds amazing!', 'No way!', 'Really?!', 'That’s awesome!'],
        tutorNote: 'Max: “Really? It’s OK…” не засчитывается и не штрафуется — здесь это скорее сомнение, чем интерес. В ключе TG есть ещё “Wow!” — он только в видео.' },
      { id: 'u14-4', page: 18, num: '4', tags: ['SPEAK'], type: 'discuss', core: true,
        instruction: 'Practise responding to each statement using one of the Key phrases.', adapted: 'В учебнике: “In pairs”. Преподаватель читает утверждение — ученик реагирует, потом меняетесь.',
        prompts: ['1 My sister lives in Malaysia.', '2 I’m studying for my maths exam.', '3 I like going horse riding at the weekend.', '4 I’m thinking of travelling around Europe for a year.', '5 My best friend and I share the same birthday.'],
        followUp: ['Ask a follow-up question!', 'Use a question tag.'] },
      { id: 'u14-5', page: 18, num: '5', tags: ['EMPLOYABILITY', 'SPEAK'], type: 'checklist', core: true,
        instruction: 'Stand up, move around your classroom, and make small talk with your classmates. Use the ideas in Ex. 4 to help you.',
        adapted: 'На занятии 1:1 — разговор с преподавателем «как будто впервые встретились», 1–2 минуты, 2–3 раунда с разными ролями.',
        items: ['Start the conversation and introduce yourself.', 'Make small talk and ask questions to develop the conversation. (Use question tags if possible.)', 'Show you are interested by reacting to what you hear.', 'After a minute, end the conversation. Say: “Anyway, really nice to chat. See you later.”'] },
      { id: 'u14-6', page: 18, num: '6', tags: ['MEDIATION'], type: 'writing', core: true, checks: false,
        instruction: 'Produce a short guide to making successful small talk. Use the Key phrases and the dialogue to help you.' }
    ]},
    { id: 'oge', title: 'OGE Practice — Exam Skills', items: [
      { id: 'u14-oge1', source: 'added', oge: 'practice', type: 'interview', core: false, title: 'OGE Exam Practice · Speaking: answer the questions',
        instruction: 'You are taking part in a survey about how teenagers communicate. Answer six questions. Give full answers (2–3 sentences). You have 40 seconds for each answer.',
        ogeNote: 'По модели задания 2 устной части ОГЭ (условный диалог-расспрос, 6 вопросов). Вопросы авторские, не из банка ФИПИ.', seconds: 40,
        questions: ['What is your favourite place to hang out with friends?', 'How often do you meet your friends there?', 'What do you usually talk about with your friends?', 'Do you prefer to meet your friends face-to-face or online? Why?', 'Is it easy for you to talk to new people? Why or why not?', 'What advice would you give to a new student at your school?'],
        checklist: ['Answered the question directly', '2–3 full sentences', 'Correct tense', 'Used lesson vocabulary', 'Finished within 40 seconds'] }
    ]},
    { id: 'review', title: 'Lesson review', items: [
      { id: 'u14-r', source: 'added', type: 'review', core: true, cando: ['I can start and end small talk.', 'I can show interest with key phrases.'] }
    ]}
  ]
};

/* ---------------- 1.5 CULTURE · New York Bike Messenger · p.19 ---------------- */
LESSONS['u1-5'] = {
  id: 'u1-5', unit: 'u1', code: '1.5', title: 'New York Bike Messenger', kicker: 'Culture', pages: '19', accent: 'orange', time: '45–60 min', sdg: '11 Sustainable cities and communities',
  goal: 'Learn about the job of a bike messenger. Plan a bike tour of your city.',
  sections: [
    { id: 'warm', title: 'Warm-up', items: [
      { id: 'u15-1', page: 19, num: '1', tags: ['CITIZENSHIP', 'THINK'], type: 'discuss', core: true,
        instruction: 'Ask and answer the questions.', adapted: 'В учебнике: “In pairs”. Ученик отвечает и задаёт те же вопросы преподавателю.',
        prompts: ['Do you have a bike? When do you use it? Where do you go?', 'Do you ever cycle in the city centre? Do you think it’s safe?', 'Would you like to deliver packages by bike? Why or why not?'] }
    ]},
    { id: 'book', title: 'Textbook exercises', items: [
      { id: 'u15-2', page: 19, num: '2', tags: ['WATCH', 'LISTEN'], type: 'listen', core: true,
        audio: { track: '09', file: 'audio/09.mp3', video: true, transcript: T_BIKE },
        instruction: 'WATCH or LISTEN. Choose the correct alternative (A, B or C).',
        inner: { type: 'mcq', questions: [
          { q: '1 Where is Alex’s office?', options: ['A in Manhattan', 'B in his house', 'C He doesn’t have one.'], a: 2 },
          { q: '2 What does Alex always carry?', options: ['A tablet computer', 'B phone', 'C keys'], a: 1 },
          { q: '3 Why does Alex like his bike?', options: ['A It’s very expensive.', 'B It’s very fast.', 'C It’s light and comfortable.'], a: 2 },
          { q: '4 What does Alex do before he starts work?', options: ['A He has a coffee.', 'B He talks to his boss.', 'C He goes to the gym.'], a: 0 },
          { q: '5 What does Alex know well?', options: ['A New York’s streets, skate parks and steps.', 'B New York’s streets, parks and public squares.', 'C New York’s streets, fountains and shopping malls.'], a: 1 },
          { q: '6 Why is Alex waving in the video?', options: ['A There isn’t much traffic today.', 'B He’s talking to his girlfriend.', 'C It’s a sunny day.'], a: 1 }] },
        tutorNote: 'Ключ TG: 1C 2B 3C 4A 5B 6B. Вопрос 6 — по видео (в аудиоскрипте этого нет).' },
      { id: 'u15-3', page: 19, num: '3', tags: ['WATCH', 'LISTEN'], type: 'listen', core: true,
        audio: { track: '10', file: 'audio/09.mp3', video: true, transcript: T_BIKE },
        instruction: 'Watch or listen again. Are the sentences true (T) or false (F)? Correct the false sentences.',
        inner: { type: 'gaps', numbered: true, paras: [
          ['Alex’s job takes him all over New York City. ', { sel: ['T', 'F'], a: 'T' }, ' ', { open: true, ph: 'correction (if F)' }],
          ['Alex works indoors some of the time. ', { sel: ['T', 'F'], a: 'F' }, ' ', { open: true, ph: 'correction', key: 'He works outside all day.' }],
          ['Alex always tries to deliver the packages on time. ', { sel: ['T', 'F'], a: 'T' }, ' ', { open: true, ph: 'correction (if F)' }],
          ['Alex does a lot of exercise after work. ', { sel: ['T', 'F'], a: 'F' }, ' ', { open: true, ph: 'correction', key: 'He does a lot of exercise while he’s working.' }],
          ['Alex doesn’t usually cook in the evenings. ', { sel: ['T', 'F'], a: 'F' }, ' ', { open: true, ph: 'correction', key: 'He prepares a healthy meal in the evenings.' }],
          ['He calls his girlfriend on his mobile phone. ', { sel: ['T', 'F'], a: 'F' }, ' ', { open: true, ph: 'correction', key: 'He calls his girlfriend on Skype / talks to her online.' }]] },
        explanation: 'Corrections (Teacher’s Guide): 2 He works outside all day. 4 He does a lot of exercise while he’s working. 5 He prepares a healthy meal in the evenings. 6 He calls his girlfriend on Skype.',
        tutorNote: 'Автоматически проверяются T/F; исправления проверяет преподаватель («Показать ключ» подставит образец).' },
      { id: 'u15-4', page: 19, num: '4', type: 'gaps', core: true,
        instruction: 'Complete the summary with the words below.', bank: ['begins', 'breakfast', 'dangerous', 'early', 'enjoys', 'healthy', 'helmet', 'plays'], uniqueBank: true,
        paras: [['Alex’s day starts ', { a: ['early'] }, ', and after ', { a: ['breakfast'] }, ' he gets ready for work. He’s always cycling so he needs to wear a ', { a: ['helmet'] }, '. His work ', { a: ['begins'] }, ' with his first delivery. His job is ', { a: ['dangerous'] }, ' because of the traffic, but he still ', { a: ['enjoys'] }, ' it. He gets tired, but his job keeps him ', { a: ['healthy'] }, '. Before going to bed, he ', { a: ['plays'] }, ' the guitar.']] },
      { id: 'u15-5', page: 19, num: '5', tags: ['REAL WORLD', 'SPEAK'], type: 'discuss', core: true,
        instruction: 'You are planning a bike tour of your city. Agree on three tourist attractions to visit. Why do you think they are good places to visit?', adapted: 'В учебнике: “In pairs” — договариваетесь с преподавателем.',
        prompts: ['Attraction 1 — why?', 'Attraction 2 — why?', 'Attraction 3 — why?'], followUp: ['Is it safe to cycle there?', 'How long does the tour take?'] },
      { id: 'u15-6', page: 19, num: '6', tags: ['REAL WORLD', 'WRITE'], type: 'writing', core: true, checks: false,
        instruction: 'Plan the bike tour of your city. Then complete the task below:', task: 'Your friend is visiting your city and would like you to take him/her on a bike tour. Write him/her a message with three ideas on what to see and how to get there by bike.' }
    ]},
    { id: 'oge', title: 'OGE Practice — Exam Skills', items: [
      { id: 'u15-oge1', source: 'added', oge: 'builder', type: 'gaps', core: false, title: 'Exam Skills Builder · Grammar transformation',
        instruction: 'Read the text. Change the word in capitals so that it fits the gap grammatically.', ogeNote: 'Авторское задание в формате грамматических преобразований ОГЭ. Не из банка ФИПИ.',
        heading: 'A day in the life of a messenger', numbered: true,
        paras: [['Alex ', { a: ['works'] }, ' all over New York. — WORK'], ['He ', { a: ['does not have'] }, ' an office. — NOT HAVE'], ['Every morning he ', { a: ['has'] }, ' a quick breakfast. — HAVE'],
          ['Look! He ', { a: ['is cycling'] }, ' through Times Square right now. — CYCLE'], ['Today the sun ', { a: ['is shining'] }, ', so Alex is happy. — SHINE'], ['In the evening he usually ', { a: ['plays'] }, ' the guitar. — PLAY']] }
    ]},
    { id: 'review', title: 'Lesson review', items: [
      { id: 'u15-r', source: 'added', type: 'review', core: true, cando: ['I can describe a bike messenger’s day.', 'I can suggest places for a bike tour of my city.'] }
    ]}
  ]
};

/* ---------------- 1.6 REVIEW · p.20 ---------------- */
LESSONS['u1-6'] = {
  id: 'u1-6', unit: 'u1', code: '1.6', title: 'Review', kicker: 'Review', pages: '20', accent: 'pink', time: '45–60 min',
  goal: 'Review the language of Unit 1. Exam practice: multiple-choice cloze and open cloze.',
  sections: [
    { id: 'book', title: 'Textbook exercises', items: [
      { id: 'u16-1', page: 20, num: '1', tags: ['P'], type: 'mcq', core: true, compact: true,
        instruction: 'For each question, choose the correct answer.',
        passage: [['Millions of us are choosing to spend our free time in online worlds, like Second Life or Fortnite. But why?'],
          ['Well, firstly, you can interact with people easily with your avatar. With your keyboard, you can make gestures, like using your ', { n: 1 }, ' to wave goodbye, or your finger to ', { n: 2 }, ' at things. You can also buy special kiss or ', { n: 3 }, ' animations, or (in the case of Fortnite) do cool dances!'],
          ['You can explore amazing places too. In Second Life, you can walk on the ', { n: 4 }, ' of “real” cities, like London. The recent world Sansar allows thousands of users to share the same space together – ', { n: 5 }, ' incredible.'],
          ['A lot of people enjoy the actual game, too. Every time you drop from the bus in Fortnite, you start a new, ', { n: 6 }, ' exciting adventure story.'],
          ['But I think for young people, the real reason is the freedom. In the normal world, we tell young people they can’t go to this place or talk to that person; in online worlds they are ', { n: 7 }, ' free to interact and hang out. The only limits are the creators’ and players’ imaginations.']],
        questions: [{ n: 1, options: ['A hand', 'B fingers', 'C thumb', 'D arms'], a: 0 }, { n: 2, options: ['A point', 'B smile', 'C kiss', 'D talk'], a: 0 }, { n: 3, options: ['A play', 'B make', 'C hug', 'D shake'], a: 2 },
          { n: 4, options: ['A squares', 'B roads', 'C pavements', 'D steps'], a: 2 }, { n: 5, options: ['A only', 'B very', 'C absolutely', 'D a bit'], a: 2 }, { n: 6, options: ['A extremely', 'B lovely', 'C completely', 'D little'], a: 0 },
          { n: 7, options: ['A a little', 'B completely', 'C almost', 'D not'], a: 1 }],
        tutorNote: 'P — Cambridge B1 Preliminary Reading Part 5 (multiple-choice cloze). Сначала просмотреть текст целиком (skimming).' },
      { id: 'u16-2', page: 20, num: '2', tags: ['P'], type: 'gaps', core: true,
        instruction: 'For each question, write the correct answer. Write one word for each gap.',
        frame: 'plain', source: 'Source: ‘Strike a pose: the new body language’, Emma Sibbles and Simon Chilvers, The Guardian, April 2009',
        paras: [['So ', { a: ['what'] }, ' are this year’s body language trends?'],
          ['• It seems that lots of celebrities are doing the “V” gesture with their fingers this year. Yes, the 1960s ', { a: ['are'] }, ' coming back!'],
          ['• We are all familiar with the traditional, friendly kiss on the cheek, ', { a: ['aren’t'] }, ' we? Well, it seems like this is going out of fashion. The female celebrity ', { a: ['is'] }, ' now choosing to hold hands instead.'],
          ['• What about your bag? Do ', { a: ['you'] }, ' carry it on your arm or in your hands? The answer is no. You now hug it, or put it over your shoulder.'],
          ['• Now, models ', { a: ['don’t'] }, ' smile, do ', { a: ['they'] }, '? Wrong! We ', { a: ['’re', 'are'] }, ' seeing lots of smiling models at fashion shows.']],
        tutorNote: 'P — Cambridge B1 Preliminary Reading Part 6 (open cloze). Ключ: what, are, aren’t, is, you, don’t, they, ’re.' },
      { id: 'u16-3', page: 20, num: '3', tags: ['SPEAK'], type: 'discuss', core: true,
        instruction: 'Find photos of a place where you like to hang out. Tell a partner where it is and what you do there.', adapted: 'Ученик показывает фото на телефоне и рассказывает преподавателю.',
        prompts: ['Where is it?', 'What do you do there?'], followUp: ['Who do you go there with?', 'Why do you like it?'] },
      { id: 'u16-4', page: 20, num: '4', tags: ['SPEAK', 'WRITE'], type: 'discuss', core: true,
        instruction: 'SPEAK or WRITE. Read the Quick quote. Answer the questions.', model: '“All social interactions require some loss of freedom.” — Erol Ozan',
        prompts: ['Do you find it easy to talk to other people?', 'Do your friends and family know the “real” you?', 'Is it better to have a large group of mates or a few close friends?'] },
      { id: 'u16-5', page: 20, num: '5', tags: ['LOOK BACK'], type: 'discuss', core: true,
        instruction: 'Answer the questions.',
        prompts: ['Which of the grammar points would you like to practise further?', 'Which lesson did you enjoy the most?', 'Do you feel confident using punctuation in your writing?', 'Why do you think it is important to show interest during a conversation?'] }
    ]}
  ]
};

/* ---------------- GRAMMAR REFERENCE & PRACTICE: FORM · pp.132–133 ---------------- */
LESSONS['u1-gr'] = {
  id: 'u1-gr', unit: 'u1', code: 'GR', title: 'Grammar Reference & Practice', kicker: 'Grammar Reference', pages: '132–133', accent: 'navy', time: 'по необходимости',
  goal: 'Present simple and Present continuous · Question forms · Question tags',
  sections: [
    { id: 'ref', title: 'Grammar Reference (p.132)', items: [
      { id: 'u1gr-ref1', page: 132, num: 'GR', type: 'reference', core: true, title: 'Present simple and Present continuous',
        html: `<ol class="gr"><li>We use the Present simple:<ul><li>to express routines and habitual or regular actions; <span class="e">She watches videos every evening. I hardly ever do sport.</span></li><li>to express preferences and opinions; <span class="e">We don’t like pop music.</span></li><li>to describe permanent conditions or states; <span class="e">I live in the city centre.</span></li><li>to state facts. <span class="e">I’ve got two brothers.</span></li></ul></li>
<li>We form the positive of the Present continuous like this: <div class="formula">subject + <b>am / are / is</b> + base form + <b>-ing</b></div><span class="e">I’m reading your email now.</span></li>
<li>We form the negative of the Present continuous like this: <div class="formula">subject + <b>am not / aren’t / isn’t</b> + base form + <b>-ing</b></div><span class="e">Callum isn’t streaming a film.</span></li>
<li>We form the question and short answers of the Present continuous like this: <div class="formula"><b>Am / Are / Is</b> + subject + base form + <b>-ing</b> + ?</div><div class="formula"><b>Yes</b>, + subject + <b>am / are / is</b>. <b>No</b>, + subject + <b>’m not / aren’t / isn’t</b>.</div><span class="e">“Are you studying at the moment?” “No, I’m not.”</span></li>
<li>We use the Present continuous:<ul><li>to express an action in progress at the moment of speaking. We often use time expressions like <i>now, at the moment</i>; <span class="e">I’m watching TV at the moment.</span></li><li>to express a temporary situation taking place in this time period, but not necessarily at this precise moment. We often use time expressions like <i>this week / month / year, these days</i>; <span class="e">John’s studying for his exams this week.</span></li></ul></li>
<li>We don’t usually use the Present continuous with stative verbs. Stative verbs describe:<ul><li>states and possession: <i>be, have got, belong, need, want</i>; <span class="e">I want some help. NOT <s>I’m wanting some help.</s></span></li><li>perception and opinion: <i>believe, know, think, understand, imagine, remember, like, love, prefer</i>; <span class="e">Do you know John? NOT <s>Are you knowing John?</s></span></li><li>senses: <i>hear, taste, sound</i>. <span class="e">This tastes good. NOT <s>This is tasting good.</s></span></li></ul></li></ol>` },
      { id: 'u1gr-ref2', page: 132, num: 'GR', type: 'reference', core: true, title: 'Question forms · Question tags',
        html: `<h5>Question forms</h5><ol class="gr"><li>We answer yes/no questions with short answers. <span class="e">“Do you like cheese?” “Yes, I do.”</span></li><li>We form wh- questions in the present simple with: <div class="formula">Question word + <b>do / does</b> + subject + verb?</div></li><li>We form wh- questions in the present continuous with: <div class="formula">Question word + <b>is / are</b> + subject + verb?</div></li><li>We use question words <i>What, Which, Who, When/What time, Where, How</i> and <i>Why</i> to ask about different types of information. <span class="e">“Where is he going?” “To school.”</span></li><li>In questions, it’s possible for <i>Who, What / Which</i> (+ noun) and <i>How many</i> (+ noun) to be the subject or the object.</li><li>When they are the object, we use the normal question form with an auxiliary verb. When they are the subject, we make the question with the positive form, without an auxiliary verb. <span class="e">How many students do you know here? How many students study here?</span></li></ol>
<h5>Question tags</h5><ol class="gr"><li>We usually put a question tag at the end of a statement. If the main verb in the statement is positive, the question tag is usually negative. If the main verb in the statement is negative, the question tag is usually positive. <span class="e">They speak English, <b>don’t they</b>? The library isn’t open today, <b>is it</b>?</span></li></ol>` }
    ]},
    { id: 'book', title: 'Grammar Practice: Form (p.133)', items: [
      { id: 'u1gr-1', page: 133, num: '1', type: 'gaps', core: true, instruction: 'Complete the paragraph with the Present simple form of the verbs in brackets.', frame: 'plain',
        paras: [['Ken has got a personal assistant – she’s amazing. He ', { a: ['talks'] }, ' (talk) to her every day, and he ', { a: ['asks'] }, ' (ask) her questions. She always ', { a: ['tells'] }, ' (tell) him the answers. She ', { a: ['wakes'] }, ' (wake) him up every morning. She ', { a: ['speaks'] }, ' (speak) quietly in a calm voice and ', { a: ['informs'] }, ' (inform) him about the weather and the traffic. He ', { a: ['does not leave'] }, ' (not leave) home without her, because as his personal digital assistant, she ', { a: ['is'] }, ' (be) part of his phone.']],
        links: [['See Workbook page 156', 'u1-wb', 'u1wb-1']] },
      { id: 'u1gr-2', page: 133, num: '2', type: 'gaps', core: true, instruction: 'Complete the dialogues with the Present simple or Present continuous form of the verbs in brackets.', numbered: true,
        paras: [['**A** Something ', { a: ['smells'] }, ' (smell) delicious! What ', { a: ['are you cooking'] }, ' (you / cook)? **B** I ', { a: ['am making'] }, ' (make) soup. Try it. ', { a: ['Do you think'] }, ' (think) it ', { a: ['tastes'] }, ' (taste) OK?'],
          ['**A** Why ', { a: ['are you using'] }, ' (you / use) Mum’s phone? **B** I ', { a: ['am showing'] }, ' (show) her how to use the maps. She ', { a: ['does not understand'] }, ' (not understand) the app.'],
          ['**A** Why ', { a: ['are we going'] }, ' (we / go) this way? **B** Because I ', { a: ['am driving'] }, ' (drive) you to your friend’s house. **A** But I ', { a: ['am going'] }, ' (go) to Tom’s house, Dad. He ', { a: ['does not live'] }, ' (not live) here!']],
        links: [['See Workbook page 156', 'u1-wb', 'u1wb-2']] },
      { id: 'u1gr-3', page: 133, num: '3', type: 'gaps', core: true, instruction: 'Choose the correct options in the quiz. Then match the questions (1–6) to the answers (A–F).',
        frame: 'quiz', frameTitle: 'INTERACTIONS QUIZ', numbered: true,
        intro: ['**A** We say: Excuse me! Is there a table?', '**B** We say: Hi! What’s up? It’s nice to see you.', '**C** We say: See you! Bye! Talk later!', '**D** We hug, kiss, shake hands, wave.', '**E** We smile and laugh.', '**F** We breathe deeply, stay very quiet, bite our lip.'],
        paras: [[{ sel: ['How', 'What'], a: 'How' }, ' do we greet friends? ', { sel: ['A', 'B', 'C', 'D', 'E', 'F'], a: 'B' }], [{ sel: ['What', 'How'], a: 'What' }, ' do we say to a waiter? ', { sel: ['A', 'B', 'C', 'D', 'E', 'F'], a: 'A' }],
          [{ sel: ['What', 'How'], a: 'How' }, ' do we say goodbye? ', { sel: ['A', 'B', 'C', 'D', 'E', 'F'], a: 'C' }], [{ sel: ['What', 'How'], a: 'How' }, ' do we show we are happy? ', { sel: ['A', 'B', 'C', 'D', 'E', 'F'], a: 'E' }],
          [{ sel: ['What', 'How'], a: 'What' }, ' do we do when someone leaves? ', { sel: ['A', 'B', 'C', 'D', 'E', 'F'], a: 'D' }], [{ sel: ['What', 'How'], a: 'How' }, ' do we hide our feelings? ', { sel: ['A', 'B', 'C', 'D', 'E', 'F'], a: 'F' }]],
        tutorNote: 'Ключ TG: 1 How, B 2 What, A 3 How, C 4 How, E 5 What, D 6 How, F.' },
      { id: 'u1gr-4', page: 133, num: '4', type: 'gaps', core: true, instruction: 'Read the sentences. Then look at the answers and complete the questions.', numbered: true,
        paras: [['The parents kiss the baby. Who ', { given: 'kisses the baby' }, '? *the parents* · Who ', { given: 'do the parents kiss' }, '? *the baby*'],
          ['Our friends send messages. What ', { a: ['do our friends send'] }, '? *messages* · Who ', { a: ['sends messages'] }, '? *our friends*'],
          ['The waiter says hello. Who ', { a: ['says hello'] }, '? *the waiter* · What ', { a: ['does the waiter say'] }, '? *hello*'],
          ['The teacher thanks the students. Who ', { a: ['does the teacher thank'] }, '? *the students* · Who ', { a: ['thanks the students'] }, '? *the teacher*']],
        links: [['See Workbook page 156', 'u1-wb', 'u1wb-5']] },
      { id: 'u1gr-5', page: 133, num: '5', type: 'gaps', core: true, instruction: 'Write the correct question tags.', numbered: true,
        paras: [['Jack is one of your classmates, ', { a: ['isn’t he'] }, '?'], ['They can’t speak English, ', { a: ['can they'] }, '?'], ['We know them, ', { a: ['don’t we'] }, '?'], ['Body language is important, ', { a: ['isn’t it'] }, '?'], ['You don’t remember me, ', { a: ['do you'] }, '?'], ['They can talk to him later, ', { a: ['can’t they'] }, '?']],
        links: [['See Workbook page 157', 'u1-wb', 'u1wb-8']] }
    ]}
  ]
};

/* ---------------- WORKBOOK · pp.156–161 ---------------- */
LESSONS['u1-wb'] = {
  id: 'u1-wb', unit: 'u1', code: 'WB', title: 'Workbook Unit 1', kicker: 'Workbook', pages: '156–161', accent: 'green', time: 'Extra Practice / homework',
  goal: 'Grammar practice: Use · Vocabulary · Reading · Review · Writing',
  sections: [
    { id: 'wb-gr', title: 'Grammar Practice: Use (pp.156–157)', items: [
      { id: 'u1wb-1', page: 156, num: '1', type: 'gaps', core: true, instruction: 'Match the questions with the correct responses.', numbered: true,
        intro: ['**A** I’m trying to find a video on my phone.', '**B** I look for someone who is kind and funny.', '**C** I’m sending her some photos from the party.', '**D** I send texts, messages, and photos.', '**E** I usually text my mum and my friends.', '**F** My friend Emma. She’s asking me about you!'],
        paras: [['What are you sending to your friend? ', { sel: ['A', 'B', 'C', 'D', 'E', 'F'], a: 'C' }], ['What do you usually send to your friend? ', { sel: ['A', 'B', 'C', 'D', 'E', 'F'], a: 'D' }], ['What are you looking for? ', { sel: ['A', 'B', 'C', 'D', 'E', 'F'], a: 'A' }],
          ['What do you look for in a friend? ', { sel: ['A', 'B', 'C', 'D', 'E', 'F'], a: 'B' }], ['Who are you texting? ', { sel: ['A', 'B', 'C', 'D', 'E', 'F'], a: 'F' }], ['Who do you text every day? ', { sel: ['A', 'B', 'C', 'D', 'E', 'F'], a: 'E' }]] },
      { id: 'u1wb-2', page: 156, num: '2', type: 'gaps', core: true, instruction: 'The words in **bold** are wrong. Write the correct words.', numbered: true,
        paras: [['He **talks** → ', { a: ['is talking'] }, ' to his sister right now.'], ['She **is phoning** → ', { a: ['phones'] }, ' her grandma every day.'], ['He **doesn’t speak** → ', { a: ['is not speaking'] }, ' English at the moment.'],
          ['Why **do** → ', { a: ['are'] }, ' you **laugh** → ', { a: ['laughing'] }, ' now?'], ['He **is never listening** → ', { a: ['never listens'] }, ' to podcasts.'], ['My brother **isn’t** → ', { a: ['does not'] }, ' often **feeling** → ', { a: ['feel'] }, ' bored.'],
          ['You really **are sounding** → ', { a: ['sound'] }, ' like your sister!'], ['I**’m meeting** → ', { a: ['meet'] }, ' my friends every weekend.']],
        tutorNote: 'Ключ TG: 1 ’s talking 2 phones 3 isn’t speaking 4 are, laughing 5 never listens 6 doesn’t, feel 7 sound 8 meet.' },
      { id: 'u1wb-3', page: 156, num: '3', type: 'inline', core: true, instruction: 'Choose the correct alternative.', frameTitle: 'Present simple / Present continuous', heading: '', meta: '',
        text: ['1 ', { o: ['Are you thinking', 'Do you think'], a: 1 }, ' I’m wrong? 2 Who ', { o: ['talks', 'is talking'], a: 1 }, '? Is that you, Billy? 3 My parents ', { o: ['don’t understand', 'aren’t understanding'], a: 0 }, ' my sense of humour! 4 Teenagers ', { o: ['know', 'are knowing'], a: 0 }, ' what is cool. 5 The teacher ', { o: ['looks', 'is looking'], a: 0 }, ' really happy today. 6 I ', { o: ['’m sending', 'send'], a: 0 }, ' you a big hug for your birthday! 7 We ', { o: ['want', 'are wanting'], a: 0 }, ' a photo of you. Smile! 8 I ', { o: ['’m remembering', 'remember'], a: 1 }, ' you from primary school! 9 These books ', { o: ['belong', 'are belonging'], a: 0 }, ' to my dad. 10 I ', { o: ['am hating', 'hate'], a: 1 }, ' cycling in the rain.'],
        links: [['See Workbook page 132', 'u1-gr', 'u1gr-ref1']] },
      { id: 'u1wb-4', page: 156, num: '4', type: 'gaps', core: true, instruction: 'Read the sentences and answer the questions. Use 1–3 words.', numbered: true,
        paras: [['*He writes emails slowly and checks them twice.* What does he write? ', { a: ['emails'] }, ' How does he write emails? ', { a: ['slowly'] }, ' How many times does he check them? ', { a: ['twice', 'two times'] }],
          ['*They check their phones for messages every hour.* What do they check every hour? ', { a: ['their phones', 'phones'] }, ' How often do they check their phones? ', { a: ['every hour'] }, ' Why do they check their phones? ', { a: ['for messages', 'to check for messages', 'to check messages'] }],
          ['*Dan’s hugging his sister because she feels sad about her mistake.* Who’s hugging his sister? ', { a: ['Dan'] }, ' Who feels sad? ', { a: ['Dan’s sister', 'his sister'] }, ' What does she feel sad about? ', { a: ['her mistake'] }],
          ['*She always makes a cake for her grandma’s birthday.* Who does she make a cake for? ', { a: ['her grandma', 'for her grandma'] }, ' What does she make for her grandma? ', { a: ['a cake'] }, ' When does she make a cake for her grandma? ', { a: ['for her birthday', 'on her birthday', 'her birthday'] }],
          ['*She isn’t talking because she’s studying.* What is she doing? ', { a: ['studying', 'she is studying'] }, ' What isn’t she doing? ', { a: ['talking'] }]] },
      { id: 'u1wb-5', page: 157, num: '5', type: 'gaps', core: true, instruction: 'Complete the questions with the correct question words.', numbered: true,
        paras: [['*People hug and kiss their friends when they meet.* ', { a: ['Who'] }, ' do people hug and kiss? *their friends* · ', { a: ['When'] }, ' do people hug and kiss their friends? *when they meet*'],
          ['*Young children laugh at cartoons because they think they are funny.* ', { a: ['What'] }, ' do young children laugh at? *cartoons* · ', { a: ['Why'] }, ' do they laugh at cartoons? *because they think they are funny*'],
          ['*My sister loves reading detective novels.* ', { a: ['What'] }, ' does your sister like reading? *detective novels* · ', { a: ['Who'] }, ' likes reading detective novels? *my sister*'],
          ['*The students celebrated the end of the exams with a barbecue.* ', { a: ['Who'] }, ' celebrated the end of the exams? *the students* · ', { a: ['How'] }, ' did they celebrate? *by having a barbecue*']] },
      { id: 'u1wb-6', page: 157, num: '6', type: 'gaps', core: true, instruction: 'Complete the questions to find out more about the statements.', numbered: true,
        paras: [['*She receives lots of emails every day.* Who ', { a: ['receives lots of emails every day', 'receives lots of emails'] }, '? How many ', { a: ['emails does she receive', 'emails does she receive every day'] }, '?'],
          ['*He answers the messages.* Who ', { a: ['answers the messages'] }, '? When ', { a: ['does he answer the messages', 'does he answer them'] }, '?'],
          ['*They are looking for a phone number.* Who ', { a: ['is looking for a phone number', 'are looking for a phone number'] }, '? What ', { a: ['phone number are they looking for', 'are they looking for'] }, '?'],
          ['*She is talking to your friend.* Who ', { a: ['is talking to my friend', 'is talking to your friend', 'is she talking to'] }, '? Which ', { a: ['friend is she talking to'] }, '?'],
          ['*These people often smile.* Who ', { a: ['often smiles', 'smiles often'] }, '? Why ', { a: ['do they often smile', 'do they smile often', 'do these people often smile'] }, '?']],
        tutorNote: 'Ключ TG: 3 “Who are looking…” — в ключе так; принимается и грамматически стандартное “Who is looking…”.' },
      { id: 'u1wb-7', page: 157, num: '7', type: 'open', core: true, instruction: 'Write questions to find out more about the statements.',
        questions: ['I’m watching something on TV.', 'She’s talking to the maths teacher.', 'They look really excited.', 'He’s waving at us.', 'The child’s pointing at something.', 'She doesn’t play basketball any more.'],
        key: ['What are you watching?', 'Why is she talking to the maths teacher?', 'Who looks really excited? / Why do they look really excited?', 'Why is he waving at us / you?', 'Why is the child pointing? / What is the child pointing at?', 'Who doesn’t play basketball any more? / Why doesn’t she play basketball any more?'],
        rows: 1, links: [['See Workbook page 132', 'u1-gr', 'u1gr-ref2']], tutorNote: 'Ответы — suggested answers (TG). Возможны другие верные вопросы.' },
      { id: 'u1wb-8', page: 157, num: '8', type: 'gaps', core: true, instruction: 'Complete the questions with the correct question tags.', numbered: true,
        paras: [['Tom is one of your oldest friends, ', { a: ['isn’t he'] }, '?'], ['You don’t know Lisa very well, ', { a: ['do you'] }, '?'], ['She plays the guitar in a band, ', { a: ['doesn’t she'] }, '?'], ['Facial expressions tell us a lot, ', { a: ['don’t they'] }, '?'], ['We can go home now, ', { a: ['can’t we'] }, '?'],
          ['You and Pete go to the same school, ', { a: ['don’t you'] }, '?'], ['It isn’t time to say goodbye yet, ', { a: ['is it'] }, '?'], ['Ken and Reiko are from Japan, ', { a: ['aren’t they'] }, '?'], ['He doesn’t remember me, ', { a: ['does he'] }, '?'], ['She isn’t listening, ', { a: ['is she'] }, '?']] },
      { id: 'u1wb-9', page: 157, num: '9', type: 'gaps', core: true, instruction: 'Write responses to the statements. Use question tags and the word in brackets.', numbered: true,
        paras: [['I really like this song. (amazing) Yes, ', { a: ['it’s amazing, isn’t it', 'it’s really amazing, isn’t it', 'it’s absolutely amazing, isn’t it'], w: 30 }, '?'], ['This exercise isn’t very easy. (hard) Yes, ', { a: ['it’s hard, isn’t it', 'it’s really hard, isn’t it'], w: 30 }, '?'],
          ['You rarely shout. (quiet) Yes, ', { a: ['I’m quiet, aren’t I', 'I’m really quiet, aren’t I'], w: 30 }, '?'], ['Your mum is a lovely person! (friendly) Yes, ', { a: ['she’s friendly, isn’t she', 'she’s really friendly, isn’t she', 'she’s very friendly, isn’t she'], w: 30 }, '?'],
          ['I don’t understand this grammar. (difficult) Yes, ', { a: ['it’s difficult, isn’t it', 'it’s really difficult, isn’t it', 'it’s very difficult, isn’t it'], w: 30 }, '?'], ['These children are laughing. (happy) Yes, ', { a: ['they’re happy, aren’t they', 'they’re really happy, aren’t they', 'they’re very happy, aren’t they'], w: 30 }, '?']],
        tutorNote: 'Ключ — suggested answers (TG). Принимаются варианты с really/very.' }
    ]},
    { id: 'wb-voc', title: 'Vocabulary (p.158)', items: [
      { id: 'u1wb-v1', page: 158, num: '1', type: 'gaps', core: true, instruction: 'Complete the sentences with words from the box.', bank: ['fountain', 'gym', 'pavement', 'shopping centre', 'square', 'youth club'], uniqueBank: true, numbered: true,
        paras: [['The ', { a: ['square'] }, ' in the middle of the town is a great place for people to hang out.'], ['Do you ever sit on the ', { a: ['pavement'] }, ' and watch people walking past?'], ['I love to sit by the ', { a: ['fountain'] }, ' in the park and watch the water.'],
          ['I want to learn a martial art so I’ve joined the ', { a: ['gym'] }, '.'], ['There are shops, cafés, and restaurants in a ', { a: ['shopping centre'] }, '.'], ['There are lots of activities for teenagers at the ', { a: ['youth club'] }, '.']] },
      { id: 'u1wb-v2', page: 158, num: '2', type: 'gaps', core: true, instruction: 'Complete the dialogues with the words below.', bank: ['gym', 'leisure centre', 'skatepark', 'youth club'], uniqueBank: true, numbered: true,
        paras: [['**A** Mum, where’s my skateboard? **B** Here it is. Are you going to the ', { a: ['skatepark'] }, '?'], ['**A** Where can we meet people of the same age? **B** There’s a ', { a: ['youth club'] }, ' in the community centre.'],
          ['**A** There’s an outdoor ', { a: ['gym'] }, ' in the park. **B** I know. I prefer gaming in the ', { a: ['leisure centre'] }, '.']] },
      { id: 'u1wb-v3', page: 158, num: '3', type: 'gaps', core: true, instruction: 'Complete the questions with one word. Then answer the questions.', frame: 'quiz', frameTitle: 'BODY LANGUAGE QUESTIONNAIRE', numbered: true,
        paras: [['Do you ', { a: ['kiss'] }, ' friends on the cheek when you meet them? ', { open: true, ph: 'your answer' }], ['Do you ', { a: ['hug'] }, ' your family and friends? ', { open: true, ph: 'your answer' }], ['Do you ', { a: ['wave'] }, ' goodbye when someone is leaving? ', { open: true, ph: 'your answer' }],
          ['Do you ', { a: ['smile'] }, ' at strangers in the street? ', { open: true, ph: 'your answer' }], ['Do you ', { a: ['point'] }, ' at a person to show who you are talking about? ', { open: true, ph: 'your answer' }], ['Do you cross your ', { a: ['arms'] }, ' when you feel unsure? ', { open: true, ph: 'your answer' }]] },
      { id: 'u1wb-v4', page: 158, num: '4', type: 'inline', core: true, instruction: 'Choose the correct alternative.', frameTitle: 'Modifying adverbs', heading: '', meta: '',
        text: ['1 A Are you tired? B Tired? I’m ', { o: ['totally', 'quite'], a: 0 }, ' exhausted! 2 A How hard is the driving test? B It’s ', { o: ['extremely', 'quite'], a: 1 }, ' hard, but lots of people pass. 3 A Did you like the film? B I loved it. It was ', { o: ['fairly', 'absolutely'], a: 1 }, ' amazing! 4 A I really want to go to the youth club! B It’s ', { o: ['absolutely', 'a bit'], a: 1 }, ' late, isn’t it? It closes in half an hour!'] },
      { id: 'u1wb-v5', page: 158, num: '5', type: 'gaps', core: true, instruction: 'Complete the second sentence with one word so that it means the same as the first. Sometimes there is more than one possible answer.', numbered: true,
        paras: [['It’s not very warm today. It’s ', { a: ['quite', 'fairly'] }, ' cold.'], ['I loved that film we saw yesterday. The film was ', { a: ['completely', 'totally', 'absolutely'] }, ' brilliant.'], ['My brother doesn’t say a lot. My brother is ', { a: ['quite'] }, ' quiet.'], ['There’s no way we can agree on this, is there? It’s ', { a: ['completely', 'totally', 'absolutely'] }, ' impossible to agree on what to do.']] },
      { id: 'u1wb-v6', page: 158, num: '6', type: 'gaps', core: true, instruction: 'Complete the dialogue with words from the box. Sometimes there is more than one possible answer.', bank: ['completely', 'extremely', 'hug', 'kiss', 'quite', 'really', 'totally'],
        paras: [['**Grace** Do you know that some gestures are ', { a: ['completely', 'totally'] }, ' different from country to country?'], ['**Jay** Yes! I think tourists need to be ', { a: ['quite', 'really', 'extremely'] }, ' careful.'],
          ['**Grace** For example, some people don’t ', { a: ['hug'] }, ' unless it’s a close friend or a family member. You also know it’s ', { a: ['quite', 'really', 'extremely'] }, ' unusual to ', { a: ['kiss'] }, ' someone on the cheek in many countries.'],
          ['**Jay** Yes, I think it’s ', { a: ['really'] }, ' important to know when to shake hands, kiss or hug, otherwise you might make a mistake and feel ', { a: ['completely', 'totally', 'extremely', 'really'] }, ' embarrassed!']] }
    ]},
    { id: 'wb-read', title: 'Reading (p.159)', items: [
      { id: 'u1wb-r1', page: 159, num: '1', tags: ['READ'], type: 'gaps', core: true,
        boxes: [{ title: 'GESTURES — first paragraph', html: '<p>We use gestures every day, often without noticing. But what exactly are they? According to the Concise Oxford Dictionary, in the past “gesture” referred to “a significant movement of limb or body”. This definition, including the way a person stands or moves, was the original meaning of the word. Today, however, it means something different. It refers to the movement of the head (including facial expressions) or of the arms and hands.</p>' }],
        instruction: 'READ the first paragraph of the article. Complete the sentence.',
        paras: [['In the past, “gesture” referred to the whole ', { a: ['body'] }, ', but today it refers to the head, ', { a: ['face', 'facial expressions'] }, ', ', { a: ['arms'] }, ', and ', { a: ['hands'] }, '.']] },
      { id: 'u1wb-r2', page: 159, num: '2', tags: ['READ', 'LISTEN'], type: 'mcq', core: true, audio: { track: '131', file: 'audio/131.mp3', transcript: T_131 },
        instruction: 'READ and LISTEN. Choose the best summary of the article.', questions: [{ q: 'The best summary:', options: ['A Gestures are sometimes confusing.', 'B It is important to use gestures.', 'C People use gestures in many different ways.'], a: 2 }] },
      { id: 'u1wb-r3', page: 159, num: '3', tags: ['OTE', 'P', 'I'], type: 'gaps', core: true,
        instruction: 'Parts of the article have been removed. Choose the correct part (A–G) for each gap (1–4). There are two extra parts that you should not use. The first one (0) has been done for you.',
        intro: ['**A** The way someone walks is a good example.', '**B** It seems they are two parts of a single process.', '**C** There are different types of gestures.', '**D** His book *Bodytalk: A World Guide to Gesture* appeared in 1994.', '**E** This is a gesture that we intend to make.', '**F** These are called “autonomous” gestures.', '**G** Some people never use gestures.'],
        frame: 'plain', heading: 'GESTURES', source: 'Adapted from The Oxford Companion to the Body by Colin Blakemore and Sheila Jennett', noNums: true,
        paras: [['We use gestures every day, often without noticing. But what exactly are they? According to the Concise Oxford Dictionary, in the past “gesture” referred to “a significant movement of limb or body”. This definition, including the way a person stands or moves, was the original meaning of the word. Today, however, it means something different. It refers to the movement of the head (including facial expressions) or of the arms and hands.'],
          ['⁰ ', { given: 'C' }, ' A gesture may be something we don’t know that we are doing. This includes going red in the face, playing with one’s hair, etc. Another type is the deliberate gesture. ¹ ', { sel: ['A', 'B', 'D', 'E', 'F', 'G'], a: 'E' }, ' This type includes nodding, waving, etc.'],
          ['We use many gestures instead of spoken words. ² ', { sel: ['A', 'B', 'D', 'E', 'F', 'G'], a: 'F' }, ' Sign languages of deaf people and other communities are special examples of autonomous gestures. The scientist Desmond Morris wrote about these gestures. ³ ', { sel: ['A', 'B', 'D', 'E', 'F', 'G'], a: 'D' }],
          ['Since the 1970s, most research has focused on gestures that we use at the same time as speech (“gesticulation”). ⁴ ', { sel: ['A', 'B', 'D', 'E', 'F', 'G'], a: 'B' }, ' An interesting example of this is when speakers use their hands to beat time to the rhythm of the words. You can see this when a politician makes a speech, but we all do it.']] },
      { id: 'u1wb-rvp', page: 159, num: 'VP', tags: ['VIEWPOINTS'], type: 'discuss', core: true,
        instruction: 'Do you “talk with your hands”? Is it easier to communicate with or without gestures? Watch a video of people talking with the sound off. How much can you understand from the body language of the people talking?',
        prompts: ['Do you “talk with your hands”?', 'Is it easier to communicate with or without gestures?', 'Video with the sound off — what did you understand?'] }
    ]},
    { id: 'wb-review', title: 'Review & Writing (pp.160–161)', items: [
      { id: 'u1wb-rv1', page: 160, num: '1', tags: ['P', 'CITIZENSHIP'], type: 'gaps', core: true,
        instruction: 'For each question, write the correct answer. Write one word for each gap.', frame: 'plain', heading: 'Projekts MCR – the place for young skateboarders.',
        paras: [['', { a: ['What'] }, ' is Projekts MCR?'], ['It’s a fantastic skatepark and community group ', { a: ['in'] }, ' Manchester. Borrow one of our skateboards, or bring your own, and get ready to learn some cool new skills!'],
          ['', { a: ['Where'] }, ' in Manchester is Projekts MCR?'], ['We are in central Manchester close to the big shopping ', { a: ['centre', 'centres'] }, '.'], ['', { a: ['Who'] }, ' can come to Projekts MCR?'],
          ['Anyone and everyone! All ages and abilities are welcome! Prices start at £3 and we ', { a: ['have'] }, ' a range of facilities on offer. We feel it’s important to reach all parts of our community and we ', { a: ['want'] }, ' more girls to start skateboarding here! Our special classes for women and girls are very popular. The students are really ', { a: ['enjoying', 'loving'] }, ' the classes at the moment. It’s a brilliant place to meet people and have fun.']] },
      { id: 'u1wb-rv2', page: 160, num: '2', tags: ['LISTEN'], type: 'listen', core: true, audio: { track: '132', file: 'audio/132.mp3', transcript: T_132 },
        instruction: 'LISTEN to the first part of the podcast. What is the topic?',
        inner: { type: 'mcq', questions: [{ q: 'The topic:', options: ['A How to make friends', 'B Friends and family', 'C The importance of friends'], a: 2 }] } },
      { id: 'u1wb-rv3', page: 160, num: '3', tags: ['OTE', 'P', 'I', 'LISTEN'], type: 'listen', core: true, audio: { track: '133', file: 'audio/133.mp3', transcript: T_133 },
        instruction: 'LISTEN to the whole podcast. Choose the correct options.',
        inner: { type: 'mcq', questions: [
          { q: '1 Dr Wong says that a friend…', options: ['A is like a psychologist.', 'B is not a friend forever.', 'C is helpful and sympathetic.'], a: 2 },
          { q: '2 Dr Wong describes true friendship as…', options: ['A positive.', 'B rare.', 'C difficult.'], a: 0 },
          { q: '3 Dr Wong says we choose friends who are…', options: ['A exactly the same as us.', 'B similar to us.', 'C different from us.'], a: 1 },
          { q: '4 One study of friends showed that true friends…', options: ['A share their friends’ happy feelings.', 'B feel angry when their friends are afraid.', 'C share their friends’ anger and fear.'], a: 2 },
          { q: '5 According to one study, how many real friends does a person with 40 friends have?', options: ['A about 20', 'B about 40', 'C about 30'], a: 0 }] } },
      { id: 'u1wb-rv4', page: 160, num: '4', tags: ['LISTEN'], type: 'reference', core: true, audio: { track: '134', file: 'audio/134.mp3', transcript: T_133 },
        instruction: 'LISTEN to the podcast again. Check your answers to Ex. 3.', html: '<p class="muted">Прослушайте ещё раз и сверьте ответы упр. 3 (кнопка Check Answers в упр. 3).</p>', links: [['Ex. 3', 'u1-wb', 'u1wb-rv3']], doneLabel: 'Checked ✓' },
      { id: 'u1wb-rv5', page: 160, num: '5', type: 'gaps', core: true, instruction: 'Match the words from the podcast (1–4) to their meanings (A–D).', numbered: true,
        intro: ['**A** real; not false', '**B** the length of time that somebody lives', '**C** approximately but not exactly', '**D** the organ inside our head that controls how we move, think, and feel'],
        paras: [['lifetime (n) ', { sel: ['A', 'B', 'C', 'D'], a: 'B' }], ['brain (n) ', { sel: ['A', 'B', 'C', 'D'], a: 'D' }], ['genuine (adj) ', { sel: ['A', 'B', 'C', 'D'], a: 'A' }], ['roughly (adv) ', { sel: ['A', 'B', 'C', 'D'], a: 'C' }]] },
      { id: 'u1wb-rv6', page: 160, num: 'M', tags: ['MEDIATION'], type: 'open', core: true,
        instruction: 'Translate the dialogue from Italian into English.',
        adapted: 'В рабочей тетради — перевод с итальянского. Для русскоязычного ученика ниже дан тот же диалог по-русски (перевод преподавателя); переводите с него.',
        boxes: [{ title: 'Original (Italian)', html: '<p><b>A</b> Cosa fate quando incontrate gli amici?</p><p><b>B</b> Di solito li baciamo sulle guance e a volte li abbracciamo.</p><p><b>A</b> Ma dai! Nella mia cultura è completamente diverso. Abbracciamo e baciamo solo i parenti stretti. Siamo molto amichevoli. Sorridiamo e diciamo “Ciao” alle persone, ma non gli facciamo domande personali. È davvero scortese!</p>' },
          { title: 'По-русски (для ученика)', html: '<p><b>A</b> Что вы делаете, когда встречаете друзей?</p><p><b>B</b> Обычно мы целуем их в щёки, а иногда обнимаем.</p><p><b>A</b> Да ладно! В моей культуре всё совсем по-другому. Мы обнимаем и целуем только близких родственников. Мы очень дружелюбные. Мы улыбаемся и говорим людям «Привет», но не задаём им личных вопросов. Это очень невежливо!</p>' }],
        questions: ['A', 'B', 'A'], rows: 2,
        key: ['What do you do when you meet friends?', 'We usually kiss them on the cheeks and sometimes we hug them.', 'Really? In my culture it’s completely different. We only hug and kiss close relatives. We’re very friendly. We smile and say “Hi” to people, but we don’t ask them personal questions. It’s really rude!'],
        tutorNote: 'Ключ — образец перевода преподавателя (TG: Students’ own answers). Хорошая возможность повторить completely, really, hug, kiss.' },
      { id: 'u1wb-rv7', page: 161, num: 'VP', tags: ['VIEWPOINTS'], type: 'discuss', core: true, instruction: 'Which do you enjoy more: family celebrations or celebrations with friends?', prompts: ['Family celebrations or celebrations with friends? Why?'] },
      { id: 'u1wb-rv8', page: 161, num: '6', type: 'open', core: true,
        boxes: [{ title: 'FROM: Jackie', kind: 'mail-box', html: '<div class="mail"><p>Hi!</p><p>You know how we always have a big party in the summer? Well, I’m writing to invite you to come. I know you have lots of plans for the summer, so I’m hoping you will be free on the first weekend of July.</p><p class="note"><b><i>Sounds great…</i></b></p><p>I know it’s a long way, but you can catch a fast train. Do you want me to reserve tickets for you?</p><p class="note"><b><i>Thank her and say yes…</i></b></p><p>The party is at our house by the beach. Everyone just loves beach barbecues and early morning swims. What else do you like? What about music and food?</p><p class="note"><b><i>Suggest music and food…</i></b></p><p>Let’s chat soon!</p><p>Jackie</p></div>' }],
        instruction: 'Read the first email and answer the questions.', questions: ['What event is Jackie inviting you to?', 'When is the event?', 'What does the writer offer to do?'], rows: 1,
        key: ['a party', 'the first weekend of July', 'reserve train tickets'] },
      { id: 'u1wb-rv9', page: 161, num: '7', type: 'open', core: true,
        boxes: [{ title: 'FROM: Kay', kind: 'mail-box', html: '<div class="mail"><p>Hi Jackie,</p><p>Thanks for your email. I hope you’re well.</p><p>I know about the summer party, and I’d absolutely love to come. It sounds great! I haven’t got any plans for the first weekend of July.</p><p>Thank you very much for the kind offer. You’re absolutely right; the train is a great idea. Please reserve tickets for the day before the party.</p><p>I really love beach barbecues. How about some fresh fish? It’s really delicious! I love loud music!</p><p>We’re both really excited!</p><p>See you soon,</p><p>Kay</p></div>' }],
        instruction: 'Read the second email. Does the writer answer all the points from the first email?', questions: ['Your answer:'], rows: 2,
        key: ['Kay answers all the points from Jackie’s email except “What else do you like?”'] },
      { id: 'u1wb-rv10', page: 161, num: '8', type: 'scores', core: true, instruction: 'Score the second email for each point below. Give scores from 0 (not successful) to 10 (successful).',
        box: 'WRITING ANALYSIS', items: ['The email answers the questions clearly and completely.', 'The email has a general opening sentence and a general closing sentence.', 'The email uses grammar and vocabulary from the unit.', 'Sentences are complete and have correct punctuation.', 'The email is the correct length (80–130 words).'] },
      { id: 'u1wb-rv11', page: 161, num: '9', tags: ['OTE', 'WRITE'], type: 'writing', core: true,
        instruction: 'WRITE a response to Jackie’s email in Ex. 6. Accept the invitation. In your response, be sure to:', bullets: ['say you can come to the party', 'ask her to reserve train tickets', 'suggest music and food'], task: 'Write 80–130 words.', min: 80, max: 130, links: [['Jackie’s email — Ex. 6', 'u1-wb', 'u1wb-rv8']] },
      { id: 'u1wb-rv12', page: 161, num: '10', type: 'scores', core: true, instruction: 'Use the checklist from Ex. 8 to score your email. Then improve your email.',
        box: 'MY EMAIL', items: ['The email answers the questions clearly and completely.', 'The email has a general opening sentence and a general closing sentence.', 'The email uses grammar and vocabulary from the unit.', 'Sentences are complete and have correct punctuation.', 'The email is the correct length (80–130 words).'], links: [['My email — Ex. 9', 'u1-wb', 'u1wb-rv11']] },
      { id: 'u1wb-sa', page: 161, num: 'SA', tags: ['SELF-ASSESSMENT'], type: 'discuss', core: true, instruction: 'Look back at the unit.',
        prompts: ['What was the most interesting part?', 'What was easy?', 'What was difficult?', 'What do I need to look at again?'] }
    ]}
  ]
};
