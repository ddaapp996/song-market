import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <Menu mode="horizontal" theme="dark" className="bg-gray-800">
            <Menu.Item key="home">
                <Link to="/">Song Market</Link>
            </Menu.Item>
            <Menu.Item key="login">
                <Link to="/login">Login</Link>
            </Menu.Item>
        </Menu>
    );
};

export default Navbar;
