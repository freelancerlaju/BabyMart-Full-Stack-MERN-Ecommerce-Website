"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/common/Container";
import { Search as SearchIcon, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/lib/api";
import { Product } from "@/type";
import ProductCard from "@/components/common/products/ProductCard";
import Link from "next/link";

interface ProductsResponse {
  products: Product[];
  total: number;
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [trendingSearches] = useState([
    "Baby Clothes",
    "Diapers",
    "Toys",
    "Feeding Supplies",
    "Strollers",
    "Car Seats",
    "Nursery Furniture",
    "Baby Care",
  ]);

  const handleSearch = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await fetchData<ProductsResponse>(
        `/products?search=${encodeURIComponent(searchTerm)}&limit=20`
      );
      setProducts(response.products || []);
    } catch (error) {
      console.error("Search error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const query = searchParams.get("q") || searchParams.get("search");
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [searchParams, handleSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <Container className="py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <SearchIcon className="h-16 w-16 text-babyshopSky" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Search Products</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find exactly what you&apos;re looking for with our powerful search
          functionality.
        </p>
      </div>

      {/* Search Bar */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-lg"
            />
            <Button type="submit" size="lg">
              <SearchIcon className="h-5 w-5 mr-2" />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Trending Searches */}
      {!searchQuery && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-babyshopSky" />
              <h2 className="text-xl font-semibold">Trending Searches</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => {
                    setSearchQuery(term);
                    handleSearch(term);
                  }}
                >
                  {term}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {searchQuery && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Search Results for &quot;{searchQuery}&quot;
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-48 bg-gray-200 animate-pulse rounded-lg" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-6">
                Found {products.length} {products.length === 1 ? "product" : "products"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              {products.length >= 20 && (
                <div className="text-center mt-8">
                  <Button asChild>
                    <Link href={`/shop?search=${encodeURIComponent(searchQuery)}`}>
                      View All Results
                    </Link>
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-lg font-semibold mb-2">No products found</p>
                <p className="text-muted-foreground mb-4">
                  Try a different search term or browse our{" "}
                  <Link href="/shop" className="text-babyshopSky hover:underline">
                    shop
                  </Link>
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </Container>
  );
}

function SearchPageFallback() {
  return (
    <Container className="py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <SearchIcon className="h-16 w-16 text-babyshopSky animate-pulse" />
        </div>
        <div className="h-10 bg-gray-200 animate-pulse rounded max-w-md mx-auto mb-4" />
        <div className="h-4 bg-gray-200 animate-pulse rounded max-w-2xl mx-auto" />
      </div>
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="h-12 bg-gray-200 animate-pulse rounded" />
        </CardContent>
      </Card>
    </Container>
  );
}

export default function TopSearchesPage() {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchPageContent />
    </Suspense>
  );
}
