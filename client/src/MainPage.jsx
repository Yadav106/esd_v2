import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Sales from './components/Sales'
import Purchase from './components/Purchase'

const MainPage = (props) => {
  const {setIsLogged, username, password, data, setData} = props
  const [selected, setSelected] = useState('Sales')
  const [sales, setSales] = useState(props.data.sales)
  const [purchase, setPurchase] = useState(props.data.purchase)
  return (
    <div className='flex bg-gray-900'>
      <Sidebar selected={selected} setSelected={setSelected}/>
      <div className='bg-gray-600 w-full m-5 rounded-[20px] p-[20px]'>
        {
          selected == 'Sales' ?
          <Sales sales={sales}/> :
          <Purchase purchase={purchase}/>
        }
      </div>
    </div>
  )
}

export default MainPage