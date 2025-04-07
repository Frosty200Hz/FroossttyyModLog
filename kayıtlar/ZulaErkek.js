const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const fs = require('fs'); // JSON dosyasını okuyup yazmak için gerekli.

let kayıtlar = require('../veriler/kayıtlar.json'); // kayıt sayısı dosyası

module.exports.run = async (bot, message, args, member, client, level) => {

  const klog = message.guild.channels.cache.get("1196601005975027934");
  const sohbetKanal = message.guild.channels.cache.get("1196600269677535232"); // Sohbet kanalını al

  if(!message.member.roles.cache.has("1116750023623987302")) 
    return message.channel.send(new Discord.MessageEmbed()
    .setDescription("Komutu kullanmak için <@&1116750023623987302> yetkiye sahip olman gerek")
    .setColor("RED"));

  const nick = args[1];
  if(!nick)
    return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Bir Nick Gir Örnek: \`${ayarlar.prefix}woe @Kullanıcı <nick> <isim> <yaş>\``)
    .setColor("RED"));

  const isim2 = args[2];  // Yeni parametre 'isim2' burada alınıyor.
  if(!isim2)
    return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Bir isim Gir Örnek: \`${ayarlar.prefix}woe @Kullanıcı <nick> <isim> <yaş>\``)
    .setColor("RED"));

  const yaş = args[3];  // Yaş artık args[3] olacak
  if(!yaş)
    return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`Bir Yaş Gir Örnek: \`${ayarlar.prefix}woe <@Kullanıcı> <nick> <isim> <yaş>\``)
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
\`👩 Kayıt edilen kullanıcı:\` \n${user}
\`🎭 Kayıt işleminde verilen rol:\` <@&1116750039860129794>  
\`📤 Kayıt işleminde alınan rol:\` 
<@&1266868745696055311>
\`📊 Kayıt Sayın:\` **[${kayıtlar[id]}]**
`)
  
    .setColor("YELLOW")
    .setThumbnail(user.user.displayAvatarURL())
    .setImage('https://cdn.discordapp.com/attachments/1341134245816438864/1349907269994676264/woe.png?ex=67d4ce9d&is=67d37d1d&hm=1ae9f489296b7338018efb2897f77fd2f35f79797826903385dbb1300c92645a&')
    // Adding a banner-like image to the embed
    .setFooter('Kayıt işlemi için başarıyla yapıldı!', 'https://example.com/banner-image.png');

  // Embed mesajı kanala gönder
  klog.send(embed01);
  sohbetKanal.send(embed01);

  await user.roles.add('1116750039860129794');
  await user.roles.remove('1266868745696055311');
  await user.setNickname(`〔🔱〕・ ${nick} | ${isim2} [${yaş}]`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["zula-e"],
  permLevel: 0
};

exports.help = {
  name: 'zula-e',
  description: 'Kayıt',
  usage: 'zula-e <@Kişi> <İsim> <İsim2> <Yaş>'
};
