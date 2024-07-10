import { getUserFromBackend } from "@/backend-services/auth";
import { PasswordField } from "@/components/auth/PasswordInput";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Checkbox,
  Container, 
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input, 
  Stack,
  useColorModeValue, 
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import AppButton, { HeadlessButton } from "../ui-components/AppButton";
import Logo from "../common/Logo";
export default function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Inside your SignIn component
  const { query } = useRouter();
  const router = useRouter();
  const dynamicCallbackUrl = query.callbackUrl;
  // Inside your component
  const handleSubmit = async (e) => {
    try {
      setError(false);
      setIsSubmitting(true);
  
      e.preventDefault(); // Prevent default form submission behavior
   
  
      
      const result = await signIn("credentials", {
        redirect: false, // Prevent NextAuth from redirecting internally
        userName,
        password,
      });
  
    
  
      if (result && result.ok) {
        setError(false);
        setIsSubmitting(false);
        console.log("Password", password);
        
        if(dynamicCallbackUrl){
          router.replace(dynamicCallbackUrl.toString());
  
        }else {
          router.reload()
        }
        
        return;

      
      } else {
        setIsSubmitting(false);
        setError(true);

        return;
        // Handle errors, such as showing an alert or setting an error state
        console.error("crediential error", result);
      }
    } catch (error) {
      setIsSubmitting(false);
      setError(true);
      // Handle errors, such as showing an alert or setting an error state
      console.error("crediential error", error);
    }
   
  };
  return (
    <Center  
    bgGradient='linear(to-br, teal.300, gray.100, gray.50,  teal.200)'
     className="h-screen w-screen"
     px={2}
    >
      <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Logo />
            <Heading size={{ base: "sm", md: "md" }}>
              Log in to your account
            </Heading>
          </Stack>
      
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={useColorModeValue('white', 'gray.50')}
          boxShadow={{ base: "none", sm: "md" }}
          className="border-2 border-teal-400 shadow-2xl max-w-sm lg:min-w-full  w-full"
          borderRadius={{ base: "none", sm: "xl" }} 
          rounded={'lg'}
          
          p={4}
        >
          
            <form onSubmit={handleSubmit}>
              <Stack spacing="5">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="userName">User Name</FormLabel>
                    <Input
                      id="userName"
                      type="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </FormControl>
                  <PasswordField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Stack>

                <Stack spacing="6">
                  {error && (
                    <Alert status="error">
                      <AlertIcon />
                      Incorrect credientials
                    </Alert>
                  )}

                  <HeadlessButton 
                  size={'xl'}
                   loading={isSubmitting}
                   loadinglabel="Submitting"
                   type="submit"
                   addButton
                   full
                   
                  >
                  Sign in
                  </HeadlessButton>
                  
                  {/* Other components remain unchanged */}
                </Stack>

                <HStack justify="space-between">
                  <Checkbox defaultChecked>Remember me</Checkbox>
                  <Button variant="text" size="sm">
                    Forgot password?
                  </Button>
                </HStack>
              
              </Stack>
            </form>
            </Box>
          </Stack> 
          
          </Center>  
  );
}
