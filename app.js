const express = require('express')
const crypto = require('crypto')
const app = express()
const puppeteer = require('puppeteer')

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', async (req, res) => {
  try {
    res.render('invoice', async (err, html) => {
      const filename = `assets/pdf/${crypto
        .pseudoRandomBytes(16)
        .toString('hex')}.pdf`
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.setContent(html)
      await page.pdf({ path: filename, format: 'a4' })
      await browser.close()
      res.render('invoice')
    })
    // res.end()
  } catch (error) {
    res.status(500).send({ error })
  }
})

app.listen(9000, () =>
  console.log('Server is running on port http://localhost:9000')
)
