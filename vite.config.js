import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Runs api/contact.js inside `npm run dev` / `npm run preview`, exactly like Vercel does in production.
function contactApi(env) {
  const attach = (server, load) => {
    server.middlewares.use('/api/contact', (req, res) => {
      let raw = ''
      req.on('data', (chunk) => {
        raw += chunk
        if (raw.length > 50_000) req.destroy() // payload far larger than any real message
      })
      req.on('end', async () => {
        try {
          req.body = raw ? JSON.parse(raw) : {}
        } catch {
          req.body = {}
        }
        try {
          const mod = await load()
          await mod.default(req, res)
        } catch (error) {
          console.error('[contact-api]', error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, message: 'Server error.' }))
        }
      })
    })
  }

  return {
    name: 'contact-api',
    configureServer(server) {
      Object.assign(process.env, { ...env, ...process.env })
      attach(server, () => server.ssrLoadModule('/api/contact.js'))
    },
    configurePreviewServer(server) {
      Object.assign(process.env, { ...env, ...process.env })
      attach(server, () => import('./api/contact.js'))
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), contactApi(loadEnv(mode, process.cwd(), ''))],
}))
