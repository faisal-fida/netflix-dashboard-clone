const authFunc = async (url, body, method, history, auth) => {
  try {
    const response = await method.post(url, body);

    if (!auth) {
      console.log(response.data);
    }

    history.replace("/browse");
  } catch (err) {
    console.log(err);
  }
};

export default authFunc;
