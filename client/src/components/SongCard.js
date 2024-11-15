import React from "react";
import { Card } from "antd";

const SongCard = ({ song, className }) => {
  return (
    <Card key={song._id} hoverable className={className}>
      <div className="flex flex-row items-center gap-3 md:gap-7">
        <img
          alt={song.title}
          src={song.coverImage || process.env.REACT_APP_DEFAULT_COVER_URL}
          className="h-14 md:h-20 object-cover"
        />
        <div>
          <Card.Meta title={song.title} description={song.artist} />
        </div>
      </div>
    </Card>
  );
};

export default SongCard;
