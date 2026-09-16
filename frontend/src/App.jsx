import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Academics from './pages/Academics.jsx';
import Teachers from './pages/Teachers.jsx';
import Admission from './pages/Admission.jsx';
import CheckStatus from './pages/CheckStatus.jsx';
import Achievements from './pages/Achievements.jsx';
import Testimonials from './pages/Testimonials.jsx';
import Gallery from './pages/Gallery.jsx';
import News from './pages/News.jsx';
import Contact from './pages/Contact.jsx';
import FAQ from './pages/FAQ.jsx';
import Privacy from './pages/Privacy.jsx';
import AdminLogin from './pages/admin/Login.jsx';
import AdminDashboard from './pages/admin/Dashboard.jsx';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="academics" element={<Academics />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="admission" element={<Admission />} />
          <Route path="check-status" element={<CheckStatus />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="news" element={<News />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}
