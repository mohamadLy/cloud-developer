import AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()

async (event) => {
    return {
        statusCode: 200,
        header: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            items: mockData
        })
    }
};
