const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Checks message and API ping.',
    execute: async(client, message, args) => {
        let latency = (new Date().getTime() - message.createdTimestamp);
        let pong = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`Pong!`)
        .addField('Latency', `\`${latency}ms\``)
        .addField('API Latency', `\`${Math.round(client.ws.ping)}ms\``)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp();

        if(latency <= 100){
            pong.setColor("GREEN");
        }else if(latency > 100){
            pong.setColor("RED");
        }
        
        message.channel.send(pong);
    }
}