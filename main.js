const http = require('http');
const url = require('url');

function gcd(a, b) {
  while (b !== 0n) {
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
  const num = Number(n);
  return Number.isInteger(num) && num > 0 && !isNaN(num);
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  if (parsedUrl.pathname !== '/nshandr368_gmail_com') {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  const xStr = query.x;
  const yStr = query.y;

  if (!xStr || !yStr || !/^\d+$/.test(xStr) || !/^\d+$/.test(yStr)) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('NaN');
    return;
  }

  const x = BigInt(xStr);
  const y = BigInt(yStr);

  if (x <= 0n || y <= 0n) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('NaN');
    return;
  }
  const result = lcm(x, y);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(result.toString());
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});