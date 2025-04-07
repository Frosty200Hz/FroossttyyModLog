const Discord = require("discord.js");

exports.run = async (client, message, args, prefix, ayar, emoji) => {
  // Mevcut roller
  let erkekRolü = "1240083408605151332";
  let kadinRolü = "1240083457518997544"; // Kadın üye,
  let DecatroossKlan = "1116750027717628067"; // Decatrooss Klan
  let KlanCirak = "1358459829831602416";
  let KlanYönetici = "1116750029756059678"; // Klan Yönetici
  let zulaKız = "1277611875747627040";
  let zulaErkek = "1116750039860129794";
  let kayıtsızRolü = "1116750038081732710";
  let askadroRolü = "1358461398681915673";
  let botRolü = "1266868745696055312";
  let dostKlan = "1266868745859502111";
  let pubgRolü = "1340393858319519906";

  // Aktif üyeleri sayma (çevrimiçi)
  let onlineMembers = message.guild.members.cache.filter(member => member.presence && member.presence.status === 'online').size;

  // Bot sayısını hesaplama
  let botCount = message.guild.members.cache.filter(member => member.user.bot).size;

  // Embed mesajı oluştur
  const embeddd = new Discord.MessageEmbed()
    .setColor("GOLD")
    .setTitle("<:klanlogo:1213835740228620358> [Sunucu] (Üye) Bilgileri")
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setThumbnail(message.guild.iconURL())
    .addFields(
      { name: "<:klanlogo:1213835740228620358> [・ᴅᴇᴄᴀᴛʀᴏᴏss]", value: `[${message.guild.members.cache.filter(member => member.roles.cache.has(DecatroossKlan)).size}]`, inline: true },
      { name: "<:klanlogo:1213835740228620358> [・çıʀᴀᴋ]", value: `[${message.guild.members.cache.filter(member => member.roles.cache.has(KlanCirak)).size}]`, inline: true },
      { name: "<:klanlogo:1213835740228620358> [・ʏöɴᴇᴛɪᴄɪ]", value: `[${message.guild.members.cache.filter(member => member.roles.cache.has(KlanYönetici)).size}]`, inline: true },
      { name: "<:klanlogo:1213835740228620358> [・ᴀsᴋᴀᴅʀᴏ]", value: `[${message.guild.members.cache.filter(member => member.roles.cache.has(askadroRolü)).size}]`, inline: true },
      { name: "<:klanlogo:1213835740228620358> [・ᴅᴏsᴛ]", value: `[${message.guild.members.cache.filter(member => member.roles.cache.has(dostKlan)).size}]`, inline: true },
      { name: "<:klanlogo:1213835740228620358> [・ᴋᴜʟʟᴀɴıᴄı]", value: `[${message.guild.memberCount}]`, inline: true },
      { name: "<:klanlogo:1213835740228620358> [・ʙᴏᴛʟᴀʀ]", value: `[${botCount}]`, inline: true },
      { name: "<:klanlogo:1213835740228620358> [・ᴋᴀᴅıɴ]", value: `[${message.guild.members.cache.filter(member => member.roles.cache.has(kadinRolü)).size}]`, inline: true },
      { name: "<:klanlogo:1213835740228620358> [・ᴘᴜʙɢ]", value: `[${message.guild.members.cache.filter(member => member.roles.cache.has(pubgRolü)).size}]`, inline: true },
      { name: "<:klanlogo:1213835740228620358> [・ᴍɪsᴀғɪʀ]", value: `[${message.guild.members.cache.filter(member => member.roles.cache.has(erkekRolü)).size}]`, inline: true },
      { name: "<:klanlogo:1213835740228620358> [・ᴇʀᴋᴇᴋ]", value: `[${message.guild.members.cache.filter(member => member.roles.cache.has(zulaErkek)).size}]`, inline: true },
      { name: "<:klanlogo:1213835740228620358> [・ᴋıᴢ]", value: `[${message.guild.members.cache.filter(member => member.roles.cache.has(zulaKız)).size}]`, inline: true },
      { name: "<:klanlogo:1213835740228620358> [・ᴋᴀʏıᴛsıᴢ]", value: `[${message.guild.members.cache.filter(member => member.roles.cache.has(kayıtsızRolü)).size}]`, inline: true },
      { name: "<:klanlogo:1213835740228620358> 🔊 ・[sᴇsʟɪ]", value: `[${message.guild.members.cache.filter(member => member.voice.channel).size}]`, inline: true },
      { name: "💻 ・[Çevrimiçi Üyeler]", value: `[${onlineMembers}]`, inline: true },
    );

  // Log kanalını al
  let logChannel = message.guild.channels.cache.find(ch => ch.name === "「→」・ᴅᴜʏᴜʀᴜ"); // Burada 'log-channel' kanalını kendi kanalınızın adıyla değiştirin
  if (!logChannel) return message.channel.send("Log kanalı bulunamadı.");

  // Log kanalına embed mesajını gönder
  logChannel.send(embeddd);

  // Kullanıcıya bilgilendirme mesajı gönder
  message.channel.send("Üye sayımı log kanalına başarıyla gönderildi.");

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['üye'],
  permLevel: 0
};

exports.help = {
  name: "üyesay",
  description: "Sunucudaki üyeleri sayar ve belirli bir log kanalına gönderir.",
  usage: "!üyesay",
  kategori: "moderasyon"
};
