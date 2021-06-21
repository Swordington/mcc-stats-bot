const { Client } = require('discord.js')

/**
 *
 * @param {Client} client
 */
module.exports = async client => {
  const testVC = '709458655711461397'
  const testVCGuild = '700339616900972665'

  const changeChannelGuild = await client.guilds.cache.get(testVCGuild)
  const changeChannel = await changeChannelGuild.channels.cache.get(testVC)
  if (changeChannel.permissionsFor(changeChannelGuild.me).missing('MANAGE_CHANNELS') > 0) return console.log('I don\'t have perms!')

  const livestreamsArray = Array.from(client.livestreams)
  let totalViewership = 0
  let i = 0
  livestreamsArray.forEach(async livestreamer => {
    totalViewership += parseInt(livestreamer[1].viewerCount)
    i++
    if (i === livestreamsArray.length) await changeChannel.setName(`MCC viewers ${totalViewership}`)
  })
}
