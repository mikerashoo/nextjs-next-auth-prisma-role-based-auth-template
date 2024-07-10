import { HStack, Heading } from "@chakra-ui/react";
import React from "react";

interface LogoProps  {
  large?: boolean | null
}
function Logo({large} : LogoProps) {
  return (
    <HStack align={"center"} justify={"center"} w={"full"} rounded={'lg'} px={2}>
      <LogoIcon large={large}/>
      <LogoHeader large={large} />
    </HStack>
  );
}

export function LogoIcon({large} : LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img width={large ? 75 : 30} height={large ? 75 : 30}  src={"/assets/imgs/logo.png"} alt="Logo" />
  );
}

export function LogoHeader({large} : LogoProps) {
  return (
    <h1 className={`flex flex-nowrap text-wrap font-extrabold text-2xl ${large ? 'text-5xl text-shadow-md' : ''}`}>
      <span className="text-teal-600">Getway </span><span className="text-red-600">Games</span>{" "}
    </h1>
  );
}

export default Logo;
