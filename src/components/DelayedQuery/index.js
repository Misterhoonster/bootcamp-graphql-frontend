import React from 'react'
import { useLazyQuery } from "@apollo/react-hooks"
import { GET_BOOK_BY_ID } from './graphql'


const DelayedQuery = ({ bookId }) => {
    const [getBookById, { loading, error, data, called }] = useLazyQuery(
        GET_BOOK_BY_ID,
        {variables: {id: bookId}}
    )
    if (loading) return <div>Loading...</div>;
    if (error) return `Error: ${error}`;
    if (!called) return <button onClick={getBookById}>Submit</button>;
    return (
            <p>{data.getBookById.title}</p>
    );
}

export default DelayedQuery
