import Await from "@/components/await";
import { getProperties } from "@/features/properties/actions";
import { PropertySlider } from "@/features/properties/components/property-slider";
import { PropertySliderSkeleton } from "@/features/properties/skeletons/property-slide-skeketon";
import { Metadata } from "next";
import { Suspense } from "react";

export const generateMetadata = (): Metadata => {
  return {
    title: "Home",
  };
};

const getPropertyByCity = async (city: string) => {
  const properties = await getProperties({ city });
  return properties;
};

const PropertySlidersSkeleton = () => {
  return (
    <div className="space-y-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <PropertySliderSkeleton key={i} />
      ))}
    </div>
  );
};

const HomePage = async () => {
  const propertiesInCities = Promise.all([
    getPropertyByCity("Dhaka"),
    getPropertyByCity("New York"),
  ]);

  return (
    <div className="py-6">
      <Suspense fallback={<PropertySlidersSkeleton />}>
        <Await promise={propertiesInCities}>
          {([propertiesInDhaka, propertiesInNewYork]) => (
            <div className="space-y-8">
              <PropertySlider
                title="Stay in Dhaka"
                properties={propertiesInDhaka}
              />
              <PropertySlider
                title="Discover Stays in New York"
                properties={propertiesInNewYork}
              />
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default HomePage;
