const Discord = require('discord.js');
const ms = require('ms');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    const allowedRoleID = '1116750077407531090'; // Yetkili rol ID'si

    try {
        // Kullanıcıdaki rol kontrolü
        if (!message.member.roles.cache.has(allowedRoleID)) {
            return message.reply("Bu komutu kullanma izniniz yok.");
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply("Mutelenmesi gereken bir üye belirtmelisiniz.");

        if (member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("Bu [üye] mute'atamazsın");

        let time = args[1];
        if (!time) return message.reply("Mute süresini belirtmelisiniz.");

        let reason = args.slice(2).join(' ');
        if (!reason) return message.reply("Mute sebebini belirtmelisiniz.");

        let muteRole = message.guild.roles.cache.find(role => role.name === "〔🔕〕・𝙼𝚞𝚝𝚎");
        if (!muteRole) return message.reply("Muted rolü bulunamadı. Lütfen bir Muted rolü oluşturun.");

        // Kullanıcının mevcut ismini kaydet
        const originalNickname = member.nickname || member.user.username;

        // Kullanıcıdaki rollerden mute rolü haricindekileri kaldır
        const originalRoles = member.roles.cache.filter(role => role.id !== muteRole.id).map(role => role.id);
        await member.roles.cache.forEach(role => {
            if (role.id !== muteRole.id) {
                member.roles.remove(role).catch(console.error);
            }
        });

        // Mute rolüne mesaj gönderme yetkisini kapatma
        message.guild.channels.cache.forEach(channel => {
            channel.updateOverwrite(muteRole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 saniye bekle

        // Mute rolünü ver ve ismini değiştir
        await member.roles.add(muteRole);
        await member.setNickname(`〔🔕〕・ [MUTE'Lİ] ${member.user.username}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 saniye bekle

        message.reply(`${member.user} başarıyla ${time} süreyle mutelendi.`);

        // Süre sonunda otomatik olarak mute'i kaldırma
        setTimeout(async () => {
            // Mute rolünü kaldır ve orijinal rolleri geri ekle
            await member.roles.remove(muteRole);
            message.channel.send(`${member.user} süresi dolan mute'ini kaldırıldı.`);

            if (originalRoles.length > 0) {
                await member.roles.add(originalRoles).catch(console.error);
            }

            // Kanal izinlerini geri ver
            message.guild.channels.cache.forEach(channel => {
                channel.updateOverwrite(muteRole, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
            });

            // Kullanıcı ismini eski haline getir
            await member.setNickname(originalNickname);
        }, ms(time));

        // Mute log kanalına gönderme
        const muteLogChannel = message.guild.channels.cache.get('1356294549248544999'); // Log kanal ID'si

        if (muteLogChannel) {
            const muteLogEmbed = new Discord.MessageEmbed()
                .setThumbnail(member.user.avatarURL({ dynamic: true }))
                .setColor("#ff0000")
                .addField("<:klan:1342237452990939166> <a:hastagh:1097791206961983538>[Kullanıcı]", `${member.user}`)
                .addField("<:klan:1342237452990939166> <a:hastagh:1097791206961983538>[Yetkili]", `${message.author}`)
                .addField("<:klan:1342237452990939166> <a:hastagh:1097791206961983538>[Süre]", time)
                .addField("<:klan:1342237452990939166> <a:hastagh:1097791206961983538>[Sebep]", reason)
                .setFooter(`Bu komut ${message.author.username} tarafından kullanıldı.`)
                .setTimestamp();

            muteLogChannel.send(muteLogEmbed);
        }

    } catch (err) {
        console.error('Kullanıcı mute edilirken bir hata oluştu: log atamıyoruz', err);
        message.reply('Kullanıcı mute edilirken bir hata oluştu: log atamıyoruz');
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['mute'],
};

exports.help = {
    name: 'Komut : [мυтe]',
    description: "",
    usage: ',mute @Kullanıcı [<süre>] [sebep]'
};
