const http = require('http');

const hostname = "127.0.0.5";
const port = 3000;

const server = http.createServer((req,res)=>   // req,res incoming http request to the servers !
{
    console.log(req.headers); //headers is a property of req object
    
    res.statusCode = 200 ; 
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>Hello World </h1></body><html>');

});


server.listen(port,hostname,()=>
{
    console.log(`Server running at http://${hostname}:${port}`);
});