import { MongoDbWrapperInterface, MongoDbWrapper } from "../mongo-wrapper";

describe("MongoDbWrapper", () => {
  let mongoDbWrapper: MongoDbWrapperInterface;

  beforeAll(async () => {
    mongoDbWrapper = new MongoDbWrapper();
    await mongoDbWrapper.connect("mongodb://localhost:27017");
  });

  afterAll(async () => {
    await mongoDbWrapper.disconnect();
  });

  it("should connect to the database", () => {
    const db = mongoDbWrapper.getDb();
    expect(db).toBeTruthy();
  });

  it("should retrieve a collection from the database", () => {
    const collection = mongoDbWrapper.getCollection<any>("myCollection");
    expect(collection).toBeTruthy();
  });

  it("should connect to MongoDB and return a valid database object", () => {
    const db = mongoDbWrapper.getDb();
    expect(db).toBeDefined();
  });

  it("should return a valid collection object", () => {
    const collection = mongoDbWrapper.getCollection<any>("myCollection");
    expect(collection).toBeDefined();
  });

  it("should insert a document into a collection", async () => {
    const collection = mongoDbWrapper.getCollection<any>("myCollection");
    const result = await collection.insertOne({ name: "Monirul", age: 24 });
    expect(result.acknowledged).toBe(true);
    expect(result.insertedId).toBeTruthy();
  });  

  it("should insert a document into a collection", async () => {
    const collection = mongoDbWrapper.getCollection<any>("myCollection");
    const result = await collection.insertOne({ name: "Monirul", age: 24 });
    expect(result.acknowledged).toBe(true);
    expect(result.insertedId).toBeTruthy();
  });

  it("should retrieve a document from a collection", async () => {
    const collection = mongoDbWrapper.getCollection<any>("myCollection");
    await collection.insertOne({ name: "Monirul", age: 24 });
    const result = await collection.findOne({ name: "Monirul" });
    expect(result).toBeTruthy();
    expect(result.name).toBe("Monirul");
    expect(result.age).toBe(24);
  });
  
  it("should update a document in a collection", async () => {
    const collection = mongoDbWrapper.getCollection<any>("myCollection");
    await collection.insertOne({ name: "Monirul", age: 24 });
    const document = await collection.findOne({ name: "Monirul" });
    const result = await collection.updateOne({ _id: document._id }, { $set: { age: 25 } });
    expect(result.acknowledged).toBe(true);
    expect(result.modifiedCount).toBe(1);
  });

  it("should delete a document from a collection", async () => {
    const collection = mongoDbWrapper.getCollection<any>("myCollection");
    await collection.insertOne({ name: "Monirul", age: 24 });
    const document = await collection.findOne({ name: "Monirul" });
    const result = await collection.deleteOne({ _id: document._id });
    expect(result.acknowledged).toBe(true);
    expect(result.deletedCount).toBe(1);
  });

});
