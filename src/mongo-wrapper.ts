import { MongoClient, Collection, Db, MongoClientOptions } from 'mongodb';

interface MongoDbWrapperInterface {
  connect(url: string, options?: MongoClientOptions): Promise<void>;
  disconnect(): Promise<void>;
  getDb(): Db;
  getCollection<T extends Document>(name: string): Collection<T>;
  getClient(): MongoClient;
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
}

export { MongoDbWrapperInterface, MongoDbWrapper, Collection };
