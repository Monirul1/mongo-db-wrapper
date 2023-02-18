import { MongoDbWrapperInterface, MongoDbWrapper } from "./mongo-wrapper";


const mongoDbWrapper = new MongoDbWrapper();
mongoDbWrapper.connect("mongodb://localhost:27017");