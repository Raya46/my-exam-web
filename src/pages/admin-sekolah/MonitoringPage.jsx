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

const MonitoringPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [subsData, setsubsData] = useState([]);
  const [statusProgress, setStatusProgress] = useState("");
  const [selectedLink, setSelectedLink] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const getSubsData = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.get(`${BASE_API_URL}progress`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setsubsData(response.data.data);
    } catch (error) {
      console.error("Error fetching subscription data:", error);
    }
  };

  const editUser = async (id, user_id, link_id) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.put(
        `${BASE_API_URL}progress/${id}`,
        { user_id: user_id, link_id: link_id, status_progress: statusProgress },
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

  useEffect(() => {
    getSubsData();
  }, []);

  const handleCardPress = (data) => {
    setSelectedLink(data.link)
    setStatusProgress(data.status_progress)
    setModalEdit(true);
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
          <Button onClick={() => handleLogout()}>logout</Button>
          <Spacer />
        </Flex>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Name</Th>
                <Th>Exam Title</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {subsData.map((item, index) => (
                <Tr key={item.id}>
                  <Td>{index + 1}</Td>
                  <Td>{item.user.name}</Td>
                  <Td>{item.link.link_title}</Td>
                  <Td>{item.status_progress}</Td>
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
      </Box>
    </Flex>
  );
};

export default MonitoringPage;
