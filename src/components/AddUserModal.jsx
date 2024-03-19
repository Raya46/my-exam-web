// AddUserModal.js
import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Select, Button } from "@chakra-ui/react";

const AddUserModal = ({ modalOpen, setModalOpen, name, setName, password, setPassword, role, setRole, addUser }) => {
  return (
    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={() => addUser()}>
            <FormControl mb={4}>
              <FormLabel htmlFor="name">name</FormLabel>
              <Input id="name" type="name" placeholder="name Anda" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" placeholder="Password Anda" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="role">Role</FormLabel>
              <Select placeholder="Pilih Role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="admin sekolah">Admin Sekolah</option>
                <option value="siswa">Siswa</option>
              </Select>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => setModalOpen(false)}>Tutup</Button>
          <Button colorScheme="green" onClick={() => addUser()}>Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;
