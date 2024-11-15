import React, { useState } from "react";
import { Card, Button } from "antd";
import SongDetails from "./SongDetails";

const SongList = ({ title, songs, onViewMoreHandle }) => {
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

  return (
    <>
      <h2 className="text-2xl font-bold mb-10 py-3 border-b border-gray-300">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {songs.map((song) => (
          <Card key={song._id} hoverable>
            <div className="flex flex-row items-center gap-3 md:gap-7">
              <img
                alt={song.title}
                src={song.coverImage || process.env.REACT_APP_DEFAULT_COVER_URL}
                className="h-32 lg:h-40 object-cover"
              />
              <div>
                <Card.Meta
                  title={song.title}
                  description={<Description song={song} />}
                />
                <Button
                  onClick={() => handleOpenDetails(song)}
                  type="primary"
                  className="mt-4"
                >
                  Play
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div
        className="cursor-pointer text-blue-700 text-lg text-left mt-5 font-bold"
        onClick={onViewMoreHandle}
      >
        View more
      </div>
      <SongDetails
        visible={drawerVisible}
        onClose={handleCloseDetails}
        song={selectedSong}
      />
    </>
  );
};

export default SongList;

export const Description = ({ song }) => {
  return (
    <div className="italic truncate">
      <div>Artist: {song?.artist || "anonymous"}</div>
      <div>Download: {song?.downloads || 0}</div>
    </div>
  );
};
