const { create, Client } = require('@open-wa/wa-automate')
const malScraper = require('mal-scraper')

create().then(client => start(client))

function start(client) {
  client.onMessage(async message => {
    if (message.body.startsWith('/anime')) {
      const animeName = message.body.slice(7)
      try {
        const result = await malScraper.getInfoFromName(animeName)
        const responseText = `Title: ${result.title}\nType: ${result.type}\nEpisodes: ${result.episodes}\nScore: ${result.score}\nSynopsis: ${result.synopsis}`
        client.sendText(message.from, responseText)
      } catch (err) {
        console.error(err)
        client.sendText(message.from, 'Sorry, an error occurred while searching for the anime.')
      }
    }
  })
}
