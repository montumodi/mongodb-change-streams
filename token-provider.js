const {getCollection} = require("./mongo-client");

async function getResumetoken(id) {
  console.log("Getting resume token", {id});
  const tokensCollection = await getCollection("tokens");
  const result = await tokensCollection.findOne({"_id": id});
  return result ? result.resumeToken : null;
}

async function saveResumeTaken(resumeToken, id) {
  console.log("Saving resume token", {resumeToken, id});
  const tokensCollection = await getCollection("tokens");
  return tokensCollection.updateOne(
    {"_id": id},
    {"$set": {resumeToken, "lastModifiedDate": new Date()}},
    {"upsert": true}
  );
}

module.exports = {getResumetoken, saveResumeTaken};