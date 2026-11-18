/* Data and asset checks, without a browser: node tests/static.js.
   These validate structure, key provenance and answer-checking contracts;
   linguistic correctness and source fidelity still require editorial review. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
let pass = 0, fail = 0;
const ok = (condition, message) => { if (condition) pass++; else { fail++; console.error('FAIL ' + message); } };
const arr = value => value == null ? [] : [].concat(value);
function exists(file) {
  if (!file || path.isAbsolute(file) || file.split('/').includes('..')) return false;
  let directory = ROOT;
  for (const part of file.split('/')) {
    if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory() || !fs.readdirSync(directory).includes(part)) return false;
    directory = path.join(directory, part);
  }
  return fs.statSync(directory).isFile();
}
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m => m[1]);
const linked = [...html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="([^"]+)"/g)].map(m => m[1]);
linked.forEach(file => ok(!/^(?:https?:|\/)/.test(file) && exists(file), 'relative linked asset: ' + file));
ok(/<title>Optimise B1\b/.test(html), 'new project title');
ok(!/Panoramic/i.test(html), 'no old branding in entry page');
function memoryStorage() { const entries = new Map(); return {getItem:k=>entries.get(k)||null,setItem:(k,v)=>entries.set(k,String(v)),removeItem:k=>entries.delete(k)}; }
const sandbox = { console, TextEncoder, crypto:{}, localStorage:memoryStorage(), sessionStorage:memoryStorage(), setTimeout:()=>0, clearTimeout(){}, CustomEvent:class{constructor(type,options){this.type=type;this.detail=options?.detail;}}, document:{addEventListener(){},dispatchEvent(){},querySelectorAll:()=>[],documentElement:{classList:{toggle(){}}}} };
sandbox.window = sandbox;
vm.createContext(sandbox);
const dataScripts = scripts.filter(file => /^js\/(?:core|course|data-[^/]+|content-[^/]+|vocab-unit[^/]+)\.js$/.test(file));
for (const file of dataScripts) {
  if (!exists(file)) continue;
  try { vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),sandbox,{filename:file}); }
  catch(error) { ok(false,file+' loads: '+error.message); }
}
const {BOOK,LESSONS,VOCAB,Core} = sandbox;
if (!BOOK || !LESSONS || !VOCAB || !Core) { console.error('Course globals missing'); process.exit(1); }
const expected = ['st','u1','u2','r12','u3','u4','r34'];
ok(JSON.stringify(BOOK.units.map(u=>u.id)) === JSON.stringify(expected), 'seven sections in book order');
const activeLessons = new Set();
for (const unit of BOOK.units) {
  ok(unit.ready && !unit.soon && unit.lessons.length>0, unit.id+' is available');
  for (const id of unit.lessons) {
    ok(!activeLessons.has(id), 'one course route for '+id); activeLessons.add(id);
    ok(!!LESSONS[id] && LESSONS[id].unit===unit.id, id+' lesson belongs to section');
  }
}
const knownTypes = new Set(['gaps','mcq','open','tapfind','multi','checklist','scores','reference','inline','underline','rulebox','match','order','discuss','rank','interview','writing','review','sort','grid','tickfix','draw','plan','listen']);
const closedTypes = new Set(['gaps','mcq','inline','order','tickfix','match','multi','sort','grid','tapfind','rulebox','underline']);
const ids = new Set(), files = new Set(), tracks = new Map(), coverage = {};
function assets(value) {
  if (typeof value==='string') {
    if (/^(assets|audio)\//.test(value) && !/[<>]/.test(value)) files.add(value.split('#')[0]);
    for (const match of value.matchAll(/(?:src|href)=["']((?:assets|audio)\/[^"']+)["']/g)) files.add(match[1].split('#')[0]);
  } else if (value && typeof value==='object') Object.values(value).forEach(assets);
}
function accepted(list,label) { ok(arr(list).length>0 && arr(list).every(a=>typeof a==='string' && !!a.trim() && Core.matches(a,arr(list))),label+' accepted answer list'); }
function index(value,length,label) { ok(Number.isInteger(value)&&value>=0&&value<length,label+' index in options'); }
function validate(item) {
  const src = item.type==='listen' ? item.inner : item;
  if (!src) { ok(false,item.id+' listening inner schema'); return; }
  const type = src.type || item.type;
  if (item.mediaRequired) {
    ok(item.core===false && !Core.gradable(item),item.id+' missing media excluded from scores/rewards');
    ok(item.keySrc==='none' || (item.sample && /^tb/.test(item.sample.src)),item.id+' missing-media provenance explicit');
    return;
  }
  if (closedTypes.has(type) && item.source!=='added') ok(['tb','tb-sug','own','free'].includes(item.keySrc),item.id+' answer provenance');
  if (src.free || item.free) return;
  if (type==='gaps') arr(src.paras).flat().filter(x=>x&&typeof x==='object'&&!x.open&&!x.given&&!x.br).forEach((gap,i)=>{
    if (gap.sel) ok(arr(gap.a).length>0 && arr(gap.a).every(a=>gap.sel.includes(a)),item.id+' gap '+(i+1)+' select key');
    else accepted(gap.a,item.id+' gap '+(i+1));
  });
  if (type==='mcq') arr(src.questions).forEach((q,i)=>index(q.a,q.options.length,item.id+' q'+(i+1)));
  if (type==='inline') arr(src.lines?src.lines.flat():src.text).filter(x=>x&&typeof x==='object').forEach((choice,i)=>arr(choice.a).forEach(a=>index(a,choice.o.length,item.id+' inline '+i)));
  if (type==='order') arr(src.items).forEach((row,i)=>accepted(row.a,item.id+' order '+i));
  if (type==='tickfix') arr(src.items).forEach((row,i)=>{ if(!row.ok)accepted(row.a,item.id+' correction '+i); });
  if (type==='match') { ok(src.answers.length===src.left.length,item.id+' matching key count'); src.answers.forEach((a,i)=>index(a,src.right.length,item.id+' match '+i)); ok(src.rightShort.length===src.right.length,item.id+' matching labels count'); }
  if (type==='multi') { ok(src.answers.length>0,item.id+' multiple-select keys'); src.answers.forEach(a=>index(a,src.options.length,item.id+' multi')); }
  if (type==='sort') arr(src.words).forEach(row=>arr(row.c).forEach(a=>index(a,src.cats.length,item.id+' sort '+row.w)));
  if (type==='grid') arr(src.rows).forEach(row=>arr(row.a).forEach(a=>index(a,src.cols.length,item.id+' grid '+row.t)));
  if (type==='rulebox') arr(src.rules).forEach(row=>ok(src.options.includes(row.a),item.id+' rule choice'));
  if (type==='tapfind') {
    const paragraphs=src.paras.map(p=>typeof p==='string'?p:p.t);
    const normal=s=>s.toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
    src.targets.forEach(target=>{ const text=typeof target==='string'?target:target.t; const pool=typeof target==='object'&&target.p!=null?[paragraphs[target.p]]:paragraphs;ok(pool.some(p=>normal(p||'').includes(normal(text))),item.id+' tap target exists: '+text); });
  }
}
for (const lesson of Object.values(LESSONS)) {
  ok(activeLessons.has(lesson.id),lesson.id+' has course route');
  coverage[lesson.unit] ||= {cards:0,numbered:new Set(),missing:0};
  for(const section of lesson.sections)for(const item of section.items){
    ok(!!item.id && !ids.has(item.id),'unique exercise '+item.id); ids.add(item.id);
    ok(knownTypes.has(item.type),item.id+' supported type '+item.type);
    if(item.source!=='added'){ok(!!item.page && !!item.num,item.id+' source page and exercise label');coverage[lesson.unit].cards++;if(/^\d+[a-z]?$/i.test(String(item.num)))coverage[lesson.unit].numbered.add(item.page+':'+item.num);}
    if(item.mediaRequired)coverage[lesson.unit].missing++;
    assets(item);
    if(item.audio){const key=item.audio.track;const file=item.audio.file;if(file){if(tracks.has(key))ok(tracks.get(key)===file,'one file per track '+key);tracks.set(key,file); const expectedUnit=/^S\./.test(key)?'st':'u'+key.split('.')[0];ok(expectedUnit===lesson.unit || lesson.unit==='r12'&&expectedUnit==='u2',item.id+' track belongs to section');}}
    try{validate(item);}catch(error){ok(false,item.id+' schema: '+error.message);}
  }
}
for(const [unit,min] of [['st',12],['u1',35],['u2',35],['r12',9],['u3',35],['u4',35],['r34',8]])ok((coverage[unit]?.numbered.size||0)>=min,unit+' numbered exercise coverage >= '+min);
for (const [unit,count] of [['u3',39],['u4',37]]) ok(coverage[unit]?.numbered.size===count,unit+' exact source exercise count');
// Source-page exercise index independently checked against the supplied Student's Book.
const sourceIndex = {u3:{32:[1,2,3],33:[4,5,6],34:[1,2,3],35:[1,2,3,4,5],36:[1,2,3,4],37:[1,2,3],38:[1,2,3,4,5,6],39:[1,2,3,4],40:[1,2,3,4],41:[5,6,7,8]},u4:{42:[1,2,3,4,5],43:[],44:[1,2,3],45:[1,2,3,4,5],46:[1,2,3,4],47:[1,2,3],48:[1,2,3,4,5,6],49:[1,2,3,4],50:[1,2,3],51:[4,5,6,7]}};
for(const [unit,pages] of Object.entries(sourceIndex))for(const [page,expectedNumbers] of Object.entries(pages)){
 const actual = [...new Set(Object.values(LESSONS).filter(l=>l.unit===unit).flatMap(l=>l.sections.flatMap(s=>s.items)).filter(it=>String(it.page)===page&&/^\d+$/.test(String(it.num))&&it.source!=='added').map(it=>Number(it.num)))].sort((a,b)=>a-b);
 ok(JSON.stringify(actual)===JSON.stringify(expectedNumbers),unit+' original exercise numbers on p.'+page);
}
for(const unit of BOOK.units){const [first,last]=unit.pages.split(/[–-]/).map(Number);for(let page=first;page<=last;page++)ok(Object.values(LESSONS).filter(l=>l.unit===unit.id).some(l=>l.sections.some(s=>s.items.some(i=>i.source!=='added'&&i.page===page))),unit.id+' has source content on p.'+page);}
for(const uid of ['r12','r34']){
 const tasks=Object.values(LESSONS).filter(l=>l.unit===uid).flatMap(l=>l.sections.flatMap(s=>s.items)).filter(i=>/^\d+$/.test(String(i.num))&&i.source!=='added');
 const marks=tasks.reduce((n,it)=>n+(it.type==='gaps'?it.paras.flat().filter(g=>g&&typeof g==='object'&&g.a&&!g.given&&!g.open).length:0),0);
 ok(tasks.length===(uid==='r12'?9:8),uid+' has the original numbered review exercises');
 ok(marks===50,uid+' has exactly 50 gap/select marks');
}
assets(sandbox.VISUALS);files.forEach(file=>ok(exists(file),'case-sensitive asset '+file));
ok(tracks.size===19,'all 19 supplied audio tracks are connected');
const words=new Set();
for(const word of VOCAB){const unit=LESSONS[word.lesson]?.unit;const key=unit+':'+word.w.toLowerCase();ok(!!unit,word.w+' vocabulary lesson exists');ok(!words.has(key),'one vocabulary entry per section '+key);words.add(key);ok(typeof word.ru==='string'&&!!word.ru.trim(),key+' translation');ok(word.ctx&&word.ctx[0].split('___').length===2,key+' one gap in context');}
for(const file of ['js/exercises.js','js/vocab.js'])if(exists(file))try{vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),sandbox,{filename:file});}catch(error){ok(false,file+' API loads: '+error.message);}
if(sandbox.Exercises?.teacherAnswers){
 for(const lesson of Object.values(LESSONS))for(const section of lesson.sections)for(const item of section.items){const before=JSON.stringify(item);const rows=sandbox.Exercises.teacherAnswers(item);ok(Array.isArray(rows)&&rows.every(r=>typeof r.label==='string'&&Array.isArray(r.answers)&&r.answers.every(a=>typeof a==='string')),item.id+' teacher answer schema');ok(before===JSON.stringify(item),item.id+' teacher extraction does not mutate exercise');if(item.mediaRequired)ok(rows.length===0,item.id+' missing media has no raw teacher key');}
}else ok(false,'pure teacher answer API exists');
if(sandbox.Vocab?.SRS){const {SRS,key}=sandbox.Vocab;ok(typeof key==='function','vocabulary namespace API');if(typeof key==='function'){
 const samples=VOCAB.filter(v=>v.w==='take off');if(samples.length>=2){const first=samples[0],second=samples.find(v=>LESSONS[v.lesson].unit!==LESSONS[first.lesson].unit);if(second){sandbox.Core.Store.data().vocab={};SRS.seen(first);ok(SRS.st(first).seen&&!SRS.st(second).seen,'same spelling has independent progress in different sections');}}
 const word=VOCAB[0];sandbox.Core.Store.data().vocab={};const legacy={box:3,due:123,seen:true,c:8,x:1};sandbox.Core.Store.data().vocab[word.w]=legacy;ok(SRS.st(word).box===3,'legacy vocabulary progress is preserved');
 }}else ok(false,'vocabulary SRS API exists');
console.log('\nCoverage: '+JSON.stringify(Object.fromEntries(Object.entries(coverage).map(([id,c])=>[id,{cards:c.cards,numbered:c.numbered.size,missingMedia:c.missing}]))));
console.log(`${pass} passed, ${fail} failed`);
process.exit(fail?1:0);
