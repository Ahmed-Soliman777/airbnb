import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import RegisterModal from "@/modals/RegisterModal";
import LoginModal from "@/modals/LoginModal";
import { Toaster } from "react-hot-toast";
import CreateListingModal from "@/modals/CreateListingModal";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone built with Next.js 16 and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div className="mt-18 lg:mt-24 px-4 md:px-20 py-2">
          {children}
        </div>
        <RegisterModal />
        <LoginModal />
        <Toaster />
        <CreateListingModal />
      </body>
    </html>
  );
}
