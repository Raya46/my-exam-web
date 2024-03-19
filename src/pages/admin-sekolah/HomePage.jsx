import React, { useState, useEffect } from "react";
import {
  Modal,
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
import BASE_API_URL from "../../constant/ip";

const HomePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [subsData, setsubsData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const handleCardPress = (subscription) => {
    setSelectedSubscription(subscription);
    setModalOpen(true);
  };

  const handleLogout = async () => {
    const userToken = localStorage.getItem("userToken");
    try {
      await axios.post(
        `${BASE_API_URL}logout`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      localStorage.removeItem("userToken");
      navigate("/");
    } catch (error) {
      localStorage.removeItem("userToken");
      navigate("/");
    }
  };

  const getSubsData = async () => {
    const userToken = localStorage.getItem("userToken");
    const response = await axios.get(`${BASE_API_URL}subscription`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    setsubsData(response.data.data);
  };

  useEffect(() => {
    localStorage.getItem("userToken") == null
      ? navigate("/login")
      : getSubsData();
  }, []);

  const handleSubmit = async (item_name, price, subscription_id) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const response = await axios.post(
        `${BASE_API_URL}pay`,
        {
          item_name: item_name,
          price: price,
          subscription_id: subscription_id,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      const { data } = response;
      if (data.status === "success" && data.snap_token) {
        window.snap.pay(data.snap_token, {
          onSuccess: function (result) {
            console.log(result);
            window.location.reload();
          },
          onPending: function (result) {
            console.log(result);
            window.location.reload();
          },
          onError: function (result) {
            console.log(result);
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
      <Text>sudah login</Text>
      <Button onClick={() => handleLogout()}>logout</Button>
      <Button onClick={() => console.log(localStorage.getItem("userToken"))}>
        tes
      </Button>
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
              onClick={() =>
                handleSubmit(
                  selectedSubscription.name,
                  selectedSubscription.price,
                  selectedSubscription.id
                )
              }
            >
              Beli
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HomePage;
