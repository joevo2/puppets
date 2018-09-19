const puppet = require('puppeteer')

module.exports = async (username) => {
  const browser = await puppet.launch()
  const page = await browser.newPage()

  await page.goto(`https://www.instagram.com/${username}`)

  const userBio = await page.evaluate(() => {
    const element = {}
    const section = document.body.querySelector('main header section')
    const subSection = []

    const convert = (string) => {
      return parseInt(string.replace(/,/g, '').replace(/k/g, '000'))
    }

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
          element[slice[1]] = convert(slice[0])
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
    const postLink = document.querySelectorAll('main article a')
    const postContent = document.querySelectorAll('main article img')

    try {
      const mapping = []
      postContent.forEach((item, index) => {
        if (item !== null) {
          const images = {}
          const url = postLink[index].getAttribute('href')
          const caption = item.getAttribute('alt')
          const imageSplit = item.getAttribute('srcset').split('w,')
          const hastag = caption.split('#')

          hastag.splice(0,1)

          imageSplit.map(item => {
            const itemSplit = item.split(' ')
            images[itemSplit[1].replace(/[^\d]/, '')] = itemSplit[0]
          })

          mapping.push({
            url: url,
            thumbnail: images['320'],
            caption: caption,
            hastag: hastag.map(item => `#${item.trim()}`),
            images: images
          })
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