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
  Button,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_API_URL from "../../constant/ip";

const HomePage = () => {
  const navigate = useNavigate();
  const [subsData, setsubsData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardPress = (item) => {
    if (localStorage.getItem("userToken")) {
      setSelectedItem(item);
      setModalOpen(true);
    } else {
      navigate("/login");
    }
  };

  const getSubsData = async () => {
    const userToken = localStorage.getItem("userToken");
    const response = await axios.get(`${BASE_API_URL}item`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    console.log(response.data)
    setsubsData(response.data.data);
  };

  useEffect(() => {
    getSubsData();
  }, []);

  const handleSubmit = async (item_name, price, item_id) => {
    const userToken = localStorage.getItem("userToken");
    try {
      const response = await axios.post(
        `${BASE_API_URL}pay`,
        {
          item_name: item_name,
          price: price,
          item_id: item_id,
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
          },
          onPending: function (result) {
            console.log(result);
          },
          onError: function (result) {
            console.log(result);
          },
        });
      } else {
        alert("Failed to process payment. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
      navigate("/login");
    } catch (error) {
      localStorage.removeItem("userToken");
      navigate("/login");
    }
  };

  return (
    <>
      {localStorage.getItem("userToken") ? (
        <Button onClick={() => handleLogout()}>logout</Button>
      ) : (
        ""
      )}
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
            {selectedItem && (
              <>
                <Text>{selectedItem.name}</Text>
                <Text>
                  {selectedItem.price}
                  {selectedItem.currency}
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
                  selectedItem.name,
                  selectedItem.price,
                  selectedItem.id
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
