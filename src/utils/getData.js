import axios from "axios";

const getData = async (params) => {
  try {
    const userToken = localStorage.getItem("userToken");
    const response = await axios.get(params, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getData;
