const theme = document.querySelector('#theme');
function applyTheme(dark) { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; const label = dark ? 'Switch to light mode' : 'Switch to dark mode'; theme?.setAttribute('aria-label', label); theme?.setAttribute('title', label); renderPalette(); }
function renderPalette() { const palette = document.querySelector('#palette'); if (!palette) return; palette.replaceChildren(); const styles = getComputedStyle(document.documentElement); for (const [token, label] of [['background','Page'],['foreground','Primary text'],['secondary','Supporting text'],['border','Dividers'],['surface','Subtle surface'],['button','Action'],['button-text','Action text'],['accent','Moss / focus']]) { const value = styles.getPropertyValue('--'+token).trim(); const item=document.createElement('div'); const swatch=document.createElement('div'); swatch.className='swatch'; swatch.style.background=value; const button=document.createElement('button'); button.textContent=label+' '+value; button.setAttribute('aria-label','Copy '+label+' '+value); button.onclick=async()=>{ const status=document.querySelector('#copy-status'); try { await navigator.clipboard.writeText(value); status.textContent='Copied '+value; } catch { status.textContent='Could not copy. Select this value manually: '+value; } }; item.append(swatch,button); palette.append(item); } }
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
let savedTheme;
try { savedTheme = localStorage.getItem('eh-theme'); } catch { /* Storage is optional. */ }
let explicitTheme = savedTheme === 'dark' || savedTheme === 'light';
applyTheme(explicitTheme ? savedTheme === 'dark' : systemTheme.matches);
systemTheme.addEventListener('change', event => { if (!explicitTheme) applyTheme(event.matches); });
theme?.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  applyTheme(dark);
  explicitTheme = true;
  try { localStorage.setItem('eh-theme', dark ? 'dark' : 'light'); } catch { /* Keep working without storage. */ }
});
document.querySelector('#sample')?.addEventListener('click',()=>{document.querySelector('#sample-status').textContent='Sample action complete.';});

const downloads = [...document.querySelectorAll('.asset-download')];
for (const menu of downloads) {
  menu.addEventListener('toggle', () => {
    if (menu.open) for (const other of downloads) if (other !== menu) other.open = false;
  });
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
      event.preventDefault();
    }
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.open = false;
    menu.querySelector('summary').focus();
  }));
}
document.addEventListener('click', event => {
  for (const menu of downloads) if (!menu.contains(event.target)) menu.open = false;
});
