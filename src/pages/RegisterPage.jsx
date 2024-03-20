import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  useToast,
  Text
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_API_URL from "../constant/ip";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [sekolah, setSekolah] = useState("");
  const toast = useToast();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${BASE_API_URL}register`, {
      name: name,
      password: password,
      sekolah: sekolah
    });

    if (response.data.data === 'berhasil') {
      navigate("/login");
      toast({
        title: "Register Berhasil",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Register gagal",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.200"
    >
      <Box bg="white" p={6} rounded="md" boxShadow="md" width="320px">
        <Heading mb={6}>Register</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel htmlFor="name">name</FormLabel>
            <Input
              id="name"
              type="name"
              placeholder="name Anda"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="sekolah">sekolah</FormLabel>
            <Input
              id="sekolah"
              type="sekolah"
              placeholder="sekolah Anda"
              value={sekolah}
              onChange={(e) => setSekolah(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button colorScheme="blue" type="submit" width="100%">
            Register
          </Button>
        </form>
        <Text onClick={() => navigate('/login')}>Sudah punya akun? Login</Text>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
