import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Search, 
  Truck, 
  Users, 
  Calendar, 
  ArrowRight, 
  Layers, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import { Language, PageView, CityHub } from '../types';
import { getTranslation } from '../data/translations';
import { indiaCityHubs } from '../data/mockData';

interface IndiaMapSectionProps {
  language: Language;
  setCurrentView: (view: PageView) => void;
  onSelectCityForBooking: (cityName: string) => void;
}

export const IndiaMapSection: React.FC<IndiaMapSectionProps> = ({
  language,
  setCurrentView,
  onSelectCityForBooking,
}) => {
  const t = getTranslation(language);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedHub, setSelectedHub] = useState<CityHub | null>(indiaCityHubs[0]);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // Filtered list of cities
  const filteredHubs = indiaCityHubs.filter(hub => {
    const matchesSearch = hub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hub.nameHi.includes(searchTerm) ||
                          hub.state.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (selectedRegion === 'all') return true;
    if (selectedRegion === 'rajasthan') return hub.state === 'Rajasthan';
    if (selectedRegion === 'north') return ['Delhi NCR', 'Haryana', 'Punjab', 'Uttar Pradesh'].includes(hub.state);
    if (selectedRegion === 'west') return ['Gujarat', 'Maharashtra'].includes(hub.state);
    if (selectedRegion === 'central_east') return ['Madhya Pradesh', 'Bihar', 'West Bengal'].includes(hub.state);
    if (selectedRegion === 'south') return ['Karnataka', 'Telangana', 'Tamil Nadu'].includes(hub.state);
    return true;
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [23.5, 78.5], // Center of India
        zoom: 5,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    // Add markers for filtered hubs
    filteredHubs.forEach(hub => {
      const isSelected = selectedHub?.name === hub.name;
      const markerColor = isSelected ? '#ea580c' : '#16a34a';

      const customIcon = L.divIcon({
        className: 'city-hub-marker',
        html: `
          <div style="
            background: ${markerColor};
            color: white;
            padding: 4px 8px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 700;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            border: 2px solid white;
            cursor: pointer;
          ">
            <span>📍</span> ${hub.name}
          </div>
        `,
        iconSize: [80, 26],
        iconAnchor: [40, 13],
      });

      const marker = L.marker([hub.lat, hub.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedHub(hub);
        map.setView([hub.lat, hub.lng], 9, { animate: true });
      });

      markersRef.current[hub.name] = marker;
    });

    if (filteredHubs.length > 0 && selectedRegion !== 'all') {
      const group = L.featureGroup(Object.values(markersRef.current));
      map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  }, [filteredHubs, selectedRegion, selectedHub]);

  const handleCitySelect = (hub: CityHub) => {
    setSelectedHub(hub);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([hub.lat, hub.lng], 9, { animate: true });
    }
  };

  const handleBookFromCity = (cityName: string) => {
    onSelectCityForBooking(cityName);
    setCurrentView('booking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
          {language === 'hi' ? 'अखिल भारतीय कनेक्टिविटी' : 'PAN-INDIA LOGISTICS NETWORK'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {language === 'hi' ? 'पूरे भारत में परिवहन सेवा' : 'Transport Services Across India'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {language === 'hi' 
            ? 'राजस्थान, दिल्ली एनसीआर, हरियाणा, पंजाब, गुजरात, यूपी व सभी प्रमुख राज्यों में 24/7 सक्रिय फ्लीट।' 
            : 'Direct point-to-point freight connectivity across 350+ commercial transport hubs and major highways.'}
        </p>
      </div>

      {/* Region Filter Buttons & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
        {/* Region Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: language === 'hi' ? 'समस्त भारत' : 'All India' },
            { id: 'rajasthan', label: language === 'hi' ? 'राजस्थान' : 'Rajasthan' },
            { id: 'north', label: language === 'hi' ? 'उत्तर भारत' : 'North' },
            { id: 'west', label: language === 'hi' ? 'पश्चिम भारत' : 'West' },
            { id: 'central_east', label: language === 'hi' ? 'मध्य व पूर्व' : 'Central & East' },
            { id: 'south', label: language === 'hi' ? 'दक्षिण भारत' : 'South' },
          ].map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedRegion === r.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* City Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'hi' ? 'शहर या राज्य खोजें...' : 'Search city or state...'}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Main Grid: Interactive Map + Selected Hub Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Interactive Leaflet India Map */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-md overflow-hidden h-[540px] relative">
          <div ref={mapContainerRef} className="w-full h-full relative z-10" />

          {/* Floating map hint */}
          <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md text-white text-[11px] px-3 py-2 rounded-xl border border-slate-700 shadow-lg pointer-events-none">
            {language === 'hi' ? '💡 किसी भी शहर के मार्कर पर क्लिक करके उपलब्धता जांचें' : '💡 Click on any city pin to inspect fleet availability'}
          </div>
        </div>

        {/* Right Column (4 cols): Selected City Details & Hub List */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Hub Card */}
          {selectedHub && (
            <div className="bg-white dark:bg-slate-900 border-2 border-emerald-600/40 dark:border-emerald-500/40 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                    {selectedHub.state} HUB
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {selectedHub.name} ({selectedHub.nameHi})
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700">
                  <p className="font-extrabold text-slate-900 dark:text-white text-base tabular-nums">
                    {selectedHub.availableVehicles}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{language === 'hi' ? 'उपलब्ध वाहन' : 'Vehicles'}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700">
                  <p className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base tabular-nums">
                    {selectedHub.activeDrivers}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{language === 'hi' ? 'सक्रिय ड्राइवर' : 'Drivers'}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700">
                  <p className="font-extrabold text-orange-600 dark:text-orange-400 text-base tabular-nums">
                    {selectedHub.todayBookings}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{language === 'hi' ? 'आज की ट्रिप्स' : 'Bookings'}</p>
                </div>
              </div>

              {/* Status info */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'तत्काल डिस्पैच 25 मिनट में' : 'Instant Dispatch within 25 min'}</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {language === 'hi'
                    ? 'टाटा एस, महिंद्रा पिकअप, एलसीवी व 12-चक्का ट्रक स्टेशन पर तैयार हैं।'
                    : 'Mini trucks, Pickups, LCVs & multi-axle trucks parked at transport nagar.'}
                </p>
              </div>

              {/* Book vehicle CTA */}
              <button
                type="button"
                onClick={() => handleBookFromCity(selectedHub.name)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>{language === 'hi' ? `${selectedHub.name} से वाहन बुक करें` : `Book Vehicle from ${selectedHub.name}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick Hubs List */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {language === 'hi' ? 'शीर्ष सक्रिय केंद्र' : 'Top Active Hubs'} ({filteredHubs.length})
            </h4>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {filteredHubs.slice(0, 10).map(hub => (
                <div
                  key={hub.name}
                  onClick={() => handleCitySelect(hub)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                    selectedHub?.name === hub.name
                      ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{hub.name} ({hub.nameHi})</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium tabular-nums">{hub.availableVehicles} Trucks</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
