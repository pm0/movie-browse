import axios from "axios";

export const apiCall = async (path, rejectHandler) => {
  try {
    const response = await axios.get(path);
    return response.data;
  } catch (err) {
    return rejectHandler(err.message);
  }
};
