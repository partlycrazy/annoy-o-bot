require('dotenv').config();

const Discord = require('discord.js');

class Bot {
    constructor() {
        this.client = new Discord.Client();
        this.bot_secret_token = process.env.BOT_SECRET_TOKEN;
        
        this.annoyOne;
        this.annoyTwo;

        this.client.on('ready', () => {
            console.log("Bot is Ready!")
            this.client.user.setActivity("Ready To Annoy!");
        });

        this.client.on('message', (message) => {
            if (message.author == this.client.user) {
                return;
            }

            if (message.member.roles.cache.find((role) => role.name == "victim")) {
                message.channel.send("You are not authorized to use me!");
                return;
            }

            if (message.content.startsWith("!")) {                
                try {
                    let command = message.content.substr(1);
                    command = command.split(" ")[0];
                    const Command = require(`./commands/${command}.js`);
                    Command.Run(this, message)
                    delete require.cache[require.resolve(`./commands/${command}.js`)];
                } catch (e) {
                    console.log(e);
                } finally {
                    
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
