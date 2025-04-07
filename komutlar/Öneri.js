const Discord = require('discord.js');

exports.run = function(client, message, args) {
    let sikayetkonu = args.slice(0).join(' ');
    
    // Öneri uzunluk kontrolü (min 10 karakter)
    if (sikayetkonu.length < 10) {
        return message.channel.send('Öneriniz en az 10 karakter olmalıdır.').then(msg => msg.delete({timeout: 5000}));
    }

    if (sikayetkonu.length < 1) {
        return message.channel.send('Kullanım: f!öneri <öneri>').then(msg => msg.delete({timeout: 5000}));
    }

    // Kullanıcıya öneri alındığı mesajı gönder
    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription('<:Yetkili:1049777855170621500>   \`Öneriniz İletildi.\`   <:Yetkili:1049777855170621500>');
    message.channel.send(embed).then(msg => msg.delete({timeout: 5000}));

    // Öneriyi yönetici kanalına gönderme
    const embed2 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setImage('https://cdn.discordapp.com/attachments/1208550491118764083/1212037889886658611/image.png?ex=65f0613f&is=65ddec3f&hm=9e6719b7300f7da0eedac266ca5a656a50970d08ac5b52f7c11dc739b009a54d&')
        .setDescription(`
-----------------------------------------------------

<:Duyuru:1049777853371273306>    **Ö𝚗𝚎𝚛𝚒**       ${sikayetkonu}

<:Yetkili:1049777855170621500>    **𝙱𝚒𝚕𝚍𝚒𝚛𝚎𝚗**   ${message.author}

-----------------------------------------------------`);

    // Öneriyi belirli bir kanala gönderiyoruz
    client.channels.cache.get('1213019363519496264').send(embed2).then(async msj => {
        msj.react('🟢').then(() => msj.react('🔴'));
    });

    // Moderatörlere öneri bildirimi
    const modChannel = client.channels.cache.get('1213019363519496264'); // Bu kanalı değiştirin
    if (modChannel) {
        modChannel.send(`Yeni bir öneri geldi! Öneriyi kontrol etmek için <#1213019363519496264> kanalına bakabilirsiniz.`);
    }

    // İstenilen kullanıcıya teşekkür mesajı
    message.author.send('Teşekkürler! Öneriniz alındı ve ilgili kanala iletildi.');
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['öneri'],
    permLevel: 0
};

exports.help = {
    name: 'Komut : [𝚘̈𝚗𝚎𝚛𝚒]',
    description: 'Sunucudaki öneri sistemi.',
    usage: ',öneri [öneri]'
};
