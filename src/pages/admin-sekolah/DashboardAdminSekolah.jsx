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

const Dashboard = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [subsData, setsubsData] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const getSubsData = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.get(`${BASE_API_URL}super-admin`, {
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
        `${BASE_API_URL}super-admin/post`,
        { name, password, role },
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

  const handleCardPress = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setPassword(user.password);
    setRole(user.role);
    setModalEdit(true);
  };

  const deleteUser = async (id) => {
    try {
      const userToken = localStorage.getItem("userToken");
      await axios.delete(`${BASE_API_URL}super-admin/${id}`, {
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
        `${BASE_API_URL}super-admin/${id}`,
        { name, password, role },
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
      navigate("/");
    } catch (error) {
      localStorage.removeItem("userToken");
      navigate("/");
    }
  };

  return (
    <Flex>
      {/* Main Content */}
      <Box flex="1" bg="gray.100" p={6}>
        <Flex alignItems="center" mb={6}>
          <Heading size="md">Dashboard</Heading>
          <Button onClick={() => setModalOpen(true)}>+</Button>
          <Button onClick={() => handleLogout()}>logout</Button>
          <Spacer />
        </Flex>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Name</Th>
                <Th>Role</Th>
                <Th>Token</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {subsData.map((item, index) => (
                <Tr key={item.id}>
                  <Td>{index + 1}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.role ?? item.price}</Td>
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
          selectedUser={selectedUser}
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
          role={role}
          setRole={setRole}
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
          role={role}
          setRole={setRole}
          addUser={addUser}
        />
      </Box>
    </Flex>
  );
};

export default Dashboard;
