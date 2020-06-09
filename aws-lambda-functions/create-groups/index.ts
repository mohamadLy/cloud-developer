import * as AWS from 'aws-sdk'
import * as uuid from 'uuid'

const docClient = new AWS.DynamoDB.DocumentClient()
const groupTable = process.env.GROUP_TABLE

export const handler = async ( event ) => {
    console.log("Processing event: ", event)
    const itemId = uuid.v4()

    const parsedBody = JSON.parse(event.body)

    const newItem = {
        id: itemId,
        ...parsedBody
    }

   docClient.put({
       TableName: groupTable,
       Item: newItem
   }).promise()

    return ({
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            item: newItem
        })
    })
}
