import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve(new URL('..', import.meta.url).pathname);
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2','.mp3':'audio/mpeg','.json':'application/json'};
const portAt = process.argv.indexOf('--port');
const port = Number(process.env.PORT || (portAt >= 0 ? process.argv[portAt + 1] : 3000));
http.createServer(async (req,res) => {
  try {
    let file = resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname));
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    if ((await stat(file)).isDirectory()) file = resolve(file,'index.html');
    const bytes = await readFile(file);
    res.writeHead(200, {'Content-Type':types[extname(file)] || 'application/octet-stream','Cache-Control':'no-cache','Content-Length':bytes.length});
    res.end(req.method === 'HEAD' ? undefined : bytes);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(port,'0.0.0.0',() => console.log(`Optimise B1 preview on http://localhost:${port}`));
