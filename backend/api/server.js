import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getSummary, getTask, listTasks, toggleTask } from "./store.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");
const frontendRoot = path.join(projectRoot, "frontend", "web");
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  try {
    if (url.pathname === "/api/health" && req.method === "GET") {
      return sendJson(res, 200, {
        status: "ok",
        service: "demo-api",
        port
      });
    }

    if (url.pathname === "/api/summary" && req.method === "GET") {
      return sendJson(res, 200, getSummary());
    }

    if (url.pathname === "/api/tasks" && req.method === "GET") {
      const status = url.searchParams.get("status") || "all";
      return sendJson(res, 200, { items: listTasks(status) });
    }

    if (url.pathname.startsWith("/api/tasks/") && req.method === "GET") {
      const taskId = url.pathname.split("/").at(-1);
      const task = getTask(taskId);

      if (!task) {
        return sendJson(res, 404, { error: "Task not found" });
      }

      return sendJson(res, 200, task);
    }

    if (url.pathname.startsWith("/api/tasks/") && url.pathname.endsWith("/toggle") && req.method === "POST") {
      const segments = url.pathname.split("/").filter(Boolean);
      const taskId = segments[2];
      const task = toggleTask(taskId);

      if (!task) {
        return sendJson(res, 404, { error: "Task not found" });
      }

      return sendJson(res, 200, { item: task, summary: getSummary() });
    }

    return serveStatic(url.pathname, res);
  } catch (error) {
    return sendJson(res, 500, {
      error: "Unexpected server error",
      detail: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

server.listen(port, host, () => {
  console.log(`Memory tiers demo running at http://${host}:${port}`);
});

async function serveStatic(pathname, res) {
  const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
  const safePath = path.normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(frontendRoot, safePath);

  if (!filePath.startsWith(frontendRoot) || !existsSync(filePath)) {
    return sendText(res, 404, "Not found");
  }

  const body = await readFile(filePath);
  const contentType = getContentType(filePath);

  res.writeHead(200, { "Content-Type": contentType });
  res.end(body);
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(body);
}

function sendText(res, statusCode, body) {
  res.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(body);
}

function getContentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (filePath.endsWith(".json")) return "application/json; charset=utf-8";
  return "text/plain; charset=utf-8";
}
