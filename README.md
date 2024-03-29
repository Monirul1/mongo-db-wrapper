# mongo-db-wrapper

MongoDB interface wrapper in JavaScript to perform common database operations

[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
![CI Status](https://github.com/Monirul1/mongo-db-wrapper/actions/workflows/main.yml/badge.svg)
[![codecov](https://codecov.io/gh/Monirul1/mongo-db-wrapper/branch/main/graph/badge.svg?token=ATED3RU00V)](https://codecov.io/gh/Monirul1/mongo-db-wrapper)
[![npm](https://img.shields.io/npm/v/mongo-db-wrapper-interfaces)](https://www.npmjs.com/package/mongo-db-wrapper-interfaces)

## Issues
![Issues](https://img.shields.io/github/issues/monirul1/mongo-db-wrapper)


# Overview

<strong> Project: MongoDB Wrapper Library for Node </strong>

<strong>Objective:</strong>
To simplify the process of working with MongoDB in a Node.js application by providing easy-to-use and intuitive interfaces for common read and write operations.

<strong>Description:</strong> The MongoDB Wrapper Library will be a Node.js library with the purpose of providing an abstraction layer over MongoDB, making it easier for developers to interact with the database without having to write complex MongoDB queries while building their node applications. The library will provide a set of well-defined, easy-to-use interfaces for performing common MongoDB operations, such as inserting, updating, retrieving, and deleting data. This will allow developers to focus on their application logic, without having to spend time and effort on learning the intricacies of MongoDB.

# Installation
To install this library, you need to have Node.js and npm (Node Package Manager) installed on your system. If you haven't installed them yet, you can download them from the official website: https://nodejs.org/

Once you have Node.js and npm installed, you can install the mongo-db-wrapper package by running the following command in your terminal:

```
npm install mongo-db-wrapper
```

# Usage
To use this library, you need to first import it into your Node.js application:

```javascript
const { MongoClient } = require('mongodb');
const { MongoDbWrapper } = require('mongo-db-wrapper');

```
Then, you need to create an instance of the MongoClient class and connect to your MongoDB database:

```javascript
const client = new MongoClient(uri, options);
await client.connect();

```
where uri is the connection string for your MongoDB database, and options is an object that specifies additional connection options (such as authentication).

Once you have connected to your database, you can create an instance of the MongoDbWrapper class by passing in the MongoClient instance:

```javascript
const wrapper = new MongoDbWrapper(client);
```
Then, you can use the various methods provided by the MongoDbWrapper class to perform database operations.


# Features Overview

1. Simple and intuitive interfaces for read and write operations
2. Abstraction layer over MongoDB, allowing developers to work with the database without having to write complex queries
3. Supports the most common MongoDB operations, such as inserting, updating, retrieving, and deleting data
4. Well-documented code and API, making it easy to get started and integrate into existing applications

<strong>Technology Stack:</strong>

| Name       | Purpose                                              |
| ---------- | ---------------------------------------------------- |
| NodeJS     | runtime platform to build the library                |
| TypeScript | programming language to be used to build the library |
| MongoDB    | to initialize the wrapper with the database          |
| NPM        | for publishing the library to the NPM registry       |

<strong>Why this library?:</strong>

1. Improves developer productivity by providing a more intuitive way to interact with MongoDB
2. Increases the adoption of MongoDB by making it easier for developers to get started and integrate into their applications
3. Saves time and effort by eliminating the need to write complex MongoDB queries
4. Encourages new entry-level developers to work with MongoDB
