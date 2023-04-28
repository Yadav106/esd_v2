import React, { Fragment, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { CgInsertAfterO } from 'react-icons/cg'
import { ImCross } from 'react-icons/im'
import { nanoid } from 'nanoid'

const Purchase = (props) => {
	const [purchase, setPurchase] = useState(props.purchase)
	const [product, setProduct] = useState('')
	const [quantity, setQuantity] = useState(0)
	const [price, setPrice] = useState(0)
	const [name, setName] = useState('')
	const [edit, setEdit] = useState(false)
	const [add, setAdd] = useState(false)
	const [editId, setEditId] = useState('')

	async function addPurchase() {
		const url = 'http://localhost:5001/add_purchase';
		const data = {
			product: product,
			quantity: quantity,
			price: price,
			name: name,
			id: nanoid()
		}
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		const json = await response.json()
		console.log(json)
		setPurchase([...purchase, data])
		setAdd(false)
		setProduct('')
		setQuantity(0)
		setPrice(0)
		setName('')

	}

    const deletePurchase = async (id) => {
        const url = 'http://localhost:5001/delete_purchase';
        const data = {
            id: id
        }
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const json = await response.json()
        console.log(json)
        const newPurchase = purchase.filter((purchase) => purchase.id !== id)
        setPurchase(newPurchase)
    }

	const editPurchase = async (id) => {
		const url = 'http://localhost:5001/update_purchase';
		const data = {
			product: product,
			quantity: quantity,
			price: price,
			name: name,
			id: id
		}
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		const json = await response.json()
		console.log(json)
		const newPurchase = purchase.map((purchase) => {
			if (purchase.id === id) {
				return {
					product: product,
					quantity: quantity,
					price: price,
					name: name,
					id: id
				}
			} else {
				return purchase
			}
		})
		setPurchase(newPurchase)
		setEdit(false)
		setProduct('')
		setQuantity(0)
		setPrice(0)
		setName('')
		setEditId('')
	}


	return (
		<div className='text-white'>
			<div className='flex flex-col'>
				<div>
					<p className='text-center text-[40px] mb-[10px]'>Welcome to Purchase</p>
				</div>

				<div className='flex gap-[30px] justify-center mt-[10px]'>
					<div className='w-[400px] h-[400px] bg-gray-700 rounded-[20px]'></div> {/* Pie Chart */}
					<div className='w-[600px] h0[400px] bg-gray-700 rounded-[20px]'></div> {/* Line Chart */}
				</div>

				<div className='flex justify-center mt-[20px]'>
					<div className='w-[1038px] bg-gray-700 rounded-[20px] p-[20px]'>
						<p className='mb-[10px] text-[20px]'>Purchase Details :</p>
                        <CgInsertAfterO className='text-[40px] text-blue-400 cursor-pointer mb-[10px]'
							onClick={() => setAdd(!add)}
						/>
						{
							add &&
							<div className='flex gap-[10px] mb-[10px]'>
								<input type='text' placeholder='Product' className='rounded-[10px] p-[10px] text-black' onChange={(e) => setProduct(e.target.value)}/>
								<input type='number' placeholder='Quantity' className='rounded-[10px] p-[10px] text-black' onChange={(e) => setQuantity(e.target.value)}/>
								<input type='number' placeholder='Price' className='rounded-[10px] p-[10px] text-black' onChange={(e) => setPrice(e.target.value)}/>
								<input type='text' placeholder='Seller' className='rounded-[10px] p-[10px] text-black' onChange={(e) => setName(e.target.value)}/>
								<button className='rounded-[10px] p-[10px] bg-blue-400 text-white' onClick={() => {
									addPurchase()
								}}>Add</button>
							</div>
						}
						<table className='w-full rounded-[10px] bg-gray-500'>
							<thead>
									<tr>
										<th className='p-[20px]'>No.</th>
										<th className='p-[20px]'>Product</th>
										<th className='p-[20px]'>Quantity</th>
										<th className='p-[20px]'>Price</th>
										<th className='p-[20px]'>Seller</th>
										<th className='p-[20px]'>Action</th> {/* Edit, Delete */}
									</tr>
							</thead>
							<tbody>
								{
									purchase.map((item, index) => {
										return (
											<tr key={index}>
												<td className='text-center'>{index+1}</td>
												{
													edit && editId === item.id
													?
													<Fragment>
														<td className='text-center'>
															<input type='text' placeholder='Product' className='rounded-[10px] p-[10px] text-black w-[120px] h-[30px]' onChange={(e) => setProduct(e.target.value)} value={product}/>
														</td>
														<td className='text-center'>
															<input type='number' placeholder='Quantity' className='rounded-[10px] p-[10px] text-black w-[120px] h-[30px]' onChange={(e) => setQuantity(e.target.value)} value={quantity}/>
														</td>
														<td className='text-center'>
															<input type='number' placeholder='Price' className='rounded-[10px] p-[10px] text-black w-[120px] h-[30px]' onChange={(e) => setPrice(e.target.value)} value={price}/>
														</td>
														<td className='text-center'>
															<input type='text' placeholder='Seller' className='rounded-[10px] p-[10px] text-black w-[120px] h-[30px]' onChange={(e) => setName(e.target.value)} value={name}/>
														</td>
														<td className='text-center flex justify-center gap-[10px]'>
															<FaEdit className='text-[25px] text-green-500 cursor-pointer'
																onClick={() => editPurchase(item.id)}
															/>
															<ImCross className='text-[20px] text-red-500 cursor-pointer'
																onClick={() => setEdit(false)}
															/>
														</td>
													</Fragment>
													:
													<Fragment>
														<td className='text-center'>{item.product}</td>
														<td className='text-center'>{item.quantity}</td>
														<td className='text-center'>{item.price}</td>
														<td className='text-center'>{item.name}</td>
														<td className='text-center flex justify-center gap-[10px]'>
															<FaEdit className='text-[25px] text-green-500 cursor-pointer'
																onClick={() => {
																	setProduct(item.product)
																	setQuantity(item.quantity)
																	setPrice(item.price)
																	setName(item.name)
																	setEdit(true)
																	setEditId(item.id)
																}}
															/>
															<MdDelete className='text-[25px] text-red-500 cursor-pointer'
																onClick={() => deletePurchase(item.id)}
															/>
														</td>
													</Fragment>
												}
											</tr>
										)
									})
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Purchase