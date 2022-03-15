import createAccount from "../../../helpers/createAccount";
import Cookies from "js-cookie";

const authFunc = async (url, body, method, history, auth) => {
  try {
    const response = await method.post(url, body);

    if (!auth) {
      createAccount(`${process.env.REACT_APP_SERVER}/api/v1/accounts`, {
        localId: response.data.localId,
        email: response.data.email,
      });
    }

    Cookies.set("accountId", response.data.localId);
  } catch (err) {
    console.log(err);
  } finally {
    history.replace("/users");
  }
};

export default authFunc;
