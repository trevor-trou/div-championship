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
    // Get seasons
    const seasons = await getSeasons();
    const inactiveSeasons = seasons.filter(e => !e.active);

    let results = await getResults();

    let summaries = [];

    inactiveSeasons.forEach(season => {
      let summary = {
        title: season.displayName,
        statistics: []
      };

      let weeksInSeason = results.filter(e => e.season === season.name);

      // Add players to summary
      weeksInSeason.forEach(week => {
        // Create a temporary array so we can combine the players array
        // and the results array
        let results = [];

        for (let i = 0; i < week.players.length; i++) {
          results.push({
            name: week.players[i],
            wins: 0
          });
        }

        // Tally up the wins for each player
        for (let winIndex of week.results) {
          results[winIndex].wins++;
        }

        // Determine who won the match
        let indexOfWinner = 0;
        let wins = results[0].wins;
        for (let i = 1; i < results.length; i++) {
          if (results[i].wins > wins) {
            indexOfWinner = i;
            wins = results[i].wins;
          }
        }

        // Add this week's results to the season summary
        for (let i = 0; i < results.length; i++) {
          let pIndex = summary.statistics.findIndex(
            p => p.name === results[i].name
          );
          if (pIndex < 0) {
            summary.statistics.push({
              name: results[i].name,
              matches: 0,
              games: 0
            });

            pIndex = summary.statistics.length - 1;
          }

          summary.statistics[pIndex].games += results[i].wins;
          if (i === indexOfWinner) {
            summary.statistics[pIndex].matches += 1;
          }
        }
      });

      // Now, sort the statistics by matches won
      summary.statistics.sort((a, b) => {
        // Sort by matches
        if (a.matches > b.matches) {
          return -1;
        }

        if (a.matches < b.matches) {
          return 1;
        }

        // If matches are tied, sort by games
        if(a.games > b.games) {
          return -1;
        }

        if(a.games < b.games) {
          return 1;
        }

        return 0;
      });
      
      summaries.push(summary);
    });

    callback(null, summaries);
  } catch (ex) {
    console.log(JSON.stringify(ex));
    callback(new Error(JSON.stringify(ex)));
  }
};

async function getSeasons() {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: seasonsTable
    };

    docClient.scan(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Items);
      }
    });
  });
}

async function getResults() {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: table
    };

    docClient.scan(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Items);
      }
    });
  });
}
