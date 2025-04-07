const Discord = require('discord.js');
const moment = require('moment'); // Add moment for better date formatting

exports.run = async (client, message, args) => {
    if (!message.guild) {
        return message.author.send('Bu komutu sadece sunucularda kullanabilirsiniz.');
    }

    const guild = message.guild;
    const roleCount = guild.roles.cache.size;
    const emojiCount = guild.emojis.cache.size;
    const boostCount = guild.premiumSubscriptionCount;
    const securityRoleCount = guild.roles.cache.filter(role => role.permissions.has('ADMINISTRATOR')).size;
    const staffCount = guild.members.cache.filter(member => member.hasPermission('ADMINISTRATOR')).size;
    const categoryCount = guild.channels.cache.filter(channel => channel.type === 'category').size;
    const textChannelCount = guild.channels.cache.filter(channel => channel.type === 'text').size;
    const voiceChannelCount = guild.channels.cache.filter(channel => channel.type === 'voice').size;

    // Banlanmış kullanıcıları alma
    const bannedUsers = await guild.fetchBans();
    const bannedUserCount = bannedUsers.size;

    // Server Creation Date
    const creationDate = moment(guild.createdAt).format('DD/MM/YYYY');

    // Total Invite Count (if you want to use this, you'll need to track invites using the invites cache)
    let totalInvites = 0;
    try {
        const invites = await guild.invites.fetch();
        totalInvites = invites.size;
    } catch (error) {
        totalInvites = 'Unknown'; // In case invites are not accessible
    }

    // Active Members in Voice Channels
    const activeVoiceMembers = guild.members.cache.filter(member => member.voice.channel).size;

    // Bot Ping (Latency)
    const botPing = `${client.ws.ping} ms`;

    // Server Region (Locale)
    const region = guild.region;

    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .addField('<a:8onking:1215015475814076508> [Kullanıcı]', message.author.toString(), true)
        .addField('<a:8onking:1215015475814076508> [Üye]', guild.memberCount, true)
        .addField('<a:8onking:1215015475814076508> [Bot]', guild.members.cache.filter(member => member.user.bot).size, true)
        .addField('<a:8onking:1215015475814076508> [Banned]', bannedUserCount, true)
        .addField('<a:8onking:1215015475814076508> [Roller]', roleCount, true)
        .addField('<a:8onking:1215015475814076508> [Emoji]', emojiCount, true)
        .addField('<a:8onking:1215015475814076508> [Boost]', boostCount, true)
        .addField('<a:8onking:1215015475814076508> [Güvenlik]', securityRoleCount, true)
        .addField('<a:8onking:1215015475814076508> [Yetkili]', staffCount, true)
        .addField('<a:8onking:1215015475814076508> [Kanal]', guild.channels.cache.size, true)
        .addField('<a:8onking:1215015475814076508> [Kategori]', categoryCount, true)
        .addField('<a:8onking:1215015475814076508> [Metin]', textChannelCount, true)
        .addField('<a:8onking:1215015475814076508> [Ses]', voiceChannelCount, true)
        .addField('<a:8onking:1215015475814076508> [Aktif Sesli Üye]', activeVoiceMembers, true)
        .addField('<a:8onking:1215015475814076508> [Kuruluş Tarihi]', creationDate, true)
        .addField('<a:8onking:1215015475814076508> [Bot Latency]', botPing, true)
        .setTimestamp()
        .setTitle("✘ ・ `𝙵𝚁𝙾𝙾𝚂𝚂𝚃𝚃𝚈𝚈~ ・ ✘ sᴜɴᴜᴄᴜ ʟɪsᴛᴇsɪ ✘")
        .setFooter(`Bu komut ${message.author.username} tarafından kullanıldı.`)
        .setThumbnail(guild.iconURL());

    // Her bir alt alta ekleme
    embed.addField('\u200B', '\u200B'); // Boş bir satır eklemek için

    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sunucu-istatistik', 'server'],
    permLevel: 0
};

exports.help = {
    name: 'Komut : [ѕυnυcυ вιlgι]',
    description: "",
    usage: ',server'
};
