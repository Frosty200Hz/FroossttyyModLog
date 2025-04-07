const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const fs = require('fs'); // JSON dosyasını okuyup yazmak için gerekli.

let kayıtlar = require('../veriler/kayıtlar.json'); // kayıt sayısı dosyası

module.exports.run = async (bot, message, args, member, client, level) => {

  const klog = message.guild.channels.cache.get("1196601005975027934");
  const sohbetKanal = message.guild.channels.cache.get("1196600269677535232"); // Sohbet kanalını al

  if(!message.member.roles.cache.has("1338531067233046681")) 
    return message.channel.send(new Discord.MessageEmbed()
    .setDescription("Komutu kullanmak için <@&1338531067233046681> yetkiye sahip olman gerek")
    .setColor("RED"));

  const isim = args[1];
  if(!isim)
    return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Bir İsim Gir Örnek: \`${ayarlar.prefix}dts <@KİŞİ> <isim> <isim2> <yaş>\``)
    .setColor("RED"));

  const isim2 = args[2];  // Yeni parametre 'isim2' burada alınıyor.
  if(!isim2)
    return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Bir İsim2 Gir Örnek: \`${ayarlar.prefix}dts <@KİŞİ> <isim> <isim2> <yaş>\``)
    .setColor("RED"));

  const yaş = args[3];  // Yaş artık args[3] olacak
  if(!yaş)
    return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Bir Yaş Gir Örnek: \`${ayarlar.prefix}dts <@KİŞİ> <isim> <isim2> <yaş>\``)
    .setColor("RED"));

  let user = message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.mentions.users.first().id);
  if (!user)
    return message.channel.send(new Discord.MessageEmbed()
    .setDescription("Etiket atmayı unuttun.")
    .setColor("RED"));

 // ========================================================== KAYIT SAYISI TUTMA =========================================================== \\
    let id = message.author.id;
    if (!kayıtlar[id]) kayıtlar[id] = 0;
    kayıtlar[id]++;
    fs.writeFileSync('./veriler/kayıtlar.json', JSON.stringify(kayıtlar, null, 2));
 // ========================================================== KAYIT SAYISI TUTMA =========================================================== \\

  const embed01 = new Discord.MessageEmbed()
    .setDescription(`
\`✨ Kayıt Eden Yetkili:\` \n${message.author}
\`👥 Kayıt edilen Kullanıcı:\` \n${user}
\`🎭 Kayıt işleminde verilen rol:\` 
<@&1116750027717628067>  <@&1116750039860129794>
\`📤 Kayıt işleminde alınan rol:\` 
<@&1116750038081732710>
\`📊 Kayıt Sayın:\` **[${kayıtlar[id]}]**
`)
    .setColor("RED")
    .setThumbnail(user.user.displayAvatarURL())
  
// Embed mesajı kanala gönder
klog.send(embed01);
sohbetKanal.send(embed01);
  
  await user.roles.add('1116750027717628067');
  await user.roles.add('1116750039860129794');
  await user.roles.remove('1266868745696055311');
  await user.setNickname(`〔👑〕・ ${isim} | ${isim2} [${yaş}]`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["dts"],
  permLevel: 0
};

exports.help = {
  name: 'dts',
  description: 'Kayıt',
  usage: 'dts <@Kişi> <İsim> <İsim2> <Yaş>'
};
