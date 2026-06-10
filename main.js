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
  return (a / gcd(a, b)) * b;
}

function isNatural(n) {
  return Number.isInteger(n) && n > 0;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  if (parsedUrl.pathname !== '/nshandr368_gmail_com') {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  const x = parseInt(query.x, 10);
  const y = parseInt(query.y, 10);

  if (isNaN(x) || isNaN(y) || !isNatural(x) || !isNatural(y)) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('NaN');
    return;
  }

  const result = lcm(x, y);

  if (!Number.isInteger(result)) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('NaN');
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(result.toString());
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});