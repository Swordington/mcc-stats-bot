const { Client, MessageEmbed } = require('discord.js') // eslint-disable-line no-unused-vars

/**
 *
 * @param {Client} client
 */
module.exports = async client => {
  const testChannel = '700339701898543124'
  const testGuild = '700339616900972665'
  const embed = new MessageEmbed()
    .setTitle('X PEOPLE ARE WATCHING MCC!')
    .setColor('#9C0BEF')
    .setTimestamp()
    .setFooter('MCC Stats Bot')

  const changeChannelGuild = await client.guilds.cache.get(testGuild)
  const changeChannel = await changeChannelGuild.channels.cache.get(testChannel)
  const msg = await changeChannel.messages.fetch(client.uwuImAnTestVar)
  if (changeChannel.permissionsFor(changeChannelGuild.me).missing('MANAGE_CHANNELS') > 0) return console.log('I don\'t have perms!')

  const livestreamsArray = Array.from(client.livestreams)
  let totalViewership = 0
  let i = 0
  livestreamsArray.forEach(async livestreamer => {
    totalViewership += parseInt(livestreamer[1].viewerCount)
    embed.setTitle(`${totalViewership} PEOPLE ARE WATCHING MCC`)
    i++
    if (i === livestreamsArray.length) await msg.edit(embed)
  })
}
