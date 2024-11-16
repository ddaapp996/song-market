import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import axiosClient from "../../config/axiosConfig";
const { Search } = Input;

export const Users = () => {
  const [count, setCount] = useState(0);
  const [searchText, setSearchText] = React.useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button>
            <EditOutlined className="text-blue-600" />
          </button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => console.log(record)}
            okText="Có"
            cancelText="Không"
          >
            <button>
              <DeleteOutlined className="text-red-600" />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onSearch = (value, _e) => setSearchText(value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(
          `/api/auth?search=${searchText}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [count, searchText]);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <Search
          placeholder="Tìm kiếm"
          onSearch={onSearch}
          enterButton
          className="w-1/3"
        />
        <Button
          className="bg-blue-600 text-white"
          // onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined />
          Tạo mới
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
