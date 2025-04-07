const Discord = require('discord.js');
exports.run = function(client, message, args) {
  if(message.author.id !== '466611874558115840') return message.reply('Yetkin Yok Kardeşim!');

  const sayMessage = args.join(' ');
  client.user.setActivity(sayMessage, { type: 'PLAYING' });
  message.channel.send(`Oyun ismi **${sayMessage}** olarak değiştirildi`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'oi',
  description: 'Botun oyun ismini değiştirir.',
  usage: 'oi <oyun adı>'
};