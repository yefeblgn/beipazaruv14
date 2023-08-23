const { PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder, Events, EmbedBuilder } = require("discord.js");
const config = require("../../../config")
const client = global.client;
const db = client.db;
module.exports = {
    name: "cihaz",
    usage: "cihaz [@Beş / ID]",
    category:"genel",
    aliases: ["chz", "durum", "client"],
    execute: async (client, message, args, embed) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if(!user) return message.reply({ embeds: [embed.setDescription(`> **Geçerli Bir User Belirt!**`)] }).sil(5);
        if (user.presence == null) return message.reply({ embeds: [embed.setDescription(`> **Belirtilen User Ofline Durumda Olduğu İçin Kontrol Edilemiyor!**`)] }).sil(5);
        let dev = Object.keys(user.presence.clientStatus)
        let tür = {desktop: "(💻) Bilgisayar / Uygulama",mobile: "(📱) Mobil / Uygulama",web: "(🌐) Web Tarayıcı / İnternet"}
        let tür2 = {online: "(🟢) Çevrimiçi",dnd: "(🔴) Rahatsız Etme",idle: "(🟡) Boşta",offline:"(⚪) Çevrimdışı"}
        message.reply({ embeds: [embed.setDescription(`> **${user} Kullanıcısının Aktif Cihazları!**\n**Durum; \`${tür2[user.presence.status]}\`**\n**Cihazlar; ${dev.map(x => `\`${tür[x]}\``).join("\n")}**`).setThumbnail(user.user.avatarURL({dynamic:true}))] });
    }
}
