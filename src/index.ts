/*
index.ts: Demonstrates an example of how a client can import mongo-wrapper
library and use it's interfaces to interact with mongoDB in a node application setting
*/

import { MongoDbWrapper } from './mongo-wrapper';

// init the class and connect to the db
const wrapper = new MongoDbWrapper();
await wrapper.connect('mongodb://0.0.0.0:27017/mydb');

const db = wrapper.getDb();

//print db name
console.log('DB name:', db.databaseName);

// create a collection
const collection = wrapper.getCollection<any>('users');

// insert an item into the users collection
await collection.insertOne({
  name: 'Monirul',
  age: 24,
  hometown: 'Queens, New York',
  email: 'im2594@columbia.edu',
});

// retrieve an item from users collection
const user = await collection.findOne({ name: 'Monirul' });
console.log(user);

// close the db connection
await wrapper.disconnect();
