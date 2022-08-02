const { lambdaResponse, lambdaError } = require('../utils/lambdaHandlers')
const { getS3Object } = require('../database/getS3Object');
const { uploadCsv } = require('../database/uploadDb');

exports.upload = async (event) => {
    try {
        const { table, filename } = event.queryStringParameters;
        const s3Object = await getS3Object(filename);
        await uploadCsv(s3Object, table);
        return lambdaResponse('200', `Successfully uploaded ${filename} to DynamoDB.`);
    } catch (e) {
        console.error('Upload.js error', e.message);
        return lambdaError(e.status, e.message);
    }
};
