const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3000);

const os = require('os');
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client({disableMentions: 'everyone'});
const config = require("./config.json");
const mySecret = process.env['TOKEN']


const mongo = require('mongoose')
mongo.connect(`YOURDBURL`, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cmdModel = require('./commands.js');
client.on('ready', () => {
    console.log(`InfoBot is online and running. Ping: ${client.ws.ping}ms`);
    client.user.setActivity('over Kimora.', {type: 'WATCHING'})
});

client.on('message', async message => {
    
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0].slice(config.prefix.length).toLowerCase();
    let args = messageArray.slice(1);
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)) return;


    let currentCmd = await cmdModel.findOne({name: cmd})
    console.log(currentCmd);
    if(currentCmd){
        if(currentCmd.type === 'embed'){
            let cmdEmbed = new Discord.MessageEmbed()
                .setTitle(currentCmd.title)
                .setDescription(currentCmd.reply)
                .setTimestamp();
            return message.channel.send(cmdEmbed);
        }else{
            return message.channel.send(currentCmd.reply);
        }
    }else{
        let command = client.commands.get(cmd);
        if(!command) return
        else if(command) command.execute(client, message, args);
    }
})

client.login(mySecret);