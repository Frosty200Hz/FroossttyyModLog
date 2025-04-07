const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
  if (
    !["901554012795568138"].some((role) =>
      message.member.roles.cache.get(role)
    ) &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.channel
      .send(
        new MessageEmbed()
          .setDescription(`Komutu kullanmak için yetkiniz bulunmamakta.`)
          .setAuthor(
            message.author.tag,
            message.author.avatarURL({ dynamic: true })
          )
          .setColor("AQUA")
      )
      .then((x) => x.delete({ timeout: 5000 }));

  let member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  if (!member)
    return message.channel
      .send(
        new MessageEmbed()
          .setDescription(`Geçerli Bir Kullanıcı Etiketlemelisin !`)
          .setColor("AQUA")
      )
      .then((msg) => msg.delete({ timeout: 5000 }));

  if (message.member.roles.highest.position <= member.roles.highest.position)
    return;

  let eskiRoller = member.roles.cache.map((r) => r.id);

  if (member.manageable) {
    await member.setNickname(exports.help.name).catch(); // Komutun adını kullanıcının ismi olarak ayarla
    await member.roles.set(["1116750038081732710"]).catch(); // Sadece "kayıtsız" rolünü ata
  }

  message.channel
    .send(
      new MessageEmbed().setDescription(
        `<:Yetkili:1049777855170621500> ${member} Adlı Kullanıcı \n <:Yetkili:1049777855170621500> ${message.author} Kişi Tarafından \n <:register:1214918420017971221> <@&1116750038081732710> 'a Atıldı !`))
    .then((msg) => msg.delete({ timeout: 25000 }));


};

exports.conf = {enabled: true, permLevel: 1}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kayıtsız', 'kz',],
    permLevel: 1
};

exports.help = {
    name: '〔🔱〕・[ƘƛƳƖƬ] [ƠԼ]',
    description: "",
    usage: ',kayıtsız @üye'
};