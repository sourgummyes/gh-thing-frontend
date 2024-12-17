import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'
import * as authService from "../src/services/authService";
import * as songService from "../src/services/songService";
import NavBar from "./NavBar/NavBar";
import Landing from "./Landing/Landing";
import SongList from "./components/SongList";
import QueueList from "./components/QueueList";
import SigninForm from "./components/SignInForm";
import CreateSongForm from "./components/CreateSongForm";


function App() {
  const [user, setUser] = useState(authService.getUser());
  const [songList, setSongList] = useState([]);
  const [songQueue, setSongQueue] = useState([]);

  const fetchSongs = async () => {
    try {
      const songs = await songService.index();
      if (songs.error) {
        throw new Error(songs.error);
      }
      setSongList(songs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSongs();
  }, []);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleQueue = (song) => {
    setSongQueue((prevQueue) => [...prevQueue, song]); 
    console.log("Song added to queue:", song);
  };

  const handleRemoveFromQueue = (songToRemove) => {
    setSongQueue((prevQueue) =>
      prevQueue.filter((song) => song !== songToRemove)
    );
  };


  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
      {user ? (
          <Route
            path="/"
            element={<Landing songList={songList}  songQueue={songQueue} handleQueue={handleQueue} user={user}/>}
          />
        ) : (
          <Route path="/" element={<Landing songList={songList}/>} />
        )}
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        <Route path="/create" element={<CreateSongForm fetchSongs={fetchSongs}/>}/>
      </Routes>
      <div className="lists">
        <div className="songlistcontain">
      <SongList songList={songList} handleQueue={handleQueue} fetchSongs={fetchSongs}/>
      </div>
      <div className="queuelistcontain">
      <QueueList songQueue={songQueue} handleRemoveFromQueue={handleRemoveFromQueue} />
      </div>
      </div>
    </>
  )
}

export default App
