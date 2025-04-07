const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  if (message.author.id !== '466611874558115840') {
    return message.reply('Bu komutu sadece yetkili bir kullanıcı kullanabilir.');
  }

  const guild = client.guilds.cache.get('1076226760150106244'); // Sunucu ID'sini burada belirtin
  if (!guild) {
    return message.reply('Belirtilen sunucu bulunamadı.');
  }

  try {
    // Sunucudaki botun takma adını sıfırla
    await guild.members.cache.get(client.user.id).setNickname(null);
    message.channel.send('Botun sunucudaki takma adı sıfırlandı.');
  } catch (error) {
    console.error(error);
    message.channel.send('Takma ad sıfırlanırken bir hata oluştu.');
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['botsıfırla', 'botnicksıfırla'],
  permLevel: 0
};

exports.help = {
  name: 'botksıfırla',
  description: 'Sunucudaki botun takma adını sıfırlar.',
  usage: 'botksıfırla'
};
