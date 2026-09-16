import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
