import {useState, useEffect } from 'react'
import axios from 'axios'


const BACKEND_URL = 'http://localhost:8000'

const Orders = () => {
    const [orders, setOrders] = useState('')
    const [newProductIds, setNewProductIds] = useState([])
    const [updateModalState, setUpdateModalState] = useState({
        isOpen: false
    })

    useEffect(() => {
        const fetchOrders = async() => {
            try {
                const response = await axios.get(`${BACKEND_URL}/orders`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = response.data
    
                if (data) {
                    setOrders(data.data)
                }
            } catch (error) {
                console.log({error})
            }
        }

        fetchOrders()
    }, [])

    const handleCreateOrder = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/orders`, 
                {
                    Products: newProductIds?.split(',') || []
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                }
            )
            const data = await response.json()

            if (data) {
                setOrders(data.data)
            }
        } catch (error) {
            console.log({error})
        }
    }

    const handleUpdateOrder = async () => {
        try {
            const response = await axios.put(`${BACKEND_URL}/orders`,
                {
                    Products: updateModalState?.order?.Products
                },
                {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            const data = await response.json()

            if (data) {
                setOrders(data.data)
            }
        } catch (error) {
            console.log({error})
        }
    }

    return (
        <div>
            <input type="text" placeholder='Enter product Ids' value={newProductIds} onChange={(e) => setNewProductIds(e.target.value)} />
            <button type="button" onClick={handleCreateOrder}>Create Order</button>
            <table>
                <thead>
                    <th>Order Id</th>
                    <th>Product Ids</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {orders?.length && orders?.map(order => {
                        return <tr>
                            <td>{order.Id}</td>
                            <td>{order.Products}</td>
                            <td onClick={() => setUpdateModalState({
                                isOpen: true,
                                order
                            })}>Update</td>
                        </tr>
                    })}
                </tbody>
            </table>

            {updateModalState?.isOpen && <div>
                <input type="text" placeholder='Enter updated product Ids' value={updateModalState.Products} onChange={(e) => setUpdateModalState({
                    ...updateModalState,
                    Products: e.target.value
                })} />
                <button type="button" onClick={handleUpdateOrder}>Update Products</button>
                <button type="button" onClick={() => setUpdateModalState({
                    isOpen: false
                })}>Close</button>
                </div>}
        </div>
    )
}

export default Orders