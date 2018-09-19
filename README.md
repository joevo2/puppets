# Puppets

📷 Crawl Instagram posts using Google Puppeter

## How to Use

Use `npm install --save igpuppets` to install **Puppets** on your project and then follow below example.

```js
const crawl = require('igpuppets')

crawl('username_here').then(result => {
  console.log(result) // result here
})
```

Or, if you want running this software as API. You can **clone this project** and run **npm install** and then run **npm start**.

This project will be run on **port 3300**, so you can crawl on **http://localhost:3300/u/username_here**.

### Example Results

_Currently this script only can crawl 12 posts_

```js
{
   "user":{
      "username":"orori_id",
      "posts":3050,
      "followers":42000,
      "following":882,
      "fullName":"www.ORORI.com",
      "bio":"The 1st jewelry online store in Indonesia\n-\n💍Order + pricelist:\nWeb: www.orori.com\nWA: 082210009898\nLINE@: @orori_id\n-\nGratis voucher 500rb Body Shop\nbit.ly/TBS500-IG"
   },
   "posts":[
      {
         "thumbnail":"https://instagram.fcgk9-1.fna.fbcdn.net/vp/2f956859ae1116392ecddff8895fe4d1/5C3C8C92/t51.2885-15/e35/s320x320/40954269_321470511944803_611239412123048484_n.jpg",
         "caption":"Punya desain cincin impian yang ingin diwujudkan? Anda bisa lho memesan perhiasan custom di ORORI, lho! Siapkan desain perhiasan impian Anda, infokan ke tim sales kami dan tunggu hingga proses produksi selesai. Cincin dengan desain impian pun bukan lagi wacana, bukan? [code: Custom Ring]\n-\n-\n-\n#ORORICustomRing #ORORIWomensRing #cincinberlian #cincincustom #cincinemas #cincintunangan #cincinunik #diamondring #engagementring #diamondring #customring #whitegoldring #orori #orori_id #jewelleryindonesia",
         "hastag":[
            "#ORORICustomRing",
            "#ORORIWomensRing",
            "#cincinberlian",
            "#cincincustom",
            "#cincinemas",
            "#cincintunangan",
            "#cincinunik",
            "#diamondring",
            "#engagementring",
            "#diamondring",
            "#customring",
            "#whitegoldring",
            "#orori",
            "#orori_id",
            "#jewelleryindonesia"
         ],
         "images":{
            "150":"https://instagram.fcgk9-1.fna.fbcdn.net/vp/36ced5d7c3b7c30f581ad158231a5224/5C2E489F/t51.2885-15/e35/s150x150/40954269_321470511944803_611239412123048484_n.jpg",
            "240":"https://instagram.fcgk9-1.fna.fbcdn.net/vp/ff97a1ef6a72197e52ff9deac6a3189b/5C217B2A/t51.2885-15/e35/s240x240/40954269_321470511944803_611239412123048484_n.jpg",
            "320":"https://instagram.fcgk9-1.fna.fbcdn.net/vp/2f956859ae1116392ecddff8895fe4d1/5C3C8C92/t51.2885-15/e35/s320x320/40954269_321470511944803_611239412123048484_n.jpg",
            "480":"https://instagram.fcgk9-1.fna.fbcdn.net/vp/e228546abd0439178fec1c533956f5e8/5C2F33CE/t51.2885-15/e35/s480x480/40954269_321470511944803_611239412123048484_n.jpg",
            "640":"https://instagram.fcgk9-1.fna.fbcdn.net/vp/cd313c9c7918a6632bb20c6ade75df76/5C20367E/t51.2885-15/sh0.08/e35/s640x640/40954269_321470511944803_611239412123048484_n.jpg"
         }
      },
      // ...
   ]
}
```