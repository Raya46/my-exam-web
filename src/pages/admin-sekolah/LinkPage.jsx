// Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useToast,
  Flex,
  Heading,
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spacer,
} from "@chakra-ui/react";
import BASE_API_URL from "../../constant/ip";
import EditUserModal from "../../components/EditUserModal";
import AddUserModal from "../../components/AddUserModal";
import { useNavigate } from "react-router-dom";

const LinkPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [subsData, setsubsData] = useState([]);
  const [linkName, setLinkName] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [linkStatus, setLinkStatus] = useState("");
  const [kelasJurusan, setKelasJurusan] = useState("");
  const [selectedLink, setSelectedLink] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const getSubsData = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.get(`${BASE_API_URL}links`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setsubsData(response.data.data);
    } catch (error) {
      console.error("Error fetching subscription data:", error);
    }
  };

  const addUser = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.post(
        `${BASE_API_URL}links/post`,
        { linkName, linkTitle, linkStatus, kelasJurusan },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      if (response.data.data === "berhasil") {
        setModalOpen(false);
        getSubsData();
        toast({
          title: "Add user berhasil",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Name atau Password salah",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        title: "Error adding user",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getSubsData();
  }, []);

  const handleCardPress = (data) => {
    setSelectedLink(data)
    setLinkName(data.link_name)
    setLinkTitle(data.link_title)
    setLinkStatus(data.link_status)
    setKelasJurusan(data.kelas_jurusan)
    setModalEdit(true);
  };

  const handleModalOpen = () =>{
    setLinkName("")
    setLinkTitle("")
    setLinkStatus("")
    setKelasJurusan("")
    setModalOpen(true);
  }

  const deleteUser = async (id) => {
    try {
      const userToken = localStorage.getItem("userToken");
      await axios.delete(`${BASE_API_URL}links/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      getSubsData();
      toast({
        title: "Hapus user berhasil",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error deleting user",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const editUser = async (id) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.put(
        `${BASE_API_URL}links/${id}`,
        { linkName, linkTitle, linkStatus, kelasJurusan },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      if (response.data.data === "success") {
        setModalEdit(false);
        getSubsData();
        toast({
          title: "Edit user berhasil",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Edit user gagal",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error editing user:", error);
      toast({
        title: "Error editing user",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogout = async () => {
    const userToken = localStorage.getItem("userToken");
    try {
      await axios.post(
        `${BASE_API_URL}logout`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      localStorage.removeItem("userToken");
      navigate("/login");
    } catch (error) {
      localStorage.removeItem("userToken");
      navigate("/login");
    }
  };

  return (
    <Flex>
      {/* Main Content */}
      <Box flex="1" bg="gray.100" p={6}>
        <Flex alignItems="center" mb={6}>
          <Heading size="md">Dashboard</Heading>
          <Button onClick={() => handleModalOpen()}>+</Button>
          <Button onClick={() => handleLogout()}>logout</Button>
          <Spacer />
        </Flex>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Name</Th>
                <Th>Sekolah</Th>
                <Th>Token</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {subsData.map((item, index) => (
                <Tr key={item.id}>
                  <Td>{index + 1}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.sekolah}</Td>
                  <Td>{item.token ?? "not member"}</Td>
                  <Td alignItems={"center"}>
                    <Button onClick={() => handleCardPress(item)}>Edit</Button>
                    <Button onClick={() => deleteUser(item.id)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {/* Edit User Modal */}
        <EditUserModal
          modalEdit={modalEdit}
          setModalEdit={setModalEdit}
          selectedUser={selectedLink}
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
          token={token}
          setToken={setToken}
          editUser={editUser}
        />

        {/* Add User Modal */}
        <AddUserModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
          token={token}
          setToken={setToken}
          addUser={addUser}
        />
      </Box>
    </Flex>
  );
};

export default LinkPage;
