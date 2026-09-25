import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { LocationModal } from './components/ui/LocationModal';
import { ToastContainer } from './components/ui/Toast';
import { ScrollToTop } from './components/common/ScrollToTop';
import { CinematicIntro } from './components/common/CinematicIntro';
import { PageTransition } from './components/common/PageTransition';

// Pages
import { Home } from './pages/Home';
import { ProductDetails } from './pages/ProductDetails';
import { Stores } from './pages/Stores';
import { StoreDetails } from './pages/StoreDetails';
import { Categories } from './pages/Categories';
import { CategoryProducts } from './pages/CategoryProducts';
import { SearchPage } from './pages/SearchPage';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { OrderTracking } from './pages/OrderTracking';
import { Returns } from './pages/Returns';
import { Account } from './pages/Account';
import { Support } from './pages/Support';
import { Auth } from './pages/Auth';
import { Offers } from './pages/Offers';
import { TrendingPage } from './pages/TrendingPage';
import { NewArrivalsPage } from './pages/NewArrivalsPage';

const AppContent: React.FC = () => {
  const location = useLocation();
  const { showCinematicIntro, dismissCinematicIntro } = useApp();

  return (
    <>
      {/* Cinematic Welcome Intro - 5s minimum display before auto-entry or on-demand replay */}
      {showCinematicIntro && (
        <CinematicIntro onComplete={dismissCinematicIntro} minDurationSeconds={5} />
      )}

      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#F5F0E6] font-sans text-[#191919] selection:bg-[#E8ECFF] selection:text-[#243FBA]">
        {/* Main Top Header */}
        <Header />

        {/* Core Route Viewports with Smooth Page Transitions */}
        <main className="flex-grow pb-16 md:pb-0">
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/store/:id" element={<StoreDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:slug" element={<CategoryProducts />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders/confirmation/:id" element={<OrderConfirmation />} />
              <Route path="/orders/track" element={<OrderTracking />} />
              <Route path="/orders" element={<Account />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/account" element={<Account />} />
              <Route path="/support" element={<Support />} />
              <Route path="/support/ticket/new" element={<Support />} />
              <Route path="/auth/login" element={<Auth />} />
              <Route path="/auth/signup" element={<Auth />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="/new-arrivals" element={<NewArrivalsPage />} />
              {/* Fallback to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </PageTransition>
        </main>

        {/* Desktop & Mobile Footers */}
        <Footer />

        {/* Fixed Mobile Bottom Navigation Bar */}
        <MobileBottomNav />

        {/* Global Modals & Toasts */}
        <LocationModal />
        <ToastContainer />
      </div>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
