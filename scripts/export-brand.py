"""Package public design sources and generated logo images. Python standard library."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import hashlib, json
root = Path(__file__).resolve().parents[1]
src = root / 'src'
kit = src / 'brand/brand-kit'
output = kit / 'exports'
output.mkdir(exist_ok=True)
files = sorted(p for p in src.rglob('*') if p.is_file() and 'exports' not in p.relative_to(src).parts and p.name != '.DS_Store')
files += sorted((output / 'images').glob('*'))
manifest = {'brand': 'Eric Hubbell', 'source': 'Website snapshot, 2026-11-10; see kit source notes.', 'files': [{'path': str(p.relative_to(src)), 'bytes': p.stat().st_size, 'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in files]}
manifest_path = output / 'asset-manifest.json'
manifest_path.write_text(json.dumps(manifest, indent=2) + '\n')
archive = output / 'eric-hubbell-brand-kit.zip'
with ZipFile(archive, 'w', ZIP_DEFLATED) as bundle:
    for p in files:
        content = p.read_bytes()
        if p == kit / 'index.html':
            content = content.replace(b'<a class="button primary" href="exports/eric-hubbell-brand-kit.zip" download>Download brand kit \xc2\xb7 ZIP</a>', b'<span class="muted">Portable brand kit</span>')
        bundle.writestr(str(p.relative_to(src)), content)
    bundle.write(manifest_path, str(manifest_path.relative_to(src)))
    bundle.writestr('README.txt', 'Eric Hubbell design kit\nServe this extracted folder with: python3 -m http.server 8766 --bind 127.0.0.1\nOpen http://127.0.0.1:8766/brand/brand-kit/\nFonts and licenses are included. Editable artwork is under brand/brand-kit/assets/.\n')
print(f'Exported {len(files)} source files to {archive}')
