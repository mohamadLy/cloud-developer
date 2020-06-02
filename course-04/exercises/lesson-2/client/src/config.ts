import dotenv from 'dotenv'

dotenv.config()

export const appId = process.env.APP_ID
export const apiEndpoint = `https://${appId}.execute-api.us-east-2.amazonaws.com/dev`