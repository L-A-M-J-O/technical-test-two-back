const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

const dbPath = path.join(__dirname, 'db.json')

const loadDatabase = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error al leer db.json:', error)
    return { customers: [], products: [] }
  }
}

app.get('/customers', (req, res) => {
  const db = loadDatabase()
  res.json(db.customers)
})

app.get('/customers/:id', (req, res) => {
  const db = loadDatabase()
  const { id } = req.params

  const customer = db.customers.find((c) => c.customerId === id)
  if (!customer) {
    return res.status(404).json({ error: 'Cliente no encontrado' })
  }

  const customerProducts = db.products.filter((p) => p.customerId === id)
  res.json({ ...customer, products: customerProducts })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
