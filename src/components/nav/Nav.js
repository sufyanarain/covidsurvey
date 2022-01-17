import React, { useState, useEffect, useContext } from 'react'
import { Menu, Affix, Avatar, Typography } from 'antd';
import { HomeFilled, MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from './logo.svg'


const { Text } = Typography;


const Nav = () => {
    const [current, setCurrent] = useState('home')



    return (


        <div>
            <Affix >
                <Menu overflowedIndicator={<MenuOutlined />} selectedKeys={[current]} mode="horizontal" style={{ height: 55 }}   >
                    <Menu.Item key="logo" >
                        <img className='logo' src={logo} />
                        <Link to='/dashboard'></Link>
                    </Menu.Item>
                    <Menu.Item key="home" icon={<HomeFilled style={{ fontSize: 25, width: 70 }} />}>
                        <Link to='/dashboard'></Link>
                    </Menu.Item>
                </Menu>
            </Affix>,



        </div >
    )
}

export default Nav
