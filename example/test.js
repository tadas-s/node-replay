assert = require("assert");
http = require("http");
request = require("request");
replay = require("../lib/replay");

http.get("htt://www.iheartquotes.com/api/v1/random", function(response) {
  response.body = "";
  response.on("error", function(err) {
    console.log(err);
  });
  response.on("data", function(chunk) {
    response.body = response.body + chunk;
  });
  response.on("end", function() {
    // Now check the request we made to the I <3 Quotes API
    assert.equal(response.statusCode, 200);
    assert.equal(response.body, "OK, so you're a Ph.D.  Just don't touch anything.\n\n[fortune] http://iheartquotes.com/fortune/show/46398\n");
    console.log("http.get works. Woot!");
  })
});

request.get("http://www.iheartquotes.com/api/v1/random", {}, function(error, response, body) {
  assert.equal(response.statusCode, 200);
  assert.equal(body, "OK, so you're a Ph.D.  Just don't touch anything.\n\n[fortune] http://iheartquotes.com/fortune/show/46398\n");
  console.log("request.get *without* timeout works. Woot!");
});

request.get("http://www.iheartquotes.com/api/v1/random", {timeout: 30000}, function(error, response, body) {
  assert.equal(response.statusCode, 200);
  assert.equal(body, "OK, so you're a Ph.D.  Just don't touch anything.\n\n[fortune] http://iheartquotes.com/fortune/show/46398\n");
  console.log("request.get with timeout works. Woot!");
});
