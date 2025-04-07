const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const fs = require('fs');

let kayıtlar = require("../veriler/kayıtlar.json");

// Small Caps Dönüştürücü
function toSmallCaps(text) {
  const smallCaps = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ',
    i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ',
    q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x',
    y: 'ʏ', z: 'ᴢ'
  };

  return text.split('').map(char => {
    const lower = char.toLowerCase();
    return smallCaps[lower] || char;
  }).join('');
}

module.exports.run = async (bot, message, args) => {
  const klog = message.guild.channels.cache.get("1196601005975027934");
  const sohbetKanal = message.guild.channels.cache.get("1196600269677535232");

  if (!message.member.roles.cache.has("1116750023623987302")) 
    return message.channel.send(new Discord.MessageEmbed()
      .setDescription("Komutu kullanmak için <@&1116750023623987302> yetkiye sahip olman gerek")
      .setColor("RED"));

  const isim = args.slice(1).join(" ");
  if (!isim)
    return message.channel.send(new Discord.MessageEmbed()
      .setDescription(`Bir İsim Gir Örnek: \`${ayarlar.prefix}bot @Kullanıcı <isim> <isim2>\``)
      .setColor("RED"));

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!user)
    return message.channel.send(new Discord.MessageEmbed()
      .setDescription("Etiket atmayı unuttun.")
      .setColor("RED"));
  
  // ========== KAYIT SAYISI TUTMA ==========
  let id = message.author.id;
  if (!kayıtlar[id]) kayıtlar[id] = 0;
  kayıtlar[id]++;
  fs.writeFileSync('./veriler/kayıtlar.json', JSON.stringify(kayıtlar, null, 2));
  // ========================================

  const smallCapsIsim = toSmallCaps(isim);

  const embed = new Discord.MessageEmbed()
    .setDescription(`
\`✨ Kayıt Eden Yetkili:\` \n${message.author}
\`🤖 Kayıt edilen Bot:\` \n${user}
\`🧾 Bot İsmi:\` \`${smallCapsIsim}\`
\`🎭 Verilen Rol:\` <@&1116750069396426863>  
\`📤 Alınan Rol:\` <@&1116750038081732710>
\`📊 Kayıt Sayın:\` **[${kayıtlar[id]}]**
`)
    .setColor("RED")
    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    .setImage('https://cdn.discordapp.com/attachments/1341134245816438864/1349907269994676264/woe.png');

  klog.send(embed);
  sohbetKanal.send(embed);

  await user.roles.add('1116750069396426863');
  await user.roles.remove('1116750038081732710');
  await user.setNickname(`🌟 ${smallCapsIsim} | - [вσт]`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bot"],
  permLevel: 0
};

exports.help = {
  name: 'bot',
  description: 'Bot kaydı yapar ve istatistikleri gösterir.',
  usage: 'bot @kullanıcı isim isim2'
};
