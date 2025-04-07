const Discord = require('discord.js');

exports.run = (client, message, args) => { 
  let mention = message.mentions.users.first();
  let sender = "";

  // Get the sender's username or nickname in the server
  if (message.guild.member(message.author).nickname == null) {
    sender = message.author.username;
  } else {
    sender = message.guild.member(message.author).nickname;
  }

  // Handle mentioning someone
  if (mention != null || mention != undefined) {
    let name = mention.username + "'s ";
    if (mention.username.endsWith("s")) {
      name = mention.username + "' ";
    }

    // Get the mentioned user's server avatar
    const member = message.guild.members.cache.get(mention.id);
    if (member) {
      const avatarEmbedOther = new Discord.MessageEmbed()
        .setAuthor(`${mention.username}'s Avatar`, member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
        .setColor('BLUE') // Use a different color for mentioned user's avatar
        .setImage(member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
        .setFooter(`${message.author.username} tarafından istendi.`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp(); // Adds a timestamp for when the command was used

      message.channel.send(avatarEmbedOther);
    } else {
      message.channel.send("Kullanıcı sunucuda bulunamadı.");
    }
    return;
  } else {
    // Handle the sender's avatar
    const member = message.guild.members.cache.get(message.author.id);
    if (member) {
      const avatarEmbedYou = new Discord.MessageEmbed()
        .setAuthor(`${sender}'s Avatar`, member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
        .setColor('GREEN') // Use a different color for sender's avatar
        .setImage(member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
        .setFooter(`${message.author.username} tarafından istendi.`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp(); // Adds a timestamp for when the command was used

      // Add reaction (thumbs-up)
      message.react('👍');

      message.channel.send(avatarEmbedYou);
    } else {
      message.channel.send("Kullanıcı sunucuda bulunamadı.");
    }
    return;
  }
  
  // Fallback message in case of an unknown error
  message.channel.send("Render hatası yada bilinmeyen bir hata oldu.");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['avatarım'],
  kategori: 'kullanıcı',
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  isim: 'Avatar',
  süre: 'Yok',
  description: 'Avatarınızı gösterir ve ya birini etiketlerseniz o kişinin sunucudaki avatarını gösterir.',
  usage: 'avatar <@kullanıcı>'
};
