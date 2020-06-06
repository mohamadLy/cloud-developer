import AWS from 'aws-sdk'
import v4 from 'uuidv4'

const docClient = new AWS.DynamoDB.DocumentClient()

async ( event ) => {
    console.log("Processing event: ", event)
    const itemId = v4.uuid()

}
