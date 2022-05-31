import Cookies from "js-cookie";
import axios from "axios";
import { userActions } from "../../../store/user";

const authFunc = async (
  url,
  body,
  history,
  auth,
  setErrorFunc,
  setIsLoading,
  dispatch
) => {
  try {
    setIsLoading(true);
    // response from the user inputs and the url based on the state of auth (logging in, signing up)
    const response = await axios.post(url, body);

    // conditional to see if user is creating an account and sending a POST request to the server if the
    // conditional is true
    if (!auth) {
      await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/accounts`, {
        localId: response.data.localId,
        email: response.data.email,
      });
    }

    // encrypting the ID to protect the information when it is set as a cookie
    const encodedLocalId = btoa(response.data.localId);
    Cookies.set("accountId", encodedLocalId, { expires: 3 });

    // fetching the account that was requested from the server so that the ui is filled when
    // the user is sent to the users page
    const account = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/v1/accounts/${response.data.localId}`
    );
    // setting redux account state as the received account for initial data when sent to the users page
    // (client/src/store/user)
    dispatch(userActions.setAccount(account.data.data.account));

    history.replace("/users");
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    // conditionals to render the correct error to the user depending on if they're logging in or signing up
    if (auth) {
      setErrorFunc("Invalid email or password");
    } else if (!auth) {
      setErrorFunc("Email already exists");
    }
  }
};

export default authFunc;
