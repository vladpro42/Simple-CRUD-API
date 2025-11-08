import http from "http"
import 'dotenv/config'
import url from "url"
import { routes } from "./routes/Router.js"



const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const path = parsedUrl.pathname
    const method = req.method
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


    let routeMatched = false
    for (const route of routes) {
        const match = trimmedPath.match(route.pattern)
        if (match && route.method === method) {
            route.handler(req, res, match.slice(1))
            routeMatched = true
            break
        }
    }

    if (!routeMatched) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Route not found' }))
    }
})

server.listen(process.env.PORT, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:${process.env.PORT}`);
});

