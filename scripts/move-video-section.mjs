import fs from 'fs'

let html = fs.readFileSync('body.html', 'utf8')
const start = html.indexOf('<!-- Slider Card 2: Video Portfolio Showcase -->')
if (start < 0) throw new Error('video block start not found')

const thumbs = html.indexOf('id="video-thumbs"', start)
const thumbsClose = html.indexOf('</div>', thumbs)
const rootClose = html.indexOf('</div>', thumbsClose + 1)
const showcaseClose = html.indexOf('</div>', rootClose + 1)
const blockEnd = showcaseClose + 6

const videoBlock = html.slice(start, blockEnd)
html = html.slice(0, start) + html.slice(blockEnd)

const sectionStart = html.indexOf('id="studio-showcase"')
const sectionEnd = html.indexOf('</section>', sectionStart)
const insertAt = sectionEnd + '</section>'.length

const section = `
<section class="w-full py-16 bg-surface-container-low scroll-mt-28" id="video-samples">
${videoBlock}
</section>`

html = html.slice(0, insertAt) + section + html.slice(insertAt)
fs.writeFileSync('body.html', html)
console.log('moved ok', html.includes('id="video-samples"'))
