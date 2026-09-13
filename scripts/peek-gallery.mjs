import fs from 'fs'
const h = fs.readFileSync('body.html', 'utf8')
const start = h.indexOf('دکوراسیون و فضاسازی')
console.log(h.slice(start, start + 1200).replace(/</g, '\n<'))
