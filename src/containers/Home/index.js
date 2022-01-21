import React, { useReducer, useState } from 'react'
import { useMutation, useQuery } from "@apollo/react-hooks"
import { GET_BOOKS, GET_ADDRESSES, ADD_ADDRESS } from './graphql'
import DelayedQuery from '../../components/DelayedQuery'
import FormInput from '../../components/FormInput'

const formReducer = (prev, payload) => ({...prev, ...payload});

const Home = () => {
    const [bookId, setBookId] = useState("7c2831e6-ce04-49f8-aa61-711d0d4b5cc8");
    const [addressForm, setAddressForm] = useReducer(formReducer, { street: "", city: "", state: "", zip: "" })

    const [addAddress, { addressError, addressLoading }] = useMutation(ADD_ADDRESS, {
        variables: {
            "addAddressInput": {
              "street": addressForm.street,
              "city": addressForm.city,
              "state": addressForm.state,
              "zip": parseInt(addressForm.zip, 10)
            }
          },
        update: (client, { data: { addAddress }}) => {
            try {
                console.log(addAddress.state);
                // READ FROM CACHE
                const data = client.readQuery({query: GET_ADDRESSES})

                // EDIT DATA
                data.getAllAddresses = [...data.getAllAddresses, addAddress]

                // UPDATE CACHE
                client.writeQuery({ query: GET_ADDRESSES, data })
            }
            catch (err) {
                console.log(err);
            }
        },
    });

    const { loading, error, data } = useQuery(GET_BOOKS)
    const { loading: getAddressLoading, error: getAddressError, data: getAddressData } = useQuery(GET_ADDRESSES)

    if (loading) return "Loading..."
    if (error) return `Error: ${error}`

    if (!getAddressLoading) console.log(getAddressData);

    return (
        <>
            <div style={{padding: "25px"}}>
                <h2>Books</h2>
                <select>
                    {data.getAllBooks.map(book => (
                        <option key={book.id} value={book.title}>{book.title}</option>
                    ))}
                </select>
            </div>
            <div style={{padding: "25px"}}>
                <h2>Get Book by ID</h2>
                <form>
                    <select onChange={e => setBookId(e.target.value)}>
                        {data.getAllBooks.map(book => (
                            <option key={book.id} value={book.id}>{book.id}</option>
                        ))}
                    </select>
                    <DelayedQuery bookId={bookId}/>
                </form>
            </div>
            <div style={{padding: "25px"}}>
                <h2>Add Address</h2>
                <form>
                    <FormInput label="street" value={addressForm} setForm={setAddressForm} />
                    <FormInput label="city" value={addressForm} setForm={setAddressForm} />
                    <FormInput label="state" value={addressForm} setForm={setAddressForm} />
                    <FormInput label="zip" value={addressForm} setForm={setAddressForm} />
                </form>
                {addressLoading ? "Loading..." : <button onClick={addAddress}>Click to add!</button>}
                {addressError && "Error :((("}
            </div>
            <div style={{padding: "25px"}}>
                <h2>Addresses</h2>
                <ul>
                    { 
                    getAddressLoading ? "Loading..." : getAddressData.getAllAddresses.map(address => (
                        <li key={address.id} value={address.street}>{address.street}, {address.city}, {address.state}</li>
                    ))
                    }
                    { getAddressError && "Error :(((" }
                </ul>
            </div>
        </>
    );
}


export default Home
