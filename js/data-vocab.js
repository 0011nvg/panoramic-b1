/* Словарь Starter и Unit 1 для Vocabulary Lab и интервального повторения.
   Слова и примеры ex — из Student’s Book (страницы уроков и Vocabulary reference pp. 150–151).
   Переводы, транскрипции, определения def (там, где их нет в книге) и предложения ctx составлены для платформы. */
window.VOCAB = [
  // ---- Starter · Vocabulary 1 (p. 6) — appearance and personality
  { w: 'brown eyes', ru: 'карие глаза', ipa: '/ˌbraʊn ˈaɪz/', pos: 'n', def: 'eyes that are the colour of chocolate', ex: 'My sister has brown eyes and dark hair.', ctx: ['He has ___ like his dad — dark and warm.'], lesson: 'st-1', src: 'book', emoji: '👀' },
  { w: 'curly', ru: 'кудрявый (о волосах)', ipa: '/ˈkɜːli/', pos: 'adj', def: 'hair that grows in small round shapes', ex: 'She has long, curly hair.', ctx: ['Her hair is ___ — it has lots of small rings.'], lesson: 'st-1', src: 'book', emoji: '➰' },
  { w: 'wavy', ru: 'волнистый (о волосах)', ipa: '/ˈweɪvi/', pos: 'adj', def: 'hair that is not straight and not curly, with soft curves', ex: 'His hair is short and wavy.', ctx: ['Her hair isn’t straight or curly — it’s ___.'], lesson: 'st-1', src: 'book', emoji: '🌊' },
  { w: 'freckles', ru: 'веснушки', ipa: '/ˈfreklz/', pos: 'n', def: 'small brown spots on your skin', ex: 'In summer I get freckles on my nose.', ctx: ['She has red hair and lots of ___ on her face.'], lesson: 'st-1', src: 'book', emoji: '☀️' },
  { w: 'tall', ru: 'высокий (о человеке)', ipa: '/tɔːl/', pos: 'adj', def: 'higher than most people', ex: 'My brother is very tall — he’s 1.90 m.', ctx: ['He plays basketball because he’s really ___.'], lesson: 'st-1', src: 'book', emoji: '📏' },
  { w: 'creative', ru: 'творческий, креативный', ipa: '/kriˈeɪtɪv/', pos: 'adj', def: 'good at thinking of new ideas and making things', ex: 'Olivia’s quite creative – she loves making things out of plastic bottles.', ctx: ['Lucas is very ___ — he draws, writes songs and makes videos.'], lesson: 'st-1', src: 'book', emoji: '🎨' },
  { w: 'curious', ru: 'любознательный', ipa: '/ˈkjʊəriəs/', pos: 'adj', def: 'wanting to find out about things', ex: 'Oscar’s very curious – he always asks questions starting with ‘why’!', ctx: ['Cats are ___ animals — they want to see everything.'], lesson: 'st-1', src: 'book', emoji: '🔍' },
  { w: 'dependable', ru: 'надёжный', ipa: '/dɪˈpendəbl/', pos: 'adj', def: 'someone you can trust to do what they say', ex: 'Isla’s totally dependable – if she says she’ll be there, then she will.', ctx: ['Ask Helen — she’s ___ and always helps.'], lesson: 'st-1', src: 'book', emoji: '🤝' },
  { w: 'friendly', ru: 'дружелюбный', ipa: '/ˈfrendli/', pos: 'adj', def: 'kind and nice to other people', ex: 'Our new teacher is very friendly and always tries to help everyone.', ctx: ['The new boy is very ___ — he talks to everyone.'], lesson: 'st-1', src: 'book', emoji: '😊' },
  { w: 'generous', ru: 'щедрый', ipa: '/ˈdʒenərəs/', pos: 'adj', def: 'happy to give money, time or things to others', ex: 'My uncle and aunt are quite generous – they always give me great birthday presents.', ctx: ['It was very ___ of you to share your lunch.'], lesson: 'st-1', src: 'book', emoji: '🎁' },
  { w: 'negative', ru: 'негативный, пессимистичный', ipa: '/ˈneɡətɪv/', pos: 'adj', def: 'thinking about the bad side of things', ex: 'Don’t be so negative – we can still win the game!', ctx: ['Mark is always ___ — he never thinks anything will be good.'], lesson: 'st-1', src: 'book', emoji: '👎' },
  { w: 'polite', ru: 'вежливый', ipa: '/pəˈlaɪt/', pos: 'adj', def: 'speaking and behaving in a nice way, e.g. saying please and thank you', ex: 'Freya’s so polite – she always says ‘please’ and ‘thank you’ and never says rude words.', ctx: ['It’s ___ to say thank you when someone helps you.'], lesson: 'st-1', src: 'book', emoji: '🙏' },
  { w: 'popular', ru: 'популярный, всеми любимый', ipa: '/ˈpɒpjələ/', pos: 'adj', def: 'liked by a lot of people', ex: 'Leila’s very popular – she has lots of friends.', ctx: ['Max is ___ at school — everybody likes him.'], lesson: 'st-1', src: 'book', emoji: '⭐' },
  { w: 'serious', ru: 'серьёзный', ipa: '/ˈsɪəriəs/', pos: 'adj', def: 'thinking carefully and not laughing much', ex: 'Mr Brown is very serious – he never smiles.', ctx: ['Harry is a ___ boy — he doesn’t laugh a lot.'], lesson: 'st-1', src: 'book', emoji: '🧐' },
  { w: 'shy', ru: 'застенчивый', ipa: '/ʃaɪ/', pos: 'adj', def: 'nervous about talking to people you don’t know', ex: 'Mia is quite shy and doesn’t like talking to people at parties.', ctx: ['James is ___ and gets nervous when he meets new people.'], lesson: 'st-1', src: 'book', emoji: '🙈' },
  { w: 'unreliable', ru: 'ненадёжный', ipa: '/ˌʌnrɪˈlaɪəbl/', pos: 'adj', def: 'someone who often doesn’t do what they say', ex: 'Freddie’s a bit unreliable, so he’ll probably be late tomorrow.', ctx: ['Don’t ask Lily to help — she’s ___.'], lesson: 'st-1', src: 'book', emoji: '⏰' },
  // ---- Starter · Vocabulary 2 (p. 7) — nouns with -ity / -ness
  { w: 'creativity', ru: 'творчество, креативность', ipa: '/ˌkriːeɪˈtɪvəti/', pos: 'n', def: 'the ability to make new things or think of new ideas', ex: 'Art lessons help children develop their creativity.', ctx: ['Her paintings show a lot of ___.'], lesson: 'st-2', src: 'book', emoji: '💡' },
  { w: 'curiosity', ru: 'любопытство', ipa: '/ˌkjʊəriˈɒsəti/', pos: 'n', def: 'wanting to know about something', ex: 'Just out of curiosity, why did you decide to change your hairstyle?', ctx: ['Just out of ___, where did you buy that jacket?'], lesson: 'st-2', src: 'book', emoji: '❓' },
  { w: 'dependability', ru: 'надёжность', ipa: '/dɪˌpendəˈbɪləti/', pos: 'n', def: 'the quality of being someone people can trust', ex: 'Her dependability makes her a great team captain.', ctx: ['We chose Isla because of her ___.'], lesson: 'st-2', src: 'book', emoji: '🔒' },
  { w: 'friendliness', ru: 'дружелюбие', ipa: '/ˈfrendlinəs/', pos: 'n', def: 'the quality of being kind and nice to people', ex: 'I love the friendliness of the people in my town.', ctx: ['Everyone talks about the ___ of the new teacher.'], lesson: 'st-2', src: 'book', emoji: '🤗' },
  { w: 'generosity', ru: 'щедрость', ipa: '/ˌdʒenəˈrɒsəti/', pos: 'n', def: 'the quality of being happy to give', ex: 'Thanks to the generosity of my parents, we now have two tickets for the festival!', ctx: ['Thank you for your ___ — the present is wonderful.'], lesson: 'st-2', src: 'book', emoji: '💝' },
  { w: 'negativity', ru: 'негатив, пессимизм', ipa: '/ˌneɡəˈtɪvəti/', pos: 'n', def: 'a way of thinking that only sees the bad side', ex: 'His negativity makes everyone feel sad.', ctx: ['Stop the ___ — we can do it!'], lesson: 'st-2', src: 'book', emoji: '🌧️' },
  { w: 'personality', ru: 'личность, характер', ipa: '/ˌpɜːsəˈnæləti/', pos: 'n', def: 'the part of you that makes you behave in a particular way', ex: 'They’re twins, but Ben’s personality is completely different from Jack’s.', ctx: ['She has a strong ___ — she knows what she wants.'], lesson: 'st-2', src: 'book', emoji: '🧠' },
  { w: 'politeness', ru: 'вежливость', ipa: '/pəˈlaɪtnəs/', pos: 'n', def: 'the quality of behaving in a nice, correct way', ex: 'Politeness costs nothing.', ctx: ['The waiter thanked us for our ___.'], lesson: 'st-2', src: 'book', emoji: '🎩' },
  { w: 'popularity', ru: 'популярность', ipa: '/ˌpɒpjəˈlærəti/', pos: 'n', def: 'the fact that many people like something or someone', ex: 'The popularity of tiny homes is growing.', ctx: ['The singer’s ___ grew very fast after the show.'], lesson: 'st-2', src: 'book', emoji: '📈' },
  { w: 'reliability', ru: 'надёжность', ipa: '/rɪˌlaɪəˈbɪləti/', pos: 'n', def: 'the quality of being able to be trusted', ex: 'I bought this phone because of its reliability.', ctx: ['___ is important in a good friend.'], lesson: 'st-2', src: 'book', emoji: '✅' },
  { w: 'seriousness', ru: 'серьёзность', ipa: '/ˈsɪəriəsnəs/', pos: 'n', def: 'the quality of being serious', ex: 'He spoke with great seriousness.', ctx: ['Everybody was surprised by the ___ of her face.'], lesson: 'st-2', src: 'book', emoji: '😐' },
  { w: 'shyness', ru: 'застенчивость', ipa: '/ˈʃaɪnəs/', pos: 'n', def: 'the feeling of being nervous with people', ex: 'My brother finds it difficult to talk to people because of his shyness.', ctx: ['She hides her ___ by smiling a lot.'], lesson: 'st-2', src: 'book', emoji: '😳' },
  // ---- Starter · Vocabulary 3 (p. 8) — collocations with adjectives
  { w: 'big trouble', ru: 'большие неприятности', ipa: '/ˌbɪɡ ˈtrʌbl/', pos: 'phr', def: 'a very difficult or bad situation (be in big trouble)', ex: 'You’ll be in big trouble if you don’t tidy your bedroom soon!', ctx: ['You’re in ___ — Mum saw the broken window!'], lesson: 'st-3', src: 'book', emoji: '💥' },
  { w: 'fast asleep', ru: 'крепко спящий', ipa: '/ˌfɑːst əˈsliːp/', pos: 'phr', def: 'sleeping very deeply', ex: 'The cat was fast asleep in its basket when we got home.', ctx: ['The baby is ___ — please be quiet.'], lesson: 'st-3', src: 'book', emoji: '😴' },
  { w: 'feel small', ru: 'чувствовать себя униженным, ничтожным', ipa: '/ˌfiːl ˈsmɔːl/', pos: 'phr', def: 'feel stupid or not important', ex: 'I felt really small when my best friend told me I was selfish.', ctx: ['When everyone laughed at me, I started to ___.'], lesson: 'st-3', src: 'book', emoji: '🐜' },
  { w: 'wide awake', ru: 'совершенно бодрствующий', ipa: '/ˌwaɪd əˈweɪk/', pos: 'phr', def: 'completely awake', ex: 'When I heard a noise downstairs, I went from being fast asleep to being wide awake in about one second!', ctx: ['It’s 2 a.m., but I’m ___ — I can’t sleep.'], lesson: 'st-3', src: 'book', emoji: '👁️' },
  { w: 'a long time', ru: 'долгое время', ipa: '/ə ˌlɒŋ ˈtaɪm/', pos: 'phr', def: 'a large amount of time', ex: 'Have you lived in that house for a long time?', ctx: ['I haven’t seen my cousins for ___.'], lesson: 'st-3', src: 'book', emoji: '⌛' },
  { w: 'deep voice', ru: 'низкий голос', ipa: '/ˌdiːp ˈvɔɪs/', pos: 'phr', def: 'a voice with a low sound', ex: 'My dad’s got a really deep voice.', ctx: ['The singer has a ___ — you can hear it in the whole hall.'], lesson: 'st-3', src: 'book', emoji: '🎙️' },
  // ---- Starter · Vocabulary reference p. 150 — phrasal verbs
  { w: 'look after', ru: 'заботиться, присматривать', ipa: '/ˌlʊk ˈɑːftə/', pos: 'phr v', def: 'take care of', ex: 'A babysitter usually looks after them on Friday evenings.', ctx: ['Can you ___ my dog while I’m on holiday?'], lesson: 'st-ref', src: 'book', emoji: '🐶' },
  { w: 'look forward to', ru: 'с нетерпением ждать', ipa: '/ˌlʊk ˈfɔːwəd tə/', pos: 'phr v', def: 'be excited about something in the future', ex: 'I’m really looking forward to my birthday!', ctx: ['I always ___ the summer holidays!'], lesson: 'st-ref', src: 'book', emoji: '🎉' },
  { w: 'look into', ru: 'расследовать, изучать', ipa: '/ˌlʊk ˈɪntə/', pos: 'phr v', def: 'investigate', ex: 'The police are looking into the cause of the accident.', ctx: ['The teacher promised to ___ the problem.'], lesson: 'st-ref', src: 'book', emoji: '🕵️' },
  { w: 'look up', ru: 'искать (в словаре, справочнике)', ipa: '/ˌlʊk ˈʌp/', pos: 'phr v', def: '(try to) find information in a book, dictionary, etc.', ex: 'If you don’t know the meaning of the word, look it up in a dictionary.', ctx: ['Can you ___ the meaning of this word in the dictionary?'], lesson: 'st-ref', src: 'book', emoji: '📖' },
  { w: 'turn into', ru: 'превращаться', ipa: '/ˌtɜːn ˈɪntə/', pos: 'phr v', def: 'change from one thing into another', ex: 'It takes many years for a tiny acorn to turn into a big oak tree.', ctx: ['A caterpillar can ___ a butterfly.'], lesson: 'st-ref', src: 'book', emoji: '🦋' },
  { w: 'turn off', ru: 'выключать', ipa: '/ˌtɜːn ˈɒf/', pos: 'phr v', def: 'make a machine stop working', ex: 'Turn off the computer when you’ve finished with it.', ctx: ['Please ___ your phones in the cinema.'], lesson: 'st-ref', src: 'book', emoji: '📴' },
  { w: 'turn on', ru: 'включать', ipa: '/ˌtɜːn ˈɒn/', pos: 'phr v', def: 'make a machine start working', ex: 'Turn on the laptop, then enter your password.', ctx: ['It’s dark — can you ___ the light?'], lesson: 'st-ref', src: 'book', emoji: '💡' },
  { w: 'turn over', ru: 'переворачивать (страницу)', ipa: '/ˌtɜːn ˈəʊvə/', pos: 'phr v', def: 'go to the next page of a book or magazine', ex: 'If you turn over the page, you’ll see a map of Egypt.', ctx: ['Read the first page, then ___ the page.'], lesson: 'st-ref', src: 'book', emoji: '📄' },
  // ---- Unit 1 · Reading (pp. 10–11) — highlighted words
  { w: 'van', ru: 'фургон', ipa: '/væn/', pos: 'n', def: 'a road vehicle used for carrying goods', ex: 'Many people also transform vans into tiny mobile homes.', ctx: ['Hannah lives in a ___ with a bed and a small kitchen.'], lesson: 'u1-1', src: 'book', emoji: '🚐' },
  { w: 'take off', ru: 'стать популярным, «взлететь»', ipa: '/ˌteɪk ˈɒf/', pos: 'phr v', def: 'become successful or popular very fast', ex: 'As a result, the idea took off.', ctx: ['The song ___ and soon everyone was singing it.'], acc2: ['took off'], lesson: 'u1-1', src: 'book', emoji: '🚀' },
  { w: 'feature', ru: 'особенность, элемент', ipa: '/ˈfiːtʃə/', pos: 'n', def: 'a part or aspect of something', ex: 'Many of the houses have green energy features, such as solar panels.', ctx: ['The best ___ of this phone is its camera.'], lesson: 'u1-1', src: 'book', emoji: '⚙️' },
  { w: 'facilities', ru: 'удобства, оснащение', ipa: '/fəˈsɪlətiz/', pos: 'n', def: 'equipment and services for a particular purpose', ex: 'Most of the homes have all the facilities you need.', ctx: ['Our school has great sports ___: a pool and two gyms.'], lesson: 'u1-1', src: 'book', emoji: '🚿' },
  { w: 'hut', ru: 'хижина, домик', ipa: '/hʌt/', pos: 'n', def: 'a small, simple wooden building', ex: 'They come in different shapes and styles, including huts and cabins.', ctx: ['We slept in a small wooden ___ in the mountains.'], lesson: 'u1-1', src: 'book', emoji: '🛖' },
  // ---- Unit 1 · Vocabulary (p. 13) — the house and home
  { w: 'attic', ru: 'чердак, мансарда', ipa: '/ˈætɪk/', pos: 'n', def: 'a room or space just below the roof of a house', ex: 'Dad got a ladder and climbed up into the attic to find some old boxes.', ctx: ['We keep old toys in boxes in the ___.'], lesson: 'u1-3', src: 'book', emoji: '📦' },
  { w: 'balcony', ru: 'балкон', ipa: '/ˈbælkəni/', pos: 'n', def: 'a small area outside an upstairs window where you can stand or sit', ex: 'Isabella stood on the balcony and waved to Noah.', ctx: ['We have breakfast on the ___ in summer.'], lesson: 'u1-3', src: 'book', emoji: '🌇' },
  { w: 'basement', ru: 'подвал, цокольный этаж', ipa: '/ˈbeɪsmənt/', pos: 'n', def: 'a room or floor under the ground', ex: 'I felt nervous as I went down into the basement because it was so dark and damp.', ctx: ['The washing machine is downstairs in the ___.'], lesson: 'u1-3', src: 'book', emoji: '🔦' },
  { w: 'ceiling', ru: 'потолок', ipa: '/ˈsiːlɪŋ/', pos: 'n', def: 'the top inside surface of a room', ex: 'I looked up at the ceiling and noticed a big crack from one side of the room to the other.', ctx: ['There’s a spider on the ___ above my bed!'], lesson: 'u1-3', src: 'book', emoji: '💡' },
  { w: 'chimney', ru: 'дымоход, труба', ipa: '/ˈtʃɪmni/', pos: 'n', def: 'a pipe on the roof that takes smoke away from a fire', ex: 'It was cold, so Mum lit a fire and the smoke started to go up the chimney.', ctx: ['Smoke was coming out of the ___.'], lesson: 'u1-3', src: 'book', emoji: '🏭' },
  { w: 'dining room', ru: 'столовая (комната)', ipa: '/ˈdaɪnɪŋ ruːm/', pos: 'n', def: 'a room where people eat meals', ex: 'When dinner was ready, we all went into the dining room and sat down.', ctx: ['We eat in the ___ on Sundays.'], lesson: 'u1-3', src: 'book', emoji: '🍽️' },
  { w: 'fence', ru: 'забор', ipa: '/fens/', pos: 'n', def: 'a wooden or metal wall around a garden or field', ex: 'We couldn’t find the gate into the garden so we had to climb over the fence!', ctx: ['Our dog jumped over the ___ into the street.'], lesson: 'u1-3', src: 'book', emoji: '🚧' },
  { w: 'garage', ru: 'гараж', ipa: '/ˈɡærɑːʒ/', pos: 'n', def: 'a building where you keep a car', ex: 'Mum was in the garage all day, trying to mend her car.', ctx: ['Dad parks the car in the ___.'], lesson: 'u1-3', src: 'book', emoji: '🚗' },
  { w: 'hedge', ru: 'живая изгородь', ipa: '/hedʒ/', pos: 'n', def: 'a line of small trees or bushes around a garden', ex: 'I kicked the ball and it went over the hedge into next door’s garden!', ctx: ['There’s a tall green ___ between our garden and the road.'], lesson: 'u1-3', src: 'book', emoji: '🌳' },
  { w: 'living room', ru: 'гостиная', ipa: '/ˈlɪvɪŋ ruːm/', pos: 'n', def: 'the room in a house where people sit and relax', ex: 'After doing her homework, Ava went into the living room and turned the TV on.', ctx: ['We watch films on the sofa in the ___.'], lesson: 'u1-3', src: 'book', emoji: '🛋️' },
  { w: 'roof', ru: 'крыша', ipa: '/ruːf/', pos: 'n', def: 'the top outside part of a building', ex: 'There was a storm during the night and it almost blew the roof off the house!', ctx: ['There are solar panels on the ___ of our house.'], lesson: 'u1-3', src: 'book', emoji: '🏠' },
  { w: 'study', ru: 'кабинет', ipa: '/ˈstʌdi/', pos: 'n', def: 'a room in a house used for reading and working', ex: 'I like to go into the study when I want to read quietly by myself.', ctx: ['Mum works from home in the ___.'], lesson: 'u1-3', src: 'book', emoji: '📚' },
  // ---- Unit 1 · phrasal verbs (p. 13 / p. 151)
  { w: 'do up', ru: 'ремонтировать, обновлять', ipa: '/ˌduː ˈʌp/', pos: 'phr v', def: 'repair, improve the appearance of', ex: 'It took us a long time to do the house up, but now it looks great!', ctx: ['My parents want to ___ the old kitchen and paint it yellow.'], lesson: 'u1-3', src: 'book', emoji: '🔨' },
  { w: 'move in', ru: 'въезжать, заселяться', ipa: '/ˌmuːv ˈɪn/', pos: 'phr v', def: 'start living in a house', ex: 'When we moved in, our new neighbours welcomed us.', ctx: ['Our new neighbours are going to ___ next week.'], lesson: 'u1-3', src: 'book', emoji: '🔑' },
  { w: 'move out', ru: 'съезжать', ipa: '/ˌmuːv ˈaʊt/', pos: 'phr v', def: 'stop living in a house', ex: 'When we moved out, it was very sad to leave the house we loved so much.', ctx: ['My brother wants to ___ and live with his friends.'], lesson: 'u1-3', src: 'book', emoji: '📦' },
  { w: 'pull down', ru: 'сносить (здание)', ipa: '/ˌpʊl ˈdaʊn/', pos: 'phr v', def: 'demolish, knock to the ground', ex: 'I can’t believe they’ve pulled my primary school down!', ctx: ['They want to ___ the old cinema and build flats.'], lesson: 'u1-3', src: 'book', emoji: '🏚️' },
  { w: 'put up', ru: 'приютить, предоставить ночлег', ipa: '/ˌpʊt ˈʌp/', pos: 'phr v', def: 'provide accommodation for', ex: 'Could you put me up for a few days?', ctx: ['Hotels are expensive, but my aunt can ___ the whole family for a week.'], lesson: 'u1-3', src: 'book', emoji: '🛏️' },
  { w: 'rent out', ru: 'сдавать в аренду', ipa: '/ˌrent ˈaʊt/', pos: 'phr v', def: 'make available for others to live in for money', ex: 'Mum is thinking of renting out the spare room to make a bit of money.', ctx: ['They ___ their flat to tourists in summer.'], lesson: 'u1-3', src: 'book', emoji: '💶' },
  { w: 'settle in', ru: 'обжиться, освоиться', ipa: '/ˌsetl ˈɪn/', pos: 'phr v', def: 'become comfortable in a new place', ex: 'Has George settled in at university yet?', ctx: ['It took me a month to ___ at my new school.'], lesson: 'u1-3', src: 'book', emoji: '🏡' },
  { w: 'tidy up', ru: 'убирать, наводить порядок', ipa: '/ˌtaɪdi ˈʌp/', pos: 'phr v', def: 'make neat and clean', ex: 'I have to tidy my bedroom up once a week.', ctx: ['Please ___ your room before your friends come.'], lesson: 'u1-3', src: 'book', emoji: '🧹' },
  // ---- Unit 1 · word patterns (p. 13 / p. 151)
  { w: 'keen on', ru: 'увлечённый чем-то (be keen on)', ipa: '/ˈkiːn ɒn/', pos: 'phr', def: 'like something a lot (+ doing sth)', ex: 'My mum’s not very keen on flying, so she usually takes the train.', ctx: ['I’m not very ___ cooking.'], lesson: 'u1-3', src: 'book', emoji: '😍' },
  { w: 'worth', ru: 'стоящий (be worth doing — стоит сделать)', ipa: '/wɜːθ/', pos: 'phr', def: 'be good or useful enough to do (+ doing sth)', ex: 'It’s not worth travelling all the way to New York just for a weekend.', ctx: ['The museum is ___ visiting.'], lesson: 'u1-3', src: 'book', emoji: '💎' },
  { w: 'depend on', ru: 'зависеть от', ipa: '/dɪˈpend ɒn/', pos: 'phr v', def: 'be decided by something', ex: 'Your success in the test depends on how much work you do.', ctx: ['Our plans ___ the weather.'], lesson: 'u1-3', src: 'book', emoji: '⚖️' },
  // ---- Unit 1 · Listening (p. 14)
  { w: 'stilts', ru: 'сваи, ходули', ipa: '/stɪlts/', pos: 'n', def: 'long poles that hold a house above the ground or water', ex: 'In the Philippines, some houses are built on stilts.', ctx: ['The house stands on ___ above the water.'], lesson: 'u1-4', src: 'book', emoji: '🏘️' },
  { w: 'yurt', ru: 'юрта', ipa: '/jɜːt/', pos: 'n', def: 'a round tent used as a home in Mongolia', ex: 'Leyla stayed in a yurt in Mongolia.', ctx: ['Nomads in Mongolia live in a ___.'], lesson: 'u1-4', src: 'book', emoji: '⛺' },
  { w: 'underground', ru: 'подземный', ipa: '/ˌʌndəˈɡraʊnd/', pos: 'adj', def: 'under the surface of the ground', ex: 'People sometimes build houses underground in Tunisia.', ctx: ['It’s cool inside an ___ house in summer.'], lesson: 'u1-4', src: 'book', emoji: '⛰️' },
  // ---- Unit 1 · Language in Use (p. 17)
  { w: 'houseboat', ru: 'плавучий дом', ipa: '/ˈhaʊsbəʊt/', pos: 'n', def: 'a boat that people live in', ex: 'Sara is 14 and lives on a houseboat in London with her parents.', ctx: ['They live on a ___ on the canal.'], lesson: 'u1-7', src: 'book', emoji: '⛵' }
];

