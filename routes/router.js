import User from "../models/user.js"
import { isValidUUID } from "../utils/utils.js"

export const routes = [
    {
        pattern: /^api\/users\/([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})$/,
        method: 'GET',
        handler: (req, res, params) => {
            const userId = params[0]
            if (!isValidUUID(userId)) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end("userId is ot valid uuid")
                return
            }
            const user = User.getById(userId)
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(User.getById(userId)))
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end("user is not found")
            }
        }
    },
    {
        pattern: /^api\/users$/,
        method: 'GET',
        handler: (req, res) => {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(User.getAll()))
        }
    },
    {
        pattern: /^api\/users$/,
        method: 'POST',
        handler: (req, res) => {
            User.createTest({ id: crypto.randomUUID(), username: 'vlad2', age: 25, hobbies: ['gym'] })
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(User.getAll()))
        }
    },
    {
        pattern: /^api\/users\/([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})$/,
        method: 'DELETE',
        handler: (req, res, params) => {
            const userId = params[0]
            if (!isValidUUID(userId)) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end("userId is ot valid uuid")
                return
            }
            const result = User.delete(userId)
            if (result) {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify('user was deleted'))
                return
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify('user was not deleted'))
            }

        }
    },
    {
        pattern: /^api\/users\/([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})$/,
        method: 'PUT',
        handler: (req, res, params) => {
            const userId = params[0]
            if (!isValidUUID(userId)) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end("userId is ot valid uuid")
                return
            }
            User.createTest({ id: crypto.randomUUID(), username: 'vlad2', age: 25, hobbies: ['gym'] })
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(User.getAll()))
        }
    }
]