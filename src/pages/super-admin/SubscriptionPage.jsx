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

const SubscriptionPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [subsData, setsubsData] = useState([]);
  const [fields, setFields] = useState({
    name: "",
    description: "",
    price: 0,
    currency: "",
    invoice_interval: "",
    invoice_period: "",
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const getSubsData = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.get(`${BASE_API_URL}subscription`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      console.log(response.data.data);
      setsubsData(response.data.data);
    } catch (error) {
      console.error("Error fetching subscription data:", error);
    }
  };

  const addUser = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.post(
        `${BASE_API_URL}subscription/post`,
        fields,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
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
    setSelectedUser(data);
    setFields({
      name: data.name,
      description: data.description,
      price: data.price,
      invoice_interval: data.invoice_interval,
      invoice_period: data.invoice_period,
      currency: data.currency,
    });
    setModalEdit(true);
  };

  const handleModalOpen = () => {
    setFields({
      name: "",
      description: "",
      price: "",
      invoice_period: "",
      invoice_interval: "",
      currency: 0,
    });
    setModalOpen(true);
  };

  const deleteUser = async (id) => {
    try {
      const userToken = localStorage.getItem("userToken");
      await axios.delete(`${BASE_API_URL}subscription/${id}`, {
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
      const response = await axios.put(
        `${BASE_API_URL}subscription/${id}`,
        fields,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
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
                <Th>description</Th>
                <Th>Price</Th>
                <Th>currency</Th>
                <Th>invoice_period</Th>
                <Th>invoice_interval</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {subsData.map((item, index) => (
                <Tr key={item.id}>
                  <Td>{index + 1}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.description}</Td>
                  <Td>{item.price}</Td>
                  <Td>{item.currency}</Td>
                  <Td>{item.invoice_period}</Td>
                  <Td>{item.invoice_interval}</Td>
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
        <TesEditModal
          modalEdit={modalEdit}
          setModalEdit={setModalEdit}
          selectedUser={selectedUser}
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
  );
};

export default SubscriptionPage;
