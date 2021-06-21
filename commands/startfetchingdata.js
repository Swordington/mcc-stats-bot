const updateAllCounts = require('../helpers/updateAllViewCounts')
const updateAllChannels = require('../helpers/updateVoiceChannels')

exports.run = async (client, message, args, level) => {
  if (client.livestreams.size === 0) return message.channel.send('❌ There are no active livestreams!')

  const intervalFunc = async () => {
    await updateAllCounts(client, 'auto')
    await updateAllChannels(client)
  }

  client.intervalLoop = setInterval(intervalFunc, 5000)
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
