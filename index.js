/**
 * Copyright (C) 2021 The Big Brother Group
 *
 * Authored by: The1Sword
 *
 */
require('dotenv').config()

const Discord = require('discord.js')
const { promisify } = require('util')
const readdir = promisify(require('fs').readdir)

const client = new Discord.Client()

client.config = require('./config.js')

console.log('Starting up!')

require('./helpers/functions')(client) // IDK why but it works

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

// The init script - prepares it all for starting
const init = async () => {
  // Searches for all commands & loads them
  const cmdFiles = await readdir('./commands/')
  client.logger.load(`Loading a total of ${cmdFiles.length} commands.`)
  cmdFiles.forEach(f => {
    if (!f.endsWith('.js')) return
    const response = client.loadCommand(f)
    if (response) console.log(response)
  })
  // Searches for all events & loads them
  const evtFiles = await readdir('./events/')
  client.logger.load(` Loading a total of ${evtFiles.length} events.`)
  evtFiles.forEach(file => {
    const eventName = file.split('.')[0]
    client.logger.load(`Loading Event: ${eventName} (${file})`)
    const event = require(`./events/${file}`)

    client.on(eventName, event.bind(null, client))
  })

  // Builds the level Cache (the two levels used lol)
  client.levelCache = {}
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i]
    client.levelCache[thisLevel.level] = thisLevel.level
  }

  // Logs into the Discord Gateway. THIS MUST A L W A Y S HAPPEN LAST.
  client.login(client.settings.token)
}

init()