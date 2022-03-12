import createAccount from "../../../helpers/createAccount";
import Cookies from "js-cookie";

const authFunc = async (url, body, method, history, auth) => {
  try {
    const response = await method.post(url, body);

    if (!auth) {
      createAccount("http://localhost:8000/api/v1/accounts", {
        localId: response.data.localId,
        email: response.data.email,
      });
    }

    Cookies.set("accountId", response.data.localId, {
      expires: 7,
    });

    history.replace("/browse");
  } catch (err) {
    console.log(err);
  }
};

export default authFunc;
