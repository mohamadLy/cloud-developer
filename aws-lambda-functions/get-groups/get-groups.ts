import AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()

async (event) => {
    const result = await docClient.scan({
        TableName: process.env.GROUP_TABLE
    }).promise()
    const items = result.Items
    return {
        statusCode: 200,
        header: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            items: items
        })
    }
};
