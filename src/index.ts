import express, { Response, Request, Application } from 'express'
import './config/intiliseAPP'
import cors from 'cors'
import router from './routes/router.manager'

import errorHandeler from './middleware/error'

import connectDB from './config/db'

connectDB()

const app: Application = express()

app.use(cors())

// Body parsar
app.use(express.json({ limit: '500mb' }))


// Mount routers

app.use('/', router)


app.all('*', (req: Request, res: Response) => {
  //console.log(req.url)
  res.status(200).send('<h1>This website is for API 🤯</h1>')
})

app.use(errorHandeler)

const PORT = process.env.PORT || 10000

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
})

interface IError {
  message: string
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: IError) => {
  console.log(`Error: ${err?.message}`)
  // Close server & exit process
  server.close(() => process.exit(1))
})

