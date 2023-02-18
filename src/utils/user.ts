import { ObjectId } from "mongodb";

interface User extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  age: number;
  // add any other properties specific to your User type
}

export {User}