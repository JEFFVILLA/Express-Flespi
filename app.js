const fs = require("fs");
var express = require("express");
var port = process.env.PORT || 3000;
var app = express();

app.use(
  express.json({
    limit: "10mb",
    strict: true
  })
);
app.get("/", function(req, res) {
  res.send(JSON.stringify({ Hello: "World" }));
});
app.post("/post", (req, res) => {
  console.log(req.body);
  // now req.body will be a parsed object containing messages array like this:
  /* [ { 'channel.id': 94,
    ident: '1234',
    peer: '127.0.0.1:53862',
    'protocol.id': 19,
    'server.timestamp': 1554447820.251666,
    timestamp: 1554447820.251666 } ] */

  // more details about available message content:
  // https://flespi.com/kb/messages-basic-information-units

  // in this example we are just storing it in a file
  // please note that it will be overwritten on each new request
  fs.writeFileSync("messages.json", JSON.stringify(req.body));

  // NOTE: it's important to send HTTP 200 OK status
  // to acknowledge successful messages delivering
  res.end();
});

app.listen(port, function() {
  console.log(`Example app listening on port !`);
});
