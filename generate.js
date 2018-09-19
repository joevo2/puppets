const puppet = require('puppeteer')

module.exports = async (username) => {
  const regexSource = /<img[\w\W]*?alt="([^"]+?)"[\w\W]*?srcset="([^"]+?)"[\w\W]*?>/g
  const regexUsername = /<h1[\w\W]*?title="([^"]+?)">/g
  const regexProfilePicture = /<img[\w\W]*?src="([^"]+?)"[\w\W]*?>/
  const browser = await puppet.launch()
  const page = await browser.newPage()
  const user = {}

  await page.goto(`https://www.instagram.com/${username}`)

  const content = await page.evaluate(() => document.body.innerHTML)

  const posts = await content.match(/<img([\w\W]+?)>/gm)

  const mapping = await posts.map(item => {
    if (item !== '') {
      const matchSource = regexSource.exec(item)

      if (matchSource) {
        const fooo = {}
        const imageSplit = matchSource[2].split('w,')

        imageSplit.map(item => {
          const images = item.split(' ')
          fooo[images[1]] = images[0]
        })

        return {
          caption: matchSource[1],
          images: fooo
        }
      }
    }
  })

  const filter = await mapping.filter(item => typeof item !== 'undefined')

  const getUsername = await regexUsername.exec(content)
  const getProfilePicture = await regexProfilePicture.exec(content)

  if (getUsername[1]) {
    user['username'] = getUsername[1]
  }

  if (getProfilePicture[1]) {
    user['picture'] = getProfilePicture[1]
  }

  const result = {
    user: user,
    posts: filter
  }

  return result
}