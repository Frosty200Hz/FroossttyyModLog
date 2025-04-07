const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
if(!["1215412989667057694"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta.`)
.setColor('#a22a2a')).then(x => x.delete({timeout: 5000}));


const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.channel.send(new Discord.MessageEmbed()
.setDescription(`Bir kullanıcı belirt.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

if(!member.roles.highest.position >= message.member.roles.highest.position) message.channel.send(new Discord.MessageEmbed()
.setDescription(`Belirtilen kullanıcı sizden üst/aynı pozisyonda işleme devam edilemiyor.`)
.setColor('AQUA')).then(x => x.delete({timeout: 5000}));

  
let bilgi = db.get(`yetkili.${member.id}`);
db.delete(`yetkili.${message.author.id}.toplam`)
db.delete(`yetkili.${message.author.id}.erkek`)  
db.delete(`yetkili.${message.author.id}.kadin`)
db.delete(`yetkili.${message.author.id}.zula`)
db.delete(`yetkili.${message.author.id}.özel`)
let toplami = db.fetch(`yetkili.${message.author.id}.toplam`)  

message.react('✅')

message.channel.send(new Discord.MessageEmbed()
.setColor("AQUA")
.setDescription(`<:roisser:1212998308914790441> ${member} kayıt'larınızı <@${message.author.id}> sıfırladı `))
  

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["sa", "ks", "kayıtları-sıfırla", "db-sıfırla", "dbisil", "db-sil"],
    permLevel: 1
};

exports.help = {
    name: 'Komut : [ĸayıт ѕıғırla]',
    description: "",
    usage: ',db-sil [üye]'
}

