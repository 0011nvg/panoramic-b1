/* Unit 3 lexical inventory from SB pp.32–41. Russian translations, definitions,
   context sentences and pronunciation support are prepared for this platform. */
(function(){
'use strict';
const rows=[
['hiking','пешие походы','walking in the countryside for pleasure','We enjoy hiking in the mountains.','We enjoy ___ in the mountains.','n','🥾'],
['horse-riding','верховая езда','the activity of riding a horse','I would like to try horse-riding.','I would like to try ___.','n','🐎'],
['ice skating','катание на коньках','moving on ice while wearing skates','Ice skating is fun in winter.','We go ___ at the ice rink.','n','⛸️'],
['rock climbing','скалолазание','the sport of climbing rocks or climbing walls','Rock climbing requires safety equipment.','You need a rope and a helmet for ___.','n','🧗'],
['sailing','парусный спорт; плавание под парусом','travelling in a boat that uses the wind','I’d like to try sailing.','We use the wind to move the boat when we go ___.','n','⛵'],
['skiing','катание на лыжах','moving over snow on skis','We go skiing in winter.','You need skis and snow to go ___.','n','🎿'],
['snowboarding','катание на сноуборде','moving down snow on one wide board','I enjoy snowboarding, although I’m not very good at it.','She uses one wide board when she goes ___.','n','🏂'],
['sky-diving','прыжки с парашютом','jumping from a plane and using a parachute','I would love to try sky-diving.','Jumping from a plane with a parachute is called ___.','n','🪂'],
['work out','заниматься физическими упражнениями','do physical exercise','I usually work out at the gym twice a week.','I ___ at the gym twice a week.','phr v','🏋️'],
['sleep in','спать дольше обычного утром','stay in bed in the morning longer than usual','I sleep in on Sundays because I’m tired at the end of the week.','I have no early plans, so I can ___ tomorrow.','phr v','😴'],
['call off','отменять','cancel an event','There aren’t enough players, so they’re going to call off the match.','The storm means they must ___ the match.','phr v','❌'],
['go out','выходить куда-либо; встречаться с друзьями','leave your house to meet friends or enjoy yourself','We’re going to go out tonight to celebrate my birthday.','Would you like to ___ for a meal tonight?','phr v','🎉'],
['stay up','не ложиться спать','go to bed later than usual','I often stay up late on Friday night.','I sometimes ___ late to finish a book.','phr v','🌙'],
['take up','начать заниматься новым увлечением','start doing a new hobby','I’m going to take up hiking in my free time.','I want to ___ a new hobby this year.','phr v','🌱'],
['get together','собираться вместе; встречаться','meet and spend time together','My class is going to get together after the exams.','Let’s ___ after the exams and celebrate.','phr v','🤝'],
['eat out','есть в кафе или ресторане','have a meal in a restaurant','I eat out with my family once a month.','We don’t want to cook tonight, so let’s ___.','phr v','🍽️'],
['take a break','сделать перерыв','stop working or studying for a short time','They’re going to take a break from studying so they can relax.','You have studied for an hour; you should ___.','phr','☕'],
['have the day off','иметь свободный от учёбы или работы день','not have to work or go to school for a day','We’re going to go sailing the next time we have the day off school.','We can visit the beach when we ___ school.','phr','🗓️'],
['make time','найти время','arrange to have enough time for something','You should always make time for your interests.','Even when you are busy, try to ___ for your friends.','phr','⏰'],
['have a go','попробовать; сделать попытку','try doing something','I’d like to have a go at surfing.','I’ve never tried surfing, but I’d like to ___ at it.','phr','🎯'],
['have a good time','хорошо провести время','enjoy yourself','They always have a good time on holiday.','We hope you ___ at the party.','phr','😊'],
['spend time','проводить время','use time doing an activity or being with someone','I love to spend time with my friends at weekends.','I like to ___ with my cousins at weekends.','phr','⌛'],
['ramps','наклонные площадки; рампы','slopes that connect different levels','No skateboards or BMX bikes allowed on the ramps until after 6 pm.','The skate park has several ___ for riders.','n','🛹'],
['refreshments','угощение; лёгкая еда и напитки','food and drinks served at an event','Refreshments provided – including pizza.','There will be ___ after the meeting: juice and sandwiches.','n','🥤'],
['choir','хор','a group of people who sing together','Choir practice will take place in Room 12.','My sister sings with a group in the school ___.','n','🎶'],
['applications','заявки; заявления','written requests for a job or a place on a course','Applications will close this Saturday.','The college is accepting ___ for its summer course.','n','📝'],
['everyone welcome','приглашаются все; всем рады','anyone is encouraged to attend','Everyone welcome! Tell your friends!','The invitation says “___!”, so anybody can come.','phr','👋'],
['entertaining','занимательный; увлекательный','enjoyable or fun to do or watch','I’ve never been, but I think it will be entertaining!','The film was funny and very ___.','adj','🎭'],
['geocaching','геокешинг; поиск тайников по координатам','an outdoor activity in which people use coordinates to find hidden containers','A group of us are going to go geocaching this weekend.','We use coordinates to find hidden containers when we go ___.','n','🧭'],
['in-line skating','катание на роликовых коньках','skating with wheels arranged in one line','There’s one activity I think I would really enjoy: in-line skating.','Skating with wheels in a single row is called ___.','n','🛼'],
['musical','мюзикл','a play or film with songs and dancing','Do you like musicals?','A show with songs, acting and dancing is a ___.','n','🎭'],
['documentary','документальный фильм','a film or programme giving facts about real events or subjects','They are talking about an animal documentary.','This ___ explains how wild animals live.','n','🎬'],
['keen on','увлекающийся; любящий что-либо','interested in and enjoying something','I’m not very keen on extreme sports.','I’m ___ chess because I enjoy solving problems.','phr','💙'],
['a big fan of','большой любитель чего-либо','someone who likes something very much','I’m a big fan of trying new things.','I’m ___ outdoor activities; I really enjoy them.','phr','⭐'],
['in my opinion','по моему мнению','used to introduce what you think','In my opinion, it would be a lot of fun.','___, everyone should spend some time outdoors.','phr','💬'],
['in spite of','несмотря на','used before a noun or -ing to show a contrast','Julia is good at basketball, in spite of hating sport.','We went hiking ___ the rain.','prep','☔'],
['despite','несмотря на','used before a noun or -ing to show a contrast','Despite being fit, Izzy can’t stay on a surfboard.','___ the cold weather, we enjoyed our walk.','prep','🌧️']
];
for(const [w,ru,def,ex,ctx,pos,emoji] of rows){
 const vocabulary=['hiking','horse-riding','ice skating','rock climbing','sailing','skiing','snowboarding','sky-diving','work out','sleep in','call off','go out','stay up','take up','get together','eat out','take a break','have the day off','make time','have a go','have a good time','spend time'];
 const reading=['ramps','refreshments','choir','applications','everyone welcome','entertaining','geocaching'];
 const lesson=reading.includes(w)?'u3-reading':vocabulary.includes(w)?'u3-vocabulary':['in spite of','despite'].includes(w)?'u3-use':['in my opinion','in-line skating'].includes(w)?'u3-writing':['musical','documentary'].includes(w)?'u3-listening':'u3-speaking';
 const alt=w==='horse-riding'?['horse riding']:w==='sky-diving'?['skydiving','sky diving']:w==='in-line skating'?['inline skating','in line skating']:[];
 VOCAB.push({w,ru,def,ex,ctx:[ctx],pos,emoji,lesson,src:'book',ipa:'',alt});
}
})();
