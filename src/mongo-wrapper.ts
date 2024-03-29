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
  /**
   * Connects to a MongoDB server.
   *
   * @param url - The connection string for the MongoDB server.
   * @param options - Optional settings for the MongoDB driver.
   */
  connect(url: string, options?: MongoClientOptions): Promise<void>;

  /**
   * Disconnects from the MongoDB server.
   */
  disconnect(): Promise<void>;

  /**
   * Returns the MongoDB `Db` instance.
   *
   * @throws Will throw an error if the database is not connected.
   * @returns The MongoDB `Db` instance.
   */
  getDb(): Db;

  /**
   * Returns the specified MongoDB collection.
   *
   * @param name - The name of the collection to retrieve.
   * @returns The MongoDB `Collection` instance.
   */
  getCollection<T extends Document>(name: string): Collection<T>;

  /**
   * Returns the MongoDB `MongoClient` instance.
   *
   * @throws Will throw an error if the client is not connected.
   * @returns The MongoDB `MongoClient` instance.
   */
  getClient(): MongoClient;

  /**
   * Inserts a single document into a MongoDB collection.
   *
   * @param collectionName - The name of the collection to insert the document into.
   * @param document - The document to insert.
   * @returns A promise that resolves to the `InsertOneResult`.
   */
  insertOne<T extends { _id: any }>(
    collectionName: string,
    document: OptionalUnlessRequiredId<T>
  ): Promise<InsertOneResult<T>>;

  /**
   * Inserts multiple documents into a MongoDB collection.
   *
   * @param collectionName - The name of the collection to insert the documents into.
   * @param documents - An array of documents to insert.
   * @returns A promise that resolves to the `InsertManyResult`.
   */
  insertMany<T extends { _id: any }>(
    collectionName: string,
    documents: OptionalId<T>[]
  ): Promise<InsertManyResult<T>>;

  /**
   * Finds a single document in a MongoDB collection that matches the specified query.
   *
   * @param collectionName - The name of the collection to search.
   * @param query - The query to search for.
   * @returns A promise that resolves to the matching document, or `null` if no document is found.
   */
  findOne<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>
  ): Promise<T | null>;

  /**
   * Updates a single document in a MongoDB collection that matches the specified query.
   *
   * @param collectionName - The name of the collection to update.
   * @param query - The query to search for.
   * @param update - The update to apply.
   * @returns A promise that resolves to the number of documents updated.
   */
  updateOne<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>,
    update: Partial<any>
  ): Promise<number>;

  /**
   * Deletes a single document from a MongoDB collection that matches the specified query.
   *
   * @param collectionName - The name of the collection to delete from.
   * @param query - The query to search for.
   * @returns A promise that resolves to the number of documents deleted.
   */
  deleteOne<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>
  ): Promise<number>;

  /**

  Updates multiple documents in a MongoDB collection that match the specified query.
  @param collectionName - The name of the collection to update.
  @param query - The query to search for.
  @param update - The update operation to apply.
  @returns A promise that resolves to the number of documents updated.
  */
  updateMany<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>,
    update: Partial<any>
  ): Promise<number>;

  /**
  Deletes multiple documents from a MongoDB collection that match the specified query.
  @param collectionName - The name of the collection to delete from.
  @param query - The query to search for.
  @returns A promise that resolves to the number of documents deleted.
  */
  deleteMany<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>
  ): Promise<number>;

  /**
  Returns the count of documents in a MongoDB collection that match the specified query.
  @param collectionName - The name of the collection to count.
  @param query - The query to search for.
  @returns A promise that resolves to the number of documents matching the query.
  */
  count<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>
  ): Promise<number>;

  /**
  Returns an array of documents from a MongoDB collection that match the specified query.
  @param collectionName - The name of the collection to search.
  @param query - The query to search for.
  @returns A promise that resolves to an array of matching documents.
  */
  find<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>
  ): Promise<T[]>;

  /**
  Finds a single document from a MongoDB collection that matches the specified query and updates it.
  @param collectionName - The name of the collection to update.
  @param query - The query to search for.
  @param update - The update operation to apply.
  @param options - Optional settings for the update operation.
  @returns A promise that resolves to the updated document or null if no document was found.
  */
  findOneAndUpdate<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>,
    update: Partial<any>,
    options?: { returnOriginal?: boolean }
  ): Promise<T | null>;

  /**
  Finds a single document from a MongoDB collection that matches the specified query and deletes it.
  @param collectionName - The name of the collection to delete from.
  @param query - The query to search for.
  @returns A promise that resolves to the deleted document or null if no document was found.
  */
  findOneAndDelete<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>
  ): Promise<T | null>;
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

  async updateMany<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>,
    update: Partial<any>
  ): Promise<number> {
    const collection = this.getCollection<any>(collectionName);
    const result = await collection.updateMany(query, { $set: update });
    return result.modifiedCount;
  }

  async deleteMany<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>
  ): Promise<number> {
    const collection = this.getCollection<any>(collectionName);
    const result = await collection.deleteMany(query);
    return result.deletedCount;
  }

  async count<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>
  ): Promise<number> {
    const collection = this.getCollection<any>(collectionName);
    const result = await collection.countDocuments(query);
    return result;
  }

  async find<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>
  ): Promise<T[]> {
    const collection = this.getCollection<any>(collectionName);
    const result = await collection.find(query).toArray();
    return result;
  }

  async findOneAndUpdate<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>,
    update: Partial<any>,
    options?: { returnOriginal?: boolean }
  ): Promise<T | null> {
    const collection = this.getCollection<any>(collectionName);
    const result = await collection.findOneAndUpdate(query, { $set: update });
    return result.value;
  }

  async findOneAndDelete<T extends { _id: any }>(
    collectionName: string,
    query: Partial<T>
  ): Promise<T | null> {
    const collection = this.getCollection<any>(collectionName);
    const result = await collection.findOneAndDelete(query);
    return result.value;
  }
}

export { MongoDbWrapperInterface, MongoDbWrapper, Collection };
