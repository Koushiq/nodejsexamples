const http = require('http');
const fs = require('fs');
const path= require('path');
const hostname = "127.0.0.5";
const port = 3000;

const server = http.createServer((req,res)=>   // req,res incoming http request to the servers !
{
   // console.log(req.headers); //headers is a property of req object
    console.log("Request url : "+req.url+" request method : "+req.method);
    if(req.method=="GET") // check for request type
    {
        let fileUrl; // variable declared to contain requested file's url
        if(req.url=="/") //checking if user just requested the valid servername and port 
        {
            fileUrl="/index.html"; //if yes then url pointing to index.html
        }
        else
        {
            fileUrl=req.url; // else pointing to user's input url
        }

        let filePath= path.resolve("./public"+fileUrl); // concating requested file path to absoulte path 
        const fileExt = path.extname(filePath);  //extracting users requested file extension 
        console.log(filePath); // printing full file path ( for debuggin purposes )
        if(fileExt== ".html")  // checking if file extension is a html file or not
        {
            fs.exists(filePath,(exist)=>{ // calling a callback function using fs.exists to validate if file exists 
                if(!exist) // if file doesn't exist showing correspoinding error code 
                {
                    res.statusCode=404;
                    res.setHeader("Content-Type","text/html");
                    res.end(" <html>   <body>  <h1> Error "+res.statusCode+" file url at "+filePath+" not found ! </h1> </body> </html> ");
                    return; // exiting the callback function
                }
                
                res.statusCode=200;
                res.setHeader("Content-Type","text/html");
                //fs.createReadStream(filePath).pipe(res); // reads file from file path into bytestream and pipes the response ( createReadStream  reads the file stream , pipe writes the file stream to the response object)
                fs.readFile(filePath, (err, data) => {
                    if (err) throw err;
                    //console.log(data); -> will display as buffered data to the console 
                    res.write(data); // writes the response from the buffered data to html content , you can also use fs.createReadStream as alternative 
                  });
            });
        }
        else
        {
            res.statusCode=404;
            res.setHeader("Content-Type","text/html");
            res.end(" <html><body><h1> Error "+res.statusCode+" file url at "+filePath+" not an html file  ! </h1></body></html> "); // setting appropiate error 
        }

    }
    else
    {
        res.statusCode=404;
        res.setHeader("Content-Type","text/html");
        res.end(" <html><body><h1> Error "+res.method+" not supported </h1></body></html> "); // setting appropiate error 
    }

});


server.listen(port,hostname,()=>
{
    console.log(`Server running at http://${hostname}:${port}`);
    console.log("Server Started !");
});