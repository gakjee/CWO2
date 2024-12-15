var http = require('http'); 
var requests=0; 
var podname= process.env.HOSTNAME; 
var startTime; 
var host; 
var handleRequest = function(request, response) {
    response.setHeader('Content-Type', 'text/plain');
    response.writeHead(200);
    response.write('DevOps Coursework 2! | Running on: ');
    response.write(host);
    response.end(' | v=0\n');
}
var www = http.createServer(handleRequest);
www.listen(8080, function() {
    startTime = new Date();
    host = process.env.HOSTNAME;
    console.log('Started At:', startTime, '| Running On:', host, '\n');
});
