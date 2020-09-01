const {getUpsertChangeStream} = require("./change-identifier");
const {saveResumeTaken} = require("./token-provider");

(async () => {
  const changeStream = await getUpsertChangeStream();
  changeStream.on("change", async change => {
    console.log("@@@@@@@@@@@@@@@@@@@@");
    console.log(JSON.stringify(change, null, 2));
    console.log("@@@@@@@@@@@@@@@@@@@@");
    await saveResumeTaken(change._id, "SOME_TOKEN_ID");
  });
  
  changeStream.on("error", error => {
    console.error(error);
  });
})();
