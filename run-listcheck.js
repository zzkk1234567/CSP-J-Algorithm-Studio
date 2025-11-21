const { JSDOM, VirtualConsole } = require('jsdom');
const path = require('path');
const filePath = path.join(process.cwd(), 'csp-j-optimized.html');
const vc = new VirtualConsole();
vc.sendTo(console, { omitJSDOMErrors: true });
JSDOM.fromFile(filePath, { runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true, virtualConsole: vc }).then(dom => {
  const win = dom.window;
  win.addEventListener('load', () => {
    setTimeout(() => {
      console.log('cards count', win.document.querySelectorAll('#algorithm-list .algo-card').length);
      process.exit(0);
    }, 1500);
  });
}).catch(err => { console.error(err); process.exit(1); });
