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
import MainAdmin from "./Main";
import logoutUser from "../../utils/logoutUser";
import getData from "../../utils/getData";
import editData from "../../utils/editData";

const MonitoringPage = () => {
  const toast = useToast();
  const [subsData, setsubsData] = useState([]);
  const [fields, setFields] = useState({
    user_id: 0,
    link_id: 0,
    status_progress: "",
  });
  const [selectedLink, setSelectedLink] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);

  const getSubsData = async () => {
    const data = await getData(`${BASE_API_URL}progress`);
    setsubsData(data.data);
  };

  const editUser = async (id) => {
    const data = await editData("progress/",id,fields)
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

  useEffect(() => {
    getSubsData();
  }, []);

  const handleCardPress = (data) => {
    setSelectedLink(data.link);
    setFields({
      user_id: data.user_id,
      link_id: data.link_id,
      status_progress: data.status_progress,
    })
    setModalEdit(true);
  };

  return (
    <MainAdmin>
      <Flex>
        {/* Main Content */}
        <Box flex="1" bg="gray.100" p={6}>
          <Flex alignItems="center" mb={6}>
            <Heading size="md">Dashboard</Heading>
            <Button onClick={logoutUser}>logout</Button>
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
            selectedUser={selectedLink}
            fields={fields}
            setFields={setFields}
            editUser={editUser}
          />
        </Box>
      </Flex>
    </MainAdmin>

  );
};

export default MonitoringPage;
