export type GenderMode = 'women' | 'men';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  gender?: 'women' | 'men' | 'all';
  itemCount?: number;
}

export interface ProductVariantColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  storeId: string;
  storeName: string;
  distanceKm: number;
  deliveryMin: number;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  rating: number;
  ratingCount: number;
  images: string[];
  description: string;
  details: string[];
  care: string[];
  sizes: string[];
  colors: ProductVariantColor[];
  inStock: boolean;
  stockCount: number;
  gender: 'women' | 'men' | 'unisex';
  categorySlug: string;
  isTrending?: boolean;
  isNewArrival?: boolean;
  isBestOffer?: boolean;
}

export interface Store {
  id: string;
  name: string;
  image: string;
  avatar: string;
  distanceKm: number;
  deliveryMin: number;
  rating: number;
  reviewsCount: number;
  tagLine: string;
  promotion?: string;
  address: string;
  categories: string[];
  isOpen: boolean;
  openingHours: string;
}

export interface CartItem {
  id: string; // unique combo of product.id + size + color
  product: Product;
  selectedSize: string;
  selectedColor: ProductVariantColor;
  quantity: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine: string;
  area: string;
  city: string;
  pincode: string;
  type: 'Home' | 'Work' | 'Other';
  isDefault: boolean;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount: number;
  minOrder: number;
  description: string;
}

export interface DeliveryTimelineStep {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface DeliveryPartner {
  name: string;
  phone: string;
  rating: number;
  photo: string;
  vehicle: string;
  vehicleNumber: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  itemTotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  finalAmount: number;
  status: 'confirmed' | 'packing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  address: Address;
  paymentMethod: string;
  estimatedDeliveryTime: string;
  deliveryPartner: DeliveryPartner;
  timeline: DeliveryTimelineStep[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
  sizeBought?: string;
}

export interface SupportTicketMessage {
  id: string;
  sender: 'customer' | 'support';
  message: string;
  time: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  updatedAt: string;
  messages: SupportTicketMessage[];
}
