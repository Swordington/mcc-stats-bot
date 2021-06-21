const creatorChannelArray = require('../streamersLinks.json').creators
const axios = require('axios')

module.exports = (client) => {
  creatorChannelArray.forEach(async creatorChannel => {
    let liveVideos
    try {
      liveVideos = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${creatorChannel.id}-e8Q&eventType=live&maxResults=25&type=video&key=${process.env.GAPITOKEN}`)
    } catch (e) {
      console.log('I done did a goof \n' + e)
      return
    }
    if (liveVideos.data.items.length === 0) {
      client.livestreams.set(creatorChannel.id, { streaming: false })
      console.log(`${creatorChannel.username} (${creatorChannel.id}) was not livestreaming`)
      return
    }

    const viewoInfo = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=${process.env.GAPITOKEN}`)
  })
}
