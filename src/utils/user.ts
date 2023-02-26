import { ObjectId } from 'mongodb';
// test user document object
interface User extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  age: number;
}

export { User };
