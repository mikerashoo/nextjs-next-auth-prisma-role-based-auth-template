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
export default function SignUp() {
  const [isSubbitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Inside your SignIn component
  const { query } = useRouter();
  const router = useRouter();
  const dynamicCallbackUrl = query.callbackUrl || "/";
  // Inside your component

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true); 

    // Call your sign-up API
    try {
      const signUpResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phoneNumber, email, password }), // Adjust according to your API requirements
      });

      if (!signUpResponse.ok) {
        // The API call was not successful, let's read the error message
        try {
          const errorBody = await signUpResponse.json();
          console.error("Sign-up failed:", errorBody.error);

          // Use the error message from the response here
          // For example, set it in state to display in the UI
          setError(errorBody.error);
        } catch (e) {
          // This catch block handles cases where the error response cannot be parsed
          console.error("Failed to parse the error response:", e);
          setError("An unexpected error occurred.");
        }
      } else {
        // If sign-up was successful, attempt to log in automatically
        const result = await signIn("credentials", {
          redirect: false,
          userName: phoneNumber,
          password,
        });

        if (!result.error) {
          // Redirect to the specified callback URL or default URL on successful login
          router.replace(dynamicCallbackUrl.toString());
        } else {
          // Handle login errors here
          console.error("Login error after sign-up", result.error);
          setError("Something went wrong please try again"); // Show an appropriate error message
        }
      }
    } catch (error) {
      console.error("Sign-up error", error);
      setIsSubmitting(false);

      setError("Something went wrong please try again"); // Adjust this to show a meaningful error message
    } finally {
      setIsSubmitting(false); 
    }
  };

  console.log("Eror", error);

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
              Create A New Account
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
                  <FormControl isRequired>
                    <FormLabel htmlFor="fullName">Full Name</FormLabel>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="Email">Email</FormLabel>
                    <Input
                      id="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <PasswordField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Stack>

                <Stack spacing="6">
                  {error != null && (
                    <Alert status="error">
                      <AlertIcon />
                      {error}
                    </Alert>
                  )}
                  <Button
                    isLoading={isSubbitting}
                    loadingText="Submitting"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                  {/* Other components remain unchanged */}
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
