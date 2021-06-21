const updateAllVCs = require('../helpers/updateAllViewCounts')

exports.run = async (client, message, args, level) => {
  if (client.livestreams.size === 0) return message.channel.send('❌ There are no active livestreams!')
  client.datafetchloop = setTimeout(async () => {
    await updateAllVCs(client)
  }, 5000)
}

exports.conf = {
  aliases: ['sfad'],
  permLevel: 10,
  enabled: true
}

exports.help = {
  name: 'startfetchingdata',
  category: 'System',
  description: 'Start the timer that will fetch data from the Youtube API about streams',
  usage: 'startfetchingdata',
  example: 'startfetchingdata'
}
