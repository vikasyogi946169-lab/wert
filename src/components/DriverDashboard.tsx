import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  DollarSign, 
  Award, 
  Layers, 
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  Wallet
} from 'lucide-react';
import { Language, BookingRecord } from '../types';
import { getTranslation } from '../data/translations';

interface DriverDashboardProps {
  language: Language;
}

export const DriverDashboard: React.FC<DriverDashboardProps> = ({ language }) => {
  const t = getTranslation(language);

  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [driverTripStatus, setDriverTripStatus] = useState<
    'idle' | 'assigned' | 'started' | 'at_pickup' | 'loaded' | 'delivering' | 'completed'
  >('loaded');

  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number }>({
    lat: 26.9124,
    lng: 75.7873
  });
  const [locating, setLocating] = useState<boolean>(false);
  const [hasPendingRequest, setHasPendingRequest] = useState<boolean>(true);
  const [todayEarnings, setTodayEarnings] = useState<number>(4250);
  const [completedCount, setCompletedCount] = useState<number>(3);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Initialize Driver Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [currentCoords.lat, currentCoords.lng],
        zoom: 12,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      const driverIcon = L.divIcon({
        className: 'driver-truck-icon',
        html: `<div style="background:#16a34a;color:white;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(0,0,0,0.4);border:3px solid white;font-size:18px;">🚚</div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });

      const marker = L.marker([currentCoords.lat, currentCoords.lng], { icon: driverIcon })
        .addTo(map)
        .bindPopup('<b>Your Current Vehicle Location</b><br>Tata Ace (RJ14 AB 1234)');
      markerRef.current = marker;

      mapInstanceRef.current = map;
    }
  }, []);

  const handleUseCurrentLocation = () => {
    setLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newCoords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          setCurrentCoords(newCoords);
          if (mapInstanceRef.current && markerRef.current) {
            markerRef.current.setLatLng([newCoords.lat, newCoords.lng]);
            mapInstanceRef.current.setView([newCoords.lat, newCoords.lng], 13);
          }
          setLocating(false);
        },
        () => {
          // fallback to simulated shift
          const newCoords = { lat: 26.9200, lng: 75.7950 };
          setCurrentCoords(newCoords);
          if (mapInstanceRef.current && markerRef.current) {
            markerRef.current.setLatLng([newCoords.lat, newCoords.lng]);
            mapInstanceRef.current.setView([newCoords.lat, newCoords.lng], 13);
          }
          setLocating(false);
        },
        { timeout: 4000 }
      );
    } else {
      setLocating(false);
    }
  };

  const handleAcceptRequest = () => {
    setHasPendingRequest(false);
    setDriverTripStatus('assigned');
  };

  const handleRejectRequest = () => {
    setHasPendingRequest(false);
  };

  const handleCompleteCurrentTrip = () => {
    setDriverTripStatus('completed');
    setTodayEarnings(prev => prev + 1850);
    setCompletedCount(prev => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Profile & Availability Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-emerald-600/20">
            RK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Rajesh Kumar Sharma
              </h2>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                ⭐ 4.9 Rating
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tata Ace Gold · Plate: <span className="font-bold text-slate-800 dark:text-slate-200">RJ14 AB 1234</span> · Sikar & Jaipur Fleet
            </p>
          </div>
        </div>

        {/* Online / Offline Switch */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-live-pulse' : 'bg-rose-500'}`} />
              <span>{isOnline ? t.online : t.offline}</span>
            </p>
            <p className="text-[11px] text-slate-500">
              {isOnline ? 'Available for new dispatch orders' : 'Currently offline'}
            </p>
          </div>

          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`p-2 rounded-xl text-xs font-bold transition-all ${
              isOnline ? 'bg-emerald-600 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            {isOnline ? 'Go Offline' : 'Go Online'}
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            {t.todayEarnings}
          </span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
            ₹{todayEarnings.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Instant UPI Payout Active</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            {t.completedTrips}
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">
            {completedCount} Trips
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">100% On-time delivery score</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            {t.walletBalance}
          </span>
          <p className="text-2xl font-black text-orange-600 dark:text-orange-400 mt-1 tabular-nums">
            ₹6,420
          </p>
          <button className="text-[10px] font-bold text-emerald-600 hover:underline mt-0.5">
            Withdraw to Bank →
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Platform Commission
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">
            5%
          </p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Zero surge deduction</p>
        </div>
      </div>

      {/* Main Grid: Active Trip & Driver Workflow (6 cols) + Driver GPS Map (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Trip Workflow */}
        <div className="lg:col-span-6 space-y-6">
          {/* New Trip Request Alert (if available) */}
          {hasPendingRequest && isOnline && (
            <div className="bg-orange-50 dark:bg-orange-950/40 border-2 border-orange-500/60 rounded-3xl p-5 shadow-lg space-y-3 animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                  NEW TRIP REQUEST DISPATCH
                </span>
                <span className="text-base font-black text-slate-900 dark:text-white tabular-nums">
                  ₹1,850
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <p className="text-slate-800 dark:text-slate-200">
                  <strong>Pickup:</strong> VKIA Road No. 14, Vishwakarma, Jaipur
                </p>
                <p className="text-slate-800 dark:text-slate-200">
                  <strong>Drop:</strong> Piprali Circle, Sikar (115 KM)
                </p>
                <p className="text-slate-500">
                  <strong>Goods:</strong> Building Hardware & Paints (950 Kg)
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleAcceptRequest}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20"
                >
                  ✓ Accept Ride (स्वीकारें)
                </button>
                <button
                  onClick={handleRejectRequest}
                  className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Decline
                </button>
              </div>
            </div>
          )}

          {/* Current Active Trip Card & Progression Actions */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  CURRENT ACTIVE TRIP
                </span>
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  Booking ID: VS202610001
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold capitalize">
                Status: {driverTripStatus}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Jaipur (VKIA Industrial Hub)</p>
                  <p className="text-slate-500 text-[11px]">Customer: Amit Sharma (9829012345)</p>
                </div>
              </div>
              <div className="w-0.5 h-4 bg-slate-200 dark:bg-slate-700 ml-1"></div>
              <div className="flex items-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">New Delhi (Okhla Phase-III)</p>
                  <p className="text-slate-500 text-[11px]">Distance: 245 KM · Est. Fare: ₹2,450</p>
                </div>
              </div>
            </div>

            {/* Driver Progression Buttons */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {language === 'hi' ? 'ट्रिप स्थिति अपडेट करें:' : 'Update Trip Progress:'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => setDriverTripStatus('started')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                    driverTripStatus === 'started'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  1. {t.startTrip}
                </button>
                <button
                  onClick={() => setDriverTripStatus('at_pickup')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                    driverTripStatus === 'at_pickup'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  2. {t.reachedPickup}
                </button>
                <button
                  onClick={() => setDriverTripStatus('loaded')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                    driverTripStatus === 'loaded'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  3. {t.goodsLoaded}
                </button>
                <button
                  onClick={() => setDriverTripStatus('delivering')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                    driverTripStatus === 'delivering'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  4. {t.inTransit}
                </button>
                <button
                  onClick={handleCompleteCurrentTrip}
                  className="col-span-2 py-2 px-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-md transition-all"
                >
                  5. {language === 'hi' ? 'ट्रिप पूर्ण करें (Complete Trip)' : 'Complete Trip & Collect Fare'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Driver GPS Map & Location Sharing */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {language === 'hi' ? 'ड्राइवर जीपीएस नेविगेशन मैप' : 'Driver GPS Navigation Map'}
                </h3>
                <p className="text-xs text-slate-500">
                  Lat: {currentCoords.lat.toFixed(4)}, Lng: {currentCoords.lng.toFixed(4)}
                </p>
              </div>

              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-1.5"
              >
                <Navigation className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
                <span>{locating ? 'Locating...' : 'Use My GPS'}</span>
              </button>
            </div>

            {/* Map Container */}
            <div className="h-80 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative">
              <div ref={mapContainerRef} className="w-full h-full relative z-10" />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>Highway Toll Pass: Fastag Active</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">GPS Synced</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
