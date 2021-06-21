const creatorChannelArray = require('../streamersLinks.json').testChannel
const Discord = require('discord.js')
const axios = require('axios')

/**
 * @param {Discord.Client} client
 */
module.exports = async (client) => {
  const livestreamsArray = Array.from(client.livestreams)
  livestreamsArray.forEach(async livestreamer => {
    const videoInfo = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${livestreamer[1].streamId}&key=${process.env.GAPITOKEN}`)
    console.log(videoInfo)
    const livestreamObject = {
      streaming: true,
      streamId: livestreamer[1].streamId,
      viewerCount: videoInfo.data.items[0].statistics.viewCount
    }
    client.livestreams.set(livestreamer[0], livestreamObject)
    console.log(`Fetched vewer count for ${livestreamer.id} - video ${livestreamer[1].streamId} | ${videoInfo.data.items[0].statistics.viewCount}`)
  })
}
