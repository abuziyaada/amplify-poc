/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSurah = /* GraphQL */ `
  query GetSurah($id: ID!) {
    getSurah(id: $id) {
      id
      title
      description
      filePath
      likes
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSurahs = /* GraphQL */ `
  query ListSurahs(
    $filter: ModelSurahFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSurahs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        filePath
        likes
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
