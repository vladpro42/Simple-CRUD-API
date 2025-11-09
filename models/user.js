import crypto from "crypto"

class User {
    users = [{ id: crypto.randomUUID(), username: 'vlad', age: 24, hobbies: ['gym', 'programming'] }]

    getById(id) {
        const [user] = this.users.filter(user => user.id === id)
        return user
    }

    getAll() { return this.users }

    create(user) {
        this.users.push(user)
    }

    delete(id) {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.id !== id);
        const isDeleted = this.users.length < initialLength;
        return isDeleted;
    }

    update(id, userData) {
        let isUpdated = false;

        this.users = this.users.map(user => {
            if (user.id === id) {
                isUpdated = true;
                return { ...user, ...userData, id: id };
            }
            return user;
        });

        return isUpdated;
    }
}

export default new User()