const Discord = require('discord.js');
const mongo = require('mongoose');
const schema = require('../commands.js');

module.exports = {
    name: "delete",
    description: "Deletes a command from the custom command list.",
    execute: async(client, message, args) => {
        let cmd = await schema.findOne({name: args[0]});
        if(cmd){
            message.channel.send(`You are deleting command ${cmd.name}. Are you sure? y\\n`);
            const filter = m => m.author.id === message.author.id;
            message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
                .then(async collected => {
                    console.log(collected)
                    if(collected.first().content === 'y'){
                        await schema.findOneAndDelete({name: args[0]});
                        return message.channel.send("Command deleted!");
                    }else if(collected.first().content === 'n'){
                        return message.channel.send("Deletion canceled.");
                }})
                .catch(collected => {
                    if(collected.size === 0){
                        return message.reply("Deletion canceled. No response given.")
                    }
                })
        }else{
            return message.reply("Command doesn't exist!");
        }
    }
}