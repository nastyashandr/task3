const http = require('http');
const url = require('url');

function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

function isNatural(n) {
  return Number.isInteger(n) && n > 0;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const expectedPath = '/nshandr368_gmail_com';

  if (parsedUrl.pathname !== expectedPath) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  const query = parsedUrl.query;
  const x = parseInt(query.x, 10);
  const y = parseInt(query.y, 10);

  if (isNaN(x) || isNaN(y) || !isNatural(x) || !isNatural(y)) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('NaN');
    return;
  }

  const result = lcm(x, y);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(String(result));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});