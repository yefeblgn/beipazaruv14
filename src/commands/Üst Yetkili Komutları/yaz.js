const { PermissionFlagsBits, ActionRowBuilder, StringSelectMenuBuilder, Utils, codeBlock } = require("discord.js");
const config = require("../../../config")
const client = global.client;
const db = client.db;
module.exports = {
    name: "yaz",
    usage: "yaz",
    category:"üstyt",
    aliases: ["yazı", "söyle","yazdır"],
    execute: async (client, message, args, embed) => {
        let staffData = await db.get("five-ban-staff") || [];
        if (!staffData.length > 0) console.error("Ban Yetkilisi Ayarlı Değil!");
        if (!staffData.some(beş => message.member.roles.cache.get(beş)) && !message.member.permissions.has(PermissionFlagsBits.Administrator) && !message.member.permissions.has(PermissionFlagsBits.BanMembers)) return message.reply({ embeds: [embed.setDescription(`> **Komutu Kullanmak İçin Yetkin Bulunmamakta!**`)] }).sil(5);
        let mesaj = args.slice(0).join(" ");
        message.delete();
        message.channel.send({content:mesaj});
    }
}

