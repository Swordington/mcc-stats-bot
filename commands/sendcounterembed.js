const { MessageEmbed } = require('discord.js')
const GuildModel = require('../models/guild')

exports.run = async (client, message, args, level) => {
  const embed = new MessageEmbed()
    .setTitle('X PEOPLE ARE WATCHING MCC!')
    .setDescription('This message will update when MCC starts')
    .setColor(message.guild.me.displayColor)
    .setTimestamp()
    .setFooter('MCC Stats Bot')
  const statusMsg = await message.channel.send('<a:Loading:846571474268586015> Gimme a sec')

  const mongoGuild = await GuildModel.findById(message.guild.id)
  mongoGuild.editChannelId = message.channel.id
  mongoGuild.editMsgId = statusMsg.id
  mongoGuild.save()

  await statusMsg.edit(embed)
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
