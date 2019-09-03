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
    const activeSeasons = await getActiveSeasons();

    let tournaments = [];
    for (let i = 0; i < activeSeasons.length; i++) {
      const seasonResults = await recentTournaments(activeSeasons[i]);
      tournaments = tournaments.concat(seasonResults);
    }

    callback(null, tournaments);
  } catch (ex) {
    console.log(JSON.stringify(ex));
    callback(new Error(JSON.stringify(ex)));
  }
};

async function getActiveSeasons() {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: seasonsTable,
      FilterExpression: "#active = :val",
      ExpressionAttributeNames: {
        "#active": "active"
      },
      ExpressionAttributeValues: {
        ":val": true
      },
    };

    docClient.scan(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        data.Items.sort(sortSeasons);
        resolve(data.Items.map(s => s.name));
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

function sortSeasons(a, b) {
  if(a.startDate > b.startDate) {
    return -1;
  }

  if(a.startDate < b.startDate) {
    return 1;
  }

  return 0;
}
