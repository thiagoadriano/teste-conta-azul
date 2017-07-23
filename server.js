let http = require('http');
let fs = require('fs');
let port = 4889;
function responseRequest(req, res) {
    let file = fs.readFileSync("./public/index.html");
    res.setHeader("Content-Type", "text/html");
    res.write(file);
    res.end();
}
http.createServer(responseRequest).listen(port);
console.info(`Server Escutando na porta: ${port}`);