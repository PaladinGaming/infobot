const Discord = require('discord.js');
const mongo = require('mongoose');
const schema = require('../commands.js');

module.exports = {
    name: 'edit',
    description: 'Edit a custom command.',
    execute: async(client, message, args) => {
        let cmd = args[0];
        let conf = args[1];
        const filter = m => m.author.id === message.author.id;

        let currentCmd = await schema.findOne({name: cmd});
        if(!currentCmd) return message.reply("That command wasn't found! Try again.");

        if(conf === 'title'){
            message.channel.send(`What do you want the new title for \`${currentCmd.name}\` to be?`);
            console.log('test 1');
            message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
                .then(async collected => {
                    console.log('test 2');
                    await schema.findOneAndUpdate({name: cmd}, {title: collected.first().content});
                    return message.channel.send("Updated command successfully!")
                })
                .catch(collected => {
                    console.log('test 3')
                    message.channel.send("No response given. Command canceled.")
                })
        }else if(conf === 'reply'){
            message.channel.send(`What do you want the new display to be for \`${currentCmd.name}\`?`);
            message.channel.awaitMessages(filter, {max: 1, time: 300000, errors: ['time']})
                .then(async collected  => {
                    await schema.findOneAndUpdate({name: cmd}, {reply: collected.first().content});
                    return message.channel.send("Updated command successfully!")
                })
                .catch(collected => message.channel.send("No response given in 5 minutes. Command canceled."));
        }else if(conf === 'name'){
            message.channel.send(`What do you want the new trigger name to be for \`${currentCmd.name}\`?`);
            message.channel.awaitMessages(filter, {max: 1, time: 300000, errors: ['time']})
                .then(async collected  => {
                    await schema.findOneAndUpdate({name: cmd}, {name: collected.first().content});
                    return message.channel.send("Updated command successfully!")
                })
                .catch(collected => message.channel.send("No response given in 5 minutes. Command canceled."));
            
        }else{
            return message.reply("Invalid operation. Try again.")
        }
    }
}