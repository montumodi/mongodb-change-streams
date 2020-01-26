# mongodb-change-streams

This is demo code for mongodb change streams and how it can be used to stream the data from mongodb to elasticsearch.

### Prerequisites 
- Install Mongodb 3.6 or more in replica set mode. Create a db called `testDb`.
- Install Elasticsearch listening on `http://localhost:9200`. I am using version 6 but any version can be used.

## How to install?
`npm install`

### How to run?

`node mongo-to-elasticsearch.js`

This command will open the change stream and push all the insert, updates and deletes to elasticsearch in real time.

Open mongo shell or any IDE of your choice and perform some operations on `users` collection. The data should get replicated in elasticsearch with index named `users`.