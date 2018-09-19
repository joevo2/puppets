const express = require('express')
const crawl = require('./')
const app = express()
const port = 3300

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/u/:username', async (req, res) => {
  const { username } = req.params
  const result = await crawl(username)

  res.json(result)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))