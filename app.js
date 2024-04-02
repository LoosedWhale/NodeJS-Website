const http = require('http')
const fs = require('fs')
var url = require('url')
var path = require('path')
const port = 3000


const server = http.createServer(function(req, res){
  var urlname = url.parse(req.url, true) 
  var filename = 'index.html'
  
  if (urlname.pathname != '/'){
    filename = urlname.pathname.slice(1)
  }

  var ext = path.extname(url.parse(req.url).pathname)
  if (ext){
    if (ext === '.css'){
      res.writeHead(200, {'Content-Type': 'text/css'})
    } else if (ext === '.js'){
      res.writeHead(200, {'Content-Type': 'text/javascript'})
    }

    res.write(fs.readFileSync(__dirname + url.parse(req.url).pathname))
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(fs.readFileSync(filename))
  }
  res.end()
  /*
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
    */
})

server.listen(port, (error) => {
    if(error){
        console.log('Something went wrong', error)
    }else{
        console.log('Server is listening on port ',  port)
    }
});