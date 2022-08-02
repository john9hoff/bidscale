const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = class {
    static async uploadCsv(json, tableName) {
        let requests = []
        json.forEach(object => {
            requests.push(
                {
                    PutRequest: {
                        Item: object
                    }
                }
            )
        })
        const params = {
            RequestItems: {
                [tableName]: requests
            }
        };
        try {
            return await dynamoDb.batchWrite(params).promise();
        } catch (e) {
            throw new Error(`uploadCsv error ${e.message}`);
        }
    }
};
