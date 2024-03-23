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
import { useNavigate } from "react-router-dom";
import TesEditModal from "../../components/TesEditModal";
import TesAddModal from "../../components/TesAddModal";
import MainAdmin from "./Main";

const LinkPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [subsData, setsubsData] = useState([]);
  const [fields, setFields] = useState({
    link_name: "",
    link_title: "",
    sekolah:"",
    kelas_jurusan: "",
    link_status: "",
  });
  const [selectedLink, setSelectedLink] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const getSubsData = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.get(`${BASE_API_URL}links`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      console.log(response.data.data)
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
        fields,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      console.log(response.data.data)
      if (response.data.data === "success") {
        setModalOpen(false);
        getSubsData();
        toast({
          title: "Add user success",
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
    setSelectedLink(data);
    setFields({
      link_name: data.link_name,
      link_title: data.link_title,
      link_status: data.link_status,
      kelas_jurusan: data.kelas_jurusan,
    });
    setModalEdit(true);
  };

  const handleModalOpen = () => {
    setFields({
      link_name: "",
      link_title: "",
      link_status: "",
      kelas_jurusan: "",
    });
    setModalOpen(true);
  };

  const deleteUser = async (id) => {
    try {
      const userToken = localStorage.getItem("userToken");
      await axios.delete(`${BASE_API_URL}links/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      getSubsData();
      toast({
        title: "Hapus user success",
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
      const response = await axios.put(`${BASE_API_URL}links/${id}`, fields, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if (response.data.data === "success") {
        setModalEdit(false);
        getSubsData();
        toast({
          title: "Edit user success",
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
    <MainAdmin>

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
                  <Th>link url</Th>
                  <Th>link title</Th>
                  <Th>link status</Th>
                  <Th>kelas jurusan</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {subsData.map((item, index) => (
                  <Tr key={item.id}>
                    <Td>{index + 1}</Td>
                    <Td>{item.link_name}</Td>
                    <Td>{item.link_title}</Td>
                    <Td>{item.link_status}</Td>
                    <Td>{item.kelas_jurusan}</Td>
                    <Td alignItems={"center"}>
                      <Button onClick={() => handleCardPress(item)}>Edit</Button>
                      <Button onClick={() => deleteUser(item.id)}>Delete</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <TesEditModal
            modalEdit={modalEdit}
            setModalEdit={setModalEdit}
            selectedUser={selectedLink}
            fields={fields}
            setFields={setFields}
            editUser={editUser}
          />

          {/* Add User Modal */}
          <TesAddModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            fields={fields}
            setFields={setFields}
            addUser={addUser}
          />
        </Box>
      </Flex>
    </MainAdmin>

  );
};

export default LinkPage;
