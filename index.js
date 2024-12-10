// const http = require('http'),
//   fs = require('fs'),
//   url = require('url');

// http.createServer((request, response) => {
//   let addr = request.url,
//     q = new URL(addr, 'http://' + request.headers.host),
//     filePath = '';

//   fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Added to log.');
//     }
//   });

//   // Check if the URL contains "documentation"
//   if (q.pathname.includes('documentation')) {
//     filePath = (__dirname + '/documentation.html');
//   } else {
//     filePath = (__dirname + '/index.html'); // Use __dirname for absolute path
//   }

//   // Read and serve the requested file
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       response.writeHead(404, { 'Content-Type': 'text/plain' });
//       response.end('Error 404: File not found');
//       console.log(err);
//     } else {
//       response.writeHead(200, { 'Content-Type': 'text/html' });
//       response.write(data);
//       response.end();
//     }
//   });

// }).listen(8080);

// console.log('My test server is running on Port 8080.');




// im keeping the code above to use as a reference since i deleted the server.js file