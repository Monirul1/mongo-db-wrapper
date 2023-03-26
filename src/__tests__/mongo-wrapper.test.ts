import { InsertManyResult, InsertOneResult, MongoServerError } from 'mongodb';
import { MongoDbWrapperInterface, MongoDbWrapper } from '../mongo-wrapper';
import { User } from '../utils/user';

describe('MongoDbWrapper', () => {
  let mongoDbWrapper: MongoDbWrapperInterface;

  beforeAll(async () => {
    mongoDbWrapper = new MongoDbWrapper();
    await mongoDbWrapper.connect('mongodb://0.0.0.0:27017');
  });

  afterAll(async () => {
    await mongoDbWrapper.disconnect();
  });


  it('should connect to the database', () => {
    const db = mongoDbWrapper.getDb();
    expect(db).toBeTruthy();
  });

  it('should throw an error when the database is not connected', () => {
    const mongoDbWrapper = new MongoDbWrapper();
    expect(() => mongoDbWrapper.getDb()).toThrow('Database not connected.');
  });

  it('should throw an error if not connected with client', () => {
    const mongoDbWrapper = new MongoDbWrapper();
    expect(() => mongoDbWrapper.getClient()).toThrow('Client not connected.');
  });

  it('should retrieve a collection from the database', () => {
    const collection = mongoDbWrapper.getCollection<any>('myCollection');
    expect(collection).toBeTruthy();
  });

  it('should connect to MongoDB and return a valid database object', () => {
    const db = mongoDbWrapper.getDb();
    expect(db).toBeDefined();
  });

  it('should return a valid collection object', () => {
    const collection = mongoDbWrapper.getCollection<any>('myCollection');
    expect(collection).toBeDefined();
  });

  it('should insert a document into a collection', async () => {
    const collection = mongoDbWrapper.getCollection<any>('myCollection');
    const result = await collection.insertOne({ name: 'Monirul', age: 24 });
    expect(result.acknowledged).toBe(true);
    expect(result.insertedId).toBeTruthy();
  });

  it('should insert a document into a collection', async () => {
    const collection = mongoDbWrapper.getCollection<any>('myCollection');
    const result = await collection.insertOne({ name: 'Monirul', age: 24 });
    expect(result.acknowledged).toBe(true);
    expect(result.insertedId).toBeTruthy();
  });

  it('should retrieve a document from a collection', async () => {
    const collection = mongoDbWrapper.getCollection<any>('myCollection');
    await collection.insertOne({ name: 'Monirul', age: 24 });
    const result = await collection.findOne({ name: 'Monirul' });
    expect(result).toBeTruthy();
    expect(result.name).toBe('Monirul');
    expect(result.age).toBe(24);
  });

  it('should update a document in a collection', async () => {
    const collection = mongoDbWrapper.getCollection<any>('myCollection');
    await collection.insertOne({ name: 'Monirul', age: 24 });
    const document = await collection.findOne({ name: 'Monirul' });
    const result = await collection.updateOne(
      { _id: document._id },
      { $set: { age: 25 } }
    );
    expect(result.acknowledged).toBe(true);
    expect(result.modifiedCount).toBe(1);
  });

  it('should delete a document from a collection', async () => {
    const collection = mongoDbWrapper.getCollection<any>('myCollection');
    await collection.insertOne({ name: 'Monirul', age: 24 });
    const document = await collection.findOne({ name: 'Monirul' });
    const result = await collection.deleteOne({ _id: document._id });
    expect(result.acknowledged).toBe(true);
    expect(result.deletedCount).toBe(1);
  });

  it('should insert a document into the specified collection', async () => {
    const collectionName = 'users';
    const user: any = {
      name: 'monirul',
      age: 24,
      email: 'im2594@columbia.edu',
    };

    const result: InsertOneResult<User> = await mongoDbWrapper.insertOne<User>(collectionName, user);
    expect(result.insertedId).toBe(user._id);
  });

  it('should insert multiple documents into the collection', async () => {
    const documents = [{ name: 'md', age: 20, email: 'md@example.com' },
    { name: 'monirul', age: 24, email: 'monirul@example.com' },  
  ];
    try {
      const result = await mongoDbWrapper.insertMany("users", documents);
      expect(result.insertedCount).toBe(2);
    } catch (error) {
      expect(error).toBeInstanceOf(MongoServerError);
    }
  });


  it('should return a document that matches the query', async () => {
    const documents = [{ name: 'md', age: 20, email: 'md@example.com' },
    { name: 'monirul', age: 24, email: 'monirul@example.com' },  
  ];
    await mongoDbWrapper.insertMany("users", documents);
    const query = { _id: '1' };
    const res = await mongoDbWrapper.findOne("users", query);
    expect(res).toBeDefined();
  });

  it('should return null if no document matches the query', async () => {
    const query = { _id: '1122' };
    const result = await mongoDbWrapper.findOne("users", query);
    expect(result).toBeNull();
  });

  it('should update a document that matches the query', async () => {
    const id = Math.random()
    const document = { _id: id, name: 'md', age: 20 };
    await mongoDbWrapper.insertOne('users', document);
  
    const update = { age: 24 };
    const result = await mongoDbWrapper.updateOne('users', { _id: id }, update);
  
    expect(result).not.toBeNull();
  
    const updatedDocument = await mongoDbWrapper.findOne('users', { _id: id });
    expect(updatedDocument).toEqual({ _id: id, name: 'md', age: 24 });
  });

  it('should delete a document from the collection', async () => {
    const id = Math.random()
    const document = { _id: id, name: 'md', age: 30, email: 'md@example.com' };
    await mongoDbWrapper.insertOne('users', document);
    const result = await mongoDbWrapper.deleteOne('users', { _id: id });
    expect(result).toBe(1);
  
    const deletedDocument = await mongoDbWrapper.findOne('users', { _id: id });
    expect(deletedDocument).toBeNull();
  });
  
  
  
});
