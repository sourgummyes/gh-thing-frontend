import { useState, useEffect } from "react";
import axios from "axios";


const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/songs`;

const EditSongForm = (props) => {
  const [song, setSong] = useState({

    id: props.songId, 
    author: "",
    title: "",
    album: "",
    fullband: "NNNNN", 
  });

  useEffect(() => {
   
    if (props.currentSong) {
      setSong(props.currentSong);
    }
  }, [props.currentSong]);

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setSong({ ...song, [name]: value }); 
  };

  const validateFullband = (value) => {
    const regex = /^[YN]{5}$/;
    return regex.test(value); 
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(
            `${BASE_URL}/${props.currentSong.id}`, 
            song, 
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
            }
          );
      props.getSongs(); // Callback to refresh the list of songs
      props.setShowEditForm(false); // Close the edit form after saving
    } catch (error) {
      console.error("Error saving song:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Author: 
        <input
          type="text"
          name="author"
          value={song.author}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Title: 
        <input
          type="text"
          name="title"
          value={song.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Album: 
        <input
          type="text"
          name="album"
          value={song.album}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Fullband: 
        <input
          name="fullband"
          value={song.fullband}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Save Song</button>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditSongForm;
