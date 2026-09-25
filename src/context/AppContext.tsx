import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Address, Coupon, Order, GenderMode, SupportTicket } from '../types';
import { PRODUCTS, INITIAL_ADDRESSES, INITIAL_ORDER, INITIAL_TICKETS, COUPONS } from '../data/mockData';

interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  genderMode: GenderMode;
  setGenderMode: (mode: GenderMode) => void;
  accentColor: string; // '#7C3AED' for women, '#2563EB' for men
  accentBgLight: string;
  
  // Location
  currentLocation: string;
  setCurrentLocation: (loc: string) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: { name: string; hex: string }, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartDeliveryFee: number;
  cartFinalTotal: number;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Addresses
  addresses: Address[];
  selectedAddress: Address;
  setSelectedAddressId: (id: string) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  
  // Coupons
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Orders
  orders: Order[];
  createOrder: (paymentMethod: string) => Order;
  cancelOrder: (orderId: string) => void;
  
  // Support Tickets
  tickets: SupportTicket[];
  createTicket: (subject: string, category: string, initialMessage: string) => SupportTicket;
  addTicketReply: (ticketId: string, message: string) => void;
  
  // Global Toast
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Quick Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cinematic Intro
  showCinematicIntro: boolean;
  replayCinematicIntro: () => void;
  dismissCinematicIntro: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [genderMode, setGenderMode] = useState<GenderMode>('women');
  const [currentLocation, setCurrentLocation] = useState('Indiranagar, Bengaluru');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('wearnear_cart');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      // fallback
    }
    return [
      {
        id: `${PRODUCTS[0].id}-M-${PRODUCTS[0].colors[0].name}`,
        product: PRODUCTS[0],
        selectedSize: 'M',
        selectedColor: PRODUCTS[0].colors[0],
        quantity: 1
      }
    ];
  });
  
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('wearnear_wishlist');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      // fallback
    }
    return [PRODUCTS[1].id, PRODUCTS[3].id];
  });

  // Persist cart to localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('wearnear_cart', JSON.stringify(cart));
      }
    } catch (e) {
      // ignore
    }
  }, [cart]);

  // Persist wishlist to localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('wearnear_wishlist', JSON.stringify(wishlist));
      }
    } catch (e) {
      // ignore
    }
  }, [wishlist]);
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(INITIAL_ADDRESSES[0].id);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(COUPONS[0]);
  const [orders, setOrders] = useState<Order[]>([INITIAL_ORDER]);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Cinematic Intro state - defaults to true on initial session entry
  const [showCinematicIntro, setShowCinematicIntro] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return !window.sessionStorage.getItem('wearnear_intro_seen');
      }
    } catch (e) {
      // fallback
    }
    return true;
  });

  const dismissCinematicIntro = () => {
    setShowCinematicIntro(false);
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem('wearnear_intro_seen', 'true');
      }
    } catch (e) {
      // ignore
    }
  };

  const replayCinematicIntro = () => {
    setShowCinematicIntro(true);
  };

  // Exact Brand Colors: Primary Blue #243FBA with Light Blue #E8ECFF
  const accentColor = '#243FBA';
  const accentBgLight = '#E8ECFF';

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (
    product: Product,
    size?: string,
    color?: { name: string; hex: string },
    quantity: number = 1
  ) => {
    if (!product.inStock || product.stockCount <= 0) {
      showToast(`Sorry, "${product.name}" is currently out of stock.`, 'error');
      return;
    }

    const chosenSize = size || product.sizes[0] || 'Standard';
    const chosenColor = color || product.colors[0] || { name: 'Default', hex: '#191919' };
    const itemId = `${product.id}-${chosenSize}-${chosenColor.name}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      const currentQty = existing ? existing.quantity : 0;
      if (currentQty + quantity > product.stockCount) {
        showToast(`Cannot add more: only ${product.stockCount} available in boutique stock.`, 'error');
        return prev;
      }
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity
        }
      ];
    });

    showToast(`Added "${product.name}" to cart!`, 'success');
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) => {
      const target = prev.find((item) => item.id === itemId);
      if (target && quantity > target.product.stockCount) {
        showToast(`Maximum available stock (${target.product.stockCount}) reached.`, 'error');
        return prev;
      }
      return prev.map((item) => (item.id === itemId ? { ...item, quantity } : item));
    });
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Removed from wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Added to wishlist!`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const rawDeliveryFee = cartSubtotal > 799 || cartSubtotal === 0 ? 0 : 49;
  
  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.code === 'FASTFREE') {
      discountAmount = rawDeliveryFee;
    } else {
      discountAmount = Math.min(
        Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100),
        appliedCoupon.maxDiscount
      );
    }
  }

  const cartDeliveryFee = appliedCoupon?.code === 'FASTFREE' ? 0 : rawDeliveryFee;
  const cartDiscount = discountAmount;
  const cartFinalTotal = Math.max(0, cartSubtotal + cartDeliveryFee - cartDiscount);

  const applyCoupon = (code: string) => {
    const found = COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try WEAR50 or FASTFREE.' };
    }
    if (cartSubtotal < found.minOrder) {
      return {
        success: false,
        message: `Min order value of ₹${found.minOrder} required for ${found.code}.`
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied!`, 'success');
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const selectedAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0] || INITIAL_ADDRESSES[0];

  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    const id = `addr-${Date.now()}`;
    const fullAddress: Address = { ...newAddr, id };
    setAddresses((prev) => [fullAddress, ...prev]);
    setSelectedAddressId(id);
    showToast('Address saved successfully!', 'success');
  };

  const createOrder = (paymentMethod: string): Order => {
    const newOrderNumber = `WN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}, ${timeString}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      date: dateString,
      items: [...cart],
      itemTotal: cartSubtotal,
      deliveryFee: cartDeliveryFee,
      discount: cartDiscount,
      tax: Math.round(cartSubtotal * 0.05),
      finalAmount: cartFinalTotal,
      status: 'confirmed',
      address: selectedAddress,
      paymentMethod,
      estimatedDeliveryTime: 'In 28 mins',
      deliveryPartner: {
        name: 'Ramesh Kumar',
        phone: '+91 98451 90234',
        rating: 4.9,
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&auto=format&fit=crop',
        vehicle: 'Electric Delivery Scooter',
        vehicleNumber: 'KA 03 EN 4421'
      },
      timeline: [
        {
          title: 'Order Confirmed',
          description: 'Local boutique received order',
          timestamp: timeString,
          completed: true,
          current: true
        },
        {
          title: 'Packing at Boutique',
          description: 'Packaging authentic garment',
          timestamp: 'Expected in 5 mins',
          completed: false,
          current: false
        },
        {
          title: 'Delivery Partner Assigned',
          description: 'Ramesh Kumar is moving to the store',
          timestamp: 'Expected in 10 mins',
          completed: false,
          current: false
        },
        {
          title: 'Out for Doorstep Delivery',
          description: 'Speedy local transit',
          timestamp: 'Expected in 20 mins',
          completed: false,
          current: false
        },
        {
          title: 'Delivered',
          description: 'Delivered to your hands',
          timestamp: 'Estimated 28 mins',
          completed: false,
          current: false
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: 'cancelled' } : ord))
    );
    showToast('Order cancelled. Refund initiated to source.', 'info');
  };

  const createTicket = (subject: string, category: string, initialMessage: string): SupportTicket => {
    const newTkt: SupportTicket = {
      id: `tkt-${Date.now()}`,
      ticketNumber: `WN-SUPP-${Math.floor(100 + Math.random() * 900)}`,
      subject,
      category,
      status: 'Open',
      priority: 'High',
      createdAt: 'Just now',
      updatedAt: 'Just now',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'customer',
          message: initialMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    setTickets((prev) => [newTkt, ...prev]);
    showToast('Support ticket created! A specialist will reply shortly.', 'success');
    return newTkt;
  };

  const addTicketReply = (ticketId: string, message: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTickets((prev) =>
      prev.map((tkt) => {
        if (tkt.id === ticketId) {
          const updated = {
            ...tkt,
            updatedAt: 'Just now',
            messages: [
              ...tkt.messages,
              { id: `msg-${Date.now()}`, sender: 'customer' as const, message, time }
            ]
          };
          // Simulate auto-support acknowledgment in 1.5s
          setTimeout(() => {
            setTickets((inner) =>
              inner.map((t) =>
                t.id === ticketId
                  ? {
                      ...t,
                      messages: [
                        ...t.messages,
                        {
                          id: `msg-rep-${Date.now()}`,
                          sender: 'support' as const,
                          message: `Thank you for the update! Our local hypercare executive is coordinating with the local merchant right now.`,
                          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                      ]
                    }
                  : t
              )
            );
          }, 1500);
          return updated;
        }
        return tkt;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        genderMode,
        setGenderMode,
        accentColor,
        accentBgLight,
        currentLocation,
        setCurrentLocation,
        isLocationModalOpen,
        setIsLocationModalOpen,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartDeliveryFee,
        cartFinalTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        addresses,
        selectedAddress,
        setSelectedAddressId,
        addAddress,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        orders,
        createOrder,
        cancelOrder,
        tickets,
        createTicket,
        addTicketReply,
        toasts,
        showToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        showCinematicIntro,
        replayCinematicIntro,
        dismissCinematicIntro
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
