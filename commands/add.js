const Discord = require('discord.js');
const mongo = require('mongoose');
const schema = require('../commands.js');

module.exports = {
    name: "add",
    description: "Adds a command to the custom command list.",
    execute: async(client, message, args) => {
        let author = message.author;
        let lineArgs = args.join(" ").split(" | ");
        let cmdName = lineArgs[0].toLowerCase();
        let title = lineArgs[1];
        let reply = lineArgs[2];

        if(await schema.findOne({name: cmdName})){
            return message.channel.send("This command has already been created!")
        }

        let conf = lineArgs[2];
        if(conf === 'embed'){
            message.channel.send('Type out the full information you want displayed for this command.');
            let filter = m => m.author.id === message.author.id;
            message.channel.awaitMessages(filter, {max: 1, time: 300000, errors: ['time']})
                .then(collected => {
                    let newSchema = new schema({
                        name: cmdName,
                        title: title,
                        type: 'embed',
                        reply: collected.first().content
                    })
                    newSchema.save().catch(err => console.log(err));
                    return message.reply(`Command ${cmdName} has been added.`);
                })
                .catch(collected => message.reply("No response given in 5 minutes. Canceling command creation."))
        }else{
            let newSchema = new schema({
                name: cmdName,
                title: title,
                type: 'NoN',
                reply: reply
            })
            newSchema.save().catch(err => console.log(err));
            return message.reply(`Command ${cmdName} has been added.`);
        }
    }
}