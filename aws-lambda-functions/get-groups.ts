const mockData = [ 
    {
        "id": "1",
        "name": "Dogs",
        "description": "Only Dogs images here!"
    },
    {
        "id": "2",
        "name": "Nature",
        "description": "What can be better object for photograph"
    },
    {
        "id": "3",
        "name": "Cities",
        "description": "Creative display of urban settings"
    }
]

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
