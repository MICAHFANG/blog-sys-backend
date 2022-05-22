import { connect } from 'mongoose'
const { MONGODB_HOST, MONGODB_PORT, MONGODB_DATABASE } = process.env

export default async () => {
  connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`)
}
