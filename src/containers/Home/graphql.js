import gql from "graphql-tag"

export const GET_BOOKS = gql`
query getAllBooks {
    getAllBooks {
        id
        title
    }
}
`

export const GET_ADDRESSES = gql`
query getAllAddresses {
    getAllAddresses {
        id
        street
        city
        state
        zip
    }
}
`

export const ADD_ADDRESS = gql`
mutation addAddress($addAddressInput: addAddressInput!) {
  addAddress(input: $addAddressInput) {
    id
    street
    city
    state
    zip
  }
}
`