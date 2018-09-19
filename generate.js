const puppet = require('puppeteer')

module.exports = async (username) => {
  const regexAlt = /<img[\w\W]*?alt="([^"]+?)"[\w\W]*?>/g
  const regexSource = /<img[\w\W]*?srcset="([^"]+?)"[\w\W]*?>/g
  const browser = await puppet.launch()
  const page = await browser.newPage()

  await page.goto(`https://www.instagram.com/${username}`)

  const content = await page.evaluate(() => document.body.innerHTML)

  const posts = await content.match(/<img([\w\W]+?)>/gm)

  const mapping = await posts.map(item => {
    if (item !== '') {
      const matchAlt = regexAlt.exec(item)
      const matchSource = regexSource.exec(item)

      if (matchSource) {
        const fooo = {}
        const imageSplit = matchSource[1].split('w,')

        imageSplit.map(item => {
          const images = item.split(' ')
          fooo[images[1]] = images[0]
        })

        return {
          content: matchAlt[1],
          image: fooo
        }
      }
    }
  })

  const result = await mapping.filter(item => typeof item !== 'undefined')

  return result
}