const KhafraClient = require('./Structures/Client/KhafraClient');
const client = new KhafraClient({
    disableEveryone: true
});

client.on('ready', () => console.log('Signed in!'));

client.on('message', async message => {
    if(message.author.id === client.user.id) return;
    
    if(message.channel.type === 'dm') {
        if(message.author.bot) {
            // block bots from DMing the user
            // bots are used for sending unsolicited advertisements mostly
            // also that "free nitro" scam going around.
            return message.author.block(message.author.id, client.token);
        } else {
            // block people from sending you annoying server invites.
            if(/(https:\/\/)?discord.gg\/(.*)/g.test(message.content)) {
                await message.channel.send('Blocked, please don\'t send unsolicited server invites.');
                return message.author.block(message.author.id, client.token);
            }
        }
    }
});

client.login(process.env.token);