const db = require('quick.db');
const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
  const roleName = '・𝙻𝚒𝚗𝚔';
  const role = message.guild.roles.cache.find(role => role.name === roleName);

  if (!role) {
    return message.channel.send(`Bu komutu kullanabilmek için "${roleName}" rolü bulunmuyor.`);
  }

  if (!message.member.roles.cache.has(role.id)) {
    return message.channel.send(`Bu komutu kullanabilmek için "${roleName}" rolüne sahip olmalısın!`);
  }

  if (!args[0]) {
    return message.channel.send('Hey Bu Ayarı Kullanabilmek için `w!link aç` yada `w!link kapat` yazmalısın!');
  }

  if (args[0] === 'aç') {
    await db.set(`reklam_${message.guild.id}`, 'acik');
    message.channel.send('Link Engel başarıyla açıldı! `・𝙻𝚒𝚗𝚔` rolüne sahip olanların reklamı engellenmicektir.');
  } else if (args[0] === 'kapat') {
    await db.set(`reklam_${message.guild.id}`, 'kapali');
    message.channel.send('Link Engel başarıyla kapatıldı! `・𝙻𝚒𝚗𝚔` rolüne sahip olanların reklamı engellenmicektir. Artık herkes Link atabilir.');
  } else {
    message.channel.send('Geçersiz seçenek. Lütfen `aç` veya `kapat` yazın.');
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['link', 'link-engel'],
  permLevel: 1
};

exports.help = {
  name: 'link-engel',
  description: 'Reklam engelleyici sistemi açıp kapatmanızı sağlar.',
  usage: 'w!link [aç/kapat]'
};
