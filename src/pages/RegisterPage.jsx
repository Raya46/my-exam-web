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

    if (response.data.data === 'success') {
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
    <main className="flex h-screen w-full max-h-screen">
      <div className="h-full w-full bg-white flex flex-col justify-between items-center p-4">
        <div>
          <p className="text-blue-800 font-bold text-2xl">ArohExam</p>
        </div>
        <div className="rounded-md border border-slate-200 p-8 justify-between flex w-2/4 flex-col items-center gap-8">
          <p className="text-blue-800 font-semibold text-3xl">Sign In</p>
          <form onSubmit={handleSubmit} className="w-full gap-3 flex flex-col">
            <div className="w-full">
              <input
                id="sekolah"
                type="sekolah"
                value={sekolah}
                onChange={(e) => setSekolah(e.target.value)}
                className="border border-slate-200 rounded-md focus:border-blue-800 p-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-800"
                placeholder="School" />
            </div>
            <div className="w-full">
              <input
                id="name"
                type="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="border border-slate-200 rounded-md focus:border-blue-800 p-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-800"
                placeholder="Email" />
            </div>
            <div className="w-full">
              <input
                id="password"
                type="text"
                // type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-slate-200 rounded-md focus:border-blue-800 p-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-800"
                placeholder="Password" />
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="border bg-blue-800 text-white rounded-md p-2 px-3 w-full "
              >
                Register
              </button>
            </div>
          </form>
          <div className="w-full flex justify-center ">
            <p>Forgot password?<span className="p-1 text-blue-800 underline font-medium">Register</span></p>
          </div>
        </div>
        <div>
          <p>Already have an account?<button onClick={() => navigate('/login')} className="p-1 text-blue-800 underline font-medium">
            login
          </button></p>
        </div>
      </div>
      {/* <div className="h-full w-2/4 md:block hidden">
        <img src={imageLogin} className="w-full h-full object-cover" />
      </div> */}

    </main>
    // <Flex
    //   height="100vh"
    //   alignItems="center"
    //   justifyContent="center"
    //   bg="gray.200"
    // >
    //   <Box bg="white" p={6} rounded="md" boxShadow="md" width="320px">
    //     <Heading mb={6}>Register</Heading>
    //     <form onSubmit={handleSubmit}>
    //       <FormControl mb={4}>
    //         <FormLabel htmlFor="name">name</FormLabel>
    //         <Input
    //           id="name"
    //           type="name"
    //           placeholder="name Anda"
    //           value={name}
    //           onChange={(e) => setname(e.target.value)}
    //         />
    //       </FormControl>
    //       <FormControl mb={4}>
    //         <FormLabel htmlFor="sekolah">sekolah</FormLabel>
    //         <Input
    //           id="sekolah"
    //           type="sekolah"
    //           placeholder="sekolah Anda"
    //           value={sekolah}
    //           onChange={(e) => setSekolah(e.target.value)}
    //         />
    //       </FormControl>
    //       <FormControl mb={4}>
    //         <FormLabel htmlFor="password">Password</FormLabel>
    //         <InputGroup>
    //           <Input
    //             id="password"
    //             type={showPassword ? "text" : "password"}
    //             placeholder="Password Anda"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //           <InputRightElement>
    //             <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
    //               {showPassword ? <ViewOffIcon /> : <ViewIcon />}
    //             </Button>
    //           </InputRightElement>
    //         </InputGroup>
    //       </FormControl>
    //       <Button colorScheme="blue" type="submit" width="100%">
    //         Register
    //       </Button>
    //     </form>
    //     <Text onClick={() => navigate('/login')}>Sudah punya akun? Login</Text>
    //   </Box>
    // </Flex>
  );
};

export default RegisterPage;
