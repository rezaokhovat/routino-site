import fs from 'fs'

let html = fs.readFileSync('body.html', 'utf8')
html = html.replace(/src="([0-4]\.(jpg|png))"/g, 'src="/images/$1"')
fs.writeFileSync('src/pageHtml.ts', `export const pageHtml = ${JSON.stringify(html)};\n`)
console.log('pageHtml.ts written', html.length)
