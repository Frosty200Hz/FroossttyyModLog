const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
    let prefix = ''; // Botun prefixi

    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send(`Yetkin yok.`);
    }

    if (!args[0]) {
        return message.channel.send(`Sistemi kullanmak için, ${prefix}uyarı w!uyarı eklesil/bilgi örnek: w!uyarı ekle @kullanıcı komutlarını kullanın.`);
    }

    // Uyarı rollerini tanımla
    const uyarıRolleri = [
        '1337990193902518282', // 1. uyarı rolü
        '1337990220213387285', // 2. uyarı rolü
        '1266868745696055314'  // 3. uyarı rolü
    ];

    // 'ekle' komutu
    if (args[0] === 'ekle') {
        let kullanıcı = message.mentions.users.first();
        if (!args[1]) return message.channel.send(`Bir kişiyi etiketlemelisin.`);
        if (!kullanıcı) return message.channel.send(`${args[1]}, kullanıcısını sunucuda bulamıyorum.`);
        if (kullanıcı.bot) return message.channel.send(`Botları uyaramam.`);
        if (kullanıcı.id === message.author.id) return message.channel.send(`Kendini uyaramazsın.`);
        
        let reason = args.slice(2).join(' ') || 'Sebep belirtilmemiş'; // Sebep opsiyonel hale getirildi
        data.add(`uyarı.${message.guild.id}.${kullanıcı.id}`, +1); // Uyarı ekle
        const syı = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`); // Kullanıcının toplam uyarısı
        const member = message.guild.members.cache.get(kullanıcı.id);

        // Kullanıcının uyarı sayısına göre rol ekle
        if (syı === 1) {
            await member.roles.add(uyarıRolleri[0]);
        } else if (syı === 2) {
            await member.roles.add(uyarıRolleri[1]);
        } else if (syı === 3) {
            await member.roles.add(uyarıRolleri[2]);
        }

        // Kullanıcıya bildirim gönder
        await message.channel.send(`${kullanıcı}, [UYARIL'DI] Toplam [UYARI] sayısı: [${syı}]`);
        await kullanıcı.send(`${message.guild.name} sunucusunda ${reason} sebebiyle uyarıldın. Dikkatli ol!`);
    }

    // 'sil' komutu
    if (args[0] === 'sil') {
        let kullanıcı = message.mentions.users.first();
        if (!args[1]) return message.channel.send(`Bir kişiyi etiketlemelisin.`);
        if (!kullanıcı) return message.channel.send(`${args[1]}, kullanıcısını sunucuda bulamıyorum.`);
        if (kullanıcı.id === message.author.id) return message.channel.send(`Kendini uyaramazsın.`);
        
        let sayı = args[2];
        if (!sayı) return message.channel.send(`Silinecek uyarı sayısını yazmadın!`);
        if (isNaN(sayı)) return message.channel.send(`Silinecek uyarı sayısı geçerli bir sayı olmalı!`);
        if (sayı === '0') return message.channel.send(`Beni mi kandırmaya çalışıyorsun sen?`);

        const syı2 = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`);
        if (syı2 < sayı) return message.channel.send(`${kullanıcı}, sadece ${syı2} uyarın var. Bu kadarını silebilirsin.`);

        data.add(`uyarı.${message.guild.id}.${kullanıcı.id}`, -sayı); // Uyarı sil
        const syı = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`);
        const member = message.guild.members.cache.get(kullanıcı.id);

        // Kullanıcının uyarı sayısına göre rollerden çıkar
        if (syı < 1) {
            await member.roles.remove(uyarıRolleri[0]);
        }
        if (syı < 2) {
            await member.roles.remove(uyarıRolleri[1]);
        }
        if (syı < 3) {
            await member.roles.remove(uyarıRolleri[2]);
        }

        await message.channel.send(`${kullanıcı}, [UYARI]'ları silindi Toplam [UYARI] sayısı: [${syı ? syı : '0'}]`);
        await kullanıcı.send(`${message.guild.name} sunucusunda uyarın silindi. Daha dikkatli ol!`);
    }

    // 'bilgi' komutu
    if (args[0] === 'bilgi') {
        let kullanıcı = message.mentions.users.first();
        if (!args[1]) return message.channel.send(`Bir kişiyi etiketlemelisin.`);
        if (!kullanıcı) return message.channel.send(`${args[1]}, kullanıcısını sunucuda bulamıyorum.`);

        const syı2 = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`);
        if (!syı2 || syı2 === 0) {
            return message.channel.send(`${kullanıcı} kullanıcısının hiç [UYARI] yok.`);
        }

        await message.channel.send(`${kullanıcı}: Toplam [UYARI] sayısı: ${syı2}`);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['warn'],
    permLevel: 0,
};

exports.help = {
    name: 'uyarı'
};
