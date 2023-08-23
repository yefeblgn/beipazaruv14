const { PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder, Events, EmbedBuilder, StringSelectMenuBuilder, ComponentType, codeBlock } = require("discord.js");
const config = require("../../../config")
const client = global.client;
const db = client.db;
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr");
const messageUserChannel = require("../../schemas/messageChannelsSchema");
const voiceUserChannel = require("../../schemas/voiceChannelsSchema");
const messageUser = require("../../schemas/messagesSchema");
const voiceUser = require("../../schemas/voicesSchema");
const voiceUserParent = require("../../schemas/voiceParentsSchema");
const invite = require("../../schemas/invitesSchema");
module.exports = {
    name: "invite",
    usage: "invite [@Beş / ID]",
    category: "stat",
    aliases: ["davet", "davetim", "invites", "davetlerim"],
    execute: async (client, message, args, embed) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let davet = await invite.findOne({ guildId: message.guild.id, userId: member.user.id });
      embed.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
      embed.setDescription(`> **${member.user.toString()} Kullanıcısının Davet Verileri;**\n \n`)
      .addFields(
      { name: `${client.emoji("emote_invite") !== null ? client.emoji("emote_invite"):"📩"} • **Toplam Davet**`,  value: codeBlock("js",`Gerçek: ${davet ? davet.Regular : 0}, Sahte: ${davet ? davet.Fake :0}, Ayrılan: ${davet ? davet.Left : 0}, Bonus: ${davet ? davet.Bonus : 0}`)}
      )
      return message.reply({embeds: [embed]})

    }
}
