const http = require('http');
const fs = require('fs');
const path= require('path');
const hostname = "localhost";
const port = 3000;

const server = http.createServer((req,res)=>   // req,res incoming http request to the servers !
{
   // console.log(req.headers); //headers is a property of req object
    console.log("Request url : "+req.url+" request method : "+req.method);
    if(req.method=="GET")
    {
        let fileUrl;
        if(req.url=="/")
        {
            fileUrl="/index.html";
            
        }
        else
        {
            fileUrl=req.url;
        }

        let filePath= path.resolve("./public"+fileUrl); // full path of the file
        const fileExt = path.extname(filePath);  //extract file extension
        console.log(filePath);
        if(fileExt== ".html")
        {
            fs.exists(filePath,(exist)=>{
                if(!exist)
                {
                    res.statusCode=404;
                    res.setHeader("Content-Type","text/html");
                    res.end(" <html>   <body>  <h1> Error "+res.statusCode+" file url at "+filePath+" not found ! </h1> </body> </html> ");
                    return;
                }
                
                res.statusCode=200;
                res.setHeader("Content-Type","text/html");
                fs.createReadStream(filePath).pipe(res); // read file from file path into bytestream and pipes the response 
            });
        }
        else
        {
            res.statusCode=404;
            res.setHeader("Content-Type","text/html");
            res.end(" <html><body><h1> Error "+res.statusCode+" file url at "+filePath+" not an html file  ! </h1></body></html> ")
        }

    }
    else
    {
        res.statusCode=404;
        res.setHeader("Content-Type","text/html");
        res.end(" <html><body><h1> Error "+res.method+" not supported </h1></body></html> ")
    }

});


server.listen(port,hostname,()=>
{
    console.log(`Server running at http://${hostname}:${port}`);
    console.log("Server Started !");
});