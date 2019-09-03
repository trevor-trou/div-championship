require('dotenv').config();

const methodToTest = "getSeasonSummaries";

const uut = require(`./${methodToTest}/index`).handler;

// Called when method completes
function callback(err, results) {
    console.log("Error: " + JSON.stringify(err, null, 2));
    console.log("Results: " + JSON.stringify(results, null, 2));
}

// Run the unit under test
uut(null, null, callback);