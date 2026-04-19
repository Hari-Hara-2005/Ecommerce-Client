import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Hero from './Pages/Hero';
import { Provider } from 'react-redux';
import store from './redux/store';
import ProductPage from './Pages/ProductPages/ProductPage';
import Cart from './Pages/Cart';
import PrivacyPolicy from './Pages/TermsandConditions/Privacypolicy';
import TermsAndConditions from './Pages/TermsandConditions/Termsandconditions';
import ShippingPolicy from './Pages/TermsandConditions/ShippingPolicy';
import ReturnExchangePolicy from './Pages/TermsandConditions/ReturnExchange';
import ReturnProducts from './Pages/TermsandConditions/ReturnProducts';
import ScrollToTop from './Component/ScrolltoTop';
import { HelmetProvider } from 'react-helmet-async';
const App = () => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Hero />} />
            <Route path="/category/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/return-exchange" element={<ReturnExchangePolicy />} />
            <Route path="/return-products" element={<ReturnProducts />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  );
};

export default App; // Make sure to use default export
