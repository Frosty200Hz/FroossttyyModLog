const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (args, message, client) => {
    if (message.author.id !== '466611874558115840')
        return message.channel.send(
            new Discord.MessageEmbed().setColor(`RED`).setDescription(`\`${message.author.tag}\`, **Bu Komutu Çalıştırmak İçin Botun __Geliştiricisi__ Olmanız Lazım !**`)).then(msg => msg.delete({timeout: 5000}));
    message.delete()
    message.reply(`**Bot Yeniden Başlatılıyor**`).then(msg => {
        process.exit(0);
    })
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [ 'reboot', 'yeniden-başlat', 'yenile' ],
    permLevel: 0
};

exports.help = {
    name: 'Komut : [вoт yenιden вaşlaт]',
    description: "",
    usage: ',yenile'
};
//KOMUTLARA ATINIZ