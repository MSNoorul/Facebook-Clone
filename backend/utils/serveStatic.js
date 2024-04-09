const { log } = require('console');
const fs = require('fs');
const path = require('path');


const serveStaticFiles = ( res,filePath, next) => {

  log("serveStaticFiles" , filePath)

    // Check if the requested file exists
    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        // File not found or not a regular file
        next(); // Pass control to the next middleware
        return;
      }
  
      // Set content type header based on file extension
      const contentType = getContentType(filePath);
      res.setHeader('Content-Type', contentType);
  
      // Serve the file
      // const stream = fs.createReadStream(filePath);
      // stream.pipe(res);
      const data = fs.readFileSync(filePath)
      res.end(data);
    });
  };
  
  // Helper function to get content type based on file extension
  const getContentType = (filePath) => {
    const extname = path.extname(filePath);
    switch (extname) {
      case '.html':
      case '/':
        return 'text/html';
      case '.css':
        return 'text/css';
      case '.js':
        return 'text/javascript';
      case '.json':
        return 'application/json';
      case '.png':
        return 'image/png';
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      default:
        return 'application/octet-stream';
    }
  };

  module.exports = serveStaticFiles;