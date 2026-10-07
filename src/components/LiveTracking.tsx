import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  Search, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Share2, 
  ShieldAlert, 
  Navigation, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Play, 
  Pause,
  Copy,
  Check
} from 'lucide-react';
import { Language, BookingRecord, TrackingStatus } from '../types';
import { getTranslation } from '../data/translations';
import { initialBookings } from '../data/mockData';

interface LiveTrackingProps {
  language: Language;
  selectedBookingId?: string;
  allBookings: BookingRecord[];
}

export const LiveTracking: React.FC<LiveTrackingProps> = ({
  language,
  selectedBookingId,
  allBookings,
}) => {
  const t = getTranslation(language);
  const [searchId, setSearchId] = useState<string>(selectedBookingId || 'VS202610001');
  const [activeBooking, setActiveBooking] = useState<BookingRecord>(() => {
    return allBookings.find(b => b.id === (selectedBookingId || 'VS202610001')) || initialBookings[0];
  });

  const [copiedLink, setCopiedLink] = useState(false);
  const [isSimulating, setIsSimulating] = useState(true);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const vehicleMarkerRef = useRef<L.Marker | null>(null);
  const animProgressRef = useRef<number>(0.45); // start 45% along route

  // Route coordinates between Jaipur [26.9124, 75.7873] and Delhi [28.6139, 77.2090]
  const routeWaypoints: [number, number][] = [
    [26.9124, 75.7873], // Jaipur
    [27.1700, 75.7200], // Chomu
    [27.4200, 75.9500], // Shahpura
    [27.7029, 76.1989], // Kotputli
    [27.9800, 76.5100], // Behror
    [28.1800, 76.8200], // Dharuhera
    [28.4595, 77.0266], // Gurugram
    [28.6139, 77.2090]  // Delhi
  ];

  // Initialize or update Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [27.7, 76.4],
        zoom: 8,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      // Route Polyline
      const polyline = L.polyline(routeWaypoints, {
        color: '#16a34a',
        weight: 5,
        opacity: 0.8,
        dashArray: '8, 8',
      }).addTo(map);

      // Pickup Marker
      const pickupIcon = L.divIcon({
        className: 'custom-pin-pickup',
        html: `<div style="background:#16a34a;color:white;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 6px rgba(0,0,0,0.3);border:2px solid white;font-size:12px;font-weight:bold;">📍</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
      L.marker(routeWaypoints[0], { icon: pickupIcon })
        .addTo(map)
        .bindPopup(`<b>Pickup:</b> ${activeBooking.pickupCity}`);

      // Drop Marker
      const dropIcon = L.divIcon({
        className: 'custom-pin-drop',
        html: `<div style="background:#ea580c;color:white;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 6px rgba(0,0,0,0.3);border:2px solid white;font-size:12px;font-weight:bold;">🏁</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
      L.marker(routeWaypoints[routeWaypoints.length - 1], { icon: dropIcon })
        .addTo(map)
        .bindPopup(`<b>Destination:</b> ${activeBooking.dropCity}`);

      // Moving Vehicle Marker
      const truckIcon = L.divIcon({
        className: 'custom-pin-truck',
        html: `<div style="background:#0f172a;color:white;padding:5px 8px;border-radius:8px;display:flex;align-items:center;gap:4px;box-shadow:0 4px 10px rgba(0,0,0,0.4);border:2px solid #22c55e;font-size:11px;font-weight:bold;white-space:nowrap;">
                 <span style="font-size:14px;">🚚</span> ${activeBooking.vehicleNumber}
               </div>`,
        iconSize: [110, 30],
        iconAnchor: [55, 15],
      });

      const initialVehiclePos = routeWaypoints[3]; // Kotputli
      const vehicleMarker = L.marker(initialVehiclePos, { icon: truckIcon }).addTo(map);
      vehicleMarkerRef.current = vehicleMarker;

      map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup map on unmount
    };
  }, []);

  // Smooth movement animation simulation along route
  useEffect(() => {
    let animFrame: number;
    let lastTime = performance.now();

    const animateMovement = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isSimulating && vehicleMarkerRef.current) {
        animProgressRef.current += delta * 0.015; // slow realistic highway movement
        if (animProgressRef.current > 0.95) animProgressRef.current = 0.2; // loop for demo

        // Interpolate along waypoints
        const totalSegments = routeWaypoints.length - 1;
        const segmentIndex = Math.min(
          Math.floor(animProgressRef.current * totalSegments),
          totalSegments - 1
        );
        const segmentProgress = (animProgressRef.current * totalSegments) - segmentIndex;

        const p1 = routeWaypoints[segmentIndex];
        const p2 = routeWaypoints[segmentIndex + 1];

        const lat = p1[0] + (p2[0] - p1[0]) * segmentProgress;
        const lng = p1[1] + (p2[1] - p1[1]) * segmentProgress;

        vehicleMarkerRef.current.setLatLng([lat, lng]);
      }

      animFrame = requestAnimationFrame(animateMovement);
    };

    animFrame = requestAnimationFrame(animateMovement);
    return () => cancelAnimationFrame(animFrame);
  }, [isSimulating]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = allBookings.find(b => b.id.toUpperCase() === searchId.trim().toUpperCase());
    if (found) {
      setActiveBooking(found);
    } else {
      alert(language === 'hi' ? 'बुकिंग नहीं मिली! कृपया वैध आईडी दर्ज करें' : 'Booking not found! Please check ID.');
    }
  };

  const handleShareTracking = () => {
    const url = `${window.location.origin}/#tracking?id=${activeBooking.id}`;
    if (navigator.share) {
      navigator.share({
        title: `Vahan Setu Live Tracking: ${activeBooking.id}`,
        text: `Track live transport vehicle ${activeBooking.vehicleNumber} moving towards ${activeBooking.dropCity}`,
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const timelineSteps: { key: TrackingStatus; labelEn: string; labelHi: string }[] = [
    { key: 'booking_confirmed', labelEn: 'Booking Confirmed', labelHi: 'बुकिंग कन्फर्म' },
    { key: 'driver_assigned', labelEn: 'Driver Assigned', labelHi: 'ड्राइवर नियुक्त' },
    { key: 'vehicle_started', labelEn: 'Vehicle On The Way', labelHi: 'गाड़ी रवाना हुई' },
    { key: 'reached_pickup', labelEn: 'Reached Pickup Hub', labelHi: 'पिकअप पर पहुंचे' },
    { key: 'goods_loaded', labelEn: 'Goods Loaded & Sealed', labelHi: 'सामान लोड हुआ' },
    { key: 'in_transit', labelEn: 'In Transit on Highway', labelHi: 'हाईवे पर रास्ते में हैं' },
    { key: 'near_destination', labelEn: 'Near Destination City', labelHi: 'गंतव्य के समीप' },
    { key: 'delivered', labelEn: 'Delivered Successfully', labelHi: 'सफलतापूर्वक डिलीवरी' },
  ];

  // Determine current active step index in timeline
  const currentStepIndex = timelineSteps.findIndex(s => s.key === activeBooking.status);
  const effectiveIndex = currentStepIndex >= 0 ? currentStepIndex : 5; // default to in_transit

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder={t.searchBookingPlaceholder}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm whitespace-nowrap shadow-sm shadow-emerald-600/20"
          >
            {language === 'hi' ? 'गाड़ी ट्रैक करें' : 'Track Booking'}
          </button>
        </form>
      </div>

      {/* Main Grid: Left Details & Right Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Live Vehicle Tracking Card + Driver Card + Timeline */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Tracking Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  {language === 'hi' ? 'लाइव वाहन ट्रैकिंग' : 'LIVE VEHICLE TRACKING'}
                </span>
                <span className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  {activeBooking.vehicleNumber}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-live-pulse"></span>
                <span>LIVE</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <p className="text-slate-400 text-[11px]">{language === 'hi' ? 'वर्तमान स्थान' : 'Current Location'}</p>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">{activeBooking.currentLocationName}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <p className="text-slate-400 text-[11px]">{language === 'hi' ? 'अनुमानित आगमन (ETA)' : 'Est. Arrival'}</p>
                <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 tabular-nums">{activeBooking.eta}</p>
              </div>
            </div>

            {/* Route summary */}
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 mt-1 shrink-0"></span>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{activeBooking.pickupCity}</p>
                  <p className="text-slate-500 text-[11px]">{activeBooking.pickupAddress}</p>
                </div>
              </div>
              <div className="w-0.5 h-4 bg-slate-200 dark:bg-slate-700 ml-1"></div>
              <div className="flex items-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-600 mt-1 shrink-0"></span>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{activeBooking.dropCity}</p>
                  <p className="text-slate-500 text-[11px]">{activeBooking.dropAddress}</p>
                </div>
              </div>
            </div>

            {/* Driver Box */}
            <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{activeBooking.driverName}</p>
                <p className="text-[11px] text-slate-500">
                  {activeBooking.vehicleName} · ⭐ {activeBooking.driverRating}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:+91${activeBooking.driverPhone}`}
                  className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                  title="Call Driver"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Call</span>
                </a>
                <a
                  href={`https://wa.me/91${activeBooking.driverPhone}?text=Hello%20Driver%2C%20regarding%20booking%20${activeBooking.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                  title="WhatsApp Driver"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quick Share & Support */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleShareTracking}
                className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 flex items-center gap-1.5"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied!' : t.shareTracking}</span>
              </button>

              <a
                href="tel:+919461695205"
                className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'सहायता: 9461695205' : 'Helpline Support'}</span>
              </a>
            </div>
          </div>

          {/* Animated Timeline */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-4">
              {language === 'hi' ? 'यात्रा प्रगति स्थिति' : 'Trip Journey Milestones'}
            </h4>
            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {timelineSteps.map((step, idx) => {
                const isCompleted = idx < effectiveIndex;
                const isCurrent = idx === effectiveIndex;
                return (
                  <div key={step.key} className="relative flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span
                        className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 dark:ring-emerald-950 animate-pulse'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isCompleted ? '✓' : isCurrent ? '●' : '○'}
                      </span>
                      <span
                        className={`font-semibold ${
                          isCurrent
                            ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                            : isCompleted
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-400'
                        }`}
                      >
                        {language === 'hi' ? step.labelHi : step.labelEn}
                      </span>
                    </div>
                    {isCurrent && (
                      <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Leaflet Interactive Live Tracking Map */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md overflow-hidden flex flex-col h-[580px]">
            {/* Map Header Controls */}
            <div className="p-3 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {activeBooking.pickupCity} → {activeBooking.dropCity} (NH48 Highway Route)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSimulating(!isSimulating)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold flex items-center gap-1.5 hover:bg-slate-50"
              >
                {isSimulating ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
                <span>{isSimulating ? 'Pause GPS' : 'Resume GPS'}</span>
              </button>
            </div>

            {/* Map Canvas */}
            <div ref={mapContainerRef} className="flex-1 w-full relative z-10" />

            {/* Bottom Map Info Footer */}
            <div className="p-3 bg-slate-900 text-slate-300 text-xs flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Simulated live GPS route on OpenStreetMap</span>
              </span>
              <span className="text-emerald-400 font-semibold">
                Speed: 52 km/h · Kotputli Toll Plaza Cleared
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
