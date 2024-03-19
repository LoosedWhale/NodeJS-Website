const http = require('http')
const fs = require('fs')
const port = 3000

const server = http.createServer(function(req, res){
    fs.readFile('index.html', function(err, data) {
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