/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSurah = /* GraphQL */ `
  mutation CreateSurah(
    $input: CreateSurahInput!
    $condition: ModelSurahConditionInput
  ) {
    createSurah(input: $input, condition: $condition) {
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
export const updateSurah = /* GraphQL */ `
  mutation UpdateSurah(
    $input: UpdateSurahInput!
    $condition: ModelSurahConditionInput
  ) {
    updateSurah(input: $input, condition: $condition) {
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
export const deleteSurah = /* GraphQL */ `
  mutation DeleteSurah(
    $input: DeleteSurahInput!
    $condition: ModelSurahConditionInput
  ) {
    deleteSurah(input: $input, condition: $condition) {
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
