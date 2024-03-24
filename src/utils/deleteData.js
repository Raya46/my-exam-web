import axios from "axios"
import BASE_API_URL from "../constant/ip";
const deleteData = async (params, id) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.delete(`${BASE_API_URL}${params}${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      return response.data.data
    } catch (error) {
        console.log(error)
    }
  };

  export default deleteData