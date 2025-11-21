const { JSDOM, VirtualConsole } = require('jsdom');
const path = require('path');
const filePath = path.join(process.cwd(), 'csp-j-optimized.html');
const vc = new VirtualConsole();
vc.on('jsdomError', (error) => console.error('JSDOM error:', error));
vc.sendTo(console);
JSDOM.fromFile(filePath, { runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true, virtualConsole: vc }).then(dom => {
  const win = dom.window;
  win.addEventListener('load', () => {
    setTimeout(() => {
      try {
        const count = win.document.querySelectorAll('#algorithm-list .algo-card').length;
        console.log('cards count', count);
      } catch (err) {
        console.error('query failed', err);
      }
      process.exit(0);
    }, 2000);
  });
}).catch(err => { console.error(err); process.exit(1); });
