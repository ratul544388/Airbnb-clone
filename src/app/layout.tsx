import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { ImageKitProvider } from "@imagekit/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Airbnb",
    default: "Airbnb Clone - Book Unique Places to Stay & Experiences",
  },
  description:
    "Discover amazing stays and experiences around the world with our Airbnb-inspired platform. Book unique homes, adventures, and more, all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ImageKitProvider urlEndpoint={process.env.IMAGEKIT_URL_ENDPOINT}>
          <Header />
          <Container>{children}</Container>
          <Footer />
          <Toaster />
        </ImageKitProvider>
      </body>
    </html>
  );
}
