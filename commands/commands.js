const { MessageEmbed} = require('discord.js');
const cmdModel = require('../commands.js');

module.exports = {
    name: 'commands',
    description: "View the custom command list.",
    execute: async(client, message, args) => {

        await cmdModel.find({}, (err, res) => {

            let final = "";
            for(const curCmd of res){
                final += `**|** ${capitalize(curCmd.name)}\n`;
            }

            let vEmbed = new MessageEmbed()
            .setTitle("Info Commands")
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(final)
            .setTimestamp();

            message.channel.send(vEmbed);
        })
    }
}

function capitalize(str){
    let lower = str.toLowerCase();
    return str.charAt(0).toUpperCase()
        + lower.slice(1);
}