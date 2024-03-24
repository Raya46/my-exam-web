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
  Input,
} from "@chakra-ui/react";
import BASE_API_URL from "../../constant/ip";
import TesEditModal from "../../components/TesEditModal";
import TesAddModal from "../../components/TesAddModal";
import MainAdmin from "./Main";
import getData from "../../utils/getData";
import addData from "../../utils/addData";
import deleteData from "../../utils/deleteData";
import editData from "../../utils/editData";

const DashboardAdminSekolah = () => {
  const [file, setFile] = useState(null);
  const toast = useToast();
  const [subsData, setsubsData] = useState([]);
  const [fields, setFields] = useState({
    name: "",
    password: "",
    token: "",
    role: "",
    kelas_jurusan: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const getSubsData = async () => {
    const data = await getData(`${BASE_API_URL}admin-sekolah`);
    setsubsData(data.data);
  };

  const addUser = async () => {
    const result = await addData(
      `${BASE_API_URL}admin-sekolah/post`,
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
      role: user.role,
      kelas_jurusan: user.kelas_jurusan,
    });
    setModalEdit(true);
  };

  const handleModalOpen = () => {
    setFields({
      name: "",
      password: "",
      role: "",
      token: "USR-",
      kelas_jurusan: "",
    });
    setModalOpen(true);
  };

  const deleteUser = async (id) => {
    const data = await deleteData("admin-sekolah/", id);
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
    const data = await editData("admin-sekolah/", id, fields);
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

  const handleDownload = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.get(
        `${BASE_API_URL}admin-sekolah/siswa-export`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "siswa.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading user:", error);
      toast({
        title: "Error downloading user",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleImport = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const userToken = localStorage.getItem("userToken");
      await axios.post(`${BASE_API_URL}admin-sekolah/siswa-import`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      });
      getSubsData();
      console.log("Data siswa berhasil diimpor!");
    } catch (error) {
      console.error("Error importing siswa:", error);
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
            <Button onClick={() => handleDownload()}>Download siswa</Button>
            <Input type="file" onChange={handleFileChange} />
            <Button onClick={handleImport}>Import Data siswa</Button>
            <Spacer />
          </Flex>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Name</Th>
                  <Th>Sekolah</Th>
                  <Th>Role</Th>
                  <Th>Kelas Jurusan</Th>
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
                    <Td>{item.role}</Td>
                    <Td>{item.kelas_jurusan ?? "admin"}</Td>
                    <Td>{item.token ?? "not member"}</Td>
                    <Td alignItems={"center"}>
                      <Button onClick={() => handleCardPress(item)}>
                        Edit
                      </Button>
                      <Button onClick={() => deleteUser(item.id)}>
                        Delete
                      </Button>
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
    </MainAdmin>
  );
};

export default DashboardAdminSekolah;
