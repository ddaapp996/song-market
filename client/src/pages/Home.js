import React, { useState, useEffect } from "react";
import axios from "../config/axiosConfig";
import SongList from "../components/SongList";
import Banner from "../components/Banner";
import { Spin } from "antd";
import { DashBoard } from "../layout/dashboard";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [tops, setTops] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPage, setNewPage] = useState({
    page: 1,
    size: 10,
  });
  const [topPage, setTopPage] = useState({
    page: 1,
    size: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songsResponse = await axios.get(
          `/api/songs?page=${newPage.page}&size=${newPage.size}`
        );
        const topsResponse = await axios.get(
          `/api/songs/tops?page=${topPage.page}&size=${topPage.size}`
        );
        const bannersResponse = await axios.get("/api/banners");
        setSongs(songsResponse.data);
        setTops(topsResponse.data);
        setBanners(bannersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [newPage, topPage]);

  const handleViewMore = (type) => () => {
    if (type === "new") {
      setNewPage((prev) => ({ ...prev, page: prev.page + 1 }));
    } else if (type === "top") {
      setTopPage((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  useEffect(() => {
    const getNewSongs = async () => {
      try {
        const songsResponse = await axios.get(
          `/api/songs?page=${newPage.page}&size=${newPage.size}`
        );
        setSongs((prevSongs) => [...prevSongs, ...songsResponse.data]);
      } catch (error) {
        console.error("Error fetching new songs:", error);
      }
    };
    if (newPage.page > 1) getNewSongs();
  }, [newPage]);

  useEffect(() => {
    const getTopSongs = async () => {
      try {
        const topsResponse = await axios.get(
          `/api/songs/tops?page=${topPage.page}&size=${topPage.size}`
        );
        setTops((prevTops) => [...prevTops, ...topsResponse.data]);
      } catch (error) {
        console.error("Error fetching top songs:", error);
      }
    };
    if (topPage.page > 1) getTopSongs();
  }, [topPage]);

  return (
    <DashBoard>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <div className="container mx-auto mt-6">
          <Banner banners={banners} />
          <div className="mb-10">
            <SongList
              title="New Songs"
              songs={songs}
              onViewMoreHandle={handleViewMore("new")}
            />
          </div>
          <div className="mb-10">
            <SongList
              title="Top Download Songs"
              songs={tops}
              onViewMoreHandle={handleViewMore("top")}
            />
          </div>
        </div>
      )}
    </DashBoard>
  );
};

export default Home;
