"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchData, buildQueryString } from "@/lib/api";
import { Brand, Category, Product } from "@/type";
import ProductCard from "@/components/common/products/ProductCard";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Filter,
  X,
  Search,
  SlidersHorizontal,
  Grid3x3,
  List,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Props {
  categories: Category[];
  brands: Brand[];
}

interface ProductsResponse {
  products: Product[];
  total: number;
}

const ShopPageClient = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State management
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  // Get max price from products for slider
  const [maxPrice, setMaxPrice] = useState(1000);

  // Initialize from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const brandParam = searchParams.get("brand");
    const searchParam = searchParams.get("search");
    const minPriceParam = searchParams.get("priceMin");
    const maxPriceParam = searchParams.get("priceMax");
    const sortParam = searchParams.get("sortOrder");

    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    if (brandParam) {
      setSelectedBrands([brandParam]);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    if (minPriceParam && maxPriceParam) {
      setPriceRange([Number(minPriceParam), Number(maxPriceParam)]);
    }
    if (sortParam === "desc" || sortParam === "asc") {
      setSortOrder(sortParam);
    }
  }, [searchParams]);

  // Fetch max price on mount
  useEffect(() => {
    const fetchMaxPrice = async () => {
      try {
        const response = await fetchData<ProductsResponse>("/products?limit=1000");
        if (response.products && response.products.length > 0) {
          const max = Math.max(...response.products.map((p) => p.price));
          setMaxPrice(Math.ceil(max / 10) * 10); // Round up to nearest 10
          setPriceRange([0, Math.ceil(max / 10) * 10]);
        }
      } catch (error) {
        console.error("Error fetching max price:", error);
      }
    };
    fetchMaxPrice();
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = {
        page,
        limit,
        sortOrder,
      };

      if (selectedCategories.length > 0) {
        params.category = selectedCategories[0]; // API supports single category
      }
      if (selectedBrands.length > 0) {
        params.brand = selectedBrands[0]; // API supports single brand
      }
      if (priceRange[0] > 0) {
        params.priceMin = priceRange[0];
      }
      if (priceRange[1] < maxPrice) {
        params.priceMax = priceRange[1];
      }
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      const queryString = buildQueryString(params);
      const response = await fetchData<ProductsResponse>(
        `/products${queryString}`
      );

      setProducts(response.products || []);
      setTotal(response.total || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortOrder, selectedCategories, selectedBrands, priceRange, searchQuery, maxPrice]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories[0]);
    }
    if (selectedBrands.length > 0) {
      params.set("brand", selectedBrands[0]);
    }
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }
    if (priceRange[0] > 0) {
      params.set("priceMin", priceRange[0].toString());
    }
    if (priceRange[1] < maxPrice) {
      params.set("priceMax", priceRange[1].toString());
    }
    if (sortOrder !== "asc") {
      params.set("sortOrder", sortOrder);
    }

    const newUrl = params.toString() ? `/shop?${params.toString()}` : "/shop";
    router.replace(newUrl, { scroll: false });
  }, [selectedCategories, selectedBrands, searchQuery, priceRange, sortOrder, maxPrice, router]);

  // Filter handlers
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    setPage(1);
  };

  const handleBrandToggle = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
    setPage(1);
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, maxPrice]);
    setSearchQuery("");
    setSortOrder("asc");
    setPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  // Pagination
  const totalPages = Math.ceil(total / limit);
  const hasFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice ||
    searchQuery.trim() !== "";

  // Filter sidebar component
  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Search Products</h3>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Categories</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {categories.map((category) => (
            <div key={category._id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category._id}`}
                checked={selectedCategories.includes(category._id)}
                onCheckedChange={() => handleCategoryToggle(category._id)}
              />
              <label
                htmlFor={`category-${category._id}`}
                className="text-sm cursor-pointer flex-1"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Brands</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand._id} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand._id}`}
                checked={selectedBrands.includes(brand._id)}
                onCheckedChange={() => handleBrandToggle(brand._id)}
              />
              <label
                htmlFor={`brand-${brand._id}`}
                className="text-sm cursor-pointer flex-1"
              >
                {brand.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold mb-3">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </h3>
        <Slider
          value={priceRange}
          onValueChange={handlePriceRangeChange}
          min={0}
          max={maxPrice}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>$0</span>
          <span>${maxPrice}</span>
        </div>
      </div>

      {/* Clear Filters */}
      {hasFilters && (
        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="w-full"
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <Container className="py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-4 bg-white dark:bg-card border rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </h2>
            <FilterSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header with Mobile Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Shop</h1>
              <p className="text-sm text-muted-foreground">
                {total} {total === 1 ? "product" : "products"} found
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Mobile Filter Button */}
              <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => {
                setSortOrder(value);
                setPage(1);
              }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Price: Low to High</SelectItem>
                  <SelectItem value="desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="hidden sm:flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map((catId) => {
                const cat = categories.find((c) => c._id === catId);
                return cat ? (
                  <Button
                    key={catId}
                    variant="secondary"
                    size="sm"
                    onClick={() => handleCategoryToggle(catId)}
                  >
                    {cat.name}
                    <X className="h-3 w-3 ml-1" />
                  </Button>
                ) : null;
              })}
              {selectedBrands.map((brandId) => {
                const brand = brands.find((b) => b._id === brandId);
                return brand ? (
                  <Button
                    key={brandId}
                    variant="secondary"
                    size="sm"
                    onClick={() => handleBrandToggle(brandId)}
                  >
                    {brand.name}
                    <X className="h-3 w-3 ml-1" />
                  </Button>
                ) : null;
              })}
            </div>
          )}

          {/* Products Grid/List */}
          {loading ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg font-semibold mb-2">No products found</p>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query
              </p>
              {hasFilters && (
                <Button onClick={handleClearFilters} variant="outline">
                  Clear All Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ShopPageClient;
