import fs from 'fs'

let html = fs.readFileSync('body.html', 'utf8')

html = html.replace(/src="([0-4]\.(jpg|png))"/g, 'src="/images/$1"')
html = html.replace(/\bclass=/g, 'className=')
html = html.replace(/\bfor=/g, 'htmlFor=')
html = html.replace(/\schecked=""/g, ' defaultChecked')
html = html.replace(/\s+onerror="[^"]*"/gi, '')
html = html.replace(/<(img|input|br|hr|meta|link)([^>]*?)(?<!\/)>/gi, (m, tag, attrs) => {
  if (/\/>\s*$/.test(m) || attrs.trimEnd().endsWith('/')) return m
  return `<${tag}${attrs} />`
})

// Fix FAQ details/summary if any use open attribute empty
html = html.replace(/\sopen=""/g, ' open')

fs.writeFileSync('src/body.fragment.tsx', html)
console.log('written fragment', html.length)
