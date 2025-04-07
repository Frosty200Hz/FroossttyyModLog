const Discord = require('discord.js')
const db = require('quick.db') // dawn

exports.run = async (client, message, args) => {
    const izinliRolID = '1261328254711631883'; // Sadece bu role sahip olanlar kullanabilir

    // Eğer izinli role sahip değilse komutu engelle
    if (!message.member.roles.cache.has(izinliRolID)) {
        return message.channel.send('Bu komutu kullanmak için gerekli <@&1261328254711631883> sahip değilsin!');
    }

    // Komutlar
    if (args[0] === 'aktif' || args[0] === "açık" || args[0] === "aç") {
        db.set(`${message.guild.id}.kufur`, true);
        message.channel.send('Link Engel başarıyla açıldı! `〔⚙️〕・Küfür` rolüne sahip olanların reklamı engellenmicektir.');
        return;
    }

    if (args[0] === 'deaktif' || args[0] === "kapat" || args[0] === "kapalı") {
        db.delete(`${message.guild.id}.kufur`);
        message.channel.send('Küfür Engel başarıyla açıldı! `〔⚙️〕・Küfür` rolüne sahip olanların reklamı engellenmeyecek');
        return;
    }

    // Geçersiz kullanım
    message.channel.send('Lütfen `w!küfür aktif` veya `w!küfür deaktif` yazın!');
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['küfür', 'küfürfiltresi', 'küfürengel'],
    permLevel: 0
};

exports.help = {
    name: 'küfür-ayarla',
    description: 'Küfür filtresini açar veya kapatır',
    usage: '!küfürfiltresi'
};
