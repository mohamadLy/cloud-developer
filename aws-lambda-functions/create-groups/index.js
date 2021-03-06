var AWS = require("aws-sdk");
var uuid = require("uuid");

const docClient = new AWS.DynamoDB.DocumentClient();
const groupTable = process.env.GROUP_TABLE;

exports.handler = async (event) => {
    console.log("Processing Event: ", event)

    const itemId = uuid.v4()
    const parseBody = JSON.parse(event.body)

    const newItem = {
        id: itemId,
        ...parseBody
    }

    const dynamoResponse = await docClient.put({
        TableName: groupTable,
        Item: newItem
    }).promise()

    console.log(dynamoResponse)
    
    return {
        statusCode: 201,
        headers: {
            'Allow-Control-Access-Origin': '*'
        },
        body: JSON.stringify({
            item: newItem
        })
    }
}
