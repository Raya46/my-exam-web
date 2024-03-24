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
import TesEditModal from "../../components/TesEditModal";
import TesAddModal from "../../components/TesAddModal";
import getData from "../../utils/getData";
import editData from "../../utils/editData";
import deleteData from "../../utils/deleteData";
import addData from "../../utils/addData";

const ItemPage = () => {
  const toast = useToast();
  const [subsData, setsubsData] = useState([]);
  const [fields, setFields] = useState({
    name: "",
    description: "",
    price: 0,
    user_quantity:0
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const getSubsData = async () => {
    const data = await getData(`${BASE_API_URL}item`);
    setsubsData(data.data);
  };

  const addItem = async () => {
    const result = await addData(
      `${BASE_API_URL}item/post`,
      fields,
      setModalOpen,
      getSubsData
    );
    result === "success"
      ? toast({
          title: "success add user",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      : toast({
          title: "fail add user",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
      user_quantity: data.user_quantity
    });
    setModalEdit(true);
  };

  const handleModalOpen = () => {
    setFields({
      name: "",
      description: "",
      price: 0,
      user_quantity: 0
    });
    setModalOpen(true);
  };

  const deleteUser = async (id) => {
    const data = await deleteData("item/", id);
    if (data === "success") {
      getSubsData();
      toast({
        title: "delete user success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "delete fail",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const editUser = async (id) => {
      const data = await editData("item/",id,fields)
      if (data === "success") {
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
  };

  return (
    <Flex>
      {/* Main Content */}
      <Box flex="1" bg="gray.100" p={6}>
        <Flex alignItems="center" mb={6}>
          <Heading size="md">Dashboard</Heading>
          <Button onClick={() => handleModalOpen()}>+</Button>
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
                <Th>user_quantity</Th>
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
                  <Td>{item.user_quantity}</Td>
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
          addUser={addItem}
        />
      </Box>
    </Flex>
  );
};

export default ItemPage;
