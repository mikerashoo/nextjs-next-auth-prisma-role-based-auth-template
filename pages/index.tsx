import Image from "next/image";
import { Inter } from "next/font/google";
import ProviderHomeCashReport from "@/components/provider-components/home/ProviderHomeCashReport";
import { PageLayout } from "@/components/layout/PageLayout";
import { Heading } from "@chakra-ui/react";
import ProviderHomePageHeader from "@/components/provider-components/home/ProviderHomePageHeader";
import HomePage from "@/components/provider-components/home/HomePage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <HomePage />
  );
}