/* Unit 2 textbook vocabulary; Russian glosses and examples are platform support. */
for (const v of [
  {
    "w": "camping trip",
    "ru": "поход с ночёвкой в палатке",
    "ipa": "",
    "pos": "n",
    "def": "поход с ночёвкой в палатке",
    "ex": "We went on a camping trip in the mountains.",
    "ctx": [
      "We went on a ___ in the mountains."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "school trip",
    "ru": "школьная поездка",
    "ipa": "",
    "pos": "n",
    "def": "школьная поездка",
    "ex": "Our class went on a school trip to the museum.",
    "ctx": [
      "Our class went on a ___ to the museum."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "package holiday",
    "ru": "пакетный тур",
    "ipa": "",
    "pos": "n",
    "def": "пакетный тур",
    "ex": "Our package holiday includes flights and a hotel.",
    "ctx": [
      "Our ___ includes flights and a hotel."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "cruise",
    "ru": "круиз",
    "ipa": "",
    "pos": "n",
    "def": "круиз",
    "ex": "We went on a cruise around the islands.",
    "ctx": [
      "We went on a ___ around the islands."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "guided tour",
    "ru": "экскурсия с гидом",
    "ipa": "",
    "pos": "n",
    "def": "экскурсия с гидом",
    "ex": "We took a guided tour of the old town.",
    "ctx": [
      "We took a ___ of the old town."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "business trip",
    "ru": "командировка",
    "ipa": "",
    "pos": "n",
    "def": "командировка",
    "ex": "My mum is on a business trip this week.",
    "ctx": [
      "My mum is on a ___ this week."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "backpacker",
    "ru": "турист с рюкзаком",
    "ipa": "",
    "pos": "n",
    "def": "турист с рюкзаком",
    "ex": "The backpacker stayed in a cheap hostel.",
    "ctx": [
      "The ___ stayed in a cheap hostel."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "campsite",
    "ru": "кемпинг",
    "ipa": "",
    "pos": "n",
    "def": "кемпинг",
    "ex": "We put our tent up at the campsite.",
    "ctx": [
      "We put our tent up at the ___."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "currency",
    "ru": "валюта",
    "ipa": "",
    "pos": "n",
    "def": "валюта",
    "ex": "What currency do people use in Japan?",
    "ctx": [
      "What ___ do people use in Japan?"
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "guest",
    "ru": "гость",
    "ipa": "",
    "pos": "n",
    "def": "гость",
    "ex": "Each guest receives a room key.",
    "ctx": [
      "Each ___ receives a room key."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "guidebook",
    "ru": "путеводитель",
    "ipa": "",
    "pos": "n",
    "def": "путеводитель",
    "ex": "Our guidebook lists the best places to visit.",
    "ctx": [
      "Our ___ lists the best places to visit."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "hostel",
    "ru": "хостел",
    "ipa": "",
    "pos": "n",
    "def": "хостел",
    "ex": "We booked two beds in a hostel.",
    "ctx": [
      "We booked two beds in a ___."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "luggage",
    "ru": "багаж",
    "ipa": "",
    "pos": "n",
    "def": "багаж",
    "ex": "Please keep your luggage with you.",
    "ctx": [
      "Please keep your ___ with you."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "passport",
    "ru": "паспорт",
    "ipa": "",
    "pos": "n",
    "def": "паспорт",
    "ex": "Show your passport at the border.",
    "ctx": [
      "Show your ___ at the border."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "resort",
    "ru": "курорт",
    "ipa": "",
    "pos": "n",
    "def": "курорт",
    "ex": "The beach resort has two swimming pools.",
    "ctx": [
      "The beach ___ has two swimming pools."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "sightseer",
    "ru": "турист, осматривающий достопримечательности",
    "ipa": "",
    "pos": "n",
    "def": "турист, осматривающий достопримечательности",
    "ex": "The sightseer photographed the palace.",
    "ctx": [
      "The ___ photographed the palace."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "tour guide",
    "ru": "экскурсовод",
    "ipa": "",
    "pos": "n",
    "def": "экскурсовод",
    "ex": "The tour guide explained the history of the castle.",
    "ctx": [
      "The ___ explained the history of the castle."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  },
  {
    "w": "tourist",
    "ru": "турист",
    "ipa": "",
    "pos": "n",
    "def": "турист",
    "ex": "A tourist asked me how to get to the museum.",
    "ctx": [
      "A ___ asked me how to get to the museum."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍"
  }
]) { if (!VOCAB.some(old => old.w === v.w && old.lesson.startsWith('u2-'))) VOCAB.push(v); }

/* Unit 2 target lexis. Translations, definitions and practice examples prepared for the platform. */
for(const v of [
  {
    "w": "untidy",
    "ru": "неопрятный; неубранный",
    "ipa": "",
    "pos": "adj",
    "ex": "My room is untidy because my clothes are on the floor.",
    "ctx": [
      "My room is ___ because my clothes are on the floor."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "not neat or organised"
  },
  {
    "w": "uncomfortable",
    "ru": "неудобный",
    "ipa": "",
    "pos": "adj",
    "ex": "The bed was uncomfortable, so I couldn’t sleep.",
    "ctx": [
      "The bed was ___, so I couldn’t sleep."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "not pleasant to sit, lie or stay in"
  },
  {
    "w": "unfair",
    "ru": "несправедливый",
    "ipa": "",
    "pos": "adj",
    "ex": "It is unfair to blame one person for everyone’s mistake.",
    "ctx": [
      "It is ___ to blame one person for everyone’s mistake."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "not treating people equally or reasonably"
  },
  {
    "w": "irresponsible",
    "ru": "безответственный",
    "ipa": "",
    "pos": "adj",
    "ex": "It is irresponsible to leave rubbish on the beach.",
    "ctx": [
      "It is ___ to leave rubbish on the beach."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "not thinking about the results of your actions"
  },
  {
    "w": "unhelpful",
    "ru": "не готовый помочь; бесполезный",
    "ipa": "",
    "pos": "adj",
    "ex": "The receptionist was unhelpful and refused to answer our questions.",
    "ctx": [
      "The receptionist was ___ and refused to answer our questions."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "not giving help or useful information"
  },
  {
    "w": "impatient",
    "ru": "нетерпеливый",
    "ipa": "",
    "pos": "adj",
    "ex": "The passengers became impatient during the long delay.",
    "ctx": [
      "The passengers became ___ during the long delay."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "annoyed because you have to wait"
  },
  {
    "w": "illegal",
    "ru": "незаконный",
    "ipa": "",
    "pos": "adj",
    "ex": "It is illegal to enter this area without permission.",
    "ctx": [
      "It is ___ to enter this area without permission."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "not allowed by law"
  },
  {
    "w": "unhappy",
    "ru": "несчастный; недовольный",
    "ipa": "",
    "pos": "adj",
    "ex": "We were unhappy when our holiday was cancelled.",
    "ctx": [
      "We were ___ when our holiday was cancelled."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "sad or not pleased"
  },
  {
    "w": "uncertain",
    "ru": "неуверенный; неопределённый",
    "ipa": "",
    "pos": "adj",
    "ex": "I am uncertain about our travel plans.",
    "ctx": [
      "I am ___ about our travel plans."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "not sure about something"
  },
  {
    "w": "dishonest",
    "ru": "нечестный",
    "ipa": "",
    "pos": "adj",
    "ex": "It is dishonest to lie about the price.",
    "ctx": [
      "It is ___ to lie about the price."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "not telling the truth or acting fairly"
  },
  {
    "w": "unpopular",
    "ru": "непопулярный",
    "ipa": "",
    "pos": "adj",
    "ex": "The new airport charge was unpopular with travellers.",
    "ctx": [
      "The new airport charge was ___ with travellers."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "not liked by many people"
  },
  {
    "w": "unable",
    "ru": "неспособный; не имеющий возможности",
    "ipa": "",
    "pos": "adj",
    "ex": "We were unable to leave because the road was closed.",
    "ctx": [
      "We were ___ to leave because the road was closed."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "not able to do something"
  },
  {
    "w": "impossible",
    "ru": "невозможный",
    "ipa": "",
    "pos": "adj",
    "ex": "It was impossible to sleep because of the noise.",
    "ctx": [
      "It was ___ to sleep because of the noise."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "not possible"
  },
  {
    "w": "disabled",
    "ru": "имеющий инвалидность",
    "ipa": "",
    "pos": "adj",
    "ex": "The hotel provides accessible rooms for disabled guests.",
    "ctx": [
      "The hotel provides accessible rooms for ___ guests."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "having a condition that can affect the activities a person can do"
  },
  {
    "w": "influence",
    "ru": "влиять на",
    "ipa": "",
    "pos": "v",
    "ex": "Online reviews can influence our holiday choices.",
    "ctx": [
      "Online reviews can ___ our holiday choices."
    ],
    "lesson": "u2-reading",
    "src": "book",
    "emoji": "🌍",
    "def": "affect the way someone thinks or behaves"
  },
  {
    "w": "effect",
    "ru": "влияние; результат",
    "ipa": "",
    "pos": "n",
    "ex": "Tourism can have a positive effect on local businesses.",
    "ctx": [
      "Tourism can have a positive ___ on local businesses."
    ],
    "lesson": "u2-reading",
    "src": "book",
    "emoji": "🌍",
    "def": "a change caused by something"
  },
  {
    "w": "affects",
    "ru": "влияет на",
    "ipa": "",
    "pos": "v",
    "ex": "Being tired affects my ability to concentrate.",
    "ctx": [
      "Being tired ___ my ability to concentrate."
    ],
    "lesson": "u2-reading",
    "src": "book",
    "emoji": "🌍",
    "def": "changes or influences something"
  },
  {
    "w": "rubbish",
    "ru": "мусор",
    "ipa": "",
    "pos": "n",
    "ex": "Please take your rubbish home after your picnic.",
    "ctx": [
      "Please take your ___ home after your picnic."
    ],
    "lesson": "u2-reading",
    "src": "book",
    "emoji": "🌍",
    "def": "things people throw away"
  },
  {
    "w": "previously",
    "ru": "ранее; прежде",
    "ipa": "",
    "pos": "adv",
    "ex": "This quiet village was previously unknown to most tourists.",
    "ctx": [
      "This quiet village was ___ unknown to most tourists."
    ],
    "lesson": "u2-reading",
    "src": "book",
    "emoji": "🌍",
    "def": "before the time being talked about"
  },
  {
    "w": "wildlife",
    "ru": "дикая природа; дикие животные",
    "ipa": "",
    "pos": "n",
    "ex": "We saw amazing wildlife in the national park.",
    "ctx": [
      "We saw amazing ___ in the national park."
    ],
    "lesson": "u2-reading",
    "src": "book",
    "emoji": "🌍",
    "def": "animals and plants living in natural conditions"
  },
  {
    "w": "speed up",
    "ru": "ускоряться; ускорять",
    "ipa": "",
    "pos": "phr v",
    "ex": "The driver had to speed up on the motorway.",
    "ctx": [
      "The driver had to ___ on the motorway."
    ],
    "lesson": "u2-use",
    "src": "book",
    "emoji": "🌍",
    "def": "move or happen faster"
  },
  {
    "w": "pick up",
    "ru": "заезжать за кем-либо; забирать",
    "ipa": "",
    "pos": "phr v",
    "ex": "My dad will pick up my sister from the station.",
    "ctx": [
      "My dad will ___ my sister from the station."
    ],
    "lesson": "u2-use",
    "src": "book",
    "emoji": "🌍",
    "def": "collect someone in a vehicle"
  },
  {
    "w": "turn up",
    "ru": "появляться; приезжать",
    "ipa": "",
    "pos": "phr v",
    "ex": "Our friends might turn up later this evening.",
    "ctx": [
      "Our friends might ___ later this evening."
    ],
    "lesson": "u2-use",
    "src": "book",
    "emoji": "🌍",
    "def": "arrive at a place"
  },
  {
    "w": "set off",
    "ru": "отправляться в путь",
    "ipa": "",
    "pos": "phr v",
    "ex": "We need to set off early to avoid the traffic.",
    "ctx": [
      "We need to ___ early to avoid the traffic."
    ],
    "lesson": "u2-use",
    "src": "book",
    "emoji": "🌍",
    "def": "begin a journey"
  },
  {
    "w": "take off",
    "ru": "взлетать (о самолёте)",
    "ipa": "",
    "pos": "phr v",
    "ex": "The plane will take off in ten minutes.",
    "ctx": [
      "The plane will ___ in ten minutes."
    ],
    "lesson": "u2-use",
    "src": "book",
    "emoji": "🌍",
    "def": "leave the ground and begin to fly"
  },
  {
    "w": "check in",
    "ru": "регистрироваться (на рейс; в отеле)",
    "ipa": "",
    "pos": "phr v",
    "ex": "We can check in online before we go to the airport.",
    "ctx": [
      "We can ___ online before we go to the airport."
    ],
    "lesson": "u2-use",
    "src": "book",
    "emoji": "🌍",
    "def": "register your arrival at an airport or hotel"
  },
  {
    "w": "break down",
    "ru": "ломаться (о транспорте)",
    "ipa": "",
    "pos": "phr v",
    "ex": "Old cars sometimes break down on long journeys.",
    "ctx": [
      "Old cars sometimes ___ on long journeys."
    ],
    "lesson": "u2-use",
    "src": "book",
    "emoji": "🌍",
    "def": "stop working because of a fault"
  },
  {
    "w": "drop off",
    "ru": "подвозить и высаживать",
    "ipa": "",
    "pos": "phr v",
    "ex": "Can you drop off my brother outside the school?",
    "ctx": [
      "Can you ___ my brother outside the school?"
    ],
    "lesson": "u2-use",
    "src": "book",
    "emoji": "🌍",
    "def": "take someone somewhere and leave them there"
  },
  {
    "w": "show up",
    "ru": "появляться; приходить",
    "ipa": "",
    "pos": "phr v",
    "ex": "Please show up at the station before eight.",
    "ctx": [
      "Please ___ at the station before eight."
    ],
    "lesson": "u2-use",
    "src": "book",
    "emoji": "🌍",
    "def": "arrive or appear"
  },
  {
    "w": "pack up",
    "ru": "собирать вещи",
    "ipa": "",
    "pos": "phr v",
    "ex": "We must pack up our tent before we leave.",
    "ctx": [
      "We must ___ our tent before we leave."
    ],
    "lesson": "u2-use",
    "src": "book",
    "emoji": "🌍",
    "def": "put your belongings into bags before leaving"
  },
  {
    "w": "drop in",
    "ru": "заходить ненадолго",
    "ipa": "",
    "pos": "phr v",
    "ex": "We might drop in on our cousins during our trip.",
    "ctx": [
      "We might ___ on our cousins during our trip."
    ],
    "lesson": "u2-use",
    "src": "book",
    "emoji": "🌍",
    "def": "make a short informal visit"
  },
  {
    "w": "close down",
    "ru": "закрываться; прекращать работу",
    "ipa": "",
    "pos": "phr v",
    "ex": "The old hotel may close down next year.",
    "ctx": [
      "The old hotel may ___ next year."
    ],
    "lesson": "u2-use",
    "src": "book",
    "emoji": "🌍",
    "def": "stop operating permanently"
  },
  {
    "w": "take out",
    "ru": "вынимать; выносить",
    "ipa": "",
    "pos": "phr v",
    "ex": "Please take out your passport at the desk.",
    "ctx": [
      "Please ___ your passport at the desk."
    ],
    "lesson": "u2-use",
    "src": "book",
    "emoji": "🌍",
    "def": "remove something from a place"
  },
  {
    "w": "go out",
    "ru": "выходить",
    "ipa": "",
    "pos": "phr v",
    "ex": "We can go out after we finish packing.",
    "ctx": [
      "We can ___ after we finish packing."
    ],
    "lesson": "u2-use",
    "src": "book",
    "emoji": "🌍",
    "def": "leave a building to do an activity"
  },
  {
    "w": "have time to",
    "ru": "иметь время, чтобы",
    "ipa": "",
    "pos": "phr",
    "ex": "Do you have time to explore the city today?",
    "ctx": [
      "Do you ___ explore the city today?"
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "have enough time to do something"
  },
  {
    "w": "spend time",
    "ru": "проводить время; тратить время",
    "ipa": "",
    "pos": "phr",
    "ex": "Do you spend time reading on holiday?",
    "ctx": [
      "Do you ___ reading on holiday?"
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "use a period of time doing an activity"
  },
  {
    "w": "interested in",
    "ru": "интересующийся чем-либо",
    "ipa": "",
    "pos": "phr",
    "ex": "I am interested in visiting historical places.",
    "ctx": [
      "I am ___ visiting historical places."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "wanting to know or learn about something"
  },
  {
    "w": "look forward to",
    "ru": "с нетерпением ждать",
    "ipa": "",
    "pos": "phr v",
    "ex": "I always look forward to the summer holidays.",
    "ctx": [
      "I always ___ the summer holidays."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "feel excited about something that will happen"
  },
  {
    "w": "keen on",
    "ru": "увлекающийся; любящий",
    "ipa": "",
    "pos": "phr",
    "ex": "My sister is keen on trying new food.",
    "ctx": [
      "My sister is ___ trying new food."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "very interested in an activity"
  },
  {
    "w": "prevent someone from",
    "ru": "мешать; препятствовать",
    "ipa": "",
    "pos": "phr",
    "ex": "Bad weather can prevent someone from travelling.",
    "ctx": [
      "Bad weather can ___ travelling."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "stop someone doing something"
  },
  {
    "w": "ready for",
    "ru": "готовый к",
    "ipa": "",
    "pos": "phr",
    "ex": "We are ready for our next adventure.",
    "ctx": [
      "We are ___ our next adventure."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "prepared for something"
  },
  {
    "w": "make someone do",
    "ru": "заставлять кого-либо делать",
    "ipa": "",
    "pos": "phr",
    "ex": "A coach can make someone do a safety check.",
    "ctx": [
      "A coach can ___ a safety check."
    ],
    "lesson": "u2-vocabulary",
    "src": "book",
    "emoji": "🌍",
    "def": "force or require a person to do something"
  }
]){if(!VOCAB.some(old=>old.w===v.w&&old.lesson.startsWith('u2-')))VOCAB.push(v);}
