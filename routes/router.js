import User from "../models/user.js"
import { getRequestBody, isValidUUID } from "../utils/utils.js"
import crypto from "crypto"

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
        handler: async (req, res) => {
            const body = await getRequestBody(req)
            const { username, age, hobbies } = body
            if (username === undefined || age === undefined || hobbies === undefined) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify("does not contain required fields"))
                return;
            }
            const user = { id: crypto.randomUUID(), username: username, age: age, hobbies: hobbies }
            User.create(user)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(user))
        }
    },
    {
        pattern: /^api\/users\/([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})$/,
        method: 'DELETE',
        handler: (req, res, params) => {
            const userId = params[0]
            if (!isValidUUID(userId)) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end("userId is not valid uuid")
                return
            }
            const result = User.delete(userId)
            if (result) {
                res.writeHead(204, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify('user was deleted'))
                return
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify('user was not found'))
            }

        }
    },
    {
        pattern: /^api\/users\/([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})$/,
        method: 'PUT',
        handler: async (req, res, params) => {
            const userId = params[0]
            if (!isValidUUID(userId)) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end("userId is not valid uuid")
                return
            }
            const user = User.getById(userId)
            if (!user) {
                res.writeHead(404, { 'Content-Type': 'application/json' })
                res.end("user was not found")
            }

            const body = await getRequestBody(req)
            const { username, age, hobbies } = body
            const updatedUser = { id: user.id, username: username ? username : user.username, age: age ? age : user.age, hobbies: hobbies ? hobbies : user.hobbies }
            User.update(userId, updatedUser)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(updatedUser))
        }
    }
]