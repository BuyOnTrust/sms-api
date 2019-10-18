const getResponseObject = () => {
    return {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
    };
};

const getErrorObject = () => {
    return {
        'Access-Control-Allow-Origin': '*'
    };
};

module.exports = {
    getResponseObject,
    getErrorObject
};