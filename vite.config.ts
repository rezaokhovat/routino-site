import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin, createServer } from 'vite'

function prettyUrls(): Plugin {
  const rewrite = (url?: string) => {
    if (!url) return url
    const [path, query] = url.split('?')
    const match = path.match(/^\/(studio|podcast|about|contact)\/?$/)
    if (!match) return url
    const next = `/${match[1]}.html`
    return query ? `${next}?${query}` : next
  }
  return {
    name: 'pretty-urls',
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        req.url = rewrite(req.url) ?? req.url
        next()
      })
    },
  }
}
  return {
    name: 'prerender-routes',
    apply: 'build',
    async closeBundle() {
      const outDir = path.resolve('dist')
      const templatePath = path.join(outDir, 'index.html')
      if (!fs.existsSync(templatePath)) return

      const template = fs.readFileSync(templatePath, 'utf8')
      const { notFoundSeo, seoPages } = await import('./src/seo/config.ts')
      const { buildHeadTags, buildSitemapXml } = await import('./src/seo/headTags.ts')
      const server = await createServer({
        server: { middlewareMode: true, hmr: false },
        appType: 'custom',
        logLevel: 'error',
      })

      try {
        const { render } = (await server.ssrLoadModule('/src/entry-server.tsx')) as {
          render: (url: string) => string
        }

        const pages = [...seoPages, notFoundSeo]
        for (const page of pages) {
          const url = page.path === '/404' ? '/__not-found__' : page.path
          const appHtml = render(url)
          const html = template
            .replace(/<title>[\s\S]*?<\/title>\s*/g, '')
            .replace('<!--app-head-->', buildHeadTags(page))
            .replace('<!--app-html-->', appHtml)
            .replace('<html', '<html data-prerendered="true"')
          fs.writeFileSync(path.join(outDir, page.fileName), html)
        }

        const lastmod = new Date().toISOString().slice(0, 10)
        fs.writeFileSync(path.join(outDir, 'sitemap.xml'), buildSitemapXml(lastmod))
      } finally {
        await server.close()
      }
    },
  }
}

export default defineConfig({
  plugins: [tailwindcss(), react(), prettyUrls(), prerenderRoutes()],
  preview: {
    port: 4173,
  },
})
