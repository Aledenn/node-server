# node-server 一个简单的静态服务器
### 启动
```
启动服务器画
node ./index.js 
或者
nodemon ./index.js
```
### 使用
在routes中添加对应路由，如：
```
//通过http://localhost:8080/a?c=123&d=123  通过http://localhost:8080/postData 可以访问postData接口
  "/a": function (req, res) {
    res.end(JSON.stringify(req.query));
  },
  '/postData': function (req, res) {
    console.log(req.body);
    res.end(JSON.stringify(req.body))
  },
```
static为静态文件夹

其中GET方法的数据存储在req.query中，POST的数据存储在req.body中

可以通过运行/sample目录下的b.html模拟POST方法，使用JSON格式进行数据传输