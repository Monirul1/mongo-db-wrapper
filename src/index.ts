import { MongoDbWrapper } from "./mongo-wrapper";

const wrapper = new MongoDbWrapper();
await wrapper.connect('mongodb://localhost:27017/mydb');
const collection = wrapper.getCollection<any>('users');
await collection.insertOne(
  { 
    name: "Monirul",
    age: 24,
    hometown: "Queens, New York",
    email: "im2594@columbia.edu"
  },
);
const user = await collection.findOne({ name: 'Monirul' });
console.log(user);
await wrapper.disconnect();


// const mongoDbWrapper = new MongoDbWrapper();
// mongoDbWrapper.connect("mongodb://localhost:27017");

// const db = mongoDbWrapper.getDb();

// console.log(db)