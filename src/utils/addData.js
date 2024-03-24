import axios from "axios";

const addData = async (params, fields, setModalOpen, getSubsData) => {
  try {
    const userToken = localStorage.getItem("userToken");
    const response = await axios.post(params, fields, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    if (response.data.data === "success") {
      setModalOpen(false);
      getSubsData();
      return "success";
    } else {
      return "Name atau Password salah";
    }
  } catch (error) {
    console.error(error);
    return "Terjadi kesalahan saat menambahkan data";
  }
};

export default addData;
