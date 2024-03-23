import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";

const TesAddModal = ({
  modalOpen,
  setModalOpen,
  fields,
  setFields,
  addUser,
}) => {
  const handleChange = (key, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [key]: value,
    }));
  };

  return (
    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={() => addUser()}>
            {Object.entries(fields).map(([key, value]) => (
              <FormControl key={key} mb={4}>
                <FormLabel htmlFor={key} display={key === "user_id" || key === "link_id" ? "none" : "block"}>{key}</FormLabel>
                {key === "link_status" ? (
                  <Select
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                  >
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </Select>
                ) : key === "role" ? (
                  <Select
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                  >
                    <option value="admin sekolah">admin sekolah</option>
                    <option value="siswa">siswa</option>
                  </Select>
                ) : key === "status_progress" ? (
                  <Select
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                  >
                    <option value="belum dikerjakan">belum dikerjakan</option>
                    <option value="dikerjakan">dikerjakan</option>
                    <option value="selesai">selesai</option>
                  </Select>
                ) : key === "subscription_status" ? (
                  <Select
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                  >
                    <option value="active">active</option>
                    <option value="expired">expired</option>
                  </Select>
                ) : key === "status" ? (
                  <Select
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                  >
                    <option value="pending">pending</option>
                    <option value="settlement">settlement</option>
                    <option value="capture">capture</option>
                    <option value="expire">expire</option>
                    <option value="deny">deny</option>
                    <option value="cancel">cancel</option>
                  </Select>
                ) : key === "user_id" ? "" : key === "link_id" ? "" : (
                  <Input
                    id={key}
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                )}
              </FormControl>
            ))}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => setModalOpen(false)}>
            Tutup
          </Button>
          <Button
            colorScheme="green"
            type="submit"
            onClick={() => addUser()}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TesAddModal;
