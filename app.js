const http = require('http')
const fs = require('fs')
var url = require('url')
const port = 3000


const server = http.createServer(function(req, res){
  var path = url.parse(req.url, true) 
  var filename = 'index.html'
  
  if (path.pathname != '/'){
    filename = path.pathname.slice(1)
  }
  
  
  console.log(filename)
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
})

server.listen(port, (error) => {
    if(error){
        console.log('Something went wrong', error)
    }else{
        console.log('Server is listening on port ',  port)
    }
});