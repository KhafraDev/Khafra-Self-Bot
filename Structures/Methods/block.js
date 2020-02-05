const fetch = require('node-fetch');
require('discord-verify'); // so process.env is propagated

/**
 * Block a user, ``<User>.block`` no longer works in ``discord.js v11.5.1``.
 * Endpoint is only available for user accounts.
 * @param {string} id Snowflake 
 * @param {string} token User token
 */
const block = async (id, token) => {
    const res = await fetch('https://discordapp.com/api/v6/users/@me/relationships/' + id, {
        method: 'PUT',
        body: JSON.stringify({ type: 2 }),
        headers: {
            'Host': 'discordapp.com',
            'User-Agent': process.env.useragent,
            'Accept': '*/*',
            'Accept-Language': 'en-US',
            'Content-Type': 'application/json',
            'X-Context-Properties': Buffer.from(JSON.stringify({ 
                                        location: 'ContextMenu'
                                    })).toString('base64'),
            'Authorization': token,
            'X-Super-Properties': process.env.super_properties
        }
    });

    return res.status === 204 && (await res.text()) === '';
}

module.exports = block;