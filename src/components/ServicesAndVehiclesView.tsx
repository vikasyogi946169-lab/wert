import React, { useState } from 'react';
import { 
  Truck, 
  Package, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Box, 
  Home, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2,
  Phone
} from 'lucide-react';
import { Language, PageView } from '../types';
import { getTranslation } from '../data/translations';
import { vehiclesList, servicesList } from '../data/mockData';

interface ServicesAndVehiclesViewProps {
  language: Language;
  setCurrentView: (view: PageView) => void;
  onSelectVehicleForBooking: (vehicleId: string) => void;
}

export const ServicesAndVehiclesView: React.FC<ServicesAndVehiclesViewProps> = ({
  language,
  setCurrentView,
  onSelectVehicleForBooking,
}) => {
  const t = getTranslation(language);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredVehicles = vehiclesList.filter(v => {
    if (activeCategory === 'all') return true;
    return v.category === activeCategory;
  });

  const handleBookVehicle = (vId: string) => {
    onSelectVehicleForBooking(vId);
    setCurrentView('booking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
          {language === 'hi' ? 'परिवहन सेवाएं एवं फ्लीट' : 'TRANSPORT SERVICES & FLEET'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {language === 'hi' ? 'हर प्रकार के माल परिवहन की संपूर्ण व्यवस्था' : 'India-Wide Transport & Logistics Services'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {language === 'hi'
            ? 'स्थानीय पार्सल डिलीवरी से लेकर अंतरराज्यीय भारी कंटेनर कार्गो तक - सत्यापित वाहन और पारदर्शी दरें।'
            : 'From local small commercial deliveries to interstate multi-axle heavy trailers with live tracking.'}
        </p>
      </div>

      {/* Services Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          {language === 'hi' ? 'हमारी प्रमुख लॉजिस्टिक्स सेवाएं' : 'Core Logistics Solutions'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((svc) => (
            <div
              key={svc.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {language === 'hi' ? svc.titleHi : svc.titleEn}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {language === 'hi' ? svc.descHi : svc.descEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Starting from</span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {svc.startingPrice}
                  </span>
                </div>
                <button
                  onClick={() => setCurrentView('booking')}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  {language === 'hi' ? 'बुक करें' : 'Book'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicle Fleet Selection Section */}
      <div className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              {language === 'hi' ? 'वाहन फ्लीट गाइड' : 'Available Fleet Vehicles'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'hi' ? 'वजन और क्षमता के अनुसार सही गाड़ी का चयन करें' : 'Inspect vehicle dimensions, tonnage and per-kilometer rates'}
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Fleet' },
              { id: 'mini', label: 'Mini Trucks' },
              { id: 'pickup', label: 'Pickups' },
              { id: 'tempo', label: 'Tempos' },
              { id: 'heavy', label: 'Heavy Trucks' },
              { id: 'container', label: 'Containers' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.nameEn}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {vehicle.capacity}
                  </div>
                  {vehicle.popular && (
                    <div className="absolute top-3 right-3 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                      Popular
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-black text-lg text-slate-900 dark:text-white">
                      {language === 'hi' ? vehicle.nameHi : vehicle.nameEn}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Dimensions: {vehicle.dimensions}
                    </p>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">SUITABLE FOR</span>
                    <p className="text-slate-700 dark:text-slate-300">
                      {language === 'hi' ? vehicle.suitableForHi : vehicle.suitableForEn}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      ₹{vehicle.baseFare} Base
                    </p>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">
                      + ₹{vehicle.perKmRate} / KM
                    </p>
                  </div>

                  <button
                    onClick={() => handleBookVehicle(vehicle.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <span>{language === 'hi' ? 'बुक करें' : 'Book Vehicle'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
