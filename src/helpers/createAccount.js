import axios from "axios";

const createAccount = async (url, body) => {
  try {
    const response = await axios.post(url, body);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default createAccount;
