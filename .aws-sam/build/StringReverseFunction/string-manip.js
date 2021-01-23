/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

function reverseHandler(params){
    let res = {};
    if (params){
        res.message = params;
        res.messageReversed = params.split("").reverse().join("");
    }else{
        res.error = "Message must be supplied as a path parameter";
    }
    return res;
}

function lengthHandler(params){
    let res = {};
    if(params){
        res.message = params;
        res.messageLength = params.length;
    } else {
        res.error = "Message must be supplied as a path parameter";
    }
    return res;
}


exports.stringReverse = async (event, context) => {
    let response;
    const params = event.pathParameters ? decodeURI(event.pathParameters.message) : null;
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify(reverseHandler(params))
        };
    } catch (err) {
        console.log(err);
        return err;
    }
    return response
};

exports.stringLength = async (event, context) => {
    let response;
    const params = event.pathParameters ? decodeURI(event.pathParameters.message) : null;
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify(lengthHandler(params))
        };
    } catch (err) {
        console.log(err);
        return err;
    }
    return response
};
