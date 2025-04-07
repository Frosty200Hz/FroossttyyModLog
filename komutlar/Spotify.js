const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    var user = message.mentions.users.first() || message.author;

    if (!args[0]) {
        return message.channel.send("**Şarkı bilgisini bulmam için Spotify'dan şarkı dinleyen birisini etiketlemen lazım.**");
    }

    // Kullanıcının Spotify bilgilerini kontrol et
    const spotifyActivity = user.presence.activities.find(activity => activity.type === 'LISTENING' && activity.name === 'Spotify');
    
    if (spotifyActivity) {
        try {
            var trackImg = spotifyActivity.assets.largeImageURL;
            var trackUrl = `https://open.spotify.com/track/${spotifyActivity.syncID}`;
            var trackName = spotifyActivity.details;
            var trackAlbum = spotifyActivity.assets.largeText;
            var trackAuthor = spotifyActivity.state;

            // Kısa URL oluşturma işlemi (eğer linki kısaltmak isterseniz burada değişiklik yapabilirsiniz)
            var shortTrackUrl = `https://spotify.link/${spotifyActivity.syncID}`;  // Bu şekilde varsayımsal bir kısaltma

            const embed = new Discord.MessageEmbed()
                .setColor(0xdb954)
                .setThumbnail(trackImg)
                .setDescription(`
\ <a:spo:1349842201034887240> **Spotify**'da dinlediği şarkı;  \**${trackName}**\n
\ <a:spo:1349842201034887240> **Spotify**'da dinlediği albüm;  \**${trackAlbum}**\n
\ <a:spo:1349842201034887240> **Spotify**'da dinlediği sanatçı;  \**${trackAuthor}**\n
\ <a:spo:1349842201034887240> **Spotify**'da dinleyen: ${user}\n
`)
                .addField('<a:spo:1349842201034887240> Spotify\'da Dinlediği Şarkı Linki;', `**[Kısa Link](${shortTrackUrl})**`, false);  // Kısa link burada kullanıldı

            return message.channel.send(embed);

        } catch (error) {
            return message.channel.send(`<a:spo:1349842201034887240> **${user}** kullanıcısı şuanda **Spotify**<:spotify:515260605347659777>'dan şarkı dinlemiyor.`);
        }

    } else {
        return message.channel.send(`<a:spo:1349842201034887240> **${user}** kullanıcısı şuanda Discord'una **Spotify**<:spotify:515260605347659777>'ı eklememiş`);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['spo', 'spotify'],
    permLevel: 0
};

exports.help = {
    name: 'spotify',
    description: '',
    usage: 'spotify'
};
