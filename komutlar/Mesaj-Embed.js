const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    let mesaj = args.join(' ');
    if (!mesaj) return message.reply('bir şeyler yazın lütfen.');

    const yaz = new MessageEmbed()
        .setColor('#fff000')
        .setTimestamp()
        .setDescription(`${mesaj}`)
        .setThumbnail(message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }));

    return message.channel.send(yaz);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'yazz',
    description: 'Botun yazdığı mesajı gösterir.',
    usage: 'yazz [mesaj]'
};
