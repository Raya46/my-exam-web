import React, { useState, useEffect } from "react";
import {
  Modal,
  Stack,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalOverlay,
  ModalHeader,
  Card,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_API_URL from "../constant/ip";

const HomePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [subsData, setsubsData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const handleCardPress = (subscription) => {
    setSelectedSubscription(subscription);
    setModalOpen(true);
  };

  const handleLogout = async () => {
    const userToken = localStorage.getItem("userToken");
    await axios.post(
      `${BASE_API_URL}logout`,
      {},
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    localStorage.removeItem("userToken");
    navigate('/')
  };

  const handleLogin = async () => {
    const response = await axios.post(`${BASE_API_URL}login`, {
      name: name,
      password: password,
    });
    localStorage.setItem("userToken", response.data.token);
    navigate('/')
  };

  const getSubsData = async () => {
    const response = await axios.get(`${BASE_API_URL}subscription`);
    setsubsData(response.data.data);
  };

  useEffect(() => {
    getSubsData();
  }, []);

  const handleSubmit = async (event, price, subscription_id) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_API_URL}pay`, {
        price,
        subscription_id
      });
      const { data } = response;
      if (data.status === "success" && data.snap_token) {
        window.snap.pay(data.snap_token, {
          onSuccess: function (result) {
            window.location.reload();
          },
          onPending: function (result) {
            window.location.reload();
          },
          onError: function (result) {
            window.location.reload();
          },
        });
      } else {
        alert("Failed to process payment. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {localStorage.getItem("userToken") == null ? (
        <>
          <Text>belum login</Text>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
          />
          <Input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="password"
          />
          <Button onClick={() => handleLogin()}>login</Button>
        </>
      ) : (
        <>
          <Text>sudah login</Text>
          <Button onClick={() => handleLogout()}>logout</Button>
          {subsData.map((item) => (
            <Card key={item.id}>
              <span>{item.name}</span>
              <span>{item.description}</span>
              <span>
                {item.price}
                {item.currency}
              </span>
              <Button onClick={() => handleCardPress(item)}>Buy</Button>
            </Card>
          ))}
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Informasi Langganan</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {selectedSubscription && (
                  <>
                    <Text>{selectedSubscription.name}</Text>
                    <Text>
                      {selectedSubscription.price}
                      {selectedSubscription.currency}
                    </Text>
                  </>
                )}
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => setModalOpen(false)}
                >
                  Tutup
                </Button>
                <Button
                  colorScheme="green"
                  onClick={() => handleSubmit(selectedSubscription.price, selectedSubscription.id)}
                >
                  Beli
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default HomePage;
