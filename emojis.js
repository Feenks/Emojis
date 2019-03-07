const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
    let emoji = message.content.split(/\s+/g).slice(1).join(" ")

        if (!emoji) {
            const emojis = message.guild.emojis
            if (!emojis.size) return message.channel.send('Não possui emoji customizado.');


            const embed = new Discord.RichEmbed()
                .setAuthor(`Emojis em ${message.guild.name}! [${emojis.size}]`, message.guild.iconURL)
		        .setDescription(emojis.map(emoji => emoji.toString()).join(' '), { split: { char: ' ' } })
                .setColor('#A5A3BB')
            return message.channel.send(`Aqui estão todos os emojis do servidor!`, { embed: embed });

        } else {
            const args = message.content.split(" ");

            if (!args[1].startsWith('<:')) return message.channel.send('Isto não é um emoji válido!')
            let id = args[1].substring(args[1].lastIndexOf(':') + 1, args[1].lastIndexOf('>'))

            let emoteInfo = message.guild.emojis.get(id)
            if (!emoteInfo) return message.channel.send('Isto não é um custom emoji válido')

            const embed = new Discord.MessageEmbed()
                .setAuthor(emoteInfo.name)
                .setImage(`https://cdn.discordapp.com/emojis/${emoteInfo.id}.png`)
                .setColor('#D5BEC6');
            return message.channel.send({ embed });
        }
}

module.exports.help = {
    name: "emojis"
}