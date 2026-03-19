import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import "./globals.css";

export const metadata = {
  title: "NexStep Europe | Step Into Your Future",
  description: "End-to-end guidance for studying abroad. Book a free consultation for expert career counselling, university shortlisting, and visa assistance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
