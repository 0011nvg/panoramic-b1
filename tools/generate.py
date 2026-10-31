# Генерация иллюстраций через CellCog (запускает GitHub Actions: .github/workflows/generate.yml)
# Нужен секрет репозитория CELLCOG_API_KEY. Уже созданные картинки (assets/gen/<name>.webp) не пересоздаются.
import json, os, glob, shutil, subprocess, sys
from cellcog import CellCogClient
cfg = json.load(open('tools/gen-prompts.json'))
os.makedirs('assets/gen', exist_ok=True)
state = os.environ.get('CELLCOG_STATE_DIR', '/tmp/cellcog')
client = CellCogClient(agent_provider='claude-code')
for item in cfg['images']:
    out = f"assets/gen/{item['name']}.webp"
    if os.path.exists(out): continue
    before = set(glob.glob(state + '/**/*.*', recursive=True))
    prompt = item['prompt'] + '\n\nStyle: ' + cfg['_style'] + '\nGenerate exactly ONE image.'
    res = client.create_chat(prompt=prompt, task_label=item['name'], chat_mode='agent', timeout=1500)
    print(item['name'], '→', (res.get('message') or '')[:300])
    new = [f for f in set(glob.glob(state + '/**/*.*', recursive=True)) - before if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
    if not new: print('  no image file found'); continue
    src = max(new, key=os.path.getsize)
    subprocess.run(['cwebp', '-quiet', '-q', '72', '-resize', '1400', '0', src, '-o', out], check=True)
    print('  saved', out)
