const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const fs = require('fs');

let kayıtlar = require('../veriler/kayıtlar.json'); // kayıt sayısı dosyası

module.exports.run = async (bot, message, args) => {
  const klog = message.guild.channels.cache.get("1196601005975027934");
  const sohbetKanal = message.guild.channels.cache.get("1196600269677535232");
  

  if (!message.member.roles.cache.has("1338531067233046681")) 
    return message.channel.send(new Discord.MessageEmbed()
      .setDescription("Komutu kullanmak için yetkin yok.")
      .setColor("RED"));

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!user) 
    return message.channel.send(new Discord.MessageEmbed()
      .setDescription("Bir kullanıcı etiketle veya geçerli bir ID gir.")
      .setColor("RED"));

  const isim = args[1] || "Bilinmiyor";
  const isim2 = args[2] || "Bilinmiyor";
  const yaş = args[3] || "??";

  if (!klog) return console.log("Kayıt log kanalı bulunamadı!");
  if (!sohbetKanal) return console.log("Sohbet kanalı bulunamadı!");
  
  // ========================================================== KAYIT SAYISI TUTMA =========================================================== \\
  // === KAYIT SAYISI TUTMA ===
    let id = message.author.id;
    if (!kayıtlar[id]) kayıtlar[id] = 0;
    kayıtlar[id]++;
    fs.writeFileSync('./veriler/kayıtlar.json', JSON.stringify(kayıtlar, null, 2));
// ========================================================== KAYIT SAYISI TUTMA =========================================================== \\


  const embed01 = new Discord.MessageEmbed()
    .setDescription(`
      \`Kayıt Eden Yetkili:\` \n${message.author}
      \`Kayıt Edilen Kullanıcı:\` \n${user.user}
      \`Verilen Rol:\` <@&1116750032104861696>  
      \`Alınan Rol:\` <@&1116750038081732710>
      \`📊 Kayıt Sayın:\` **[${kayıtlar[id]}]**
    `)
    .setColor("RED")
    .setThumbnail(user.user.displayAvatarURL())
    .setImage('https://cdn.discordapp.com/attachments/1341134245816438864/1349907269994676264/woe.png?ex=67d4ce9d&is=67d37d1d&hm=1ae9f489296b7338018efb2897f77fd2f35f79797826903385dbb1300c92645a&')

  try {
    klog.send(embed01);
    sohbetKanal.send(embed01);
  

    await user.roles.add('1350212459629121637');
    await user.roles.remove('1116750038081732710');

    if (!message.guild.me.hasPermission("MANAGE_NICKNAMES")) 
      return message.channel.send(new Discord.MessageEmbed()
        .setDescription("Botun **Üyeleri Yönet** yetkisi yok! Nick değiştiremem.")
        .setColor("RED"));

    await user.setNickname(`〔✨〕・ ${isim} | ${isim2} [${yaş}]`);
  } catch (err) {
    console.error("Hata oluştu:", err);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["özel"],
  permLevel: 0
};

exports.help = {
  name: 'özel',
  description: 'Kayıt',
  usage: 'Özel <@Kişi> <İsim> <İsim2> <Yaş>'
};
