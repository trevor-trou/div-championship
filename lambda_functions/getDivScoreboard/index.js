const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2", // Ohio
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const docClient = new AWS.DynamoDB.DocumentClient();
const table = "div";

exports.handler = async function(event, context, callback) {
  try {
    const tournaments = await recentTournaments();
    callback(null, tournaments);
  } catch (ex) {
    console.log(JSON.stringify(ex));
    callback(new Error(JSON.stringify(ex)));
  }
};

async function recentTournaments() {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: table,
      ScanIndexForward: false,
      KeyConditionExpression: "#t = :val",
      ExpressionAttributeValues: {
        ":val": "tournament"
      },
      ExpressionAttributeNames: {
        "#t": "eventType"
      },
      Limit: 10
    };

    docClient.query(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Items);
      }
    });
  });
}
