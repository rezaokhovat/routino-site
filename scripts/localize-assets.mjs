import fs from 'fs'

const EQUIP_MAP = {
  'https://www.canford.fr/images/itemimages/LargeCNC/74-199_01.jpg':
    '/images/equip/podmic-usb.jpg',
  'https://cafe24img.poxo.com/channelcomph/web/product/big/202407/3eda020c5a787eb44951296130dd0a9e.jpg':
    '/images/equip/wireless-pro.jpg',
  'https://edge.allaboutcircuits.com/uploads/articles/rode-psa1-plus-arm.jpg':
    '/images/equip/psa-plus.jpg',
  'https://img.kirstein.de/out/pictures/generated/product/3/2000_2000_75/7683d7960d5c1989dc9b681c4ed9b9e4_3.jpg':
    '/images/equip/ds2.jpg',
  'https://www.sescibaba.com/rodecaster-pro-ii-yayin-mikseri-rode-7285-91351-85-B.webp':
    '/images/equip/rodecaster-pro-ii.jpg',
  'https://musiccenter.pl/userdata/public/gfx/30444/RDE-RDECaster-Video.jpg':
    '/images/equip/rodecaster-video.jpg',
  'https://nanliteus.com/cdn/shop/files/FC-300B_angled_1_1024x1024.jpg?v=1697576579':
    '/images/equip/fc300.jpg',
  'https://nanliteus.com/cdn/shop/files/FC150B_Angled_1_1024x1024.jpg?v=1710967399':
    '/images/equip/fc150.jpg',
  'https://nanliteus.com/cdn/shop/products/PavoTubeII30C_Front_angled_1024x1024.jpg?v=1676646399':
    '/images/equip/pavotube.jpg',
  'https://nanliteus.com/cdn/shop/products/MixPanel150_Angled_1024x1024.jpg?v=1574719001':
    '/images/equip/rgb-panel.jpg',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=120&amp;auto=format&amp;fit=crop&amp;q=80':
    '/images/equip/rgb-line.jpg',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=120&auto=format&fit=crop&q=80':
    '/images/equip/rgb-line.jpg',
}

let html = fs.readFileSync('body.html', 'utf8')
html = html.replace(/src="([0-4]\.(jpg|png))"/g, 'src="/images/$1"')

for (const [remote, local] of Object.entries(EQUIP_MAP)) {
  html = html.split(remote).join(local)
}

html = html.replace(/\s+onerror="[^"]*"/gi, '')
fs.writeFileSync('body.html', html)
fs.writeFileSync('src/pageHtml.ts', `export const pageHtml = ${JSON.stringify(html)};\n`)

const leftover = [...html.matchAll(/src="https?:\/\/[^"]+"/g)].map((m) => m[0])
console.log('localized body + pageHtml', html.length)
if (leftover.length) {
  console.warn('remaining remote image srcs:', leftover)
} else {
  console.log('no remaining remote image srcs')
}
