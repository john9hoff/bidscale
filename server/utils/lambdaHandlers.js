module.exports = {
    lambdaResponse(statusCode, body) {
        return {
            statusCode,
            body: JSON.stringify(body)
        };
    },
    lambdaError(statusCode, errorMessage) {
        return {
            statusCode,
            body: JSON.stringify(
                {
                    error: errorMessage
                }
            )
        };
    }
};
