import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../api';
import { Spin } from 'antd';
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ setRole, children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const isValid = await verifyToken(token);
        setIsAuthenticated(isValid);
        const decode = jwtDecode(token);
        setRole && setRole(decode?.user?.role || 'user');
      }
      setLoading(false);
    };

    checkAuth();
  }, [setRole]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return children;
};

export default PrivateRoute;
