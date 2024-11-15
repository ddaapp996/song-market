import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/Home';
import { Content, Header } from 'antd/es/layout/layout';

export const AppRoute = () => {
  return (
    <Router>
      <Layout>
        <Header className="bg-blue-600 text-white text-center p-4">
          <h1>Song Market</h1>
        </Header>
        <Content style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};
