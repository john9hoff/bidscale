const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const csv = require('csvtojson');
const bucket = 'bidscale';

exports.getS3Object = async (filename) => {
    try {
        const params = {
            Bucket: bucket,
            Key: filename,
        }
        const readStream = await s3.getObject(params).createReadStream();
        return await csv()
            .fromStream(readStream)
            .then((json) => {
                return json;
            });
    } catch (e) {
        console.error('getS3Object error', e.message);
        throw new Error('500');
    }
};
