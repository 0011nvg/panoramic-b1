/* GitHub Actions browser regression suite.
   node tests/qa.js http://localhost:8765/ [optional-screenshot-directory]
   Root's live visual review uses the supported browser tool separately. */
const { chromium } = require('playwright');
const fs = require('fs');
const BASE = (process.argv[2] || 'http://localhost:8765/').replace(/\/?$/, '/');
const SHOTS = process.argv[3] || null;
let pass = 0, fail = 0;
const failures = [];
function ok(condition,message){if(condition)pass++;else{fail++;failures.push(message);console.error('FAIL '+message);}}
(async()=>{
  const browser=await chromium.launch();
  const context=await browser.newContext({viewport:{width:1366,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push('pageerror: '+e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push('console: '+m.text());});
  page.on('response',r=>{if(r.status()>=400)errors.push('HTTP '+r.status()+' '+r.url());});
  if(SHOTS)fs.mkdirSync(SHOTS,{recursive:true});
  await page.goto(BASE);
  await page.waitForSelector('.cmap');
  const info=await page.evaluate(()=>({
    units:BOOK.units.map(u=>u.id),lessons:BOOK.units.flatMap(u=>u.lessons),
    audio:[...new Set(Object.values(LESSONS).flatMap(l=>l.sections.flatMap(s=>s.items.filter(i=>i.audio?.file).map(i=>i.audio.file))))]
  }));
  ok(JSON.stringify(info.units)===JSON.stringify(['st','u1','u2','r12','u3','u4','r34']),'seven sections in book order');
  ok(await page.locator('.cm').count()===7,'menu contains exactly seven sections');
  ok(await page.locator('.cm.soon').count()===0,'all seven course sections can open');
  ok((await page.title()).startsWith('Optimise B1'),'published project title');
  ok(!errors.length,'entry loads without console or HTTP errors: '+errors.join(' | '));
  for(const file of info.audio){
    const response=await page.request.get(BASE+file);
    ok(response.status()===200&&(await response.body()).length>50000,'audio response '+file);
    const duration=await page.evaluate(file=>new Promise(resolve=>{
      const audio=new Audio();const timeout=setTimeout(()=>finish(0),10000);
      function finish(value){clearTimeout(timeout);audio.removeAttribute('src');audio.load();resolve(value);}
      audio.onloadedmetadata=()=>finish(audio.duration);audio.onerror=()=>finish(0);audio.src=file;
    }),file);
    ok(Number.isFinite(duration)&&duration>1,'audio decodes '+file);
  }
  ok(info.audio.length===19,'all supplied audio tracks are exercised');
  const visibleCheck=()=>{
    const visible=el=>{const rect=el.getBoundingClientRect(),style=getComputedStyle(el);return !!(rect.width&&rect.height)&&style.display!=='none'&&style.visibility!=='hidden'&&!el.closest('[hidden]');};
    const broken=[...document.querySelectorAll('main img')].filter(visible).filter(img=>!img.complete||!img.naturalWidth).map(img=>img.getAttribute('src'));
    return {width:innerWidth,scroll:document.documentElement.scrollWidth,broken,cards:document.querySelectorAll('.ex').length,teacher:[...document.querySelectorAll('.tutor-only,.model-ans,.keysrc,.tnote,.teacher-answers')].filter(visible).length};
  };
  for(const width of [375,820,1366]){
    await page.setViewportSize({width,height:900});
    for(const id of info.lessons){
      errors.length=0;
      await page.goto(BASE+'#/lesson/'+id);
      await page.waitForSelector('.ex');
      await page.evaluate(()=>document.querySelectorAll('main img').forEach(img=>img.loading='eager'));
      await page.waitForFunction(()=>[...document.querySelectorAll('main img')].every(img=>img.complete),null,{timeout:15000});
      const result=await page.evaluate(visibleCheck);
      ok(result.cards>0,id+'@'+width+' renders exercises');
      ok(result.scroll<=width+1,id+'@'+width+' no horizontal scroll ('+result.scroll+')');
      ok(!result.broken.length,id+'@'+width+' images load '+result.broken.join(', '));
      ok(result.teacher===0,id+'@'+width+' teacher material hidden');
      ok(!errors.length,id+'@'+width+' no console/HTTP errors '+errors.join(' | '));
      if(SHOTS&&width!==820)await page.screenshot({path:SHOTS+'/'+id+'-'+width+'.png',fullPage:false});
    }
  }
  // A real student attempt, retry, hint, keyboard choice, and persistence.
  await page.setViewportSize({width:1366,height:900});
  await page.goto(BASE+'#/lesson/u1-2');
  const exercise=page.locator('#ex-u12-1');
  ok(!(await exercise.locator('.reveal').isVisible()),'student reveal hidden before attempting');
  await exercise.getByRole('button',{name:'Check Answers',exact:true}).click();
  ok(await exercise.locator('.reveal').isVisible(),'student reveal available after an attempt');
  await exercise.getByRole('button',{name:'Need a Hint?',exact:true}).click();
  ok(await exercise.locator('.ex-hint').isVisible(),'hint opens');
  await exercise.getByRole('button',{name:'Try Again',exact:true}).click();
  const expected=await page.evaluate(()=>LESSONS['u1-2'].sections[0].items.find(i=>i.id==='u12-1').lines.flat().filter(s=>typeof s==='object').map(s=>[].concat(s.a)[0]));
  const groups=exercise.locator('.ich');
  for(let i=0;i<expected.length;i++){const button=groups.nth(i).locator('.ich-o').nth(expected[i]);await button.focus();await button.press('Enter');}
  await exercise.getByRole('button',{name:'Check Answers',exact:true}).click();
  ok((await exercise.locator('.ex-fb .pct').textContent())==='100%','correct keyboard choices score 100%');
  await page.waitForTimeout(350);
  const before=await page.evaluate(()=>JSON.stringify(Core.Store.data().ex['u12-1']));
  await page.reload();await page.waitForSelector('#ex-u12-1');
  ok((await page.evaluate(()=>JSON.stringify(Core.Store.data().ex['u12-1'])))===before,'student progress survives reload');
  await page.locator('#ex-u12-1').getByRole('button',{name:'Reset Exercise',exact:true}).click();
  await page.getByRole('dialog').getByRole('button',{name:'Сбросить',exact:true}).click();
  ok(await page.locator('#ex-u12-1 .ich-o[aria-checked=true]').count()===0,'exercise reset clears selected choices');
  // Teacher panels must reveal their own content without filling or scoring student work.
  await page.evaluate(()=>{sessionStorage.setItem('tutorUnlock','1');Core.Tutor.set(true);});
  for(const id of info.lessons){
    errors.length=0;await page.goto(BASE+'#/lesson/'+id);await page.waitForSelector('.ex');
    const results=await page.evaluate(()=>{
      const serialize=()=>JSON.stringify({fields:[...document.querySelectorAll('.ex input,.ex select,.ex textarea')].map(el=>({value:el.value,checked:el.checked})),chosen:[...document.querySelectorAll('.ex [aria-checked],.ex [aria-pressed]')].filter(el=>!el.classList.contains('teacher-answer-toggle')).map(el=>[el.getAttribute('aria-checked'),el.getAttribute('aria-pressed')]),store:Core.Store.data()});
      const before=serialize(),out=[];
      for(const button of document.querySelectorAll('.teacher-answer-toggle')){
        const card=button.closest('.ex'),panel=card.querySelector('.teacher-answers');
        const empty=panel.hidden&&!panel.childNodes.length;
        button.focus(); // Actual keyboard/user focus must also leave student progress unchanged.
        button.click();
        const shown=!panel.hidden&&!!panel.textContent.trim()&&button.getAttribute('aria-expanded')==='true';
        const noInputs=!panel.querySelector('input,select,textarea');
        button.click();
        const hidden=panel.hidden&&!panel.childNodes.length&&button.getAttribute('aria-expanded')==='false';
        out.push({id:card.dataset.id,empty,shown,hidden,noInputs});
      }
      return {out,unchanged:before===serialize()};
    });
    for(const result of results.out)ok(result.empty&&result.shown&&result.hidden&&result.noInputs,'teacher panel show/hide '+result.id);
    ok(results.unchanged,id+' teacher reveal preserves student fields and Store');
    const contract=await page.evaluate(()=>{
      const toggle=document.querySelector('.teacher-answer-toggle');if(toggle)toggle.click();
      const before=JSON.stringify(Core.Store.data());Core.Tutor.set(false);
      const clean=[...document.querySelectorAll('.teacher-answers')].every(p=>p.hidden&&!p.childNodes.length);
      const closed=[...document.querySelectorAll('details.tutor-only')].every(d=>!d.open);
      const unchanged=before===JSON.stringify(Core.Store.data());Core.Tutor.set(true);
      return clean&&closed&&unchanged;
    });
    ok(contract,id+' Student Mode clears teacher panels without changing progress');
    ok(!errors.length,id+' teacher mode no console/HTTP errors '+errors.join(' | '));
  }
  await page.evaluate(()=>Core.Tutor.set(false));
  for(const route of ['#/','#/vocab','#/vocab/u3/flash','#/vocab/u4/match','#/revision','#/progress','#/coverage']){
    errors.length=0;await page.goto(BASE+route);await page.waitForTimeout(100);
    ok(!errors.length,'route '+route+' loads '+errors.join(' | '));
  }
  // Mandatory media are honest placeholders; no score controls or reward completion.
  const missing=await page.evaluate(()=>Object.values(LESSONS).flatMap(l=>l.sections.flatMap(s=>s.items.filter(i=>i.mediaRequired).map(i=>({lesson:l.id,id:i.id})))));
  for(const item of missing){await page.goto(BASE+'#/lesson/'+item.lesson);const card=page.locator('#ex-'+item.id);ok(await card.count()===1,'missing-media original exercise remains '+item.id);ok(await card.getByRole('button',{name:'Check Answers',exact:true}).count()===0,'missing-media task cannot be auto-scored '+item.id);ok(await card.getByRole('button',{name:'Mark as done',exact:true}).count()===0,'missing-media task cannot earn completion '+item.id);}
  // Global reset clears the active student, teacher session, answers and game state.
  await page.goto(BASE+'#/progress');
  await page.getByRole('button',{name:'New Student / Reset All',exact:true}).first().click();
  await page.getByRole('dialog').getByRole('button',{name:'Удалить всё',exact:true}).click();
  await page.waitForURL(BASE+'#/');await page.waitForSelector('.cmap');
  const reset=await page.evaluate(()=>{const data=Core.Store.data();return Object.values(data.ex).every(e=>!e.done&&!e.attempts.length&&e.state==null)&&Object.keys(data.vocab).length===0&&!data.last&&!Core.Tutor.on()&&!sessionStorage.getItem('tutorUnlock');});
  ok(reset,'New Student clears active answers, progress, vocabulary, game state and teacher session');
  await browser.close();
  console.log(`${pass} passed, ${fail} failed`);
  if(fail){console.error(failures.slice(0,60).join('\n'));process.exit(1);}
})().catch(error=>{console.error(error);process.exit(1);});
