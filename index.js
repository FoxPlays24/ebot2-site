const tmi = require('tmi.js'),
    { channel, username, password } = require('./settings.json');

const options = {
    options: { debug: false },
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
    client.say("rintarix2", 'BloodTrail');
});*/

let count = 0;

client.on('message', (channel, tags, message, self) => {
    //if (self) return;
    //client.say(channel, `/w ${tags['display-name']} ${message}`);
/*    if (message.toLowerCase() === '!ком1') {
        client.say(channel, `@${tags.username} команда 1 FBBlock`);
    }
    if (message.toLowerCase() === '!ком2') {
        client.say(channel, `/w ${tags.username} команда 2 B)`);
    }

    if (tags['message-type'] == 'whisper') {
        if (message.toLowerCase() === '!ком3') {
            client.say(channel, `/w ${tags.username} команда 3 :D`);
        }
        if (message.toLowerCase() === '!ком4') {
            client.say("rintarix2", `команда 4 CoolCat`);
        }
    }
    if (message.toLowerCase() === '!гачи') {
        client.say(channel, `/w ${tags.username} команда 2 B)`);
    }*/

    //console.log(`${tags['display-name']}: ${message}`);

    docChat.textContent = `${tags['display-name']}: ${message}`;
    docChat.style.color = `${tags.color}`;
    if (message.includes('BibleThump')) {
        count++;
        docCount.textContent = `Кол-во библетумов за стрим: ${count}`;
    }
});