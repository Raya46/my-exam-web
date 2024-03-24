import axios from "axios"
import BASE_API_URL from "../constant/ip";

const editData = async (params,id,fields) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.put(
        `${BASE_API_URL}${params}${id}`,
        fields,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      return response.data.data
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  export default editData