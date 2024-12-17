import { useState } from "react";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/songs`;

const CreateSongForm = (props) => {
  const [song, setSong] = useState({
    author: "",
    title: "",
    album: "",
    fullband: "",  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSong({ ...song, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[YN]{5}$/.test(song.fullband)) {
      alert("Fullband must be exactly 5 characters with only 'Y' or 'N' values.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}`, song);
      setSong({
        author: "",
        title: "",
        album: "",
        fullband: "",
      });
      console.log("Song added successfully!");
    } catch (error) {
      console.error("Error adding song:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Author:{" "}
        <input
          type="text"
          name="author"
          value={song.author}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Title:{" "}
        <input
          type="text"
          name="title"
          value={song.title}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Album:{" "}
        <input
          type="text"
          name="album"
          value={song.album}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Fullband (5 characters of Y/N):{" "}
        <input
          type="text"
          name="fullband"
          value={song.fullband}
          onChange={handleChange}
          maxLength="5"
          required
        />
      </label>
      <br />
      <button type="submit">Add Song</button>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CreateSongForm;
