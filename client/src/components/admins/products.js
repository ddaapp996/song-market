import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Space,
  Table,
  Tag,
  Input,
  Image,
  Modal,
  Form,
  InputNumber,
  Upload,
  message,
  Popconfirm,
} from "antd";
import React, { useEffect, useState } from "react";
import axiosClient from "../../config/axiosConfig";
const { Search } = Input;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function convertToSlug(input) {
  return (
    input
      ?.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+|-+$/g, "") || ""
  );
}

export const Products = () => {
  const [count, setCount] = useState(0);
  const [searchText, setSearchText] = React.useState("");
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [form] = Form.useForm();
  const [fileName, setFileName] = useState("");
  const [formTitle, setFormTitle] = useState("Thêm sản phẩm mới");

  useEffect(() => {
    setData((data) => data.filter((item) => item.name.includes(searchText)));
  }, [searchText]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(
          `/api/products?search=${searchText}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [count, searchText]);

  const onSearch = (value, _e) => setSearchText(value);

  const handleCancel = () => setIsModalOpen(false);

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <Tag color="blue">{"$" + price.toLocaleString("en-US")}</Tag>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (desc) => {
        return <div className="whitespace-pre-line max-w-72">{desc}</div>;
      },
    },
    {
      title: "Ảnh",
      key: "image",
      dataIndex: "image",
      render: (image) => <Image src={image} width={50} height={50} />,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => handleEditProduct(record._id)}>
            <EditOutlined className="text-blue-500" />
          </button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDeleteProduct(record._id)}
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

  const handleEditProduct = async (id) => {
    try {
      const response = await axiosClient.get(`/api/products/${id}`);
      const product = response.data;
      setImageUrl(product.image);
      form.setFieldsValue(product);

      setFormTitle("Chỉnh sửa sản phẩm");
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);

      message.error("Không tồn tại sản phẩm này.");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axiosClient.delete(`/api/products/${id}`);
      message.success("Xóa thành công!");
      setCount((prev) => prev + 1);
    } catch (error) {
      message.error("Xóa thất bại!");
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      await axiosClient.post("/api/products", { ...values });
      message.success("Lưu sản phẩm thành công");
      setCount((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      message.error("Lưu sản phẩm thất bại!");
    }
    setIsModalOpen(false);
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
      const { url } = info.file.response;
      form.setFieldValue("image", url);
      message.success("Tải ảnh thành công!");
    } else if (info.file.status === "error") {
      message.error("Tải ảnh thất bại!");
    }
  };

  useEffect(() => {
    form.getFieldValue("name") && setFileName(form.getFieldValue("name"));
  }, [form]);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

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
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined />
          Tạo mới
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />

      <Modal
        title={formTitle}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        onClose={() => {
          form.resetFields();
          setImageUrl("");
        }}
      >
        <Form
          layout="vertical"
          onFinish={handleFormSubmit}
          className="space-y-4"
          form={form}
        >
          <Form.Item
            label="Tên Sản Phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" className="rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
          >
            <InputNumber
              placeholder="Nhập giá sản phẩm"
              className="w-full rounded-lg"
              min={0}
            />
          </Form.Item>

          <Form.Item
            label="Số Lượng"
            name="quantity"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <InputNumber
              placeholder="Nhập số lượng sản phẩm"
              className="w-full rounded-lg"
              min={0}
            />
          </Form.Item>

          <Form.Item
            label="Mô Tả"
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả sản phẩm" },
            ]}
          >
            <Input.TextArea
              placeholder="Nhập mô tả sản phẩm"
              rows={4}
              className="rounded-lg"
            />
          </Form.Item>

          <Upload
            name="productImage"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={`${
              process.env.REACT_APP_API_URL || "http://localhost:5000"
            }/api/products/upload-image?filename=${convertToSlug(fileName)}`}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
          <Form.Item
            label="Ảnh Sản Phẩm (URL)"
            name="image"
            rules={[
              { required: true, message: "Vui lòng nhập URL ảnh sản phẩm" },
            ]}
          >
            <Input
              disabled
              placeholder="Nhập URL ảnh sản phẩm"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-lg"
            >
              Lưu Sản Phẩm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
