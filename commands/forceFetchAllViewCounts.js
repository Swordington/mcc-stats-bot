const updateAllVCs = require('../helpers/updateAllViewCounts')

exports.run = async (client, message, args, level) => {
  if (client.livestreams.size === 0) return message.channel.send('❌ There are no active livestreams')
  await updateAllVCs(client)
  message.react('👍')
}

exports.conf = {
  aliases: ['ffavc'],
  permLevel: 10,
  enabled: true
}

exports.help = {
  name: 'forcefetchallviewcounts',
  category: 'System',
  description: 'Forcefully update all livestream view counts',
  usage: 'forcefetchallviewcounts',
  example: 'forcefetchallviewcounts'
}
