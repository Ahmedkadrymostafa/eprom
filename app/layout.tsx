// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });


// export const metadata: Metadata = {
//   title: "EPROM",
//   description: "",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <head>
          <title>EPROM</title>
          <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ToastContainer position="bottom-right" autoClose={5000} />
          {children}
      </body>
    </html>
  );
}
