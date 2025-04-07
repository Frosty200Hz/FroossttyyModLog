const Discord = require('discord.js');
const ms = require('ms'); // Süre hesaplama için ms modülünü ekleyin
const db = require('quick.db'); // db modülünü ekleyin

exports.run = async (client, message, args) => {
    // Rol ID'si
    const allowedRoleID = '1116750075448803339'; // Rol ID'sini buraya girin

    try {
        // Kullanıcının rollerini kontrol et
        if (!message.member.roles.cache.has(allowedRoleID)) {
            return message.reply("Bu komutu kullanma izniniz yok.");
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]); // Atılacak üye
        if (!member)
            return message.reply("Atılacak bir üye belirtmelisiniz.");

        if (member.hasPermission("KICK_MEMBERS")) // Yetkili veya botlara atma işlemini engelle
            return message.reply("<a:ok:1213906376875839528> Bu [üye] sunucudan atılamaz.");

        let time = args[1]; // Atılma süresi
        if (!time)
            return message.reply("Atılma süresini belirtmelisiniz.");

        let reason = args.slice(2).join(' '); // Atılma sebebi
        if (!reason)
            return message.reply("Atılma sebebini belirtmelisiniz.");

        // Kullanıcıyı sunucudan at
        await member.kick(reason).catch(err => {
            console.error(err);
            return message.reply("Atma işlemi sırasında bir hata oluştu.");
        });

        message.reply(`${member.user} başarıyla ${time} süreyle sunucudan atıldı.`);

        // Süre sonunda otomatik olarak tekrar sunucuya al
        setTimeout(async () => {
            try {
                // Atılan kullanıcıyı tekrar davet et (davet linkiyle)
                let inviteLink = await message.guild.invites.create(message.channel.id, { maxAge: 0, unique: true }); // Davet linki oluştur
                await member.send(`Sunucudan atıldığınız sürenin dolmasından dolayı tekrar sunucuya davet edildiniz: ${inviteLink.url}`);
                
                // Eğer kullanıcı daveti kabul ederse, sunucuya geri dönmesi sağlanabilir.
                message.channel.send(`${member.user} süresi dolan atılma işlemi tamamlandı. Davet linki gönderildi.`);
            } catch (err) {
                console.error("Kullanıcı davet edilirken bir hata oluştu:", err);
            }
        }, ms(time));

        // Atılma log kanalını kontrol et
        const kickLogChannel = message.guild.channels.cache.get('1356294549248544999'); // Log kanal ID'si

        if (kickLogChannel) {
            const kickLogEmbed = new Discord.MessageEmbed()
                .setThumbnail(member.user.avatarURL({ dynamic: true }))
                .setColor("#ff0000")
                .addField("<:klan:1342237452990939166> <a:hastagh:1097791206961983538>[Kullanıcı]", `${member.user}`)
                .addField("<:klan:1342237452990939166> <a:hastagh:1097791206961983538>[Yetkili]", `${message.author}`)
                .addField("<:klan:1342237452990939166> <a:hastagh:1097791206961983538>[Süre]", time)
                .addField("<:klan:1342237452990939166> <a:hastagh:1097791206961983538>[Sebep]", reason)
                .setFooter(`Bu komut ${message.author.username} tarafından kullanıldı.`)
                .setTimestamp();
            kickLogChannel.send(kickLogEmbed);
        }
    } catch (err) {
        console.error('Kullanıcı atılırken bir hata oluştu: log atamıyoruz', err);
        message.reply('Kullanıcı atılırken bir hata oluştu: log atamıyoruz');
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kick'], // Komutun diğer adlarını da ekleyebilirsiniz
};

exports.help = {
    name: 'kick',
    description: "Süreli sunucudan atma komutu.",
    usage: 'w!kick @üye [<süre>] [sebep]'
};
