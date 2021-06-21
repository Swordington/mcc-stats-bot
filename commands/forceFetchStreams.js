const fetchAllLivestreams = require('../helpers/fetchAllLivestreams')

exports.run = async (client, message, args, level) => {
  await fetchAllLivestreams(client)
  message.react('👍')
}

exports.conf = {
  aliases: ['ffas'],
  permLevel: 10,
  enabled: true
}

exports.help = {
  name: 'forcefetchstreams',
  category: 'System',
  description: 'Forcefully fetch all livestream data',
  usage: 'forcefetchstreams',
  example: 'forcefetchstreams'
}
