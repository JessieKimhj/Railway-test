
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { logger } from "hono/logger";


const app = new Hono();

app.use("*", logger())
app.use("*", cors())

app.use("*", serveStatic({root: "./frontend/dist"}))
app.get("/*", async (c) => {
    try{
        const indexHTML = await Bun.file("./frontend/dist/index.html").text()
        return c.html(indexHTML)
    }
    catch(error){
        console.log(error)
    }
})

export default app;

const PORT = parseInt(process.env.PORT!) || 3333;

const server = serve({
    port: PORT, 
    fetch:app.fetch,
})
console.log("Hi")
console.log("server running on port: ", PORT)