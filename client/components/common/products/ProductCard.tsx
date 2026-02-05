import { Product } from "@/type";
import Image from "next/image";
import React, { memo } from "react";
import PriceContainer from "../PriceContainer";
import Link from "next/link";
import DiscountBadge from "../DiscountBadge";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group w-full relative bg-white rounded-lg border border-gray-200/60 shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] hover:border-gray-300 transition-all duration-300 ease-in-out overflow-hidden">
      <Link
        href={`/product/${product?._id}`}
        className="block overflow-hidden relative"
      >
        <div className="w-full h-52 md:h-64 bg-gray-50/50 flex items-center justify-center p-4 relative overflow-hidden">
          <Image
            src={product?.image}
            width={500}
            height={500}
            alt={product?.name || "product image"}
            className="w-full h-full object-contain group-hover:scale-[1.05] transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:from-black/5 group-hover:via-black/0 group-hover:to-black/0 transition-all duration-300"></div>
        </div>
        <DiscountBadge
          discountPercentage={product?.discountPercentage}
          className="absolute top-4 left-4 z-10"
        />
      </Link>

      {/* Wishlist Button */}
      <div className="absolute top-4 right-4 z-10">
        <WishlistButton 
          product={product} 
          className="bg-white/90 backdrop-blur-sm border border-gray-200/80 shadow-sm hover:shadow-md hover:bg-white transition-all duration-200" 
        />
      </div>

      <div className="p-5 space-y-3">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {product?.category?.name}
          </p>
          <h3 className="line-clamp-2 text-base font-semibold text-gray-900 leading-snug group-hover:text-babyshopSky transition-colors duration-200">
            {product?.name}
          </h3>
        </div>
        
        <PriceContainer
          price={product?.price}
          discountPercentage={product?.discountPercentage}
        />
        
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default memo(ProductCard);
