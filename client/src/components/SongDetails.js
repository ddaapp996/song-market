import React from "react";
import { Drawer } from "antd";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const SongDetails = ({ visible, onClose, song }) => {
  if (!song) return null;

  return (
    <Drawer
      title={`${song.title} - ${song.artist}`}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={400}
    >
      <img
        src={song.coverImage}
        alt={song.title}
        className="w-full h-60 object-cover mb-4"
      />
      <p>
        <strong>Title:</strong> {song.title || "N/A"}
      </p>
      <p>
        <strong>Album:</strong> {song.album || "N/A"}
      </p>
      <p>
        <strong>Genre:</strong> {song.genre || "N/A"}
      </p>
      <p>
        <strong>Downloads:</strong> {song.downloads}
      </p>

      {visible && (
        <AudioPlayer
          className="w-full mt-5"
          src={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${song.url}`}
          onPlay={(e) => console.log("onPlay")}
        />
      )}
    </Drawer>
  );
};

export default SongDetails;
