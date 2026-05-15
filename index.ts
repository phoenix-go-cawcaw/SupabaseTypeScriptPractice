import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import backenderRoutes from './src/routes/backenderRoute.js'
import frontenderRoutes from './src/routes/frontenderRoute.js'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 4321

app.use('/backender', backenderRoutes)
app.use('/frontender', frontenderRoutes)

// Test route — replaces your MySQL SELECT 1 test
// Just hits Supabase to confirm connection
app.get('/test', async (req, res) => {
  try {
    const { supabase } = await import('./src/config/supabase.js')
    const { error } = await supabase.from('staff').select('count')
    if (error) throw error
    res.json({ status: 'ok', db: 'connected' })
  } catch (err: any) {
    res.json({ status: 'error', message: err.message })
  }
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})