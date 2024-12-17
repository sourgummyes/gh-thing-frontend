import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/songs`;

const index = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getSongById = async (songId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${songId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// Create a new song
const create = async (formData) => {
  try {
    const res = await axios.post(BASE_URL, formData);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// Update an existing song
const updateSong = async (formData, songId) => {
  try {
    const res = await axios.put(`${BASE_URL}/${songId}`, formData);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// Delete a song
const deleteSong = async (songId) => {
  try {
    const deletedSong = await axios.delete(`${BASE_URL}/${songId}`);
    console.log(deletedSong.data);
    return deletedSong.data;
  } catch (err) {
    console.log(err);
  }
};

export { 
  index,
  create, 
  getSongById,
  updateSong,
  deleteSong 
};
