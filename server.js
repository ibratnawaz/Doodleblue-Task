require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()

// Connecting to Database
connectDB()

app.use(express.json({ extended: false }))

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

// for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
