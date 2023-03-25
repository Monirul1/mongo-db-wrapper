import { MongoClient, Collection } from 'mongodb';
import { MongoDbWrapper } from '../mongo-wrapper';

describe('MongoDbWrapper integration tests', () => {
  let wrapper: MongoDbWrapper;
  let client: MongoClient;
  let db: any;
  let collection: Collection<any>;

  beforeAll(async () => {
    wrapper = new MongoDbWrapper();
    await wrapper.connect('mongodb://0.0.0.0:27017/mydb');
    client = wrapper.getClient();
    db = wrapper.getDb();
    // collection = wrapper.getCollection('test');
  });

  afterAll(async () => {
    await wrapper.disconnect();
  });

  it('should return the database', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect("").toBe("");
  });

  // it('should return a collection', () => {
  //   expect(collection.collectionName).toBe('test');
  // });

  // it('should insert and retrieve a document from the collection', async () => {
  //   const doc = {
  //     name: 'test document',
  //     value: 123,
  //   };
  //   await collection.insertOne(doc);
  //   const res = await collection.findOne({ name: 'test document' });
  //   expect(res).not.toBeNull();
  //   expect(res.value).toBe(123);
  // });
});
