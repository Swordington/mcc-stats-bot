const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args, level) => {
  const embed = new MessageEmbed()
    .setTitle('X PEOPLE ARE WATCHING MCC!')
    .setDescription('This message will update when MCC starts')
    .setColor(message.guild.me.displayColor)
    .setTimestamp()
    .setFooter('MCC Stats Bot')
  const statusMsg = await message.channel.send(embed)

  client.uwuImAnTestVar = statusMsg.id
}

exports.conf = {
  aliases: ['scem'],
  permLevel: 10,
  enabled: true
}

exports.help = {
  name: 'sendcounterembed',
  category: 'System',
  description: 'Sends the embed to be updated',
  usage: 'sendcounterembed',
  example: 'sendcounterembed'
}
