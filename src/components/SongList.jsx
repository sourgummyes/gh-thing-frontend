import { useState } from "react";
import { Link } from "react-router-dom";
import EditSongForm from "./EditSongForm";
import * as songService from "../services/songService";



const SongList = ({ songList = [], handleQueue, user }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    console.log(songList)

    const addToQueue = (song) => {
        handleQueue(song); 
      };

      const handleDelete = async (song) => {
        await songService.deleteSong(song);
        getSongs();
      };
    if (songList.length === 0) {
      return <h1>Songs not found...</h1>;
    }
    return (
      <>
        <h2>Songs</h2>
        <ul>
          {songList.songs.map((currentSong) => (
            <div>
            <h4>{currentSong.title} - {currentSong.album}</h4>
            <h4>{currentSong.author}</h4>
            <button onClick={() => addToQueue(currentSong)}>Add to Queue</button>
            
            {user ? (
                null
                     ) : (
                        <>
                        {showEditForm ? (
                <EditSongForm
                    currentSong={currentSong}        
                    setShowEditForm={setShowEditForm}        
                />
                    ) : 
                    <button onClick={() => setShowEditForm(true)}>Edit</button>}
                        
                        <button onClick={() => handleDelete(currentSong.id)}>Delete</button>
                        </>
                     )}
            </div>
          ))}
        </ul>
      </> 
    );
  };

export default SongList;

