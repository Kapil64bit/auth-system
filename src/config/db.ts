import { connect, connection } from 'mongoose'
console.log('uri',process.env.MONGO_URI)

const connectDB = async (): Promise<void> => {
  // eslint-disable-next-line
  await connect(process.env.MONGO_URI!, {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('MongoDB Connected')
}

export default connectDB
