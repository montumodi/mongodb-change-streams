const {getUpsertChangeStream, getDeleteChangeStream} = require("./change-identifier");
const {saveResumeTaken} = require("./token-provider");
const client = require("./elastic-client");

(async () => {
  const upsertChangeStream = await getUpsertChangeStream();
  upsertChangeStream.on("change", async change => {
    console.log("Pushing data to elasticsearch with id", change.fullDocument._id);
    change.fullDocument.id = change.fullDocument._id;
    Reflect.deleteProperty(change.fullDocument, "_id");
    const response = await client.index({
      "id": change.fullDocument.id,
      "index": "users",
      "body": change.fullDocument,
      "type": "doc"
    });
    console.log("document upserted successsfully with status code", response.statusCode);
    await saveResumeTaken(change._id, "SOME_UPSERT_TOKEN_ID");
  });
  
  upsertChangeStream.on("error", error => {
    console.error(error);
  });

  const deleteChangeStream = await getDeleteChangeStream();
  deleteChangeStream.on("change", async change => {
    console.log("Deleting data from elasticsearch with id", change.documentKey._id);
    const response = await client.delete({
      "id": change.documentKey._id,
      "index": "users",
      "type": "doc"
    });
    console.log("document deleted successsfully with status code", response.statusCode);
    await saveResumeTaken(change._id, "SOME_DELETE_TOKEN_ID");
  });
  
  deleteChangeStream.on("error", error => {
    console.error(error);
  });
})();
