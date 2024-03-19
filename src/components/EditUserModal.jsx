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
  paymentStatus,
  setPaymentStatus,
  subscriptionExpiryDate,
  setSubscriptionExpiryDate,
  startDate,
  setStartDate,
  description,
  setDescription,
  invoicePeriod,
  setInvoicePeriod,
  invoiceInterval,
  setInvoiceInterval,
  currency,
  setCurrency,
  price,
  setPrice,
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
              {password === undefined ? (
                ""
              ) : (
                <FormControl mb={4}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    placeholder="Password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              )}

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
              {subscriptionStatus === undefined ? (
                ""
              ) : (
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
              )}
              {paymentStatus === undefined ? (
                ""
              ) : (
                <FormControl mb={4}>
                  <FormLabel htmlFor="payment-status">payment Status</FormLabel>
                  <Select
                    placeholder="Pilih Status"
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                  >
                    <option value="pending">pending</option>
                    <option value="settlement">settlement</option>
                    <option value="capture">capture</option>
                    <option value="expire">settlement</option>
                    <option value="deny">deny</option>
                    <option value="cancel">cancel</option>
                  </Select>
                </FormControl>
              )}

              {token === undefined ? (
                ""
              ) : (
                <FormControl mb={4}>
                  <FormLabel htmlFor="token">Token</FormLabel>
                  <Input
                    id="token"
                    placeholder="not member"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                  />
                </FormControl>
              )}
              {startDate === undefined ? (
                ""
              ) : (
                <FormControl mb={4}>
                  <FormLabel htmlFor="start-date">start date</FormLabel>
                  <Input
                    id="start-date"
                    placeholder="not member"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </FormControl>
              )}

              {subscriptionExpiryDate === undefined ? (
                ""
              ) : (
                <FormControl mb={4}>
                  <FormLabel htmlFor="expired-date">expired date</FormLabel>
                  <Input
                    id="expired-date"
                    placeholder="not member"
                    value={subscriptionExpiryDate ?? ""}
                    onChange={(e) => setSubscriptionExpiryDate(e.target.value)}
                  />
                </FormControl>
              )}
              {description === undefined ? (
                ""
              ) : (
                <FormControl mb={4}>
                  <FormLabel htmlFor="description">description</FormLabel>
                  <Input
                    id="description"
                    placeholder="not member"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
              )}
              {price === undefined ? (
                ""
              ) : (
                <FormControl mb={4}>
                  <FormLabel htmlFor="price">Price</FormLabel>
                  <Input
                    id="price"
                    placeholder="not member"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormControl>
              )}
              {currency === undefined ? (
                ""
              ) : (
                <FormControl mb={4}>
                  <FormLabel htmlFor="currency">currency</FormLabel>
                  <Input
                    id="currency"
                    placeholder="not member"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  />
                </FormControl>
              )}
              {invoicePeriod === undefined ? (
                ""
              ) : (
                <FormControl mb={4}>
                  <FormLabel htmlFor="invoice-period">invoice period</FormLabel>
                  <Input
                    id="invoice-period"
                    placeholder="not member"
                    value={invoicePeriod}
                    onChange={(e) => setInvoicePeriod(e.target.value)}
                  />
                </FormControl>
              )}
              {invoiceInterval === undefined ? (
                ""
              ) : (
                <FormControl mb={4}>
                  <FormLabel htmlFor="invoice-interval">Invoice Interval</FormLabel>
                  <Input
                    id="invoice-interval"
                    placeholder="not member"
                    value={invoiceInterval}
                    onChange={(e) => setInvoiceInterval(e.target.value)}
                  />
                </FormControl>
              )}
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
