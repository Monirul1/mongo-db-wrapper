import {
  MongoClient,
  Collection,
  Db,
  MongoClientOptions,
  InsertOneResult,
  DeleteResult,
  UpdateResult,
  OptionalUnlessRequiredId,
  OptionalId,
  InsertManyResult,
} from 'mongodb';

interface MongoDbWrapperInterface {
  connect(url: string, options?: MongoClientOptions): Promise<void>;
  disconnect(): Promise<void>;
  getDb(): Db;
  getCollection<T extends Document>(name: string): Collection<T>;
  getClient(): MongoClient;
  insertOne<T extends { _id: any }>(
    collectionName: string,
    document: OptionalUnlessRequiredId<T>
  ): Promise<InsertOneResult<T>>;
  insertMany<T extends { _id: any }>(
    collectionName: string,
    documents: OptionalId<T>[]
  ): Promise<InsertManyResult<T>>;
  findOne<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>
  ): Promise<T | null>;
  updateOne<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>,
    update: Partial<any>
  ): Promise<number>;
  deleteOne<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>
  ): Promise<number>;
}

class MongoDbWrapper implements MongoDbWrapperInterface {
  private client: MongoClient | undefined;
  private db: Db | undefined;

  async connect(url: string, options?: MongoClientOptions): Promise<void> {
    this.client = await MongoClient.connect(url, options);
    this.db = this.client.db();
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
  }

  getDb(): Db {
    if (!this.db) {
      throw new Error('Database not connected.');
    }

    return this.db;
  }

  getCollection<T extends Document>(name: string): Collection<T> {
    const db = this.getDb();

    return db.collection<T>(name);
  }

  getClient(): MongoClient {
    if (!this.client) {
      throw new Error('Client not connected.');
    }

    return this.client;
  }

  async insertOne<T extends { _id: any }>(
    collectionName: string,
    document: OptionalUnlessRequiredId<T>
  ): Promise<InsertOneResult<T>> {
    const collection = this.getCollection<any>(collectionName);
    const result = await collection.insertOne(document);
    return result;
  }

  async insertMany<T extends { _id?: any }>(
    collectionName: string,
    documents: OptionalId<T>[]
  ): Promise<InsertManyResult<T>> {
    const collection = this.getCollection<any>(collectionName);
    const result = await collection.insertMany(documents);
    return result;
  }

  async findOne<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>
  ): Promise<T | null> {
    const collection = this.getCollection<any>(collectionName);
    const result = await collection.findOne(query);
    return result;
  }

  async updateOne<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>,
    update: Partial<T>
  ): Promise<number> {
    const collection = this.getCollection<any>(collectionName);
    const result = await collection.updateOne(query, { $set: update });
    return result.modifiedCount;
  }

  async deleteOne<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>
  ): Promise<number> {
    const collection = this.getCollection<any>(collectionName);
    const result = await collection.deleteOne(query);
    return result.deletedCount;
  }
}

export { MongoDbWrapperInterface, MongoDbWrapper, Collection };
