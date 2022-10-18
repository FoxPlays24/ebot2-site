const tmi = require('tmi.js'),
    { channel, username, password } = require('./settings.json');

const options = {
    options: { debug: true },
    connection: {
        recconect: true,
        secure: true
    },
    identity: {
        username,
        password
    },
    channels: [channel]
};

const docChat = document.querySelector('#chat');
const docCount = document.querySelector('#count');

const client = new tmi.Client(options);
client.connect().catch(console.error);

/*client.on('connected', () => {
    client.say(channel, 'BloodTrail');
});*/

let count = 0;

client.on('message', (channel, tags, message, self) => {
    if (self) return;
    //console.log(`${tags['display-name']}: ${message}`);
    docChat.textContent = `${tags['display-name']}: ${message}`;
    docChat.style.color = `${tags.color}`;
    if (message.includes('BloodTrail')) {
        count++;
        docCount.textContent = `Кол-во бладтрейлов за стрим: ${count}`;
    }
});