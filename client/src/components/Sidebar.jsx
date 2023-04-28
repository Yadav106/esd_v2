import React, {useState} from 'react'

import { GiMoneyStack } from 'react-icons/gi'
import { BiPurchaseTag } from 'react-icons/bi'


const Sidebar = (props) => {
    const {selected, setSelected} = props
    return (
    <div className='h-screen w-[100px] m-0 flex flex-col bg-gray-900 text-white shadow justify-center'>
        <SidebarIcon icon={<GiMoneyStack size="28"/>}
            text='Sales'
            onClick={() => setSelected('Sales')}
            selected={selected}
            setSelected={setSelected}
        />
        <SidebarIcon icon={<BiPurchaseTag size="32"/>}
            text='Purchase'
            onClick={() => setSelected('Purchase')}
            selected={selected}
            setSelected={setSelected}
        />
    </div>
    )
}

const SidebarIcon = ({icon, text='tooltip',selected, setSelected}) => {
    return (
        <div className={selected == text ? 'sidebar-icon-selected group' : 'sidebar-icon group'}
            onClick={() => setSelected(text)}
        >
            {icon}
            <span className='sidebar-tooltip group-hover:scale-105'>
                {text}
            </span>
        </div>
    )
}

export default Sidebar