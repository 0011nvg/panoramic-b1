/* =========================================================
   OPTIMISE STARS B1 · STARTER (Student’s Book pp. 6–9)
   + Grammar reference p. 136 · Vocabulary reference p. 150
   Ключи: Teacher’s Book, Starter pp. 18–21 (keySrc:'tb' / 'tb-sug').
   keySrc:'own' — ответ подготовлен для платформы (не из Teacher’s Book).
   keySrc:'free' — в Teacher’s Book «Students’ own answers».
   Аудио S.01–S.05 в присланных материалах нет → audio.file не задан, плеер показывает пометку.
   ========================================================= */
(function () {
  const A = t => ({ track: t });   // аудио Starter: файла пока нет
  const IMG = 'assets/book/';

  const TXT_HABITS = `<p class="lead-in"><b>From using social media to choosing the colour of your clothes, your habits reveal more about your personality than you think. Read on to find out what researchers say.</b></p>
<p>First, social media. Do you use it? Of course you do! But how do you use it? Do you post your own content or do you prefer to look at other people’s posts, photos and videos? Some researchers believe there are four types of social media users: leaders, likers, lurkers and loners. Leaders are creative. They post content and ideas and want people to respond. Likers rarely post, but love to comment and share. Lurkers are shy. They read everything, but never post, like or share. And loners aren’t interested in social media at all! Which social media personality are you?</p>
<p>Let’s move on to shoes. What kind of shoes are you wearing now? Do you prefer trainers or smart shoes? What do you think of boots? Researchers say if you usually wear comfortable shoes, it means you are friendly and relaxed. Smart shoes show you are dependable and reliable. And boots mean you want to be different!</p>
<p>And what about the colours of your clothes you usually wear? Do you choose bright colours or do you prefer black? Researchers have a lot to say about this topic, too! They say bright colours suggest you are happy and friendly, while black clothes show you are serious and creative.</p>
<p>Of course, these theories aren’t true for everyone and researchers are always changing their minds. But whatever our habits and personality, we all do have something positive to offer. Life wouldn’t be interesting if we were all the same!</p>`;

  const TXT_TWINS = `<p class="lead-in"><b>Lots of people are interested in identical twins. Scientists study their biology, authors write about them and directors make films.</b></p>
<p>Many of the stories are fiction, while others are true, like the story of Anaïs Bordier and Samantha Futerman. Anaïs Bordier grew up in France and then moved to London to study fashion. One day, a friend sent her a picture from an online video. It showed a young woman from the USA, Samantha Futerman, acting in a film trailer. The woman looked exactly like Anaïs. Anaïs did some research and was shocked to discover that they were both born in South Korea on 19<sup>th</sup> November 1987. Anaïs contacted Samantha and discovered more amazing information: both of them were adopted and had been born in the same hospital. They were identical twins!</p>`;

  const REM_G1 = '<ul><li>Use the present simple for general truths, facts, habits, routines and permanent situations.</li><li>Use the present continuous for actions happening now and temporary or changing situations.</li><li>We don’t usually use stative verbs like <i>believe, hate, want, like</i> and <i>need</i> in the present continuous. But some verbs are both stative and action verbs.<br><i>Lucas <b>has</b> brown hair.</i> (stative)<br><i>Lucas <b>is having</b> a haircut now.</i> (action)</li></ul><p class="small">See Grammar reference, Starter, page 136</p>';
  const REM_G2 = '<ul><li>Use <i>each</i> and <i>every</i> with singular countable nouns. <i><b>Every student</b> in my class is 14 years old.</i></li><li>Use <i>all, both, each, lots of, many</i> and <i>most</i> with plural countable nouns. <i><b>Many teenagers</b> are shy.</i></li><li>Use <i>little</i> and <i>much</i> with uncountable nouns. <i>I haven’t got <b>much money</b>.</i></li><li>Use a plural verb with <i>of (the)</i>. <i>Most <b>of the</b> children <b>have</b> short hair.</i></li><li>Use a singular verb with <i>each of (the)</i>. <i><b>Each of</b> the boys <b>has</b> short hair.</i></li><li>Use <i>of (the)</i> when we refer to a specific group. <i>All people breathe air.</i> (all = generally) <i><b>All of the</b> people in my class have a mobile phone.</i></li></ul><p class="small">See Grammar reference, Starter, page 136</p>';

  /* ---------------- S1 · Vocabulary 1 (p. 6) ---------------- */
  LESSONS['st-1'] = {
    id: 'st-1', unit: 'st', code: 'S1', title: 'Appearance and personality', kicker: 'Vocabulary 1', pages: '6', accent: 'pink',
    goal: 'Describe people’s appearance and personality.',
    wb: ['Vocabulary reference, page 150'],
    sections: [
      { id: 'book', title: 'Vocabulary 1 · Words connected with appearance and personality', items: [
        { id: 'st1-1', page: 6, num: '1', tags: ['VOCABULARY', 'LISTEN'], type: 'sort', audio: A('S.01'), keySrc: 'tb-sug',
          instruction: 'In pairs or groups, write the words and phrases below. Listen and check.',
          adapted: 'Нажми категорию рядом с каждым словом: Hair, Face, Height или Personality.',
          cats: ['Hair', 'Face', 'Height', 'Personality'],
          words: [{ w: 'brown eyes', c: 1 }, { w: 'creative', c: 3 }, { w: 'curious', c: 3 }, { w: 'curly', c: 0 }, { w: 'dependable', c: 3 }, { w: 'freckles', c: 1 }, { w: 'friendly', c: 3 }, { w: 'generous', c: 3 },
            { w: 'negative', c: 3 }, { w: 'polite', c: 3 }, { w: 'popular', c: 3 }, { w: 'serious', c: 3 }, { w: 'shy', c: 3 }, { w: 'tall', c: 2 }, { w: 'unreliable', c: 3 }, { w: 'wavy', c: 0 }],
          hint: 'freckles — small brown spots on your skin.',
          explanation: 'Teacher’s Book: Hair — curly, wavy; Face — brown eyes, freckles; Height — tall; Personality — creative, curious, dependable, friendly, generous, negative, polite, popular, serious, shy, unreliable. Other possible words: straight, fair, dark, thick, thin hair; moustache, beard; short, medium-height; sociable, hard-working, clever, quiet, kind, funny.' },
        { id: 'st1-2', page: 6, num: '2', tags: ['VOCABULARY'], type: 'gaps', keySrc: 'tb',
          instruction: 'Complete the sentences with the words connected with personality in Exercise 1.', numbered: true,
          bank: ['creative', 'curious', 'dependable', 'friendly', 'generous', 'negative', 'polite', 'popular', 'serious', 'shy', 'unreliable'], uniqueBank: true,
          paras: [['Mark is very ', { a: ['negative'] }, '. He is not enthusiastic about anything!'],
            ['Lucas is ', { a: ['creative'] }, '. He is imaginative, artistic and talented.'],
            ['Maya is ', { a: ['curious'] }, '. She wants to find out and learn about things.'],
            ['Helen is ', { a: ['dependable'] }, '. You can trust and rely on her.'],
            ['Amelia is ', { a: ['polite'] }, '. She always says please and thank you.'],
            ['James is often ', { a: ['shy'] }, ' and gets nervous when he meets new people.'],
            ['Max is ', { a: ['popular'] }, ' and liked by lots of people.'],
            ['Sara is ', { a: ['generous'] }, '. She gives a lot of her time to people.'],
            ['Harry is ', { a: ['serious'] }, '. He thinks carefully about things and he doesn’t laugh a lot.'],
            ['Lily is ', { a: ['unreliable'] }, '. She doesn’t do what she says she will do.']],
          hint: 'One word from the box is not used. Read the second sentence: it explains the adjective.' },
        { id: 'st1-3', page: 6, num: '3', tags: ['WRITE'], type: 'writing', keySrc: 'free', checks: false,
          instruction: 'Look at the people in the photos below. Write a short paragraph to describe them using the words in Exercise 1 that were not used in Exercise 2 and any other words you need.',
          figs: [{ src: IMG + 'st-people.webp', alt: 'Four teenagers: a boy with glasses and a checked shirt, a girl with long curly hair and freckles, a girl in a yellow top and a girl in a blue jacket with beads in her hair', w: 1400, h: 791, wide: true }],
          ph: 'The boy on the left has…', aria: 'Your paragraph',
          hint: 'Words from Ex. 1 not used in Ex. 2: brown eyes, curly, freckles, friendly, tall, wavy. Useful words (Teacher’s Book): beads, braids, earrings, necklace, glasses, jeans, checked shirt, sunglasses, top.',
          sample: { src: 'own', html: '<p>The boy on the left has short, wavy brown hair and brown eyes. He’s wearing glasses and a checked shirt, and he looks friendly. The girl in the middle has long, curly hair and freckles. She’s wearing big earrings and she’s smiling. The girl in the yellow top has short, wavy hair and she’s got sunglasses on her head. The tall girl on the right has braids with beads and she’s wearing a blue jacket.</p>' } },
        { id: 'st1-4', page: 6, num: '4', tags: ['SPEAK'], type: 'discuss', keySrc: 'free',
          instruction: 'Think of a celebrity. In pairs, take turns to describe the person using the words in Exercise 1. Then ask your partner to guess who the celebrity is.',
          adapted: 'Опиши знаменитость учителю (или однокласснику), не называя имени. Можно записать опорные слова.',
          prompts: ['Hair and face: …', 'Height: …', 'Personality: …', 'Who is it?'] }
      ]}
    ]
  };

  /* ---------------- S2 · Reading 1 + Vocabulary 2 (p. 7) ---------------- */
  LESSONS['st-2'] = {
    id: 'st-2', unit: 'st', code: 'S2', title: 'What do your habits say about you?', kicker: 'Reading 1 · Vocabulary 2', pages: '7', accent: 'blue',
    goal: 'Read an article about habits and personality. Make nouns with -ity and -ness.',
    wb: ['Vocabulary reference, page 150'],
    sections: [
      { id: 'book', title: 'Reading 1 · An article', items: [
        { id: 'st2-r1', page: 7, num: '1', tags: ['READ'], type: 'multi', keySrc: 'tb',
          instruction: 'Read the text quickly. Which three habits does the writer talk about?',
          adapted: 'В учебнике ответ свободный. Здесь выбери три привычки из списка (лишние варианты добавлены для онлайн-формата).',
          article: { title: 'What do your habits say about you?', html: TXT_HABITS },
          figs: [{ src: IMG + 'st-habits.webp', alt: 'A smiling teenager holding piles of folded clothes', w: 900, h: 607 }],
          options: ['using social media', 'what you eat for breakfast', 'the shoes you wear', 'the music you listen to', 'the colour of your clothes', 'your hairstyle'], answers: [0, 2, 4],
          explanation: 'Teacher’s Book: social media, shoes, the colour of your clothes.' },
        { id: 'st2-r2', page: 7, num: '2', tags: ['READ', 'LISTEN'], type: 'mcq', audio: A('S.02'), keySrc: 'tb', compact: true,
          instruction: 'Read the text again and decide if the statements are T (True) or F (False).',
          articleRef: { title: 'What do your habits say about you?', html: TXT_HABITS },
          questions: [{ q: '1 The writer mentions four types of people who use social media.', options: ['T', 'F'], a: 0 },
            { q: '2 ‘Lurkers’ never post comments, but they often like posts.', options: ['T', 'F'], a: 1 },
            { q: '3 Friendly people wear comfortable shoes.', options: ['T', 'F'], a: 0 },
            { q: '4 People who wear boots want to look like other people.', options: ['T', 'F'], a: 1 },
            { q: '5 People who wear black probably like music and art.', options: ['T', 'F'], a: 0 }],
          hint: 'True = the text says the same thing (maybe in other words). False = the text says something different. Look for little words like never, often, all.',
          explanation: 'Teacher’s Book: 1T 2F 3T 4F 5T. 2 Lurkers never post comments or like posts. 4 People who wear boots want to be different.' },
        { id: 'st2-r3', page: 7, num: '3', tags: ['SPEAK'], type: 'discuss', keySrc: 'free',
          instruction: 'In pairs or groups, discuss the ideas in the article. Do you agree with them?',
          prompts: ['Which social media personality are you: a leader, a liker, a lurker or a loner?', 'What shoes and colours do you usually wear? Is the article right about you?'] }
      ]},
      { id: 'voc2', title: 'Vocabulary 2 · Word formation: nouns with -ity / -ness', items: [
        { id: 'st2-v1', page: 7, num: '1', tags: ['VOCABULARY', 'LISTEN'], type: 'gaps', audio: A('S.03'), keySrc: 'tb',
          instruction: 'Write nouns with *-ity* and *-ness* using the words below. Listen and check.', noNums: true,
          paras: [['creative → ', { a: ['creativity'] }], ['curious → ', { a: ['curiosity'] }], ['dependable → ', { a: ['dependability'] }], ['friendly → ', { a: ['friendliness'] }],
            ['generous → ', { a: ['generosity'] }], ['negative → ', { a: ['negativity'] }], ['personal → ', { a: ['personality'] }], ['polite → ', { a: ['politeness'] }],
            ['popular → ', { a: ['popularity'] }], ['reliable → ', { a: ['reliability'] }], ['serious → ', { a: ['seriousness'] }], ['shy → ', { a: ['shyness'] }]],
          hint: '-y after a consonant → -i: friendly → friendliness. curious → curiosity (the u disappears). Six words take -ity.',
          explanation: 'Note (Teacher’s Book): personal → personality has a different meaning. Personal = about your own feelings or beliefs; personality = the part of you that makes you behave in a particular way.' },
        { id: 'st2-v2', page: 7, num: '2', tags: ['VOCABULARY'], type: 'gaps', keySrc: 'tb', numbered: true,
          instruction: 'Complete the sentences with words from Exercise 1.',
          paras: [['My brother finds it difficult to talk to people because of his ', { a: ['shyness'] }, '.'],
            ['Thanks to the ', { a: ['generosity'] }, ' of my parents, we now have two tickets for the festival!'],
            ['They’re twins, but Ben’s ', { a: ['personality'] }, ' is completely different from Jack’s. He’s much quieter.'],
            ['Just out of ', { a: ['curiosity'] }, ', why did you decide to change your hairstyle?']] },
        { id: 'st2-think', page: 7, num: 'Think', tags: ['THINK', 'SPEAK'], type: 'discuss', keySrc: 'free',
          instruction: 'Think about your ideal friend. What kind of personality should they have? Why?',
          prompts: ['My ideal friend is… because…'] }
      ]}
    ]
  };

  /* ---------------- S3 · Grammar 1 + Vocabulary 3 (p. 8) ---------------- */
  LESSONS['st-3'] = {
    id: 'st-3', unit: 'st', code: 'S3', title: 'Present tenses and collocations', kicker: 'Grammar 1 · Vocabulary 3', pages: '8', accent: 'yellow',
    goal: 'Use the present simple, the present continuous and stative verbs. Learn collocations with adjectives.',
    wb: ['Grammar reference, Starter, page 136', 'Vocabulary reference, page 150'],
    sections: [
      { id: 'gram1', title: 'Grammar 1 · Present simple, present continuous, stative verbs', items: [
        { id: 'st3-gic', page: 8, num: 'GiC', title: 'Grammar in context', tags: ['GRAMMAR'], type: 'match', keySrc: 'tb',
          instruction: 'Look at these extracts from the reading text on page 7. Match the extracts (1–5) with the descriptions a–e.',
          left: ['1 Some researchers believe there are four types of social media users', '2 They post content and ideas', '3 What kind of shoes are you wearing now?', '4 researchers are always changing their minds', '5 we all do have something positive to offer'],
          right: ['a) a changing situation', 'b) a situation or action that is happening now', 'c) the emphatic present simple', 'd) a habit, routine, or permanent situation', 'e) a stative verb'],
          rightShort: ['a', 'b', 'c', 'd', 'e'], answers: [4, 3, 1, 0, 2],
          boxes: [{ title: 'Remember', html: REM_G1, kind: 'remember', after: true }] },
        { id: 'st3-g1', page: 8, num: '1', tags: ['GRAMMAR'], type: 'gaps', keySrc: 'tb', numbered: true,
          instruction: 'Complete the sentences with the correct present simple or present continuous form of the verbs in brackets.',
          paras: [['I usually ', { a: ['go'] }, ' (go) on social media after school, but today I ', { a: ['am watching'] }, ' (watch) a film.'],
            [{ a: ['Is Max chatting'] }, ' (Max / chat) to his friends right now or ', { a: ['is he listening'] }, ' (he / listen) to music?'],
            ['He ', { a: ['does not want'] }, ' (not / want) to do exercise. He’s too tired.'],
            ['My sister ', { a: ['hates'] }, ' (hate) video games, so she ', { a: ['never plays'] }, ' (never / play) them.'],
            ['I can’t talk on the phone right now. I ', { a: ['am having'] }, ' (have) my dinner.'],
            ['I ', { a: ['am not visiting'] }, ' (not / visit) my friends today. I ', { a: ['have'] }, ' (have) too much work.']],
          hint: 'usually, never → present simple. right now, today → present continuous. want, hate are stative verbs. have = own → stative; have dinner = action.' },
        { id: 'st3-g2', page: 8, num: '2', tags: ['GRAMMAR'], type: 'order', keySrc: 'tb', noAns: true, ph: 'Write the question…',
          instruction: 'Use the prompts to write questions in the present simple or present continuous.',
          items: [{ cue: 'how often / you / go / on social media ?', a: ['How often do you go on social media?'] },
            { cue: 'what / you / wear / at the moment ?', a: ['What are you wearing at the moment?'] },
            { cue: 'what colour hair / your best friend / have ?', a: ['What colour hair does your best friend have?'] },
            { cue: 'what / members of your family / do / right now ?', a: ['What are members of your family doing right now?', 'What are the members of your family doing right now?'] }],
          hint: 'how often → present simple (do you…?). at the moment, right now → present continuous (are you …ing?). have (hair) is stative.' },
        { id: 'st3-g3', page: 8, num: '3', tags: ['SPEAK'], type: 'discuss', keySrc: 'free',
          instruction: 'Ask and answer the questions in Exercise 2 with a partner.',
          prompts: ['How often do you go on social media?', 'What are you wearing at the moment?', 'What colour hair does your best friend have?', 'What are members of your family doing right now?'] }
      ]},
      { id: 'voc3', title: 'Vocabulary 3 · Collocations with adjectives', items: [
        { id: 'st3-v1', page: 8, num: '1', tags: ['VOCABULARY', 'LISTEN'], type: 'inline', audio: A('S.04'), keySrc: 'tb',
          instruction: 'Choose the correct word. Listen and check.',
          figs: [{ src: IMG + 'st-asleep.webp', alt: 'A boy fast asleep on a blue pillow', w: 700, h: 498, small: true }],
          lines: [[{ o: ['big', 'loud'], a: 0 }, ' trouble'], [{ o: ['fast', 'wide'], a: 0 }, ' asleep'], ['feel ', { o: ['small', 'long'], a: 0 }],
            [{ o: ['deep', 'wide'], a: 1 }, ' awake'], [{ o: ['long', 'fast'], a: 0 }, ' time'], [{ o: ['deep', 'wide'], a: 0 }, ' voice']],
          explanation: 'A collocation is a combination of words that are often used together and “sound right” to native speakers.' },
        { id: 'st3-v2', page: 8, num: '2', tags: ['VOCABULARY'], type: 'gaps', keySrc: 'tb', numbered: true,
          instruction: 'Complete the sentences with the collocations in Exercise 1.',
          bank: ['big trouble', 'fast asleep', 'feel small', 'wide awake', 'long time', 'deep voice'], uniqueBank: true,
          paras: [['Last night, I was so tired, I fell ', { a: ['fast asleep'] }, ' in minutes.'],
            ['My brother is in ', { a: ['big trouble'] }, '. He borrowed my mobile phone again.'],
            ['My friend hates social media. She hasn’t used it for a ', { a: ['long time'] }, '.'],
            ['It’s midnight, but I’m ', { a: ['wide awake'] }, '. I think I’ll have a snack.'],
            ['He has a very ', { a: ['deep voice'] }, '. He’s an amazing singer.'],
            ['I always ', { a: ['feel small'] }, ' when my teacher tells me off for talking!']] }
      ]}
    ]
  };

  /* ---------------- S4 · Reading 2 + Grammar 2 (p. 9) ---------------- */
  LESSONS['st-4'] = {
    id: 'st-4', unit: 'st', code: 'S4', title: 'Twins', kicker: 'Reading 2 · Grammar 2', pages: '9', accent: 'orange',
    goal: 'Read a true story and complete fact files. Use quantifiers.',
    wb: ['Grammar reference, Starter, page 136'],
    sections: [
      { id: 'book', title: 'Reading 2 · Fact files', items: [
        { id: 'st4-r1', page: 9, num: '1', tags: ['SPEAK'], type: 'discuss', keySrc: 'free',
          instruction: 'In pairs or groups, discuss the questions.',
          figs: [{ src: IMG + 'st-twins.webp', alt: 'Two young women who look exactly alike, smiling', w: 900, h: 620 }],
          prompts: ['1 Do you know any twins? Are they identical?', '2 Can you think of any stories or films about twins?', '3 Why do you think people are so interested in twins?'] },
        { id: 'st4-r2', page: 9, num: '2', tags: ['READ', 'LISTEN'], type: 'gaps', audio: A('S.05'), keySrc: 'tb',
          instruction: 'Read the text and complete the fact files.',
          article: { title: 'Twins', html: TXT_TWINS },
          frame: 'factfile', heading: 'Fact files', noNums: false,
          paras: [['**Anaïs Bordier**'], ['Lived in ', { a: ['France', 'London'], group: 'lived' }, ' and ', { a: ['France', 'London'], group: 'lived' }],
            ['Studied ', { a: ['fashion'] }], ['Birthday ', { a: ['19th November', '19 November', 'November 19th', 'November 19', '19th November 1987', '19 November 1987', '19.11.1987'] }],
            ['**Samantha Futerman**'], ['Lived in ', { a: ['the USA', 'USA', 'the US', 'US', 'America', 'the United States'] }], ['Worked as a(n) ', { a: ['actor', 'actress'] }],
            ['Birthday ', { a: ['19th November', '19 November', 'November 19th', 'November 19', '19th November 1987', '19 November 1987', '19.11.1987'] }]],
          hint: 'Gaps 1 and 2: two places, any order.',
          explanation: 'Teacher’s Book: 1 France / London 2 London / France 3 fashion 4 19th November 5 the USA 6 actor 7 19th November.' }
      ]},
      { id: 'gram2', title: 'Grammar 2 · Quantifiers', items: [
        { id: 'st4-gic', page: 9, num: 'GiC', title: 'Grammar in context', tags: ['GRAMMAR'], type: 'gaps', keySrc: 'tb', numbered: true,
          instruction: 'Complete the extracts from Reading 2 Exercise 2 with quantifiers. Decide if the nouns the quantifiers are used with are countable or uncountable.',
          paras: [[{ a: ['Many of'] }, ' the stories are fiction, while ', { a: ['others'] }, ' are true. — *stories* are ', { sel: ['countable', 'uncountable'], a: 'countable' }],
            ['Anaïs did ', { a: ['some'] }, ' research. — *research* is ', { sel: ['countable', 'uncountable'], a: 'uncountable' }]],
          boxes: [{ title: 'Remember', html: REM_G2, kind: 'remember', after: true }] },
        { id: 'st4-g1', page: 9, num: '1', tags: ['GRAMMAR'], type: 'inline', keySrc: 'tb',
          instruction: 'Choose the correct word or phrase. Sometimes both are correct.',
          lines: [['Anna’s got an earring in ', { o: ['each', 'every'], a: 0 }, ' ear.'],
            [{ o: ['Most', 'Most of'], a: 0 }, ' people use social media.'],
            ['I’m taking ', { o: ['both', 'both of'], a: [0, 1] }, ' my cousins to the park tomorrow.'],
            ['Every ', { o: ['boy', 'boys'], a: 0 }, ' in my class ', { o: ['have', 'has'], a: 1 }, ' a sister or brother.'],
            ['Each of the ', { o: ['student', 'students'], a: 1 }, ' in my school ', { o: ['have', 'has'], a: 1 }, ' an exam today.']],
          hint: 'each = every one of two or more; every is not used for two things. each of the + plural noun + singular verb.',
          explanation: 'Teacher’s Book: 1 each 2 Most 3 both / both of 4 boy, has 5 students, has. In 3 both answers are correct.' },
        { id: 'st4-g2', page: 9, num: '2', tags: ['WRITE', 'SPEAK'], type: 'open', free: true, keySrc: 'free',
          instruction: 'Complete the sentences so that they are true for you. In pairs, compare your sentences.',
          questions: ['All of my friends …', 'Each of my favourite people …', 'Most people I know …', 'Every student in my class …'],
          hint: 'All of my friends + plural verb (like / have…). Each of… / Every student + singular verb (likes / has…).' },
        { id: 'st4-res', page: 9, num: 'Research', tags: ['RESEARCH'], type: 'discuss', keySrc: 'free',
          instruction: 'Find another interesting story about twins. Tell the class what you learnt.',
          prompts: ['Who are the twins? Where are they from?', 'What is interesting about their story?'] }
      ]}
    ]
  };

  /* ---------------- Starter · Reference (pp. 136, 150) ---------------- */
  LESSONS['st-ref'] = {
    id: 'st-ref', unit: 'st', code: 'SR', title: 'Starter reference', kicker: 'Grammar & Vocabulary reference', pages: '136, 150', accent: 'navy',
    goal: 'Rules and word lists for the Starter unit, as in the back of the Student’s Book.',
    sections: [
      { id: 'ref', title: 'Grammar reference · Starter (p. 136)', items: [
        { id: 'str-g1', page: 136, num: 'GR', title: 'Present simple, present continuous, stative verbs', type: 'reference',
          html: `<div class="refcols"><div><h4>Present simple</h4><p><b>FORM:</b> <i>I/You/We/They laugh/don’t laugh … He/She/It laughs/doesn’t laugh … Do I/you/we/they laugh …? Does he/she/it laugh …?</i></p>
<p>❗ We add <i>-s</i> to the verb to form the third person singular. Irregular verbs change spelling.<br><i>Isa usually <b>goes</b> to the pool on Sundays. I <b>have</b> ten points and Mark <b>has</b> eight.</i></p>
<p>❗ We form the emphatic present simple with <i>do/does</i>: <i>I can’t believe it! Karen <b>does speak</b> Chinese!</i></p>
<p><b>USE:</b> to talk about: 1 general truths and facts, 2 current habits, 3 how often things happen, 4 permanent situations and 5 states:</p>
<table class="reft"><tr><td>1</td><td><i>The sun <b>rises</b> in the east.</i></td></tr><tr><td>2</td><td><i>I <b>play</b> the violin in the school orchestra.</i></td></tr><tr><td>3</td><td><i>Phil <b>goes</b> swimming every Thursday evening.</i></td></tr><tr><td>4</td><td><i>My dad <b>works</b> as a car mechanic.</i></td></tr><tr><td>5</td><td><i>Susie <b>has</b> long hair.</i></td></tr></table></div>
<div><h4>Present continuous</h4><p><b>FORM:</b> <i>I am/’m not laughing … You/We/They are/aren’t laughing … He/She/It is/isn’t laughing … Am I laughing …? Are you/we/they laughing …? Is he/she/it laughing …?</i></p>
<p><b>USE:</b> to talk about: 1 actions happening now, 2 temporary situations, 3 changing and developing situations, 4 a temporary series of actions and 5 annoying habits (+ <i>always</i>):</p>
<table class="reft"><tr><td>1</td><td><i>I<b>’m doing</b> my homework.</i></td></tr><tr><td>2</td><td><i>What <b>are</b> you <b>doing</b> in chemistry this week?</i></td></tr><tr><td>3</td><td><i>Mobile phones <b>are becoming</b> cheaper.</i></td></tr><tr><td>4</td><td><i>We<b>’re doing</b> lots of tests at school this week.</i></td></tr><tr><td>5</td><td><i>Jack<b>’s always laughing</b> at us!</i></td></tr></table>
<h4>Stative verbs</h4><p><b>USE:</b> to refer to states rather than actions. Stative verbs include verbs about thinking (<i>believe, know, think</i>, etc.), existence (<i>be, exist</i>, etc.), emotions (<i>love, like, hate</i>, etc.), human senses (<i>hear, see, smell</i>, etc.), appearance (<i>appear, look, seem</i>, etc.) and possession or relationships between things (<i>belong to, have, include</i>, etc.).</p>
<p>❗ <b>Some verbs can refer to either states or actions, but their meaning changes</b> (e.g. <i>feel, have, imagine, look, see, smell, think</i> and <i>taste</i>).<br><i>Does Anne <b>have</b> dark hair?</i> (state) <i><b>Are</b> we <b>having</b> pizza for dinner?</i> (action)</p></div></div>` },
        { id: 'str-g2', page: 136, num: 'GR', title: 'Quantifiers', type: 'reference',
          html: `<p><b>USE:</b> to talk about numbers and amounts</p><ul><li>with a singular countable noun (<i>each, every, a little, the, a, an, one</i>)</li><li>with a plural countable noun (<i>all, both, little, a lot of, lots of, enough, many, most, some, the, two/three/etc., a number of, a few, few, how many</i>)</li><li>with an uncountable noun (<i>enough, little, a little, a lot of, lots of, most, much, how much, some, a piece of, an amount of</i>)</li></ul>
<p>Common quantifiers include: <i>all, both, each, every, enough, little, a little, a lot of, lots of, many, most, much, how much, some, the, a, an, one/two</i>, etc, <i>a number of, a few, few, how many, a piece of, an amount of</i>.</p>
<p>❗ See Grammar reference, Unit 2 for more information on countable and uncountable nouns.</p>
<p>❗ Quantifiers with <i>of the</i> take a plural verb: <i>Most of the books <b>are</b> old.</i> The exception is <i>each of the</i>, which takes a singular verb: <i>Each of the boxes <b>is</b> empty.</i></p>
<p>❗ <i>all</i> = generally (<i><b>All</b> people eat food.</i>), <i>all of</i> = specific (<i><b>All of</b> the kids in my class like pizza.</i>)</p>` }
      ]},
      { id: 'refv', title: 'Vocabulary reference · Starter (p. 150)', items: [
        { id: 'str-v1', page: 150, num: 'VR', title: 'Words connected with appearance and personality', type: 'reference',
          html: `<table class="reft wide"><tr><th>Word</th><th>Example</th></tr>
<tr><td><b>creative</b> (adj)</td><td>Olivia’s quite creative – she loves making things out of plastic bottles.</td></tr>
<tr><td><b>curious</b> (adj)</td><td>Oscar’s very curious – he always asks questions starting with ‘why’!</td></tr>
<tr><td><b>dependable</b> (adj)</td><td>Isla’s totally dependable – if she says she’ll be there, then she will.</td></tr>
<tr><td><b>friendly</b> (adj)</td><td>Our new teacher is very friendly and always tries to help everyone.</td></tr>
<tr><td><b>generous</b> (adj)</td><td>My uncle and aunt are quite generous – they always give me great birthday presents.</td></tr>
<tr><td><b>negative</b> (adj)</td><td>Don’t be so negative – we can still win the game!</td></tr>
<tr><td><b>polite</b> (adj)</td><td>Freya’s so polite – she always says ‘please’ and ‘thank you’ and never says rude words.</td></tr>
<tr><td><b>popular</b> (adj)</td><td>Leila’s very popular – she has lots of friends.</td></tr>
<tr><td><b>serious</b> (adj)</td><td>Mr Brown is very serious – he never smiles.</td></tr>
<tr><td><b>shy</b> (adj)</td><td>Mia is quite shy and doesn’t like talking to people at parties.</td></tr>
<tr><td><b>unreliable</b> (adj)</td><td>Freddie’s a bit unreliable, so he’ll probably be late tomorrow.</td></tr></table>` },
        { id: 'str-v2', page: 150, num: 'VR', title: 'Word formation · Nouns with -ity / -ness', type: 'reference',
          html: `<table class="reft wide"><tr><th>Core word</th><th>Derivatives</th></tr>
<tr><td><b>create</b> (v)</td><td>creative (adj), creation (n), creator (n), creativity (n), creatively (adv)</td></tr>
<tr><td><b>curious</b> (adj)</td><td>curiosity (n), curiously (adv)</td></tr>
<tr><td><b>depend</b> (v)</td><td>dependable (adj), (in)dependent (adj), dependability (n), (in)dependently (adv)</td></tr>
<tr><td><b>friend</b> (n)</td><td>(un)friendly (adj), friendship (n), friendliness (n)</td></tr>
<tr><td><b>generous</b> (adj)</td><td>generosity (n), generously (adv)</td></tr>
<tr><td><b>negative</b> (adj)</td><td>negativity (n), negatively (adv)</td></tr>
<tr><td><b>person</b> (n)</td><td>personalise (v), (im)personal (adj), personality (n), personally (adv)</td></tr>
<tr><td><b>polite</b> (adj)</td><td>impolite (adj), politeness (n), (im)politely (adv)</td></tr>
<tr><td><b>popular</b> (adj)</td><td>unpopular (adj), popularity (n), popularise (n), (un)popularly (adv)</td></tr>
<tr><td><b>rely</b> (v)</td><td>(un)reliable (adj), (un)reliability (n), (un)reliably (adv)</td></tr>
<tr><td><b>serious</b> (adj)</td><td>seriousness (n), seriously (adv)</td></tr>
<tr><td><b>shy</b> (adj)</td><td>shyness (n), shyly (adv)</td></tr></table>`,
          tutorNote: 'В таблице учебника у *popularise* стоит помета (n) — так напечатано в книге; по смыслу это глагол (v).' },
        { id: 'str-v3', page: 150, num: 'VR', title: 'Collocations with adjectives', type: 'reference',
          html: `<table class="reft wide"><tr><th>Collocation</th><th>Example sentence</th></tr>
<tr><td><b>a long time</b></td><td>Have you lived in that house for a long time?</td></tr>
<tr><td><b>deep voice</b></td><td>My dad’s got a really deep voice.</td></tr>
<tr><td><b>fast asleep</b></td><td>The cat was fast asleep in its basket when we got home.</td></tr>
<tr><td><b>feel small</b></td><td>I felt really small when my best friend told me I was selfish.</td></tr>
<tr><td><b>in big trouble</b></td><td>You’ll be in big trouble if you don’t tidy your bedroom soon!</td></tr>
<tr><td><b>wide awake</b></td><td>When I heard a noise downstairs, I went from being fast asleep to being wide awake in about one second!</td></tr></table>` },
        { id: 'str-v4', page: 150, num: 'VR', title: 'Phrasal verbs', type: 'reference',
          html: `<table class="reft wide"><tr><th>Phrasal verb</th><th>Meaning</th><th>Example sentence</th></tr>
<tr><td><b>look after</b> (Type 3)</td><td>take care of</td><td>A babysitter usually looks after them on Friday evenings.</td></tr>
<tr><td><b>look forward to</b> (Type 4)</td><td>be excited about something in the future</td><td>I’m really looking forward to my birthday!</td></tr>
<tr><td><b>look into</b> (Type 3)</td><td>investigate</td><td>The police are looking into the cause of the accident.</td></tr>
<tr><td><b>look up</b> (Type 1)</td><td>(try to) find information in a book, dictionary, etc.</td><td>If you don’t know the meaning of the word, look it up in a dictionary.</td></tr>
<tr><td><b>turn into</b> (Type 3)</td><td>change from one thing into another</td><td>It takes many years for a tiny acorn to turn into a big oak tree.</td></tr>
<tr><td><b>turn off</b> (Type 1)</td><td>make a machine (e.g. a TV or computer) stop working temporarily</td><td>Turn off the computer when you’ve finished with it.</td></tr>
<tr><td><b>turn on</b> (Type 1)</td><td>make a machine (e.g. a TV or computer) start working</td><td>Turn on the laptop, then enter your password.</td></tr>
<tr><td><b>turn over</b> (Type 1)</td><td>proceed to the next page of a book or magazine</td><td>If you turn over the page, you’ll see a map of Egypt.</td></tr></table>
<p class="small muted">Эта таблица есть в Vocabulary reference к Starter (p. 150); отдельного упражнения с этими глаголами на страницах 6–9 нет.</p>` }
      ]}
    ]
  };
})();
