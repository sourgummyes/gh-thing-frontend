import React from "react";

const QueueList = ({ songQueue, handleRemoveFromQueue }) => {
  return (
    <div className="queue-list">
      <h2>Song Queue</h2>
      {songQueue.length === 0 ? (
        <p>Your queue is empty.</p>
      ) : (
        <ul>
          {songQueue.map((song, index) => (
            <li key={index}>
              <span>{song.title} - {song.artist}</span>
              <button onClick={() => handleRemoveFromQueue(song)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueueList;