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
import addData from "../../utils/addData";
import editData from "../../utils/editData";
import deleteData from "../../utils/deleteData";
import logoutUser from "../../utils/logoutUser";

const DashboardSuperAdmin = () => {
  const toast = useToast();
  const [subsData, setsubsData] = useState([]);
  const [fields, setFields] = useState({
    name: "",
    password: "",
    token: "",
    sekolah: ""
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const getSubsData = async () => {
    const data = await getData(`${BASE_API_URL}super-admin`);
    setsubsData(data.data);
  };

  const addUser = async () => {
    const result = await addData(
      `${BASE_API_URL}super-admin/post`,
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

  const handleCardPress = (user) => {
    setSelectedUser(user);
    setFields({
      name: user.name,
      password: user.password,
      token: user.token,
      sekolah: user.sekolah
    });
    setModalEdit(true);
  };

  const handleModalOpen = () => {
    setFields({
      name: "",
      password: "",
      token: "",
      sekolah: ""
    });
    setModalOpen(true);
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
          <Button onClick={() => handleModalOpen()}>+</Button>
          <Button onClick={logoutUser}>logout</Button>
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

export default DashboardSuperAdmin;
