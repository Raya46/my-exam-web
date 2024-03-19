// EditUserModal.js
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

const EditUserModal = ({
  modalEdit,
  setModalEdit,
  selectedUser,
  name,
  setName,
  password,
  setPassword,
  role,
  setRole,
  token,
  setToken,
  subscriptionStatus,
  setSubscriptionStatus,
  subscriptionExpiryDate,
  setSubscriptionExpiryDate,
  editUser,
}) => {
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
                <Input
                  id="name"
                  type="name"
                  placeholder="name Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  placeholder="Password Anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              {role === undefined ? (
                ""
              ) : (
                <FormControl mb={4}>
                  <FormLabel htmlFor="role">Role</FormLabel>
                  <Select
                    placeholder="Pilih Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="admin sekolah">Admin Sekolah</option>
                    <option value="siswa">Siswa</option>
                  </Select>
                </FormControl>
              )}

              <FormControl mb={4}>
                <FormLabel htmlFor="status">Status</FormLabel>
                <Select
                  placeholder="Pilih Status"
                  value={subscriptionStatus}
                  onChange={(e) => setSubscriptionStatus(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                </Select>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="token">Token</FormLabel>
                <Input
                  id="token"
                  placeholder="not member"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="expired-date">expired date</FormLabel>
                <Input
                  id="expired-date"
                  placeholder="not member"
                  value={subscriptionExpiryDate}
                  onChange={(e) => setSubscriptionExpiryDate(e.target.value)}
                />
              </FormControl>
            </form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => setModalEdit(false)}>
            Tutup
          </Button>
          <Button colorScheme="green" onClick={() => editUser(selectedUser.id)}>
            Edit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;
