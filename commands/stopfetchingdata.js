
exports.run = async (client, message, args, level) => {
  clearTimeout(client.intervalLoop)
  message.react('👍')
}

exports.conf = {
  aliases: ['efad'],
  permLevel: 10,
  enabled: true
}

exports.help = {
  name: 'stopfetchingdata',
  category: 'System',
  description: 'Stop the timer that will fetch data from the Youtube API about streams',
  usage: 'stopfetchingdata',
  example: 'stopfetchingdata'
}
