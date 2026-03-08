/**
 * Geliştirme proxy: 8082'de dinler, /api ve /kpss-pdfs → 3002'ye, diğerleri → 8083'e (Expo) yönlendirir.
 * Kullanım: npm run dev (api + proxy birlikte çalışır)
 */
const http = require('http');
const { spawn } = require('child_process');

const PROXY_PORT = 8082;
const API_PORT = 3002;
const EXPO_PORT = 8083;

function proxyRequest(clientReq, clientRes, targetPort) {
  const opts = {
    hostname: '127.0.0.1',
    port: targetPort,
    path: clientReq.url,
    method: clientReq.method,
    headers: { ...clientReq.headers, host: `localhost:${targetPort}` },
  };
  const proxyReq = http.request(opts, (targetRes) => {
    clientRes.writeHead(targetRes.statusCode, targetRes.headers);
    targetRes.pipe(clientRes, { end: true });
  });
  proxyReq.on('error', (err) => {
    console.error(`[Proxy] → :${targetPort} hata:`, err.message);
    clientRes.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
    clientRes.end(`Backend :${targetPort} yanıt vermiyor. API için "npm run api" çalışıyor mu?`);
  });
  clientReq.pipe(proxyReq, { end: true });
}

const server = http.createServer((req, res) => {
  if (req.url?.startsWith('/api') || req.url?.startsWith('/kpss-pdfs')) {
    proxyRequest(req, res, API_PORT);
  } else {
    proxyRequest(req, res, EXPO_PORT);
  }
});

server.listen(PROXY_PORT, () => {
  console.log(`\n[Proxy] http://localhost:${PROXY_PORT} → /api:${API_PORT} | diğer:${EXPO_PORT}`);
  console.log(`Tarayıcı: http://localhost:${PROXY_PORT}\n`);
  process.env.EXPO_PUBLIC_API_URL = ''; // Proxy kullanıldığında aynı origin (relative URL)
  const expo = spawn('npx', ['expo', 'start', '--web', '--port', String(EXPO_PORT)], {
    stdio: 'inherit',
    shell: true,
  });
  expo.on('close', (code) => process.exit(code || 0));
});
