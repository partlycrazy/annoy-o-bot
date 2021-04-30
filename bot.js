const Discord = require('discord.js');

class Bot {
    constructor() {
        this.client = new Discord.Client();
        this.bot_secret_token = "ODM3NjQ5ODk3MDgzNjMzNjY0.YIvoQg.-6YtJyVJJgO1nxx7GL5DIE7Zb_4"
        
        this.annoyOne;
        this.annoyTwo;
//        this.targetUserId = 619601596849848340;

        this.client.on('ready', () => {
            console.log("Bot is Ready!")
            this.client.user.setActivity("Ready!");
        });

        this.client.on('message', (message) => {
            if (message.author == this.client.user) {
                return;
            }

            // console.log(`Message Received: ${message.content}`);

            if (message.content.startsWith("!")) {
                let command = message.content.substr(1);
                command = command.split(" ")[0];
                try {
                    const Command = require(`./commands/${command}.js`);
                    Command.Run(this, message)
                } catch (e) {
                    console.log(e);
                } finally {
                    delete require.cache[require.resolve(`./commands/${command}.js`)];
                }
                
            }
        });

        this.client.on('voiceStateUpdate', (oldState, newState) => {
            try {
                const Handler = require('./events/voiceChannel.js');
                Handler.Run(this, oldState, newState);
            } catch (e) {
                console.log(e);
            } finally {
                delete require.cache[require.resolve('./events/voiceChannel.js')];
            }
        });
    }

    login() {
        this.client.login(this.bot_secret_token);
    }
}

module.exports = Bot;
