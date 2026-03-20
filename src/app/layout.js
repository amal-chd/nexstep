import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { AuthProvider } from '@/context/AuthContext';
import "./globals.css";

export const metadata = {
  title: "NexStep Europe | Nursing Ausbildung & Medical Careers in Germany",
  description: "Your premier partner for Nursing Ausbildung and Medical Recruitment in Germany. We provide German language training, document support, and visa processing for international students and healthcare professionals.",
  keywords: "nursing ausbildung germany, study in germany, medical recruitment, nurse placement, german language training, study abroad agency kerala",
  openGraph: {
    title: "NexStep Europe | Step Into Your Future",
    description: "Start your international medical career today with expert guidance on Ausbildung programs and job placements in Germany.",
    url: 'https://nexstepeurope.de',
    siteName: 'NexStep Europe',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
          <Chatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
