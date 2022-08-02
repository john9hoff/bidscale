const { lambdaResponse, lambdaError } = require('../utils/lambdaHandlers')
const { getProductInventory } = require('../database/inventoryDb');
const { getProductCost } = require('../database/productDb');

exports.getProductValue = async (event) => {
    try {
        const { product_id, warehouse_id } = event.queryStringParameters;
        const productInventory = await getProductInventory(product_id, warehouse_id);
        const productCost = await getProductCost(product_id);
        const totalValue = productInventory.Item.inventory * productCost.Item.cost;
        return lambdaResponse('200', { totalValue });
    } catch (e) {
        console.error('GetProductValue.js error', e.message);
        return lambdaError(e.status, e.message);
    }
};
