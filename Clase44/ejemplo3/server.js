const http = require("http");

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hola!! desde un server de node.js!!!!");
});

server.listen(3000, "127.0.0.1", () => {
    console.warn("Servidor ejecutandose en http://127.0.0.1:3000/");
});
