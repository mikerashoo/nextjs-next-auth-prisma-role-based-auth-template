import { PasswordField } from "@/components/auth/PasswordInput";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
export default function SignIn() {
  const [isSubbitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Inside your SignIn component
  const { query } = useRouter();
  const router = useRouter();
  const dynamicCallbackUrl = query.callbackUrl || "/";
  // Inside your component
  const handleSubmit = async (e) => {
    setError(false);
    setIsSubmitting(true);

    e.preventDefault(); // Prevent default form submission behavior
    console.log("Password", password);
    const result = await signIn("credentials", {
      redirect: false, // Prevent NextAuth from redirecting internally
      userName,
      password,
    });

    if (!result.error) {
      
      router.replace(dynamicCallbackUrl.toString());
      setError(false);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      setError(true);
      // Handle errors, such as showing an alert or setting an error state
      console.error("crediential error", result.error);
    }
  };
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          {/* <Logo /> */}
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Log in to your account
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <form onSubmit={handleSubmit}>
              <Stack spacing="5">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="userName">Phone Number/Email</FormLabel>
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
                  <Button
                    isLoading={isSubbitting}
                    loadingText="Submitting"
                    type="submit"
                  >
                    Sign in
                  </Button>
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
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
