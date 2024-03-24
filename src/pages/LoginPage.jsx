import React, { useState } from "react";
import {
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_API_URL from "../constant/ip";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleShowPassword = () => setShowPassword(!showPassword);
  const imageLogin = "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${BASE_API_URL}login`, {
      name: name,
      password: password,
    });

    if (response.data.status === true && response.data.message === 'admin sekolah') {
      localStorage.setItem("userToken", response.data.token);
      navigate("/admin-sekolah/dashboard");
      toast({
        title: "Login Berhasil",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else if (response.data.status === true && response.data.message === 'super admin') {
      localStorage.setItem("userToken", response.data.token);
      navigate("/super-admin/dashboard");
      toast({
        title: "Login Berhasil",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else if (response.data.status === true && response.data.message === 'siswa') {
      navigate("/login");
      toast({
        title: "Siswa tidak punya akses",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    else {
      toast({
        title: "name atau Password Salah",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <main className="flex h-screen w-full max-h-screen">
      <div className="h-full w-full lg:w-2/4 bg-white flex flex-col justify-between items-center p-4">
        <div>
          <p className="text-blue-800 font-bold text-2xl">ArohExam</p>
        </div>
        <div className="rounded-md border border-slate-200 p-8 justify-between flex w-2/3 flex-col items-center gap-8">
          <p className="text-blue-800 font-semibold text-3xl">Sign In</p>
          <form onSubmit={handleSubmit} className="w-full gap-3 flex flex-col">
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
                Continue
              </button>
            </div>
          </form>
          <div className="w-full flex justify-center ">
            <p>Forgot password?<span className="p-1 text-blue-800 underline font-medium">Register</span></p>
          </div>
        </div>
        <div>
          <p>don't have an account?<button onClick={() => navigate('/register')} className="p-1 text-blue-800 underline font-medium">
            Register
          </button></p>
        </div>
      </div>
      <div className="h-full w-2/4 md:block hidden">
        <img src={imageLogin} className="w-full h-full object-cover" />
      </div>

    </main>
    // <Flex
    //   height="100vh"
    //   alignItems="center"
    //   justifyContent="center"
    //   bg="gray.200"
    // >
    //   <Box bg="white" p={6} rounded="md" boxShadow="md" width="320px">
    //     <Heading mb={6}>Login</Heading>
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
    //         Login
    //       </Button>
    //     </form>
    //     <Text onClick={() => navigate('/register')}>Belum punya akun? Register</Text>
    //   </Box>
    // </Flex>
  );
};

export default LoginPage;
