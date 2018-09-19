const puppet = require('puppeteer')

module.exports = async (username) => {
  const browser = await puppet.launch()
  const page = await browser.newPage()

  await page.goto(`https://www.instagram.com/${username}`)

  const userBio = await page.evaluate(() => {
    const element = {}
    const section = document.body.querySelector('main header section')
    const subSection = []

    section.childNodes.forEach(element => {
      subSection.push(element.innerText)
    })

    subSection.map((item, index) => {
      if (index === 0) {
        element['username'] = item.split('\n')[0]
      }

      if (index === 1) {
        item.split('\n').map(item => {
          const slice = item.split(' ')
          element[slice[1]] = slice[0]
        })
      }

      if (index === 2) {
        const slice = item.split('\n')
        const name = slice[0]

        slice.splice(0, 1)

        const bio = slice.join('\n')

        element['fullName'] = name
        element['bio'] = bio
      }
    })

    return element
  })

  const userPosts = await page.evaluate(() => {
    const regexSource = /<img[\w\W]*?alt="([^"]+?)"[\w\W]*?srcset="([^"]+?)"[\w\W]*?>/g
    const content = document.querySelector('main article').innerHTML
    const posts = content.match(/<img([\w\W]+?)>/gm)

    try {
      const mapping = posts.map(item => {
        if (item !== '') {
          const matchSource = regexSource.exec(item)

          if (matchSource) {
            const images = {}
            const imageSplit = matchSource[2].split('w,')

            imageSplit.map(item => {
              const itemSplit = item.split(' ')
              images[itemSplit[1].replace(/[^\d]/, '')] = itemSplit[0]
            })

            return {
              caption: matchSource[1],
              images: images
            }
          }
        }
      })

      return mapping.filter(item => typeof item !== 'undefined')
    } catch (error) {
      return []
    }
  })

  const result = {
    user: userBio,
    posts: userPosts
  }

  return result
}