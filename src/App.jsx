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
import { WishlistProvider } from './context/WishlistContext';
import OurFounder from './pages/OurFounder';
import OurMission from './pages/OurMission';
import ProductConditionGuidelines from './pages/ProductConditionGuidelines';
import TermsAndConditions from './pages/TermsAndConditions';
import Authenticity from './pages/Authenticity';
import ShippingAndDelivery from './pages/ShippingAndDelivery';
import PrivacyPolicy from './pages/PrivacyPolicy';
import WhyTangerineLuxury from './pages/WhyTangerineLuxury';
import BioCleaning from './pages/Bio-Cleaning';
import PrivateViewing from './pages/Private-Viewing';
import OrderDetails from './pages/OrderDetails';
import SellWithUs from './pages/SellWithUs'
import OrderPolicyPage from './pages/OrderPolicyPage'
import TLElite from './pages/TLElite'
import Layway from './pages/Layway'
import Authentication from './pages/Authentication';
import ProductRequestForm from './components/ProductRequestForm';
import AbandonedCartReminder from './components/AbandonedCartReminder';



function App() {
  return (
    <CartProvider>
      <WishlistProvider>
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
          <Route path="/our-founder" element={<OurFounder />} />
          <Route path="/our-mission" element={<OurMission />} />
          <Route path="/authenticity" element={<Authenticity />} />
          <Route path="/product-condition-guidelines" element={<ProductConditionGuidelines />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shipping-and-delivery" element={<ShippingAndDelivery />} />
          <Route path="/why-tangerine-luxury" element={<WhyTangerineLuxury />} />
          <Route path="/bio-cleaning" element={<BioCleaning />} />
          <Route path="/private-viewing" element={<PrivateViewing />} />
          <Route path="/order-details/:orderId " element={<OrderDetails />} />
          <Route path="/sell-with-us" element={<SellWithUs />} />
          <Route path="/order-policy" element={<OrderPolicyPage />} />
          <Route path="/tl-elite" element={<TLElite />} />
          <Route path="/layaway" element={<Layway />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/request-product" element={<ProductRequestForm />} />






          <Route path="/404" element={
            <div className="min-h-screen flex items-center justify-center">
              <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            </div>
          } />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <ToastContainer />
        <AbandonedCartReminder />
      </Layout>
      </WishlistProvider>

    </CartProvider>
  );
}

export default App;
