import Image from "next/image";
import { Inter } from "next/font/google";
import AppDropdown from "@/components/AppDropdown";
import AppModal from "@/components/AppModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    > 
         <AppModal />
        <AppDropdown /> 
    </main>
  );
}
