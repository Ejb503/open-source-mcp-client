#!/usr/bin/env node

import { join, dirname } from "path";
import { fileURLToPath } from "url";
import handler from "serve-handler";
import http from "http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, "../dist");

const server = http.createServer((request, response) => {
  return handler(request, response, { public: distPath });
});

const port = process.env.PORT || 5173;
server.listen(port, () => {
  console.log(`MCP inspector client running at http://localhost:${port}`);
});