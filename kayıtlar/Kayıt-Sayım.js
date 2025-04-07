const Discord = require('discord.js');
const kayıtlar = require('../veriler/kayıtlar.json'); // Kayıt verisi JSON'dan çekiliyor

module.exports.run = async (bot, message, args) => {
  const userID = message.author.id;

  // Eğer kişi daha önce kayıt yapmamışsa 0 olarak göster
  const kayıtSayısı = kayıtlar[userID] || 0;

  const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle("📋 ・ `𝙵𝚁𝙾𝚂𝚂𝚃𝚃𝚈𝚈~・ #Kayıt #Sayısı")
    .setDescription(`${message.author} şu ana kadar **[${kayıtSayısı}]** kişiyi kayıt etti.`)
    .setFooter("Kayıt sistemi", message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp();

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['stat', 'kayıtsayım'],
  permLevel: 0
};

exports.help = {
  name: 'kayıt-sayım',
  description: 'Kimin kaç kayıt yaptığını gösterir.',
  usage: 'kayıt-sayım'
};
