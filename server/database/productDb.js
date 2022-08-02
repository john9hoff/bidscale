const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'product'

module.exports = class {
    static async getProductCost(product_id) {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                product_id,
            }
        };
        try {
            return await dynamoDb.get(params).promise();
        } catch (e) {
            throw new Error(`getProductCost error ${e.message}`);
        }
    }
};
