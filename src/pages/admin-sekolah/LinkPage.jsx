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
import MainAdmin from "./Main";
import getData from "../../utils/getData";
import addData from "../../utils/addData";
import deleteData from "../../utils/deleteData";
import editData from "../../utils/editData";

const LinkPage = () => {
  const toast = useToast();
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
    const data = await getData(`${BASE_API_URL}links`);
    setsubsData(data.data);
  };

  const addLink = async () => {
    const result = await addData(
      `${BASE_API_URL}links/post`,
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

  const deleteLink = async (id) => {
    const data = await deleteData("links/", id);
    if (data === "success") {
      getSubsData();
      toast({
        title: "delete link success",
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

  const editLink = async (id) => {
      const data = await editData("links/",id,fields)
      if (data === "success") {
        setModalEdit(false);
        getSubsData();
        toast({
          title: "Edit link success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Edit link gagal",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
                      <Button onClick={() => deleteLink(item.id)}>Delete</Button>
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
            editUser={editLink}
          />

          {/* Add User Modal */}
          <TesAddModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            fields={fields}
            setFields={setFields}
            addUser={addLink}
          />
        </Box>
      </Flex>
    </MainAdmin>

  );
};

export default LinkPage;
