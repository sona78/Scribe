/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClass = /* GraphQL */ `
  query GetClass($id: ID!) {
    getClass(id: $id) {
      id
      Name
      Users {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listClasses = /* GraphQL */ `
  query ListClasses(
    $filter: ModelClassFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClasses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      Email
      Name
      Classes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Email
        Name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserClass = /* GraphQL */ `
  query GetUserClass($id: ID!) {
    getUserClass(id: $id) {
      id
      classId
      userId
      class {
        id
        Name
        createdAt
        updatedAt
      }
      user {
        id
        Email
        Name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUserClasses = /* GraphQL */ `
  query ListUserClasses(
    $filter: ModelUserClassFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserClasses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        classId
        userId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userClassesByClassId = /* GraphQL */ `
  query UserClassesByClassId(
    $classId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserClassFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userClassesByClassId(
      classId: $classId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        classId
        userId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userClassesByUserId = /* GraphQL */ `
  query UserClassesByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserClassFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userClassesByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        classId
        userId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
