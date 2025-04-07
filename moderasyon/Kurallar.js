const Discord = require("discord.js");

exports.run = (client, message, args) => {
  // Komutun yazıldığı mesajı sil
  message.delete().catch(err => console.error("Mesaj silinemedi:", err));

  const kurallar = `\`\`\`fix
1 - Küfür/Argo Yasaktır.
2 - Flood/Spam Yasaktır.
3 - Huzursuzluk Çıkartmak Yasaktır.
4 - Reklam Yasaktır.
5 - İnsanları Küçük Düşürmek, Düşürmeye Çalışmak Yasaktır.
6 - Tavırlı/Egolu Üslupsuz Konuşmak Yasaktır.
7 - Emoji Spam/Flood Yasaktır.
8 - Özelden Reklam Yasaktır.
9 - Fake Nick Yasaktır.
10 - Küfürlü Nick Yasaktır.
11 - NSFW Avatar Yasaktır. / NSFW Gif Ve Küfürlü Gif Yasaktır.
12 - Sunucu Resmi İle Reklam Yasaktır.
13 - Discord Linki Yasaktır.
14 - Yetkililere Saygısızlık Yasaktır.
15 - Kişisel Bilgileri İfşa Etmek Yasaktır.
16 - Tehdit Etmek Yasaktır.
17 - İlk Harfler Ve Özel Terimler Hariç
18 - İsimlerde Veya Mesajlarda Büyük Harfler Kullanmak Yasaktır.
19 - Sürekli CAPSLOCK Açık Yazışmak Yasaktır.
20 - Şiddet, Kan, Cinsellik Ve Vahşet İçeren Resim/Video/Gif Yasaktır.
21 - Çalıntı İçerik Paylaşmak, Teşvik Etmek, Sunmak Yasaktır.
22 - Her Hangi Bir Sunucu İsmi Vermek Yasaktır.
23 - Siyasi Görüşlere Hakaret Yasaktır.
24 - Dini Görüşlere Hakaret Yasaktır.
25 - Kayıt Olurken | Zula Oyun Nick - İsim Ve Yaş Yazmanız Önemle Rica Olunur.
26 - Chatte Gif, Link ve Bot Komutları Kullanmak Yasaktır.
\`\`\``;

  message.channel.send(kurallar);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kurallar"],
  permLevel: 0
};

exports.help = {
  name: "rules"
};
