import { Heading } from "@chakra-ui/react";

const ProviderNameHeader = ({ name }) => {
    return (
      <Heading color={"orange"} fontWeight={"bold"} size={"md"}>
        {name}
      </Heading>
    );
  };

  export default ProviderNameHeader;