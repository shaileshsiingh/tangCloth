import Layout from './components/Layout';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import CategoryBanner from './components/CategoryBanner';
import BrandsSale from './components/BrandsSale';
import PopularProducts from './components/PopularProducts';
import VersatileClothing from './components/VersatileClothing';
import Testimonials from './components/Testimonials';
import FashionBlog from './components/FashionBlog';
import ProductDetails from './components/ProductDetails';
import Contact from './components/Contact';
import Checkout from './components/Checkout';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import SignUpSuccess from './pages/SignupSuccess';
import UserDetails from './pages/UserDetails';
import ProductList from './components/ProductList';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import OrderConfirmation from './pages/OrderConfirmation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderAndReturn from './pages/OrderAndReturn';
import About from './components/About';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/signup-success" element={<SignUpSuccess />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/order" element={<OrderConfirmation />} />
          <Route path="/order-and-return" element={<OrderAndReturn/>} />
          <Route path="/signup-success" element={<SignUpSuccess/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/add-product" element={<AddProduct/>} /> 
          
          <Route path="/404" element={
            <div className="min-h-screen flex items-center justify-center">
              <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            </div>
          } />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <ToastContainer />
      </Layout>
    </CartProvider>
  );
}

export default App;
