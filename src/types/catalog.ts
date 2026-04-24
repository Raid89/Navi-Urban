export interface PromotionItem {
  id?: string;
  title: string;
  description: string;
  redirect: string;
}

export interface ProductSizeItem {
  size: string;
  available: boolean;
}

export interface ProductImageItem {
  url: string;
  publicId: string;
  color?: string;
}

export interface ProductColorItem {
  name: string;
  hex: string;
}

export type ProductImageValue = string | ProductImageItem;
export type ProductColorValue = string | ProductColorItem;

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  currency: 'MXN';
  tag: string;
  isPromotion: boolean;
  visible: boolean;
  colors?: ProductColorValue[];
  images: ProductImageValue[];
  sizes: ProductSizeItem[];
}

export type OrderStatus = 'Tomado' | 'Enviado' | 'Entregado';

export interface OrderCustomerInfo {
  name: string;
  document: string;
  address: string;
  city: string;
  phone: string;
}

export interface OrderItem {
  id?: string;
  productId: string;
  productName: string;
  color: string;
  size: string;
  price: number;
  currency: 'MXN';
  status: OrderStatus;
  customer: OrderCustomerInfo;
  createdAt?: string;
  updatedAt?: string;
}
