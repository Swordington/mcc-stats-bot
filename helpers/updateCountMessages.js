const { Client, MessageEmbed } = require('discord.js') // eslint-disable-line no-unused-vars
const Guild = require('../models/guild')

/**
 *
 * @param {Client} client
 */
module.exports = async client => {
  const allGuilds = await Guild.find()
  const livestreamsArray = Array.from(client.livestreams)
  let totalViewership = 0
  livestreamsArray.forEach(async livestreamer => {
    totalViewership += parseInt(livestreamer[1].viewerCount)
  })
  const embed = new MessageEmbed()
    .setTitle(`${totalViewership} PEOPLE ARE WATCHING MCC!`)
    .setColor('#9C0BEF')
    .setTimestamp()
    .setFooter('MCC Stats Bot')

  allGuilds.forEach(async guild => {
    const changeChannelGuild = await client.guilds.cache.get(guild._id)
    const changeChannel = await changeChannelGuild.channels.cache.get(guild.editChannelId)
    const msg = await changeChannel.messages.fetch(guild.editMsgId)
    msg.edit(embed)
  })
}
