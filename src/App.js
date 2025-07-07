import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Hero from './Pages/Hero';
import { About } from './Pages/About';
import { Contact } from './Pages/Contact-Us';
import { Provider } from 'react-redux';
import store from './redux/store';
import ProductPage from './Pages/ProductPages/ProductPage';
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/category/:slug" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App; // Make sure to use default export
