const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'inventory'

module.exports = class {
    static async getProductInventory(product_id, warehouse_id) {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                warehouse_id,
                product_id,
            }
        };
        try {
            return await dynamoDb.get(params).promise();
        } catch (e) {
            throw new Error(`getProductInventory error ${e.message}`);
        }
    }
    static async getProductInventories(product_id) {
        const params = {
            TableName: TABLE_NAME,
            FilterExpression: '#product_id = :product_id',
            ExpressionAttributeNames: {
                '#product_id': 'product_id',
            },
            ExpressionAttributeValues: {
                ':product_id': product_id,
            },
        };
        try {
            return await dynamoDb.scan(params).promise();
        } catch (e) {
            throw new Error(`getProductInventories error ${e.message}`);
        }
    }
};
