import crypto from "crypto"

class User {
    users = [{ id: crypto.randomUUID(), username: 'vlad', age: 24, hobbies: ['gym', 'programming'] }]

    getById(id) {
        const [users] = this.users.filter(user => user.id === id)
        return users
    }

    getAll() { return this.users }

    createTest(user) {
        this.users.push(user)
    }

    delete(id) {
        let isDeleted = false
        this.users.filter(user => {
            if (user.id === id) {
                isDeleted = true
                return true;
            }
        })
        return isDeleted
    }

    update(id, userData) {
        this.users.map(user => {
            if (user.id === id) {
                user = userData
            }
        })
    }
}

export default new User()