/* =========================================================
   OPTIMISE STARS B1 · UNIT 1 “How we live” (Student’s Book pp. 10–19)
   + Grammar reference pp. 137–138 · Vocabulary reference pp. 150–151
   + Writing reference p. 159 · Speaking reference p. 164
   Ключи: Teacher’s Book, Unit 1 pp. 22–31 (keySrc:'tb' / 'tb-sug').
   keySrc:'own' — подготовлено для платформы; 'free' — «Students’ own answers»;
   'none' — ответ зависит от видео, которого нет в материалах.
   Аудио: audio/u1/1.01–1.06.mp3 (присланные файлы OPT2E_SB_B1_TRACK_1_01…06, сверены по содержанию).
   ========================================================= */
(function () {
  const IMG = 'assets/book/';
  const AU = (t, label) => ({ track: t, file: 'audio/u1/' + t + '.mp3', label });

  const G = n => '<span class="gapno">(' + n + ') ________</span>';
  const TXT_TINY = `<p>People need homes. But sometimes it’s difficult to find one and they can be very expensive. The solution? Tiny homes. So, what exactly are they? Tiny homes are very small living spaces. ${G(1)} Many people also transform <mark>vans</mark> into tiny mobile homes so that they can travel around in them. There are a lot of social media sites about travelling in a tiny home. So how did this trend begin?</p>
<p>In the 1990s, an American man called Jay Shafer was thinking about building a new home when he had an interesting idea. ${G(2)} When he first moved into his unusual new home in 1999, he began to receive a lot of attention. Everybody wanted to interview him about it. ${G(3)} As a result, the idea <mark>took off</mark>.</p>
<p>Today, there are thousands of tiny homes in the United States. They are cheaper to buy, but they are also better for the environment than regular flats and houses. Many of the houses have green energy <mark>features</mark>, such as solar panels, and they use less energy to run. People can live simpler lives away from the stresses of modern living. What’s more, with a mobile tiny home, you can even take your house with you on holiday! ${G(4)} Many people enjoy this travelling lifestyle.</p>
<p>But are tiny homes comfortable? The answer is yes. Most of the homes have all the <mark>facilities</mark> you need, including hot water, kitchen equipment, electricity or gas and the latest smart technology. ${G(5)} Tiny homes are fun and convenient places to live. There’s no doubt the trend is going to continue.</p>
<p>Small really is beautiful!</p>`;
  const OPTS_TINY = ['A They saw living in a tiny home as a way to solve these problems.', 'B Their lives changed as soon as they moved.', 'C They come in different shapes and styles, including huts and cabins.', 'D To experience living more simply, he decided to build a tiny house on wheels.', 'E He realised living in a tiny home had many problems.', 'F Many also have separate rooms and come in all kinds of interesting and stylish designs.', 'G These ideas became more and more popular in Europe.', 'H It’s easy to move from place to place.'];
  const S = (n, a) => ({ sel: OPTS_TINY, a: OPTS_TINY[a], ph: '(' + n + ') choose A–H…', n });

  const TXT_ARTICLE = `<p><span class="gapno">__________</span>? Is it the people, the buildings, or something else? My neighbourhood is very friendly, and I think I know why.</p>
<p>First of all, you need to have good relationships with your neighbours. You can’t do that if people move house a lot. Some families in my area have been there for 70 years!</p>
<p>I also think you need somewhere people can meet. This might be a square, a café or a local shop. In our local square, everyone shares their news. It’s a great place to be on summer evenings.</p>
<p>So, if you want a friendly neighbourhood, make friends with your neighbours!</p>`;
  const TASK_1 = '<div class="examtask"><div class="et-h">Articles wanted!</div><p><b>WHAT MAKES YOUR NEIGHBOURHOOD A GREAT PLACE TO LIVE?</b></p><p>Write an article telling us where you live and why you like living there.</p><p>Do you have a good relationship with your neighbours? Why / Why not?</p><p>Do you have a special place where you can meet?</p><p>The best articles will be published next month.</p></div>';
  const TASK_2 = '<div class="examtask"><div class="et-h">Articles wanted!</div><p><b>WHAT DO YOU LIKE ABOUT YOUR HOME?</b></p><p>Write an article telling us what you like best about your home.</p><p>What do you think makes a house a home?</p><p>The best articles will be published next month.</p></div>';

  const BOX = {
    refWords: { title: 'EXAM SKILL · Understanding reference words', kind: 'exam', html: '<ul><li>Reference words are words that refer to people, objects or ideas already mentioned in a text.</li><li>Reference words include pronouns, e.g. <i>he, they, it, this, those</i>; determiners, e.g. <i>this, those</i>; adverbs, e.g. <i>here, there</i>; and relative pronouns, e.g. <i>that, which, who</i>.</li><li>Identifying reference words and understanding what they refer to can help you understand the order of a text.</li></ul>' },
    gapped: { title: 'OPTIMISE your exam · Gapped text', kind: 'optimise', html: '<ul><li>First, read the text quickly to get a general idea of what it’s about. Ignore the gaps.</li><li>Then carefully re-read the sentences in the text before and after each gap. Pay attention to the vocabulary, tenses and reference words.</li><li>Look at the removed sentences and, for each one, decide if it logically fits in each gap.</li><li>Check that the meaning, vocabulary, tenses and reference words in the removed sentences make sense in the gap.</li></ul>' },
    remG1: { title: 'Remember', kind: 'remember', after: true, html: '<ul><li>Use the <b>past simple</b> for actions, habits and facts in the past.<br><i>I went to the park last Saturday.</i></li><li>Use the <b>past continuous</b> for actions in progress and for temporary and changing situations in the past.<br><i>Before I met you, I was living in France.</i></li><li>In a story, use the <b>past continuous</b> for background information and the <b>past simple</b> for the main events.<br><i>The sun was shining and the birds were singing. I left my house.</i></li><li>When an action in the past is interrupted by another action, use the <b>past continuous</b> for the first action and the <b>past simple</b> for the second action.<br><i>I was watching TV when my friend phoned me.</i></li></ul><p class="small">See Grammar reference, Unit 1, page 137</p>' },
    predict: { title: 'EXAM SKILL · Predicting', kind: 'exam', html: '<ul><li>Before you listen, use any information, questions or pictures related to the listening to predict what you might hear.</li><li>If you know the topic of the listening, think about what words and information you might hear.</li></ul>' },
    mc3: { title: 'OPTIMISE your exam · 3-option multiple choice | Interview', kind: 'optimise', html: '<ul><li>Remember that the questions are in the same order as the answers that you will hear.</li><li>If you don’t hear an answer, don’t stop at that question. Move quickly onto the next one, or you’ll miss the answer to that one, too. You’ll hear the listening task again, so don’t worry if you miss an answer the first time.</li></ul>' },
    remG2: { title: 'Remember', kind: 'remember', after: true, html: '<ul><li>Use <i>used to</i> and <i>would</i> for habits in the past.<br><i>When I was young, I <b>used to / would</b> tidy up my room every day.</i></li><li>Use <i>used to</i> for states in the past.<br><i>I <b>used to</b> like living here, but now I don’t.</i></li><li>For negative statements, use <i>never used to</i> or <i>didn’t use to</i>.<br><i>There <b>never used to / didn’t use to</b> be houses around here.</i></li><li>For questions with <i>used to</i>, use <i>did … use to …?</i><br><i><b>Did</b> they <b>use to</b> live next door to you?</i></li></ul><p class="small">See Grammar reference, Unit 1, page 137</p>' },
    phrase: { title: 'Phrase expert', kind: 'phr', html: '<p>on the left | on the right | at the top<br>at the bottom | in the foreground<br>in the background | to the left/right of the …<br>above/below the … | near the …<br>behind/in front of the …</p>' },
    where: { title: 'EXAM SKILL · Saying where things are', kind: 'exam', html: '<ul><li>When you describe a photo, use expressions like <i>on the left/right</i> and <i>at the top/bottom of the photo</i> to say where things are. Make sure you use the correct prepositions.</li><li>To talk about objects at the front of the photo, use <i>in the foreground</i>. To talk about objects at the back of the photo, use <i>in the background</i>.</li></ul>' },
    photos: { title: 'OPTIMISE your exam · Extended turn | Photos', kind: 'optimise', html: '<ul><li>First, describe the main topic of the photo.<br><i>This is a photo of a girl in her room. She is sitting at a desk.</i></li><li>Then describe other details in the photo.<br><i>There are some bookshelves in the background. There’s a football in the foreground.</i></li></ul>' },
    result: { title: 'EXAM SKILL · Result clauses', kind: 'exam', html: '<ul><li><i>So, such</i> and <i>such a</i> are often followed by a <i>that</i> clause which explains the result.<br><i>The weather is <b>so</b> bad <b>that</b> they closed the motorway.<br>It’s <b>such</b> bad weather <b>that</b> we can’t go out.<br>Tom’s got <b>such a</b> loud voice <b>that</b> I can hear him from here!</i></li><li>We use <i>too</i> + adjective to say there is more of something than is necessary.<br><i>It’s <b>too dark</b> to go out tonight.</i></li><li>We use <i>not</i> + adjective + <i>enough</i> to say there is less of something than is necessary.<br><i>Jo <b>isn’t old enough</b> to drive.</i></li></ul>' },
    cloze4: { title: 'OPTIMISE your exam · 4-option multiple-choice cloze', kind: 'optimise', html: '<ul><li>First, quickly read the whole text to get a general idea of what it’s about.</li><li>Then look at the options and choose the answers for the gaps you’re sure about.</li><li>Finally, go back to the gaps you’re not sure about. If you don’t know the answer, guess. Don’t leave any gaps blank.</li></ul>' },
    style: { title: 'EXAM SKILL · Using the right style', kind: 'exam', html: '<ul><li>When you write an article, use a style that’s appropriate for the reader and for the topic.</li><li>Decide whether you need to be formal or informal. For informal articles you can use contractions, exclamation marks, personal examples and a more conversational, chatty style.</li><li>Choose an interesting title and start your article with a question to get the reader’s attention, e.g. <i>What makes a house a home?</i></li></ul>' },
    article: { title: 'OPTIMISE your exam · An article', kind: 'optimise', html: '<ul><li>An exam task sometimes asks you to write an article about something that you like or find interesting. Choose a topic that will give you plenty of ideas to write about.</li><li>For each idea, give reasons for your choice.</li></ul>' }
  };

  /* ---------------- 1.1 Reading (pp. 10–11) ---------------- */
  LESSONS['u1-1'] = {
    id: 'u1-1', unit: 'u1', code: '1.1', title: 'Small is beautiful!', kicker: 'Reading · Gapped text', pages: '10–11', accent: 'blue',
    goal: 'Understand reference words. Do a gapped-text exam task about tiny homes.',
    wb: ['Workbook Unit 1: Reading, pages 4–5'],
    sections: [
      { id: 'book', title: 'Reading · Gapped text | An article', items: [
        { id: 'u11-1', page: 10, num: '1', tags: ['VIDEO'], type: 'open', free: true, keySrc: 'tb', video: { title: 'Living in a van (Hannah)' },
          instruction: 'Watch the video and make a list of the important things Hannah has in her van.',
          questions: ['Things in Hannah’s van:'], rows: 3,
          sample: { src: 'tb', html: '<p>heat / a fire, water, a cooker, a (plant) shelf, a table, a shoe rack, a shelf. Other items we see include: a bed, curtains, a cupboard, a kettle, a sink, plants.</p>' } },
        { id: 'u11-2', page: 10, num: '2', tags: ['VIDEO'], type: 'open', free: true, keySrc: 'tb-sug', video: { title: 'Living in a van (Hannah)' },
          instruction: 'Watch again and answer the questions.',
          questions: ['1 Why does Hannah choose to live in a van?', '2 What does Hannah like about living in the van?', '3 What would you like and dislike about living in a van?'],
          sample: { src: 'tb', html: '<p>1 She’s a student and she didn’t want to pay expensive rent in the city.<br>2 Suggested answers: It’s comfortable and liveable; she has heat, water and is able to cook food; she likes her furniture and especially her plant shelf.<br>3 Students’ own answers.</p>' } },
        { id: 'u11-3', page: 10, num: '3', tags: ['SPEAK'], type: 'discuss', keySrc: 'free',
          instruction: 'In pairs or groups, look at the three photos at the top of page 11 and discuss the questions.',
          figs: [{ src: IMG + 'u1-tiny3.webp', alt: 'Three tiny homes: a small wooden house with a deck, a camper van and a wooden tiny house on wheels', w: 1400, h: 233, wide: true }],
          prompts: ['1 What do the homes have in common?', '2 What do you think are the advantages and disadvantages of living in homes like these?', '3 Which home would you most like to live in? Why?'] },
        { id: 'u11-4', page: 10, num: '4', tags: ['READ'], type: 'multi', keySrc: 'tb',
          instruction: 'Read the text quickly and choose the topics that are mentioned.',
          article: { title: 'Small is beautiful!', html: TXT_TINY },
          options: ['1 saving money', '2 the reasons why tiny homes became popular', '3 the environment', '4 the advantages of tiny homes', '5 the disadvantages of tiny homes', '6 the type of people who live in tiny homes'], answers: [0, 1, 2, 3],
          hint: 'Read quickly — about three minutes. Ignore the gaps.' },
        { id: 'u11-5a', page: 10, num: '5', title: 'Part 1 · Reference words', tags: ['READ', 'EXAM'], type: 'tapfind', keySrc: 'tb',
          instruction: 'Read the sentences before and after gap 1 in the text and look at the sentences (a–c). Identify the reference words in the sentences.',
          boxes: [BOX.refWords],
          adapted: 'Нажми на слово-«ссылку» в каждом предложении a–c.',
          paras: [{ t: 'a This is what people like best about being in a small house.' }, { t: 'b They come in different shapes and styles, including huts and cabins.' }, { t: 'c There are several reasons why it is a popular way to live.' }],
          targets: [{ t: 'This', p: 0 }, { t: 'They', p: 1 }, { t: 'it', p: 2 }],
          explanation: 'Teacher’s Book: Reference words: a This b They c it.' },
        { id: 'u11-5b', page: 10, num: '5', title: 'Part 2 · Which sentence fills gap 1?', tags: ['READ', 'EXAM'], type: 'mcq', keySrc: 'tb',
          instruction: 'Then decide which sentence fills the gap.',
          figs: [{ src: IMG + 'u1-huts.webp', alt: 'Three small colourful huts on stilts by a lake', w: 800, h: 346, small: true }],
          articleRef: { title: 'Small is beautiful! — paragraph 1', html: TXT_TINY.split('</p>')[0] + '</p>' },
          questions: [{ q: 'Gap 1: *Tiny homes are very small living spaces. (1) ___ Many people also transform vans into tiny mobile homes…*', options: ['a This is what people like best about being in a small house.', 'b They come in different shapes and styles, including huts and cabins.', 'c There are several reasons why it is a popular way to live.'], a: 1 }],
          hint: 'What does “They” refer to? Look at the plural noun just before the gap.',
          explanation: 'Teacher’s Book: Sentence b fills gap 1 (They = tiny homes).' },
        { id: 'u11-6', page: 11, num: '6', tags: ['READ', 'LISTEN', 'EXAM'], type: 'gaps', audio: AU('1.01', 'Small is beautiful!'), keySrc: 'tb',
          instruction: 'Read the text. Five sentences have been removed. For each question, choose the correct answer. There are three extra sentences which you do not need to use.',
          boxes: [BOX.gapped, { title: 'Removed sentences A–H', kind: 'opts', html: '<ol class="abc"><li><b>A</b> They saw living in a tiny home as a way to solve these problems.</li><li><b>B</b> Their lives changed as soon as they moved.</li><li><b>C</b> They come in different shapes and styles, including <mark>huts</mark> and cabins.</li><li><b>D</b> To experience living more simply, he decided to build a tiny house on wheels.</li><li><b>E</b> He realised living in a tiny home had many problems.</li><li><b>F</b> Many also have separate rooms and come in all kinds of interesting and stylish designs.</li><li><b>G</b> These ideas became more and more popular in Europe.</li><li><b>H</b> It’s easy to move from place to place.</li></ol>' }],
          frame: 'plain', heading: 'Small is beautiful!', noNums: true,
          paras: [['People need homes. But sometimes it’s difficult to find one and they can be very expensive. The solution? Tiny homes. So, what exactly are they? Tiny homes are very small living spaces. ', S(1, 2), ' Many people also transform ==vans== into tiny mobile homes so that they can travel around in them. There are a lot of social media sites about travelling in a tiny home. So how did this trend begin?'],
            ['In the 1990s, an American man called Jay Shafer was thinking about building a new home when he had an interesting idea. ', S(2, 3), ' When he first moved into his unusual new home in 1999, he began to receive a lot of attention. Everybody wanted to interview him about it. ', S(3, 0), ' As a result, the idea ==took off==.'],
            ['Today, there are thousands of tiny homes in the United States. They are cheaper to buy, but they are also better for the environment than regular flats and houses. Many of the houses have green energy ==features==, such as solar panels, and they use less energy to run. People can live simpler lives away from the stresses of modern living. What’s more, with a mobile tiny home, you can even take your house with you on holiday! ', S(4, 7), ' Many people enjoy this travelling lifestyle.'],
            ['But are tiny homes comfortable? The answer is yes. Most of the homes have all the ==facilities== you need, including hot water, kitchen equipment, electricity or gas and the latest smart technology. ', S(5, 5), ' Tiny homes are fun and convenient places to live. There’s no doubt the trend is going to continue.'],
            ['Small really is beautiful!']],
          hint: 'Gap 3: “these problems” — which problems? Gap 4: the sentence after the gap talks about a travelling lifestyle.',
          tutorNote: 'Teacher’s Book: можно сначала дать прослушать и прочитать текст (1.01), затем выполнить задание. Попросите ученика назвать слова-подсказки в тексте для каждого ответа.' },
        { id: 'u11-7', page: 11, num: '7', tags: ['VOCABULARY'], type: 'gaps', keySrc: 'tb', numbered: true,
          instruction: 'Write a highlighted word or phrase from the text to match each definition.',
          articleRef: { title: 'Small is beautiful! (highlighted words)', html: TXT_TINY + '<p class="small">Also highlighted: sentence C — <mark>huts</mark> and cabins.</p>' },
          paras: [['small, simple wooden buildings — ', { a: ['huts'] }], ['parts or aspects of something — ', { a: ['features'] }], ['road vehicles used for carrying goods — ', { a: ['vans'] }],
            ['became successful or popular very fast — ', { a: ['took off'] }], ['equipment and services — ', { a: ['facilities'] }]],
          hint: 'Highlighted words: vans, took off, features, facilities — and huts in sentence C.' },
        { id: 'u11-me', page: 11, num: 'Me', tags: ['ME', 'SPEAK'], type: 'discuss', keySrc: 'free',
          instruction: 'Imagine your ideal tiny home on wheels. Answer the questions, then tell a partner.',
          figs: [{ src: IMG + 'u1-tiny-inside.webp', alt: 'Inside a tiny home: a bed on a loft above a small kitchen', w: 800, h: 481, small: true }],
          prompts: ['What does it look like on the outside?', 'What is it like inside?', 'Where are you planning to travel?', 'What are the best and worst things about your home?'] }
      ]}
    ]
  };

  /* ---------------- 1.2 Grammar 1 (p. 12) ---------------- */
  LESSONS['u1-2'] = {
    id: 'u1-2', unit: 'u1', code: '1.2', title: 'Past simple and past continuous', kicker: 'Grammar 1', pages: '12', accent: 'yellow',
    goal: 'Use the past simple and the past continuous: main events, background, interrupted actions.',
    wb: ['Workbook Unit 1: Grammar 1, page 6', 'Digital practice'],
    sections: [
      { id: 'book', title: 'Grammar 1 · Past simple and past continuous', items: [
        { id: 'u12-gic', page: 12, num: 'GiC', title: 'Grammar in context', tags: ['GRAMMAR'], type: 'mcq', keySrc: 'tb',
          instruction: 'Choose the correct words (a–d) to complete the sentence. Then find the sentence in the reading text on page 11 and check your answer.',
          questions: [{ q: 'Jay Shafer ______ about building a new home when he ______ an interesting idea.', options: ['a) thought, has had', 'b) was thinking, was having', 'c) thought, was having', 'd) was thinking, had'], a: 3 }],
          explanation: 'Teacher’s Book: d — the action of thinking was interrupted by the action of having an idea.',
          boxes: [BOX.remG1] },
        { id: 'u12-1', page: 12, num: '1', tags: ['GRAMMAR'], type: 'inline', keySrc: 'tb',
          instruction: 'Choose the correct word or phrase.',
          lines: [['Last week, I ', { o: ['visited', 'was visiting'], a: 0 }, ' Sam’s house.'],
            ['I ', { o: ['walked', 'was walking'], a: 1 }, ' to school yesterday when I tripped and fell.'],
            ['As a child, I ', { o: ['didn’t like', 'wasn’t liking'], a: 0 }, ' eating vegetables.'],
            ['Last year, we ', { o: ['invited', 'were inviting'], a: 0 }, ' the whole class to our birthday party.'],
            ['While I was on holiday recently, I ', { o: ['was swimming', 'swam'], a: 1 }, ' in the sea every day.'],
            ['It ', { o: ['was raining', 'rained'], a: 0 }, ' when I left the house this morning.']],
          hint: 'like is a stative verb. every day = a repeated action → past simple. An interrupted action → past continuous.' },
        { id: 'u12-2', page: 12, num: '2', tags: ['WRITE', 'SPEAK'], type: 'open', free: true, keySrc: 'free',
          instruction: 'Rewrite the sentences in Exercise 1 so they are true for you. Then compare your sentences with a partner.',
          questions: ['1 Last week, I …', '2 … yesterday when …', '3 As a child, I …', '4 Last year, we …', '5 While I was on holiday …', '6 It was … when I left the house this morning.'] },
        { id: 'u12-3', page: 12, num: '3', tags: ['GRAMMAR'], type: 'order', keySrc: 'tb', noAns: true, ph: 'Write the sentence…',
          instruction: 'Use the prompts to write sentences about what each person was doing when something else happened.',
          items: [{ cue: 'she / putting up a poster / the phone / ring', img: IMG + 'u1-pic1.webp', a: ['She was putting up a poster when the phone rang.'] },
            { cue: 'they / play a video game / the lights / suddenly / go off', img: IMG + 'u1-pic2.webp', a: ['They were playing a video game when the lights suddenly went off.', 'They were playing a video game when suddenly the lights went off.'] },
            { cue: 'he / do / homework / the party upstairs / begin', img: IMG + 'u1-pic3.webp', a: ['He was doing his homework when the party upstairs began.', 'He was doing homework when the party upstairs began.'] },
            { cue: 'we / walk / home / it / start / to rain', img: IMG + 'u1-pic4.webp', a: ['We were walking home when it started to rain.', 'We were walking home when it started raining.'] }],
          hint: 'was/were + -ing for the longer action … when + past simple for the short action. Irregular: ring → rang, go → went, begin → began.' },
        { id: 'u12-4', page: 12, num: '4', tags: ['GRAMMAR', 'READ'], type: 'gaps', keySrc: 'tb',
          instruction: 'Complete the text using the past simple or past continuous form of the verbs in brackets.',
          figs: [{ src: IMG + 'u1-glasshouse.webp', alt: 'A white house with many floors and glass walls in Tokyo', w: 620, h: 766, small: true }],
          frame: 'plain', heading: 'The Transparent House',
          paras: [['When one Japanese couple ', { a: ['were planning'], n: 1 }, ' (plan) their new home in Tokyo, they ', { a: ['had'], n: 2 }, ' (have) an incredible idea. Why not have glass walls and make a completely transparent building?'],
            ['It sounds odd, but that’s what Sou Fujimoto Architects ', { a: ['built'], n: 3 }, ' (build) for them. The architects say that their inspiration ', { a: ['came'], n: 4 }, ' (come) from trees. They ', { a: ['created'], n: 5 }, ' (create) a building on many floors, connected by stairs, ladders and wooden steps. While they ', { a: ['were designing'], n: 6 }, ' (design) the building, they soon ', { a: ['realised', 'realized'], n: 7 }, ' (realise) that the people in the building would need some privacy, so there are thick white curtains for the glass walls. Most of the time, though, anyone walking by can see what the people inside are doing. No doubt the neighbours ', { a: ['found'], n: 8 }, ' (find) it a little strange.']],
          hint: 'while → past continuous. Main events of the story → past simple.' }
      ]}
    ]
  };

  /* ---------------- 1.3 Vocabulary (p. 13) ---------------- */
  LESSONS['u1-3'] = {
    id: 'u1-3', unit: 'u1', code: '1.3', title: 'Working with words', kicker: 'Vocabulary', pages: '13', accent: 'pink',
    goal: 'Words connected with the house and home. Phrasal verbs. Word patterns.',
    wb: ['Vocabulary reference, pages 150–151', 'Workbook Unit 1: Vocabulary, page 6', 'Digital game'],
    sections: [
      { id: 'book', title: 'Words connected with the house and home', items: [
        { id: 'u13-1', page: 13, num: '1', tags: ['VOCABULARY', 'LISTEN'], type: 'gaps', audio: AU('1.02', 'The house and home'), keySrc: 'tb',
          instruction: 'Complete the picture with the words and phrases below. Listen and check.',
          figs: [{ src: IMG + 'u1-house.webp', alt: 'A cut-away picture of a house with twelve numbered labels', w: 1600, h: 759, wide: true,
            marks: [[57.6, 10.6, 1], [76.4, 4.9, 2], [78.2, 19.4, 3], [79.2, 30.5, 4], [78.2, 93.4, 5], [65.1, 84.2, 6], [53.6, 94, 7], [17, 89, 8], [23, 54, 9], [11.6, 43.8, 10], [6.6, 33.8, 11], [11.9, 24.3, 12]] }],
          bank: ['attic', 'balcony', 'basement', 'ceiling', 'chimney', 'dining room', 'fence', 'garage', 'hedge', 'living room', 'roof', 'study'], uniqueBank: true,
          numbered: true, cols: true,
          paras: ['attic', 'roof', 'ceiling', 'balcony', 'fence', 'living room', 'dining room', 'basement', 'study', 'garage', 'hedge', 'chimney'].map(w => [{ a: [w] }]),
          adapted: 'Номера полей совпадают с номерами на картинке. Нажми на картинку, чтобы увеличить её.',
          hint: 'Follow the line from each label: (1) is the room inside the roof; (8) is under the ground; (12) is where the smoke goes.' }
      ]},
      { id: 'phr', title: 'Phrasal verbs', items: [
        { id: 'u13-2', page: 13, num: '2', tags: ['VOCABULARY', 'LISTEN'], type: 'gaps', audio: AU('1.03', 'Phrasal verbs'), keySrc: 'tb', numbered: true,
          instruction: 'Complete the sentences with the correct form of the phrasal verbs below. Listen and check.',
          intro: ['**do up · move in · move out · pull down · put up · rent out · settle in · tidy up**'],
          paras: [['They bought an old house and ', { a: ['did'] }, ' it ', { a: ['up'] }, '. Now it looks amazing!'],
            ['When my cousin moved to a new city, it took her a long time to make friends and ', { a: ['settle in'] }, '.'],
            ['My brother ', { a: ['moved out'] }, ' last year when he went to university. My parents miss him!'],
            ['Tom ', { a: ['was tidying up'] }, ' his room when he found his old schoolbooks.'],
            ['They didn’t like the house when they first ', { a: ['moved in'] }, ', but now they love it.'],
            ['I’m staying with friends in London. They’re ', { a: ['putting'] }, ' me ', { a: ['up'] }, ' in the spare room.'],
            ['My parents sometimes ', { a: ['rent out'] }, ' our house to earn money while we’re away on holiday.'],
            ['They ', { a: ['pulled down', 'have pulled down'] }, ' the house I was born in. Now it’s gone for ever!']],
          hint: 'Use the correct tense: last year → past simple; when he found… → past continuous; They’re … → -ing.',
          explanation: 'Teacher’s Book: 1 did, up 2 settle in 3 moved out 4 was tidying up 5 moved in 6 putting, up 7 rent out 8 pulled down. (Вариант “have pulled down” в 8 сайт тоже принимает — он грамматически возможен.)' },
        { id: 'u13-3', page: 13, num: '3', tags: ['VOCABULARY'], type: 'gaps', keySrc: 'tb',
          instruction: 'Complete the social media post with the correct form of the phrasal verbs in Exercise 2.',
          frame: 'blog', frameTitle: 'ZigZagMilo_14',
          paras: [['Hey, everyone! We finally ', { a: ['moved out'], n: 1 }, ' of our old house, so I’ve got a new address. My sister ', { a: ['settled in'], n: 2 }, ' to our new school quickly and has made some friends, but I’m still finding it a bit strange. Our house is old, so my parents want to ', { a: ['do'], n: 3 }, ' it ', { a: ['up'], n: 3 }, ' with a new kitchen and bathroom. It will look great when it’s finished. We’ve got a spare room, so we can ', { a: ['put'], n: 4 }, ' you ', { a: ['up'], n: 4 }, ' if you fancy a holiday by the sea!']] }
      ]},
      { id: 'wp', title: 'Word patterns', items: [
        { id: 'u13-4', page: 13, num: '4', tags: ['VOCABULARY', 'LISTEN'], type: 'inline', audio: AU('1.04', 'Word patterns'), keySrc: 'tb',
          instruction: 'Choose the correct word or phrase. Use the words in italics to help you. Listen and check.',
          lines: [['How *keen* are you ', { o: ['for', 'on'], a: 1 }, ' the idea of decorating your bedroom?'],
            ['Is it *worth* ', { o: ['moving', 'to move'], a: 0 }, ' house if you don’t like your neighbours? Why / Why not?'],
            ['How often do you *stop* yourself ', { o: ['from', 'with'], a: 0 }, ' saying what you think?'],
            ['Does your teacher *make* you ', { o: ['do', 'to do'], a: 0 }, ' homework every night?'],
            ['Do you agree that happiness *depends* ', { o: ['from', 'on'], a: 1 }, ' where you live?'],
            ['How often does someone at home *tell* you ', { o: ['tidying', 'to tidy'], a: 1 }, ' your room?']] },
        { id: 'u13-5', page: 13, num: '5', tags: ['SPEAK'], type: 'discuss', keySrc: 'free',
          instruction: 'In pairs, ask and answer the questions in Exercise 4.',
          prompts: ['How keen are you on the idea of decorating your bedroom?', 'Is it worth moving house if you don’t like your neighbours? Why / Why not?', 'How often do you stop yourself from saying what you think?', 'Does your teacher make you do homework every night?', 'Do you agree that happiness depends on where you live?', 'How often does someone at home tell you to tidy your room?'] }
      ]}
    ]
  };

  /* ---------------- 1.4 Listening (p. 14) ---------------- */
  LESSONS['u1-4'] = {
    id: 'u1-4', unit: 'u1', code: '1.4', title: 'Houses around the world', kicker: 'Listening · 3-option multiple choice', pages: '14', accent: 'orange',
    goal: 'Predict what you will hear. Listen to an interview and choose the correct answers.',
    wb: ['Workbook Unit 1: Listening, page 8'],
    sections: [
      { id: 'book', title: 'Listening · 3-option multiple choice | Interview', items: [
        { id: 'u14-1', page: 14, num: '1', tags: ['SPEAK'], type: 'discuss', keySrc: 'tb-sug',
          instruction: 'In pairs or groups, look at the photos and discuss the questions.',
          figs: [{ src: IMG + 'u1-stilts.webp', alt: 'Wooden houses on stilts above water', cap: 'House on stilts, the Philippines', w: 900, h: 652 }, { src: IMG + 'u1-underground.webp', alt: 'An underground house with rooms dug into the rock around a courtyard', cap: 'Underground house, Tunisia', w: 900, h: 646 }, { src: IMG + 'u1-yurt.webp', alt: 'White round yurts', cap: 'Yurt, Mongolia', w: 900, h: 626 }],
          prompts: ['1 Why do you think homes in these countries are like this?', '2 What do you think it would be like to live in each one?'],
          boxes: [BOX.predict],
          sample: { src: 'tb', html: '<p><b>House on stilts, the Philippines:</b> These houses may be on stilts to protect the house from water during flooding. They may also be on stilts as a way to keep animals like rats out of the house. Perhaps people use the space for storing things too.</p><p><b>Underground house, Tunisia:</b> These houses may be underground to protect people from extreme weather in both summer and winter. This might include very high temperatures and strong winds.</p><p><b>Yurt, Mongolia:</b> These homes may be like this because nomads live in them. Nomads travel from place to place and take their belongings with them. Yurts are light and easy to carry. They can quickly be moved and transported. They can also be adjusted for different weather conditions.</p>' } },
        { id: 'u14-2', page: 14, num: '2', tags: ['LISTEN', 'EXAM'], type: 'grid', keySrc: 'tb',
          instruction: 'You are going to listen to an interview with an expert on houses around the world. Read the questions and options in Exercise 4. Then match the topics (a–h) with the questions (1–5).',
          adapted: 'Отметь в таблице номер вопроса (1–5) для каждой темы. Некоторые темы подходят к двум вопросам. Проверь себя после прослушивания (упр. 3).',
          corner: 'Topic \\ Question', cols: ['1', '2', '3', '4', '5'],
          rows: [{ t: 'a) the weather', a: [2, 3] }, { t: 'b) danger from wildlife', a: [3] }, { t: 'c) the speaker’s emotions', a: [1, 4] }, { t: 'd) the speaker’s previous career', a: [0] },
            { t: 'e) details about living in a yurt', a: [1] }, { t: 'f) the speaker’s plans for the future', a: [4] }, { t: 'g) reasons why people build houses on stilts', a: [3] }, { t: 'h) reasons why people build houses underground', a: [2] }],
          articleRef: { title: 'Questions 1–5 from Exercise 4', html: '<ol><li>Why did Leyla first become interested in houses?</li><li>How did she feel when she stayed in a yurt?</li><li>People sometimes build houses underground in Tunisia to keep …</li><li>Stilt houses are popular in areas where there is …</li><li>In the future, Leyla would like to …</li></ol><p class="small">Options: see Exercise 4.</p>' },
          explanation: 'Teacher’s Book: a 3, 4 · b 4 · c 2, 5 · d 1 · e 2 · f 5 · g 4 · h 3.' },
        { id: 'u14-3', page: 14, num: '3', tags: ['LISTEN'], type: 'reference', audio: AU('1.05', 'Interview: houses around the world'), keySrc: 'tb',
          instruction: 'Listen to the interview and check your answers.',
          html: '<p>Послушай интервью и проверь свои ответы в упражнении 2 (кнопка Check Answers в упр. 2).</p>', links: [['Exercise 2', 'u1-4', 'u14-2']], doneLabel: 'Прослушал(а) ✓',
          boxes: [BOX.mc3] },
        { id: 'u14-4', page: 14, num: '4', tags: ['LISTEN', 'EXAM'], type: 'listen', audio: AU('1.05', 'Interview: houses around the world'), keySrc: 'tb',
          instruction: 'Listen to the interview again and choose the correct answers.',
          inner: { type: 'mcq', questions: [
            { q: '1 Why did Leyla first become interested in houses?', options: ['A She moved to another country.', 'B She trained as an architect.', 'C She saw a programme on TV.'], a: 0 },
            { q: '2 How did she feel when she stayed in a yurt?', options: ['A surprisingly comfortable', 'B a little afraid', 'C excited'], a: 0 },
            { q: '3 People sometimes build houses underground in Tunisia to keep', options: ['A safe at night.', 'B cool during the day.', 'C warm during the winter.'], a: 1 },
            { q: '4 Stilt houses are popular in areas where there is', options: ['A a problem with animals.', 'B a lack of space.', 'C heavy rain.'], a: 2 },
            { q: '5 In the future, Leyla would like to', options: ['A visit houses in more countries.', 'B build her own unusual home.', 'C study other types of buildings.'], a: 1 }] },
          hint: 'The speaker may talk about all three options — listen for but / though: the important point usually comes after them.',
          tutorNote: 'Teacher’s Book, Extra support — отвлекающая информация для неверных вариантов: 1 “I used to want to be an architect. / I would often watch programmes about unusual buildings on television.” 2 “One family invited me to spend the night with them in their yurt. I thought it was going to be smoky, and a bit frightening, but it wasn’t at all.” 3 “It’s perfectly safe, although it’s very hot work digging out the rooms.” 4 “That can be useful for keeping rats out of the house. / It also creates a space under the house for animals like sheep.” 5 “I’ve just finished a tour visiting houses in countries all around the world, and I’ve written a book.”' },
        { id: 'u14-learn', page: 14, num: 'Learn', tags: ['LEARN'], type: 'discuss', keySrc: 'free',
          instruction: 'Find out more about an unusual type of house. In the next lesson, tell the class about the house. Bring a photo if possible.',
          prompts: ['What type of house is it? Where is it?', 'Why do people build houses like this?', 'Would you like to live there? Why / Why not?'] }
      ]}
    ]
  };

  /* ---------------- 1.5 Grammar 2 (p. 15) ---------------- */
  LESSONS['u1-5'] = {
    id: 'u1-5', unit: 'u1', code: '1.5', title: 'used to and would', kicker: 'Grammar 2', pages: '15', accent: 'blue',
    goal: 'Talk about past habits and states with used to and would.',
    wb: ['Workbook Unit 1: Grammar 2, page 7', 'Digital practice'],
    sections: [
      { id: 'book', title: 'Grammar 2 · used to and would', items: [
        { id: 'u15-gic', page: 15, num: 'GiC', title: 'Grammar in context', tags: ['GRAMMAR', 'VIDEO'], type: 'match', keySrc: 'tb', video: { title: 'Grammar video: used to and would' },
          instruction: 'Look at these extracts from the listening on page 14. Match each extract to a description, a or b.',
          left: ['1 I used to want to be an architect.', '2 I would often watch programmes about unusual buildings on television.'],
          right: ['a This refers to a habit in the past.', 'b This refers to a feeling in the past.'], rightShort: ['a', 'b'], answers: [1, 0],
          boxes: [BOX.remG2] },
        { id: 'u15-1', page: 15, num: '1', tags: ['GRAMMAR'], type: 'tickfix', keySrc: 'tb',
          instruction: 'Tick the sentence if the word or phrase in bold is correct. If it’s incorrect, write the correct word on the line.',
          adapted: 'Нажми ✓, если выделенная часть верна, или впиши исправленный вариант.',
          items: [{ s: 'As a teenager, Max **would** often play computer games for hours.', ok: true },
            { s: 'When I was a child, my mother **use to** walk with me to school every day.', a: ['used to'] },
            { s: 'Where **did you used to** live before you moved here?', a: ['did you use to'] },
            { s: 'I **used to love** visiting my neighbours when I was young.', ok: true },
            { s: 'There **didn’t use to be** so many shops in our street.', ok: true },
            { s: 'How **would you use to** get to school when you were little?', a: ['did you use to'] }],
          hint: 'Questions and negatives: did … use to (no -d). would is not used with states, and there is no “would … use to”.' },
        { id: 'u15-2', page: 15, num: '2', tags: ['WRITE', 'SPEAK'], type: 'open', free: true, keySrc: 'free',
          instruction: 'Complete the sentences so they are true for you. In pairs, compare your sentences and explain your answers. *When I was young …*',
          questions: ['1 I used to …, but now I don’t.', '2 I never used to …, but now I do.', '3 My family and I used to …', '4 My friends and I would always …'] },
        { id: 'u15-3', page: 15, num: '3', tags: ['GRAMMAR', 'READ'], type: 'gaps', keySrc: 'tb',
          instruction: 'Complete the text with the correct form of *would* or *used to* and the verbs in brackets.',
          figs: [{ src: IMG + 'u1-cassette.webp', alt: 'Old music cassettes', w: 700, h: 513, small: true }],
          frame: 'plain', heading: 'The 1980s versus NOW',
          paras: [['In the 1980s, people ', { a: ['didn’t use to have', 'never used to have'], n: 1 }, ' (not / use to have) as much technology as we have today. They ', { a: ['used to listen'], n: 2 }, ' (use to / listen) to music, but they bought tape cassettes or vinyl and listened to it on record players. They definitely ', { a: ['didn’t use to download', 'never used to download'], n: 3 }, ' (not / use to download) music from the internet because the internet didn’t exist! Computers and mobile phones existed in the 1980s, but young people ', { a: ['didn’t use to own', 'never used to own'], n: 4 }, ' (not / use to own) them. Instead, they had typewriters, or wrote everything by hand. Video games existed, but these were very simple, and people ', { a: ['would go'], n: 5 }, ' (would / go) to cafés and other places to play them because they didn’t have gaming devices at home. So ', { a: ['did young people use to get'], n: 6 }, ' (young people / use to / get) bored? People from the 1980s say that they didn’t. They ', { a: ['used to invite'], n: 7 }, ' (use to / invite) their friends round to their houses and they ', { a: ['would chat'], n: 8 }, ' (would / chat) and listen to music just like teenagers do today.']],
          explanation: 'Teacher’s Book: 1 didn’t use to have 2 used to listen 3 didn’t use to download 4 didn’t use to own 5 would go 6 did young people use to get 7 used to invite 8 would chat. (Вариант never used to в 1, 3, 4 тоже принимается — см. Remember.)' },
        { id: 'u15-cult', page: 15, num: 'Culture', tags: ['CULTURE', 'SPEAK'], type: 'discuss', keySrc: 'free',
          instruction: 'What did houses and flats use to be like in your country? How were they different from houses and flats today?',
          prompts: ['Houses and flats used to …', 'Today they …'] }
      ]}
    ]
  };

  /* ---------------- 1.6 Speaking (p. 16) ---------------- */
  LESSONS['u1-6'] = {
    id: 'u1-6', unit: 'u1', code: '1.6', title: 'Describing a photo', kicker: 'Speaking · Extended turn', pages: '16', accent: 'pink',
    goal: 'Say where things are and describe a photo for about a minute.',
    wb: ['Speaking reference, page 164', 'Workbook Unit 1: Speaking, page 8'],
    sections: [
      { id: 'book', title: 'Speaking · Extended turn | Photos', items: [
        { id: 'u16-1', page: 16, num: '1', tags: ['VIDEO'], type: 'gaps', keySrc: 'tb', numbered: true, video: { title: 'Speaking video (Maddy, Angus and Jamie)' },
          instruction: 'Watch the video and complete the sentences.',
          paras: [['At the beginning of the video, the friends are in the ', { a: ['kitchen'] }, '.'], ['They are looking for ', { a: ['biscuits'] }, '.'], ['Maddy suggests ', { a: ['baking'] }, ' something.'],
            ['Angus was ', { a: ['three or four', '3 or 4', 'three or four years old'] }, ' years old when he used to bake with his dad.'], ['The friends ', { a: ['tidy up'] }, ' the kitchen before Jamie’s mum comes home.'], ['Mum thinks the cookies are ', { a: ['delicious'] }, '.']],
          tutorNote: 'Видео в присланных материалах нет; ключ — Teacher’s Book. Видеосценарий и рабочий лист — в Teacher’s Resource Centre.' },
        { id: 'u16-2', page: 16, num: '2', tags: ['VIDEO'], type: 'multi', keySrc: 'tb', video: { title: 'Speaking video (Maddy, Angus and Jamie)' },
          instruction: 'Watch the video again. Choose the phrases in the *Phrase expert* box that you hear.',
          boxes: [BOX.phrase],
          options: ['on the left', 'on the right', 'at the top', 'at the bottom', 'in the foreground', 'in the background', 'to the left/right of the …', 'above/below the …', 'near the …', 'behind/in front of the …'], answers: [1, 2, 6, 7, 9],
          explanation: 'Teacher’s Book: on the right, at the top, to the left of the …, above the …, behind the …, in front of the …' },
        { id: 'u16-3', page: 16, num: '3', tags: ['SPEAK'], type: 'discuss', keySrc: 'tb-sug',
          instruction: 'In pairs or groups, discuss the questions.',
          figs: [{ src: IMG + 'u1-bedroom-girl.webp', alt: 'A teenage girl with headphones sitting on her bed with a laptop; shelves with plants and boxes, a desk and photos on the wall', w: 900, h: 838 }],
          prompts: ['1 Describe what you can see in the photo.', '2 What do you like or dislike about this bedroom?'],
          boxes: [{ ...BOX.where, after: true }],
          sample: { src: 'tb', html: '<p>1 A teenage girl is listening to music in her bedroom; she is in the foreground and in the middle of the picture. She’s sitting on her bed. In the background on the left, there is a desk with some books on it. In the background on the right, there is a large set of shelves with plants and boxes on them. In front of the desk, there is a chair with a purple jumper on it. Above the desk, there are photographs.<br>2 Students’ own answers</p>' } },
        { id: 'u16-4', page: 16, num: '4', tags: ['LISTEN'], type: 'draw', audio: AU('1.06', 'A student describes a photo'), keySrc: 'tb',
          instruction: 'Listen to a student describing a photo. As you listen, draw what you think the photo looks like. Don’t worry if your drawing is very rough!',
          adapted: 'Рисуй пальцем, мышью или стилусом. Когда закончишь, нажми «Рисунок готов» — откроется фото из Teacher’s Book для сравнения.',
          reveal: { src: IMG + 'u1-106-photo.webp', alt: 'Two girls sitting on a white sofa with a laptop; a plant on the left, two lamps and pictures on the wall, a patterned footstool and a rug in the foreground', cap: 'This is the photo being described (Teacher’s Book, p. 28).' } },
        { id: 'u16-5', page: 16, num: '5', tags: ['WRITE', 'SPEAK'], type: 'open', free: true, keySrc: 'free',
          instruction: 'Compare your drawing with a partner’s. Are the same things in the same places? Write where these things are in your pictures.',
          questions: ['1 red lamps', '2 plant', '3 green cushions', '4 rug'],
          sample: { src: 'own', html: '<p>По фото из Teacher’s Book (оно чёрно-белое, цвета не видны): 1 The lamps are on the wall above the sofa, in the background. 2 The plant is on the left, next to the sofa. 3 The cushions are on the sofa, on the right. 4 The rug is on the floor in the foreground, at the bottom of the photo.</p>' } },
        { id: 'u16-6', page: 16, num: '6', tags: ['SPEAK', 'EXAM'], type: 'interview', keySrc: 'free', seconds: 60,
          instruction: 'Look at the photo. It shows someone at home. Take turns to describe the photo.',
          figs: [{ src: IMG + 'u1-room-boy.webp', alt: 'A smiling boy relaxing at a desk with a laptop in his bedroom; a bed, shelves and posters behind him', w: 900, h: 713 }],
          boxes: [BOX.photos],
          questions: ['Describe the photo. Speak for about one minute.'],
          checklist: ['Describes the main topic (who / where / what)', 'Describes other details', 'Uses phrases for saying where things are', 'Speaks for about a minute'] }
      ]}
    ]
  };

  /* ---------------- 1.7 Language in Use (p. 17) ---------------- */
  LESSONS['u1-7'] = {
    id: 'u1-7', unit: 'u1', code: '1.7', title: 'Life on a houseboat', kicker: 'Language in Use · 4-option cloze', pages: '17', accent: 'yellow',
    goal: 'Use so, such, too and enough. Do a 4-option multiple-choice cloze.',
    wb: ['Grammar reference, Unit 1, page 138', 'Workbook Unit 1: Language in Use, page 9'],
    sections: [
      { id: 'book', title: 'Language in Use · 4-option multiple-choice cloze', items: [
        { id: 'u17-1', page: 17, num: '1', tags: ['SPEAK'], type: 'discuss', keySrc: 'tb-sug',
          instruction: 'In pairs or groups, discuss the questions.',
          figs: [{ src: IMG + 'u1-houseboat.webp', alt: 'A colourful houseboat on a canal', w: 1400, h: 312, wide: true }],
          prompts: ['1 Look at the photo of the bottom of the page. What is the main subject? What else can you see?', '2 Would you like to live on a houseboat? What would be the advantages and disadvantages?'],
          sample: { src: 'tb', html: '<p>1 A boat that looks like people live on it – it’s on a canal.<br>2 Advantages: lower cost, freedom, simple life, closer to nature, etc. Disadvantages: small, cold, poor internet connection, not safe, etc.</p>' } },
        { id: 'u17-2', page: 17, num: '2', tags: ['GRAMMAR'], type: 'gaps', keySrc: 'tb', numbered: true,
          instruction: 'Complete the sentences with *so* or *such*.',
          boxes: [BOX.result],
          paras: [['Our apartment is ', { sel: ['so', 'such'], a: 'so' }, ' small that I have to share a room with my sister.'],
            ['It’s ', { sel: ['so', 'such'], a: 'such' }, ' a sunny day. Let’s go to the park.'],
            ['Houseboats travel ', { sel: ['so', 'such'], a: 'so' }, ' slowly that it takes ages to get anywhere.'],
            ['There’s ', { sel: ['so', 'such'], a: 'such' }, ' a lot of rubbish in the canal. It’s horrible.'],
            ['There are ', { sel: ['so', 'such'], a: 'so' }, ' many children in my family that we need to move house.'],
            ['It’s ', { sel: ['so', 'such'], a: 'such' }, ' an expensive flat that I don’t think we can afford it.']],
          hint: 'so + adjective / adverb / many / much. such (a/an) + (adjective) + noun; such a lot of.' },
        { id: 'u17-3', page: 17, num: '3', tags: ['GRAMMAR'], type: 'inline', keySrc: 'tb',
          instruction: 'Choose the correct word or phrase.',
          lines: [['I think life in a tiny home would be ', { o: ['too difficult', 'difficult enough'], a: 0 }, ' for my family.'],
            ['My bedroom is small and there isn’t ', { o: ['too', 'enough'], a: 1 }, ' space for all my things.'],
            ['Is this chair ', { o: ['comfortable enough', 'so comfortable'], a: 0 }, ' to sleep in?'],
            ['Our flat is ', { o: ['too small', 'small enough'], a: 0 }, ' for six people. There are only three rooms.'],
            ['This is ', { o: ['such', 'so'], a: 0 }, ' a cold place during winter.'],
            ['It’s difficult to make friends if your family moves around ', { o: ['such', 'too'], a: 1 }, ' much.']] },
        { id: 'u17-4', page: 17, num: '4', tags: ['READ', 'EXAM'], type: 'mcq', keySrc: 'tb',
          instruction: 'Choose the correct words to complete the text.',
          boxes: [BOX.cloze4],
          heading: 'Life on a houseboat',
          passage: [['Sara is 14 and lives on a houseboat in London with her parents. They ', { n: 1 }, ' in three years ago because her parents wanted to use less energy and live a ‘greener’ lifestyle. The boat is small and there is only ', { n: 2 }, ' space for two solar panels on the roof, but these provide all the power they need.'],
            ['In the summer, they sometimes take the boat for short trips along the canals. Sara is ', { n: 3 }, ' young to operate the houseboat on her own, so she is not allowed to do it. However, she can help with the steering. In the winter, they sometimes have ', { n: 4 }, ' bad weather that they can’t leave home. Then they stay on the boat and keep warm by the fire. Sara has to make sure there is enough wood ', { n: 5 }, ' heat the boat. The best thing about the houseboat is that it can move, which ', { n: 6 }, ' the family can go on holiday whenever they like.']],
          compact: true,
          questions: [{ options: ['A continued', 'B transported', 'C carried', 'D moved'], a: 3 }, { options: ['A enough', 'B too', 'C much', 'D the'], a: 0 }, { options: ['A enough', 'B so', 'C too', 'D such'], a: 2 },
            { options: ['A so', 'B such', 'C much', 'D too'], a: 1 }, { options: ['A for', 'B so', 'C and', 'D to'], a: 3 }, { options: ['A requires', 'B depends', 'C means', 'D involves'], a: 2 }],
          hint: 'Gap 1: moved in = started living. Gap 4: such + adjective + noun (bad weather).' },
        { id: 'u17-5', page: 17, num: '5', tags: ['SPEAK'], type: 'discuss', keySrc: 'free',
          instruction: 'In pairs or groups, discuss the questions.',
          prompts: ['1 What are the positive aspects of living on a houseboat?', '2 Would you like to live on one? Why / Why not?'] },
        { id: 'u17-com', page: 17, num: '🌍', tags: ['COMMUNITY', 'SPEAK'], type: 'discuss', keySrc: 'tb-sug',
          instruction: 'How would it help our community if we all lived in smaller homes?',
          prompts: ['Space and environment: …', 'Cost and economy: …', 'Energy and resources: …'],
          sample: { src: 'tb', html: '<p>Sustainable Development Goal 11: Sustainable cities and communities. Suggested answers: less land use, more green spaces, more affordable housing, lower living costs, less energy and water consumption.</p>' } }
      ]}
    ]
  };

  /* ---------------- 1.8 Writing (pp. 18–19) ---------------- */
  LESSONS['u1-8'] = {
    id: 'u1-8', unit: 'u1', code: '1.8', title: 'An article', kicker: 'Writing', pages: '18–19', accent: 'navy',
    goal: 'Use the right style. Plan and write an article of about 100 words.',
    wb: ['Writing reference, page 159', 'Workbook Unit 1: Writing, page 10, and Review 1, page 11'],
    sections: [
      { id: 'book', title: 'Writing · An article', items: [
        { id: 'u18-1', page: 18, num: '1', tags: ['SPEAK'], type: 'discuss', keySrc: 'free',
          instruction: 'In pairs or groups, discuss the questions.',
          figs: [{ src: IMG + 'u1-friends.webp', alt: 'A group of teenagers walking together across a bridge', w: 1400, h: 388, wide: true }],
          choose: { from: ['education', 'fashion', 'friends and family', 'music', 'sport'], pick: 5 },
          prompts: ['1 Which of these topics do you enjoy reading about in an article? What other topics do you read articles about?', '2 What was the topic of the last article you read? Where did you read it? What did you like / dislike about the article?'],
          boxes: [{ ...BOX.style, after: true }] },
        { id: 'u18-2', page: 18, num: '2', tags: ['READ'], type: 'mcq', keySrc: 'tb-sug',
          instruction: 'Read the exam task and the article. Have all the questions in the exam task been answered?',
          boxes: [{ title: 'Exam task', kind: 'task', html: TASK_1 }],
          article: { title: 'A GREAT PLACE TO LIVE', html: TXT_ARTICLE },
          questions: [{ q: 'Have all the questions in the exam task been answered?', options: ['Yes, they have.', 'No, they haven’t.'], a: 0 }],
          explanation: 'Teacher’s Book (suggested answer): Yes, they have — My neighbourhood is very friendly; In our local square, everyone shares their news.' },
        { id: 'u18-3', page: 18, num: '3', tags: ['WRITE'], type: 'multi', keySrc: 'tb-sug',
          instruction: 'Which of the questions below could you use at the start of the article to interest the readers?',
          options: ['1 What makes a friendly neighbourhood?', '2 Is your neighbourhood a friendly place?', '3 Have you ever wondered what makes a friendly neighbourhood?', '4 Do you make friends easily?', '5 What’s your favourite neighbourhood?'], answers: [0, 2],
          hint: 'The next sentence is “Is it the people, the buildings, or something else?” Which question does it answer?',
          explanation: 'Teacher’s Book (suggested answers): What makes a friendly neighbourhood? / Have you ever wondered what makes a friendly neighbourhood?' },
        { id: 'u18-4', page: 18, num: '4', tags: ['READ', 'WRITE'], type: 'open', keySrc: 'tb',
          instruction: 'Find places in the article where the writer does these things.',
          articleRef: { title: 'A GREAT PLACE TO LIVE', html: TXT_ARTICLE },
          questions: ['1 speaks directly to the reader', '2 uses contractions', '3 refers to her/his own experience', '4 uses exclamation marks'],
          key: ['Is it the people, the buildings or something else? / So, if you want a friendly neighbourhood, make friends with your neighbours!', 'You can’t do that … / It’s a great place to be …', 'My neighbourhood is very friendly, and I think I know why. / In our local square, everyone shares their news. / Some families in my area have been there for 70 years!', 'Some families in my area have been there for 70 years! / So, if you want a friendly neighbourhood, make friends with your neighbours!'],
          adapted: 'Скопируй фразу из статьи. Ответ проверяет учитель (ключ Teacher’s Book в режиме учителя).' }
      ]},
      { id: 'task', title: 'Exam task · Write your article', items: [
        { id: 'u18-5', page: 19, num: '5', tags: ['WRITE', 'EXAM'], type: 'discuss', keySrc: 'free',
          instruction: 'Look at this writing task and answer the questions. You see this announcement in your school’s English-language magazine. Write your **article**.',
          boxes: [{ title: 'Exam task', kind: 'task', html: TASK_2 }, { ...BOX.article, after: true }],
          choose: { from: ['my bedroom', 'our garden', 'our neighbourhood', 'the people I live with', 'the things we have in the house', 'what I do at home'], pick: 2 },
          prompts: ['1 Choose two things you like best about your home or add your own ideas.', '2 For each idea you chose or added in 1, write the main reason why you like it.'] },
        { id: 'u18-6', page: 19, num: '6', tags: ['WRITE'], type: 'plan', keySrc: 'free',
          instruction: '**Plan** Make a paragraph plan.',
          rows: [{ part: 'Paragraph 1', purpose: 'Introduce the subject in an interesting way.', phrases: ['*What do you think …?*', '*Have you ever thought about / wondered / asked yourself …?*'] },
            { part: 'Paragraph 2', purpose: 'Make your first main point and give a reason.', phrases: ['*The first thing that I like best about my home is …*'] },
            { part: 'Paragraph 3', purpose: 'Make your second main point and give a reason.', phrases: ['*Another thing …*', '*As well as that, …*', '*You also need …*'] },
            { part: 'Paragraph 4', purpose: 'Briefly conclude the article.', phrases: ['*I believe that what makes a house a home is …*'] }] },
        { id: 'u18-7', page: 19, num: '7', tags: ['WRITE', 'EXAM'], type: 'writing', keySrc: 'free', checks: false, target: [80, 120, 'about 100'],
          instruction: '**Write** Write your article in an appropriate style. Write about 100 words.',
          ph: 'Title\n\nHave you ever wondered what makes a house a home? …', aria: 'Your article',
          sample: { src: 'own', html: '<p><b>MY FAVOURITE PLACE</b></p><p>What do you think makes a house a home? For me, it’s the people and the place where I relax.</p><p>The first thing that I like best about my home is my family. We always have dinner together and talk about our day. It’s noisy, but it’s fun!</p><p>Another thing I love is my bedroom. It’s small, but it’s cosy and it’s full of my books and photos. When I’m tired, I can listen to music there and nobody disturbs me.</p><p>I believe that what makes a house a home is the people you live with. Do you agree? (≈ 100 words)</p>' } },
        { id: 'u18-8', page: 19, num: '8', tags: ['WRITE'], type: 'checklist', keySrc: 'free',
          instruction: '**Check** Before you hand in your article, complete this checklist.',
          items: ['I’ve started my article in an interesting way.', 'I’ve used an appropriate style for the topic and the reader.', 'I’ve written about 100 words.', 'I’ve answered all parts of the exam question.', 'I’ve given reasons to explain my main ideas.', 'I’ve checked my spelling, grammar and punctuation.'] },
        { id: 'u18-ltl', page: 19, num: 'LtL', title: 'Learning to Learn · Knowing your strengths and weaknesses', tags: ['LEARNING TO LEARN'], type: 'discuss', keySrc: 'free',
          instruction: 'Knowing your strengths and weaknesses can help you become a better learner. Make sure you use your strengths and skills as much as possible and try to improve your weaknesses. Think about your past learning and identify your strengths and weaknesses. Answer these questions. Make a list of your learning strengths and the areas where you feel less confident. Then work in pairs and tell a partner.',
          prompts: ['What types of tasks are you good at?', 'Which learning activities do you enjoy?', 'What tasks do you find more challenging?', 'What do you do when you find something difficult?', 'My strengths: …', 'Areas where I feel less confident: …'] }
      ]}
    ]
  };

  /* ---------------- Unit 1 · Reference ---------------- */
  LESSONS['u1-ref'] = {
    id: 'u1-ref', unit: 'u1', code: '1R', title: 'Unit 1 reference', kicker: 'Grammar · Vocabulary · Writing · Speaking reference', pages: '137–138, 150–151, 159, 164', accent: 'navy',
    goal: 'Rules, word lists and model texts for Unit 1, as in the back of the Student’s Book.',
    sections: [
      { id: 'ref', title: 'Grammar reference · Unit 1 (pp. 137–138)', items: [
        { id: 'u1r-g1', page: 137, num: 'GR', title: 'Past simple and past continuous', type: 'reference',
          html: `<div class="refcols"><div><h4>Past simple</h4><p><b>FORM:</b> Regular verbs in the past simple end in <i>-ed</i> (<i>played, closed, lived</i>, etc.). Irregular verbs don’t follow a pattern (<i>got, had, said, taught, went</i>, etc.). You need to learn the past simple of irregular verbs.</p>
<p><b>USE:</b> to talk about: 1 single completed actions in the past, 2 main events in a story, 3 habits and repeated actions in the past, 4 permanent situations in the past and 5 general truths and facts about the past:</p>
<table class="reft"><tr><td>1</td><td><i>Jay and I <b>played</b> a game of volleyball.</i></td></tr><tr><td>2</td><td><i>The woman <b>closed</b> the door, <b>sat</b> down and <b>opened</b> the letter.</i></td></tr><tr><td>3</td><td><i>We always <b>went</b> on holiday to Spain when I was very young.</i></td></tr><tr><td>4</td><td><i>My grandparents <b>lived</b> in a house on top of a hill.</i></td></tr><tr><td>5</td><td><i>The Ancient Egyptians <b>built</b> the pyramids.</i></td></tr></table>
<p>❗ We form the emphatic past simple with <i>did</i>: <i>I <b>did</b> tidy my room!</i></p>
<p>❗ When we repeat a verb in the past simple, we usually just use the auxiliary verb. We don’t repeat the main verb:<br>✔ <i>Matthew spent a lot of money, but I <b>didn’t</b>.</i><br>✘ <i>Matthew spent a lot of money, but I <b>didn’t spend</b>.</i></p></div>
<div><h4>Past continuous</h4><p><b>FORM:</b> <i>I was/wasn’t reading ... You were/weren’t reading ... He/She/It was/wasn’t reading ... Was I reading ...? Were you reading ...? Was he/she/it reading ...?</i></p>
<p><b>USE:</b> to talk about: 1 an action in progress at a specific time in the past, 2 background information or description in a story, 3 an action in progress in the past when another thing happened (possibly interrupting it or stopping it), 4 two situations in progress at the same time and 5 temporary situations in the past:</p>
<table class="reft"><tr><td>1</td><td><i>At five o’clock this morning, I <b>was sleeping</b>!</i></td></tr><tr><td>2</td><td><i>It <b>was raining</b>. I put on a coat and left the house.</i></td></tr><tr><td>3</td><td><i>When you called, I <b>was having</b> a shower.</i></td></tr><tr><td>4</td><td><i>Mum <b>was watching</b> TV while Dad <b>was reading</b> a book.</i></td></tr><tr><td>5</td><td><i>Before she found a flat, Sophia <b>was staying</b> with a friend.</i></td></tr></table>
<p>❗ The past continuous is not used to talk about repeated actions in the past:<br>✔ <i>My team <b>played</b> three football matches this week.</i><br>✘ <i>My team <b>was playing</b> three football matches this week.</i></p>
<p>❗ When we repeat a verb in the past continuous, we usually just use the auxiliary verb. We don’t repeat the main verb:<br>✔ <i>Margot was reading, but I <b>wasn’t</b>.</i><br>✘ <i>Margot was reading, but I <b>wasn’t reading</b>.</i></p></div></div>` },
        { id: 'u1r-g2', page: 137, num: 'GR', title: 'used to and would', type: 'reference',
          html: `<div class="refcols"><div><h4>used to</h4><p><b>FORM:</b> <i>used to</i> + bare infinitive<br><i>Grandad <b>used to play</b> with us in the garden.<br>I <b>used to be</b> frightened of cats.</i></p><p><b>USE:</b> to talk about past habits and past states (particularly the distant past)</p>
<p>❗ For negative statements with <i>used to</i>, we can use <i>never used to</i> or <i>didn’t use to</i>:<br><i>I <b>never used to</b> like olives, but I do now.<br>I <b>didn’t use to</b> like olives, but I do now.</i></p><p>❗ For questions with <i>used to</i>, we use <i>did … use to …?</i><br><i><b>Did</b> you <b>use to</b> have long hair?</i></p></div>
<div><h4>would</h4><p><b>FORM:</b> <i>would</i> + bare infinitive<br><i>Grandad <b>would play</b> with us in the garden.</i></p><p><b>USE:</b> to talk about past habits (particularly the distant past).</p><p>❗ We can’t use <i>would</i> to talk about past states:<br>✔ <i>I <b>used to have</b> a pet hamster.</i><br>✘ <i>I <b>would have</b> a pet hamster.</i></p></div></div>` },
        { id: 'u1r-g3', page: 138, num: 'GR', title: 'Result clauses', type: 'reference',
          html: `<h4><i>so</i> and <i>such</i></h4><p><b>USE:</b> to talk about amounts, and their results and effects:</p>
<table class="reft wide"><tr><td><i>so</i> + adjective/adverb + (<i>that</i>) clause</td><td><i>It’s <b>so hot</b> I can’t work!<br>He worked <b>so hard</b> that he got the top mark.</i></td></tr>
<tr><td><i>so</i> + <i>many/much</i> + noun + (<i>that</i>) clause</td><td><i>I’ve got <b>so many</b> books I can’t carry my bag.<br>He’s got <b>so much</b> money that he can buy anything.</i></td></tr>
<tr><td><i>such</i> + <i>a(n)</i> + adjective + singular noun + (<i>that</i>) clause</td><td><i>It was <b>such a hot day</b> that we had a picnic.</i></td></tr>
<tr><td><i>such</i> + adjective + plural noun + (<i>that</i>) clause</td><td><i>We have <b>such good teachers</b> that I love my school.</i></td></tr>
<tr><td><i>such</i> + <i>a lot of</i> + noun + (<i>that</i>) clause (= <i>so many/much</i>)</td><td><i>I have <b>such a lot of</b> homework that I can’t do it all!</i></td></tr></table>
<h4><i>too</i></h4><p><b>USE:</b> to criticise, to say that something is negative or bad, or to show that something prevents us from doing something:</p>
<table class="reft wide"><tr><td><i>too</i> + adjective/adverb + <i>for</i> (+ full infinitive)</td><td><i>It’s <b>too wet</b> for a picnic.<br>It’s raining <b>too hard</b> for a picnic.<br>It’s <b>too wet</b> for us to have a picnic.</i></td></tr>
<tr><td><i>too many</i> + plural countable noun</td><td><i>We invited <b>too many</b> people to the party.</i></td></tr><tr><td><i>too much</i> + uncountable noun</td><td><i>I’ve got <b>too much</b> work to do this weekend.</i></td></tr></table>
<p>❗ <i>Too</i> is not followed by a <i>that</i> clause.</p><p>❗ When the meaning is positive, we don’t use <i>too</i>. We use other words and phrases, such as <i>really</i> or <i>extremely</i> (with adjectives or adverbs) or <i>lots of</i> (with nouns).</p>
<h4><i>enough</i></h4><p><b>USE:</b> <i>enough</i>: the right amount/number of; <i>not enough</i>: less than the right amount/number of</p>
<table class="reft wide"><tr><td>(<i>not</i>) <i>enough</i> + noun (+ full infinitive)</td><td><i>I don’t have <b>enough money</b> (to buy a game).</i></td></tr><tr><td>(<i>not</i>) <i>enough</i> + noun + <i>for</i></td><td><i>Are there <b>enough people</b> for a game of football?</i></td></tr>
<tr><td>(<i>not</i>) + adjective/adverb + <i>enough</i> (+ <i>for</i>) (+ full infinitive)</td><td><i>Is the water <b>warm enough</b> for you (to swim)?</i></td></tr><tr><td>(<i>not</i>) + <i>a(n)</i> + adjective + <i>enough</i> + singular noun</td><td><i>It’s not a <b>nice enough</b> day to go to the beach.</i></td></tr></table>
<p>❗ The word <i>enough</i> is not followed by a <i>that</i> clause.</p>` }
      ]},
      { id: 'refv', title: 'Vocabulary reference · Unit 1 (pp. 150–151)', items: [
        { id: 'u1r-v1', page: 150, num: 'VR', title: 'Words connected with the house and home', type: 'reference',
          html: `<table class="reft wide"><tr><th>Word</th><th>Example sentence</th></tr>
<tr><td><b>attic</b> (n)</td><td>Dad got a ladder and climbed up into the attic to find some old boxes.</td></tr>
<tr><td><b>balcony</b> (n)</td><td>Isabella stood on the balcony and waved to Noah.</td></tr>
<tr><td><b>basement</b> (n)</td><td>I felt nervous as I went down into the basement because it was so dark and damp.</td></tr>
<tr><td><b>ceiling</b> (n)</td><td>I looked up at the ceiling and noticed a big crack from one side of the room to the other.</td></tr>
<tr><td><b>chimney</b> (n)</td><td>It was cold, so Mum lit a fire and the smoke started to go up the chimney.</td></tr>
<tr><td><b>dining room</b> (n)</td><td>When dinner was ready, we all went into the dining room and sat down.</td></tr>
<tr><td><b>fence</b> (n)</td><td>We couldn’t find the gate into the garden so we had to climb over the fence!</td></tr>
<tr><td><b>garage</b> (n)</td><td>Mum was in the garage all day, trying to mend her car.</td></tr>
<tr><td><b>hedge</b> (n)</td><td>I kicked the ball and it went over the hedge into next door’s garden!</td></tr>
<tr><td><b>living room</b> (n)</td><td>After doing her homework, Ava went into the living room and turned the TV on.</td></tr>
<tr><td><b>roof</b> (n)</td><td>There was a storm during the night and it almost blew the roof off the house!</td></tr>
<tr><td><b>study</b> (n)</td><td>I like to go into the study when I want to read quietly by myself.</td></tr></table>` },
        { id: 'u1r-v2', page: 151, num: 'VR', title: 'Phrasal verbs', type: 'reference',
          html: `<table class="reft wide"><tr><th>Phrasal verb</th><th>Meaning</th><th>Example sentence</th></tr>
<tr><td><b>do up</b> (Type 1)</td><td>repair, improve the appearance of</td><td>It took us a long time to do the house up, but now it looks great!</td></tr>
<tr><td><b>move in</b> (Type 2)</td><td>start living in a house</td><td>When we moved in, our new neighbours welcomed us.</td></tr>
<tr><td><b>move out</b> (Type 2)</td><td>stop living in a house</td><td>When we moved out, it was very sad to leave the house we loved so much.</td></tr>
<tr><td><b>pull down</b> (Type 1)</td><td>demolish, knock to the ground</td><td>I can’t believe they’ve pulled my primary school down!</td></tr>
<tr><td><b>put up</b> (Type 1)</td><td>provide accommodation for</td><td>Could you put me up for a few days?</td></tr>
<tr><td><b>rent out</b> (Type 1)</td><td>make available for others to live in for money</td><td>Mum is thinking of renting out the spare room to make a bit of money.</td></tr>
<tr><td><b>settle in</b> (Type 2)</td><td>become comfortable in a new place</td><td>Has George settled in at university yet?</td></tr>
<tr><td><b>tidy up</b> (Type 1)</td><td>make neat and clean</td><td>I have to tidy my bedroom up once a week.</td></tr></table>` },
        { id: 'u1r-v3', page: 151, num: 'VR', title: 'Word patterns', type: 'reference',
          html: `<table class="reft wide"><tr><th>Core words</th><th>Example sentence</th></tr>
<tr><td><b>be keen on</b> (doing sth)</td><td>My mum’s not very keen on flying, so she usually takes the train.</td></tr>
<tr><td><b>be worth</b> (doing sth)</td><td>It’s not worth travelling all the way to New York just for a weekend.</td></tr>
<tr><td><b>depend on</b></td><td>Your success in the test depends on how much work you do.</td></tr>
<tr><td><b>make (sb) do</b></td><td>Dad made me do the washing up!</td></tr>
<tr><td><b>stop (sb) from</b> (doing sth)</td><td>The rain stopped us from going to the park.</td></tr>
<tr><td><b>tell (sb) to</b> (do sth)</td><td>Our teacher told us to write a letter to a friend.</td></tr></table>` }
      ]},
      { id: 'refw', title: 'Writing and Speaking reference (pp. 159, 164)', items: [
        { id: 'u1r-w1', page: 159, num: 'WR', title: 'An article · Example task', type: 'reference',
          html: `<p>You have seen this announcement in a travel magazine:</p><div class="examtask"><div class="et-h">Win a free holiday!</div><p>We want articles on how to plan the perfect holiday. What advice do you have? Send us an article and you could win a week’s holiday for you and your family!</p></div><p>Write your <b>article</b>.</p>
<div class="model-art"><h4>HOW TO PLAN THE PERFECT HOLIDAY</h4>
<p><span class="ann">Ask your readers a question to interest them.</span> Have you ever had a terrible holiday? <span class="ann">Give your opinion where appropriate.</span> With a little planning, I believe you can make sure that you have a wonderful time instead! <span class="ann">Use exclamation marks to create an informal style.</span></p>
<p><span class="ann">Use a connecting phrase to introduce your points in order.</span> First of all, only pack the things you need. Most of us take too much luggage on holiday. <span class="ann">Use imperatives to give advice in an informal way.</span> Just take one bag each and it’ll make your life easier.</p>
<p><span class="ann">Use a connecting phrase to introduce your next point.</span> Apart from packing, you need to think about what you are going to do on holiday. <span class="ann">Use different ways of making suggestions, such as questions.</span> Why not plan activities that all the family will enjoy, <span class="ann">Give examples where appropriate.</span> such as going on a boat trip or visiting a theme park?</p>
<p><span class="ann">Use a good connecting phrase to introduce your final point.</span> Finally, don’t forget to relax and enjoy it. Don’t plan too many activities and remember to spend some time doing nothing!</p>
<p class="small"><span class="ann">Give your article a title.</span></p></div>
<table class="reft wide"><tr><th colspan="5">USEFUL PHRASES</th></tr><tr><th>Rhetorical questions</th><th>Introducing points in order</th><th>Giving your opinion</th><th>Giving advice</th><th>Giving examples</th></tr>
<tr><td><i>Have you ever …? Do you ever …? What do you think about …?</i></td><td><i>First, Firstly, First of all, To begin with, Second, Secondly, Third, Thirdly, What’s more, Apart from that, Finally</i></td><td><i>I believe (that) …, I think (that) …, In my opinion, In my view, To my mind, Personally, It seems to me (that) …</i></td><td><i>You should …, Think about …, One thing to remember is …, Why don’t you …?, Why not …? How about …?</i></td><td><i>for example, such as, for instance</i></td></tr></table>`,
          tutorNote: 'В учебнике пояснения стоят на полях со стрелками к фразам; на сайте они показаны цветными метками перед фразой, к которой относятся.' },
        { id: 'u1r-s1', page: 164, num: 'SR', title: 'Unit 1 · Language practice: saying where things are', type: 'reference',
          html: '<p>This Speaking reference contains all the language from the Phrase experts from the Student’s Book. You can use the pages as a revision tool when you’re preparing for a Speaking test or exam.</p><div class="skillbox phr"><div class="sk-t">Phrase expert</div><p>on the left | on the right | at the top | at the bottom | in the foreground | in the background | to the left/right of the … | above/below the … | near the … | behind/in front of the …</p></div>' }
      ]}
    ]
  };
})();
