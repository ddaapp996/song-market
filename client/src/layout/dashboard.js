import React from "react";
import { Image, Layout } from "antd";
import SearchBar from "../components/SearchBar";
import logo from "../logo.svg";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;
export const DashBoard = ({ showSearch = true, children }) => {
  const navigate = useNavigate();
  const handleSearch = (song) => {
    console.log(song);
  };
  const onLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <Layout>
      <Header className="flex flex-row items-center justify-between bg-[#ff3179]">
        <div className="flex flex-row items-center space-x-2 md:space-x-10">
          <Image
            src={logo}
            alt="Music market"
            preview={false}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
          {showSearch && <SearchBar onSearch={handleSearch} />}
        </div>
        {showSearch && (
          <div
            className="cursor-pointer hidden md:block font-bold text-[#fdd602] "
            onClick={onLogout}
          >
            Logout
          </div>
        )}
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        {children}
      </Content>
      <Footer
        style={{
          textAlign: "left",
        }}
        className="w-full border-t border-gray-300"
      >
        &copy; Music Market {new Date().getFullYear()}. All Right Reserved.
      </Footer>
    </Layout>
  );
};
