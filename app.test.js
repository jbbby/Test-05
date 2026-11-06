const assert = require("node:assert/strict");
const http = require("node:http");
const moment = require("moment");
const test = require("node:test");
const { createServer } = require("./app");

test("GET / returns the greeting and a formatted current date", async () => {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.listen(0, "127.0.0.1", (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

  try {
    const requestStartedAt = moment();
    const response = await new Promise((resolve, reject) => {
      http
        .get(`http://127.0.0.1:${server.address().port}/`, (res) => {
          let body = "";
          res.setEncoding("utf8");
          res.on("data", (chunk) => {
            body += chunk;
          });
          res.on("end", () => resolve({ statusCode: res.statusCode, headers: res.headers, body }));
        })
        .on("error", reject);
    });

    assert.equal(response.statusCode, 200);
    assert.equal(response.headers["content-type"], "text/plain; charset=utf-8");
    assert.match(response.body, /^Hello, world!\nCurrent date is: (.+)\n$/);
    const date = response.body.split("\n")[1].replace("Current date is: ", "");
    const parsedDate = moment(date, "LL", true);
    assert.equal(parsedDate.isValid(), true);
    assert.equal(parsedDate.format("LL"), date);
    assert.ok(
      parsedDate.isSame(requestStartedAt, "day") || parsedDate.isSame(moment(), "day"),
      "response date should match the current date",
    );
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
