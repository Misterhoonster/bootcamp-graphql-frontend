import gql from "graphql-tag"

export const GET_BOOK_BY_ID = gql`
    query getBookById($id: ID!) {
        getBookById(id: $id) {
            id
            title
        }
    }
`