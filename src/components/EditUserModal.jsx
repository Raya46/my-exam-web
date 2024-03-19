// EditUserModal.js
import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Select, Button } from "@chakra-ui/react";

const EditUserModal = ({ modalEdit, setModalEdit, selectedUser, name, setName, password, setPassword, role, setRole, editUser }) => {
  return (
    <Modal isOpen={modalEdit} onClose={() => setModalEdit(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedUser && (
            <form onSubmit={() => editUser(selectedUser.id)}>
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
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => setModalEdit(false)}>Tutup</Button>
          <Button colorScheme="green" onClick={() => editUser(selectedUser.id)}>Edit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;
