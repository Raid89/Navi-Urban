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
