const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf"
};

const server = http.createServer((req, res) => {
  // 1. Clean query parameters and hash anchors from request url
  let relativePath = req.url === "/" ? "index.html" : req.url;
  relativePath = relativePath.split("?")[0].split("#")[0];

  let filePath = path.join(__dirname, "out", relativePath);

  // 2. Resolve missing extensions and folder directories
  const ext = path.extname(filePath);
  if (!ext) {
    if (fs.existsSync(filePath + ".html")) {
      filePath += ".html";
    } else if (fs.existsSync(path.join(filePath, "index.html"))) {
      filePath = path.join(filePath, "index.html");
    } else {
      // Fallback for client side routing
      const fallback404 = path.join(__dirname, "out", "404.html");
      if (fs.existsSync(fallback404)) {
        filePath = fallback404;
      } else {
        filePath = path.join(__dirname, "out", "index.html");
      }
    }
  }

  const fileExt = path.extname(filePath);
  const contentType = MIME_TYPES[fileExt] || "application/octet-stream";

  // 3. Serve the file contents
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404: File Not Found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Prashant Sisodhiya Portfolio server running at http://localhost:${PORT}`);
  console.log("Press Ctrl+C to close.");

  // 4. Automatically open default web browser
  const url = `http://localhost:${PORT}`;
  const startCmd =
    process.platform === "darwin"
      ? `open "${url}"`
      : process.platform === "win32"
      ? `start "" "${url}"`
      : `xdg-open "${url}"`;
  exec(startCmd);
});
