import React, { useState } from "react";
import { Input, List } from "antd";
import axios from "../config/axiosConfig";
import SongCard from "./SongCard";
import SongDetails from "./SongDetails";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleOpenDetails = (song) => {
    setSelectedSong(song);
    setDrawerVisible(true);
  };

  const handleCloseDetails = () => {
    setSelectedSong(null);
    setDrawerVisible(false);
  };

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value) {
      try {
        const response = await axios.get(
          `/api/songs/search?query=${e.target.value}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <>
      <div className="relative flex items-center w-auto md:w-[60vw] lg:w-[45vw]">
        <Input.Search
          value={query}
          onChange={handleSearch}
          placeholder="Type any name here..."
          className="w-full"
          allowClear
        />
        {suggestions.length > 0 && (
          <List
            bordered
            dataSource={suggestions}
            renderItem={(song) => (
              <List.Item
                onClick={() => handleOpenDetails(song)}
                className="cursor-pointer"
              >
                <SongCard song={song} className='w-full' />
              </List.Item>
            )}
            className="absolute top-10 -left-[40vw] md:left-0 bg-white border w-[80vw] md:w-full max-h-[74vh] overflow-y-auto z-10"
          />
        )}
      </div>
      <SongDetails
        visible={drawerVisible}
        onClose={handleCloseDetails}
        song={selectedSong}
      />
    </>
  );
};

export default SearchBar;
