const express = require('express');
const http = require('http');
const hostname = "127.0.0.5";
const port = 3000;

const app = express();

// next is a optional parameter
app.use((req,res,next)=>{

    console.log(req.headers);
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1 style="font-weight:100;font-family:arial;">This is an Express Js Server </html></body></h1>');

});

const server = http.createServer(app);

server.listen(port,hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}`);
});