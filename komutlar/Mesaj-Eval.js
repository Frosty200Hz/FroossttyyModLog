const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js'); // Import MessageEmbed directly
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const chalk = require('chalk');
const fs = require('fs');
const { stripIndents } = require('common-tags');
const moment = require('moment');
const db = require('quick.db');
const Jimp = require('jimp');

const client = new Client();

exports.run = async (client, message, args) => {
    if(message.author.id !== "466611874558115840") return message.channel.send(":no_entry: Vay Çakal Bu Sahibimin Komutu");
    try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
        
        let embed = new MessageEmbed()
            .addField("Giriş", "```js\n" + code + "```")
            .setDescription("```js\n" + clean(evaled) + "```");

        if (embed.description.length >= 2048)
            embed.description = embed.description.substr(0, 2042) + "```...";

        return message.channel.send(embed);
    } catch (err) {
        message.channel.send(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
};

function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'eval',
    description: 'Kod denemek için kullanılır.',
    usage: 'eval [kod]'
};
