const dc = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, member) => {
  
if(!message.member.roles.cache.some(r => ['809886563814473781', '809886563814473782'].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))
return message.channel.send(new dc.MessageEmbed()
.setTimestamp()
.setThumbnail(message.author.avatarURL ({ dynamic: true})) 
.setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));
  
  let uye = message.mentions.users.first() || message.author;
let bilgi = db.get(`yetkili.${uye.id}.toplam`);
let yazı = "✘ Woe`e-Sports`Club ✘ sᴜɴᴜᴄᴜ 𝚝𝚘𝚙 ʟɪsᴛᴇsɪ 🏆 ✘"
  
let top = message.guild.members.cache.filter(uye => db.get(`yetkili.${uye.id}.toplam`)).array().sort((uye1, uye2) => Number(db.get(`yetkili.${uye2.id}.toplam`))-Number(db.get
(`yetkili.${uye1.id}.toplam`))).slice(0, 15).map((uye, index) => (index+1)+" • <@"+ uye +"> | \`" + db.get(`yetkili.${uye.id}.toplam`) +"\` Kayıta Sahip.").join('\n');
message.channel.send(new dc.MessageEmbed().setAuthor(yazı, message.guild.iconURL({dynamic: true})).setTimestamp().setColor("AQUA").setFooter(message.member.displayName+" tarafından istendi!", message.author.avatarURL).setDescription(top));
  //PROJENİN SAHİBİ GRAVİTY#2566
}
//PROJENİN SAHİBİ GRAVİTY#2566
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["topteyit", "top", "teyit", "top-teyit"],
};

exports.help = {
    name: 'Komut : [тop тeyιт]',
    description: "",
    usage: ',𝚝𝚘𝚙'
};