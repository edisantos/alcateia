import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import AuthValidator from "@/components/AuthValidator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alcateia",
  description: "Sistema para gestão de barbearia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   // Chama o hook de validação de autenticação
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <AuthValidator />
        <Navbar/>
        <main className="pt-16">
        <h1 className="text-center text-white py-1 bg-blue-700"></h1>
        {children}
        </main>
        <ToastContainer />
               
      </body>
    </html>
  );
}
