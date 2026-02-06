import Container from "@/components/common/Container";
import ProductsList from "@/components/common/products/ProductsList";
import Banner from "@/components/pages/home/Banner";

// Skip static generation - fetch from API at request time (avoids build hang when Render backend is cold)
export const dynamic = "force-dynamic";
import CategoriesSection from "@/components/pages/home/CategoriesSection";
import HomeBrand from "@/components/pages/home/HomeBrand";
import BabyTravelSection from "@/components/pages/home/BabyTravelSection";
import ComfyApparelSection from "@/components/pages/home/ComfyApparelSection";
import FeaturedServicesSection from "@/components/pages/home/FeaturedServicesSection";
import { fetchData } from "@/lib/api";
import { Brand } from "@/type";

export default async function Home() {
  const brands = await fetchData<Brand[]>("/brands");

  return (
    <div>
      <Container className="min-h-screen flex py-7 gap-3">
        <CategoriesSection />
        <div className="flex-1">
          <Banner />
          <ProductsList />
          <HomeBrand brands={brands} />

          <BabyTravelSection />
          <ComfyApparelSection />

          <FeaturedServicesSection />
        </div>
      </Container>
    </div>
  );
}
