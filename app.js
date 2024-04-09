//server
const http = require('http')
const fs = require('fs')
var url = require('url')
var path = require('path')

//databas
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('mydatabase')

//db.run("CREATE TABLE visitor (ip TEXT)")



const port = 3000



const server = http.createServer(function(req, res){
  
  //updaterar värden
    db.get("SELECT COUNT(*) count FROM visitor", function(err, row){
      var rowcount = row.count;

      var content = "var visitors = "+ rowcount +";"
    
      fs.writeFile("javascript/values.js", content, 'utf-8', function(err){
      if (err) return console.log(err);
    });
    });
  
    

    

  


  //
  var urlname = url.parse(req.url, true) 
  var filename = 'index.html'
  
  
  //kollar om vi är på en sida
  if (urlname.pathname != '/'){
    filename = urlname.pathname.slice(1)
  }

  //laddar in externa filer (css & js)
  var ext = path.extname(url.parse(req.url).pathname)
  if (ext){
    if (ext === '.css'){
      res.writeHead(200, {'Content-Type': 'text/css'})
    } else if (ext === '.js'){
      res.writeHead(200, {'Content-Type': 'text/javascript'})
    }

    fs.readFile(__dirname + url.parse(req.url).pathname, function(err, data) {
      if (err){
        res.write("error")
      } else {
        res.write(data)
        res.end()
      }
    })
  } else {
    //spara besök i databas, här för att köra en gång.
    db.run("INSERT INTO visitor (ip) VALUES ('" + req.socket.remoteAddress + "')")
    

    //laddar in html-filen
    fs.readFile(filename, function(err, data) {
      if (err) {
          res.writeHead(404)
          res.write('Error: File Not Found')
      } else {
          

          res.writeHead(200, {'Content-Type': 'text/html'})
          res.write(data)
          
      }
      res.end()
      
  })
  }
  
})

server.listen(port, (error) => {
    if(error){
        console.log('Something went wrong', error)
    }else{
        console.log('Server is listening on port ',  port)
    }
});