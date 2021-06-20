const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args, level) => {
  const embed = new MessageEmbed()
    .setTitle('Ping?')
  const msg = await message.channel.send(embed)
  embed.setColor('GREEN').setTitle('Pong!').setDescription(`Latency is \`${msg.createdTimestamp - message.createdTimestamp}ms\`. Discord API Latency is \`${Math.round(client.ws.ping)}ms\`.`).setFooter('MCC Stats Bot')
  msg.edit(embed)
}

exports.conf = {
  aliases: [],
  permLevel: 0,
  enabled: true
}

exports.help = {
  name: 'ping',
  category: 'System',
  description: 'Checks the bot & API latency.',
  usage: 'ping',
  example: 'ping'
}
