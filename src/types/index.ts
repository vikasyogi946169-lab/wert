export type Language = 'hi' | 'en';
export type Theme = 'light' | 'dark';
export type FontStyle = 'regular' | 'italic';

export type PageView =
  | 'home'
  | 'services'
  | 'vehicles'
  | 'booking'
  | 'tracking'
  | 'locations'
  | 'pricing'
  | 'offers'
  | 'drivers'
  | 'driver-dashboard'
  | 'customer-dashboard'
  | 'admin-dashboard'
  | 'about'
  | 'safety'
  | 'how-it-works'
  | 'partner'
  | 'contact'
  | 'faq';

export interface VehicleOption {
  id: string;
  nameEn: string;
  nameHi: string;
  category: 'mini' | 'pickup' | 'tempo' | 'lcv' | 'heavy' | 'container';
  capacity: string;
  dimensions: string;
  suitableForEn: string;
  suitableForHi: string;
  baseFare: number;
  perKmRate: number;
  image: string;
  popular?: boolean;
}

export interface CityHub {
  name: string;
  nameHi: string;
  state: string;
  lat: number;
  lng: number;
  availableVehicles: number;
  activeDrivers: number;
  todayBookings: number;
}

export type TrackingStatus =
  | 'booking_confirmed'
  | 'driver_assigned'
  | 'vehicle_started'
  | 'reached_pickup'
  | 'goods_loaded'
  | 'in_transit'
  | 'near_destination'
  | 'delivered';

export interface BookingRecord {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupState: string;
  pickupCity: string;
  pickupAddress: string;
  dropState: string;
  dropCity: string;
  dropAddress: string;
  vehicleId: string;
  vehicleName: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  driverRating: number;
  goodsType: string;
  weightKg: number;
  distanceKm: number;
  estimatedFare: number;
  bookingDate: string;
  bookingTime: string;
  status: TrackingStatus;
  statusTextEn: string;
  statusTextHi: string;
  currentLocationName: string;
  currentCoords: [number, number];
  pickupCoords: [number, number];
  dropCoords: [number, number];
  eta: string;
  specialInstructions?: string;
  paymentMethod: string;
}

export interface DriverApplication {
  id: string;
  fullName: string;
  fatherName?: string;
  mobile: string;
  altMobile?: string;
  email?: string;
  dob?: string;
  city: string;
  state: string;
  pinCode: string;
  licenseNumber: string;
  licenseHolderName: string;
  licenseCategory: string;
  licenseExpiry: string;
  vehicleType: string;
  vehicleNumber: string;
  vehicleModel: string;
  vehicleYear: string;
  rcNumber: string;
  experienceYears: string;
  routes: string[];
  bankAccount?: string;
  bankIfsc?: string;
  upiId?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  hasLicenseDoc?: boolean;
  hasRcDoc?: boolean;
}

export interface DriverEnquiry {
  id: string;
  name: string;
  mobile: string;
  city: string;
  vehicleType: string;
  vehicleNumber: string;
  experience: string;
  message: string;
  submittedAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'flat' | 'percentage';
  discountValue: number;
  minAmount: number;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
}
