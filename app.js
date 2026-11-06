const http = require("http");
const moment = require("moment");

const port = Number(process.env.PORT) || 3000;

function createServer() {
  return http.createServer((request, response) => {
    const date = moment().format("LL");
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(`Hello, world!\nCurrent date is: ${date}\n`);
  });
}

if (require.main === module) {
  const server = createServer();
  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

module.exports = { createServer };