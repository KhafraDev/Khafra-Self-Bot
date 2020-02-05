const { Client } = require('discord.js');
const Block = require('../Methods/block');

class KhafraClient extends Client {
    constructor(opts = {}) {
        super(opts);
    }

    async block(id) {
        return Block(id, this.token);
    }

    async login(token) {
        await super.login(token);
        Object.defineProperty(this, token, {
            enumerable: false,
            writable: true
        });
    }
}

module.exports = KhafraClient;