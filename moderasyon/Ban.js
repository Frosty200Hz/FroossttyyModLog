const Discord = require('discord.js');
const ms = require('ms'); // Süre hesaplama için ms modülünü ekleyin
const db = require('quick.db'); // db modülünü ekleyin

exports.run = async (client, message, args) => {
    // Rol ID'si
    const allowedRoleID = '1116750076459630672'; // Rol ID'sini buraya girin

    try {
        // Kullanıcının rollerini kontrol et
        if (!message.member.roles.cache.has(allowedRoleID)) {
            return message.reply("Bu komutu kullanma izniniz yok.");
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]); // Yasaklanacak üye
        if (!member)
            return message.reply("Yasaklanacak bir üye belirtmelisiniz.");

        if (member.hasPermission("BAN_MEMBERS")) // Yetkili veya botlara yasaklama işlemini engelle
            return message.reply("<a:ok:1213906376875839528> Bu [üye] sunucudan yasaklanamaz.");

        let time = args[1]; // Yasaklama süresi
        if (!time)
            return message.reply("Yasaklama süresini belirtmelisiniz.");

        let reason = args.slice(2).join(' '); // Yasaklama sebebi
        if (!reason)
            return message.reply("Yasaklama sebebini belirtmelisiniz.");

        // Kullanıcıyı yasakla
        await member.ban({ reason }).catch(err => {
            console.error(err);
            return message.reply("Yasaklama işlemi sırasında bir hata oluştu.");
        });

        message.reply(`${member.user} başarıyla ${time} süreyle sunucudan yasaklandı.`);

        // Süre sonunda otomatik olarak yasak kaldır
        setTimeout(async () => {
            try {
                await message.guild.members.unban(member.id); // Kullanıcıyı geri al
                message.channel.send(`${member.user} süresi dolan yasak kaldırıldı.`);
            } catch (err) {
                console.error("Kullanıcıyı geri alırken bir hata oluştu:", err);
            }
        }, ms(time));

        // Yasaklama log kanalını kontrol et
        const banLogChannelID = await db.get(`yasaklananMesaj.${message.guild.id}`);
        if (!banLogChannelID) return; // Log kanalı ayarlanmamışsa işlem yapma

        // Log kanalına kayıt
        const banLogChannel = message.guild.channels.cache.get(banLogChannelID);
        message.delete().then(x => x.delete({timeout: 9000}));
        if (banLogChannel) {
            const banLogEmbed = new Discord.MessageEmbed()
                .setThumbnail(member.user.avatarURL({ dynamic: true }))
                .setColor("#ff0000")
                .addField("<a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>[Kullanıcı]", `${member.user}`)
                .addField("<a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>[Yetkili]", `${message.author}`)
                .addField("<a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>[Süre]", time)
                .addField("<a:arrowright35:1215015269286543381> <a:hastagh:1097791206961983538>[Sebep]", reason)
                .setFooter(`Bu komut ${message.author.username} tarafından kullanıldı.`)
                .setTimestamp();
            banLogChannel.send(banLogEmbed);
        }
    } catch (err) {
        console.error('Kullanıcı yasaklanırken bir hata oluştu: log atamıyoruz', err);
        message.reply('Kullanıcı yasaklanırken bir hata oluştu: log atamıyoruz');
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ban'], // Komutun diğer adlarını da ekleyebilirsiniz
};

exports.help = {
    name: 'ban',
    description: "Süreli yasaklama komutu.",
    usage: 'w!ban @üye [<süre>] [sebep]'
};
