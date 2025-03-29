import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 