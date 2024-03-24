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
import deleteData from "../../utils/deleteData";
import editData from "../../utils/editData";
import getData from "../../utils/getData";

const ListPaymentPage = () => {
  const toast = useToast();
  const [subsData, setsubsData] = useState([]);
  const [fields, setFields] = useState({
    name: "",
    status: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);

  const getSubsData = async () => {
    const data = await getData(`${BASE_API_URL}super-admin/list-pay`);
    setsubsData(data.data);
  };

  useEffect(() => {
    getSubsData();
  }, []);

  const handleCardPress = (data) => {
    setSelectedUser(data);
    setFields({
      name: data.user.name,
      status: data.status,
    });
    setModalEdit(true);
  };

  const deleteUser = async (id) => {
    const data = await deleteData("super-admin/", id);
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
    const data = await editData("super-admin/",id,fields)
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
          <Spacer />
        </Flex>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Name</Th>
                <Th>item</Th>
                <Th>Price</Th>
                <Th>Status</Th>
                <Th>Token</Th>
                <Th>Start Date</Th>
                <Th>Expired Date</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {subsData.map((item, index) => (
                <Tr key={item.id}>
                  <Td>{index + 1}</Td>
                  <Td>{item.user.name}</Td>
                  <Td>{item.item.name}</Td>
                  <Td>{item.item.price}</Td>
                  <Td>{item.status}</Td>
                  <Td>{item.order_id}</Td>
                  <Td>{item.created_at}</Td>
                  <Td>{item.user.item}</Td>
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

      </Box>
    </Flex>
  );
};

export default ListPaymentPage;
