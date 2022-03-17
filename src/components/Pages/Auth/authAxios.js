import Cookies from "js-cookie";
import axios from "axios";

const authFunc = async (
  url,
  body,
  history,
  auth,
  setErrorFunc,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const response = await axios.post(url, body);

    if (!auth) {
      await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/accounts`, {
        localId: response.data.localId,
        email: response.data.email,
      });
    }

    const encodedLocalId = btoa(response.data.localId);
    Cookies.set("accountId", encodedLocalId, { expires: 3 });

    history.replace("/users");
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    if (auth) {
      setErrorFunc("Invalid email or password");
    } else if (!auth) {
      setErrorFunc("Email already exists");
    }
  }
};

export default authFunc;
