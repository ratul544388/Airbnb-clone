import {
  FaCalendarAlt,
  FaCamera,
  FaDumbbell,
  FaFireExtinguisher,
  FaHotTub,
  FaParking,
  FaSwimmingPool,
  FaTv,
  FaWifi,
  FaBaby,
} from "react-icons/fa";
import {
  MdAir,
  MdAlarm,
  MdChairAlt,
  MdDashboard,
  MdDeck,
  MdDry,
  MdEvStation,
  MdFavorite,
  MdFireplace,
  MdFreeBreakfast,
  MdHome,
  MdKitchen,
  MdLocalLaundryService,
  MdMedicalServices,
  MdNaturePeople,
  MdOutdoorGrill,
  MdOutlineWork,
  MdSmokeFree,
} from "react-icons/md";

export const placeholderAvatar = "/placeholder-avatar.webp";

export const CITIES = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Barishal",
] as const;

export const COUNTRIES = [
  "Bangladesh",
  "India",
  "United States",
  "United Arab Emirates",
  "France",
  "Spain",
] as const;

export const COUNTRY_CITY_MAP: Record<string, readonly string[]> = {
  Bangladesh: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Barishal"],
  India: ["Mumbai", "Delhi", "Kolkata", "Bangalore"],
  "United States": ["New York", "Los Angeles", "Chicago"],
  "United Arab Emirates": ["Dubai", "Abu Dhabi"],
  France: ["Paris", "Lyon", "Marseille"],
  Spain: ["Madrid", "Barcelona", "Valencia"],
};

export const AMENITIES_MAP = {
  "Wi-Fi": FaWifi,
  TV: FaTv,
  Kitchen: MdKitchen,
  Washer: MdLocalLaundryService,
  Dryer: MdDry,
  "Air conditioning": MdAir,
  Heating: MdFireplace,
  "Dedicated workspace": MdOutlineWork,
  "Free parking": FaParking,
  "Paid parking": FaParking,
  Pool: FaSwimmingPool,
  "Hot tub": FaHotTub,
  Gym: FaDumbbell,
  "EV charger": MdEvStation,
  Crib: FaBaby,
  "High chair": MdChairAlt,
  Breakfast: MdFreeBreakfast,
  "Indoor fireplace": MdFireplace,
  "Outdoor dining area": MdDeck,
  "BBQ grill": MdOutdoorGrill,
  "Patio or balcony": MdDeck,
  "Garden or backyard": MdNaturePeople,
  "Smoke alarm": MdSmokeFree,
  "Carbon monoxide alarm": MdAlarm,
  "First aid kit": MdMedicalServices,
  "Fire extinguisher": FaFireExtinguisher,
  "Security cameras on property": FaCamera,
} as const;

export const RULES = [
  "No smoking",
  "No pets",
  "No parties or events",
  "Quiet hours after 10 PM",
  "Check-in after 3 PM",
  "Check-out before 11 AM",
  "No unregistered guests",
  "Dispose of garbage properly",
  "Respect neighbors",
  "Turn off lights and AC when not in use",
] as const;

export const PROPERTY_TYPES = [
  "Apartment",
  "House",
  "Condo",
  "Villa",
  "Cabin",
  "Cottage",
  "Bungalow",
  "Loft",
  "Farmhouse",
  "Castle",
  "Treehouse",
  "Tent",
  "Dome",
  "Yurt",
  "Boat",
  "Camper/RV",
  "Hut",
  "Tower",
  "Chalet",
] as const;

export const ROOM_TYPES = [
  "Entire place",
  "Private room",
  "Shared room",
  "Hotel room",
] as const;

export const sidebarItems = [
  {
    label: "Dashboard",
    icon: MdDashboard,
    href: "/dashboard",
  },
  {
    label: "My Properties",
    icon: MdHome,
    href: "/dashboard/my-properties",
  },
  {
    label: "My Bookings",
    icon: FaCalendarAlt,
    href: "/dashboard/my-bookings",
  },
  {
    label: "Wish List",
    icon: MdFavorite,
    href: "/dashboard/wishlist",
  },
];
