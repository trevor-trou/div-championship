const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2", // Ohio
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const docClient = new AWS.DynamoDB.DocumentClient();

const seasonsTable = "div-seasons";
const table = "div";

exports.handler = async function(event, context, callback) {
  try {
    const currentSeason = await getActiveSeason();
    
    let tournaments = [];
    if(currentSeason) {
      tournaments = await recentTournaments(currentSeason);
    }
    
    callback(null, tournaments);
  } catch (ex) {
    console.log(JSON.stringify(ex));
    callback(new Error(JSON.stringify(ex)));
  }
};

async function getActiveSeason() {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: seasonsTable,
      FilterExpression: "#active = :val",
      ExpressionAttributeNames: {
        "#active": "active",
        "#name": "name"
      },
      ExpressionAttributeValues: {
        ":val": true
      },
      ProjectionExpression: "#name"
    };
    
    docClient.scan(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if(data.Items.length > 0) {
          resolve(data.Items[0].name);
        }
        else {
          resolve(null);
        }
      }
    });
  });
}

async function recentTournaments(season) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: table,
      ScanIndexForward: false,
      KeyConditionExpression: "#t = :val",
      ExpressionAttributeValues: {
        ":val": season
      },
      ExpressionAttributeNames: {
        "#t": "season"
      }
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