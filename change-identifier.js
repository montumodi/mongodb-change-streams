const {getCollection} = require("./mongo-client");
const {getResumetoken, saveResumeTaken} = require("./token-provider");

async function start() {
  console.log("@@@@@@@@@@@@@@@@@@@@");
  const resumeToken = await getResumetoken("SOME_TOKEN_ID");
  console.log("resumeToken", resumeToken);
  const changeStream = (await getCollection("users")).watch([
    {
      "$match": {
        "operationType": {
          "$in": ["insert", "update", "replace"]
        }
      }
    },
    {
      "$project": {
        "documentKey": false
      }
    }
  ], {"resumeAfter": resumeToken});

  changeStream.on("change", async change => {
    console.log("@@@@@@@@@@@@@@@@@@@@");
    console.log(JSON.stringify(change, null, 2));
    console.log("@@@@@@@@@@@@@@@@@@@@");
    await saveResumeTaken(change._id, "SOME_TOKEN_ID");
  });

  changeStream.on("error", error => {
    console.error(error);
  });
}

module.exports = {
  start
};

