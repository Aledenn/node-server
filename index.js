var http = require("http");
var path = require("path");
var fs = require("fs");
var url = require("url");

const PORT = "8080";
const static_dir = path.join(__dirname, "static");

var routes = {
  "/a": function(req, res) {
    res.end(JSON.stringify(req.query));
  },
  "/b": function(req, res) {
    res.end("match /b");
  },
  "/a/c": function(req, res) {
    res.end("match /a/c");
  },
  "/search": function(req, res) {
    res.end("username=" + req.body.username + ",password=" + req.body.password);
  }
};

var server = http.createServer(function(req, res) {
  routePath(req, res);
});

function routePath(req, res) {
  var pathObj = url.parse(req.url, true);
  var handleFn = routes[pathObj.pathname];
  console.log(Boolean(handleFn));
  if (handleFn) {
    console.log("pathObj", pathObj.query);
    console.log("query", req.query);
    handleFn(req, res);
  }
  console.log(req);
  res.end(JSON.stringify(req));
}

function getStaticFile(req, res) {
  let pathname = url.parse(req.url).pathname;
  let filePath = path.join(static_dir, pathname);
  fs.readFile(filePath, "binary", function(err, content) {
    if (err) {
      res.writeHead("404", "haha Not Found");
      return res.end();
    }
    res.writeHead(200, "Ok");
    res.write(content, "binary");
    res.end();
  });
}

server.listen(8080);
console.log(`visit http://localhost:${PORT}`);
