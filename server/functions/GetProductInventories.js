const { lambdaResponse, lambdaError } = require('../utils/lambdaHandlers')
const { getProductInventories } = require('../database/inventoryDb');

exports.getProductInventories = async (event) => {
    try {
        const { product_id } = event.queryStringParameters;
        const productInventories = await getProductInventories(product_id);
        return lambdaResponse('200', productInventories.Items);
    } catch (e) {
        console.error('GetProductInventories.js error', e.message);
        return lambdaError(e.status, e.message);
    }
};
