var http = require("http");
var path = require("path");
var fs = require("fs");
var url = require("url");

const PORT = "8080";
const static_dir = path.join(__dirname, "static");

var routes = {
  "/a": function (req, res) {
    res.end(JSON.stringify(req.query));
  },
  "/b": function (req, res) {
    res.end("match /b");
  },
  "/a/c": function (req, res) {
    res.end("match /a/c");
  },
  "/weather": function (req, res) {
    res.end(JSON.stringify({ a: 1, b: 2 }));
  },
  '/postData': function (req, res) {
    console.log(req.body);
    res.end(JSON.stringify(req.body))
  },
  "/search": function (req, res) {
    try {
      res.end("username=" + req.body.username + ",password=" + req.body.password);
    }
    catch (err) { res.end('search') }
  }
};

var server = http.createServer(function (req, res) {
  routePath(req, res);
});

function routePath(req, res) {
  var pathObj = url.parse(req.url, true);
  var handleFn = routes[pathObj.pathname];
  if (handleFn) {
    req.query = pathObj.query
    console.log('req.query:', req.query);
    // 官方写法
    // 参考 https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
    let body = []
    req.on('data', chunk => {
      body.push(chunk);
    }).on('end', () => {
      try {
      req.body = JSON.parse(Buffer.concat(body).toString())
        handleFn(req, res);
      }
      catch (err) { handleFn(req, res); }

    })

  }
  else {
    getStaticFile(req, res)
  };
}

function getStaticFile(req, res) {
  let pathname = url.parse(req.url).pathname;
  let filePath = path.join(static_dir, pathname);
  console.log(filePath);
  fs.readFile(filePath, "binary", function (err, content) {
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
