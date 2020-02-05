const { Client } = require('discord.js');
require('discord-verify'); // so process.env is propagated
require('../Methods/block');

class KhafraClient extends Client {
    constructor(opts = {}) {
        super(opts);
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