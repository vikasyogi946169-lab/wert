import React, { useState } from 'react';
import { 
  Calculator, 
  Truck, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { Language, PageView } from '../types';
import { getTranslation } from '../data/translations';
import { vehiclesList } from '../data/mockData';

interface PricingCalculatorProps {
  language: Language;
  setCurrentView: (view: PageView) => void;
  onInitiateBookingWithPricing: (data: any) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  language,
  setCurrentView,
  onInitiateBookingWithPricing,
}) => {
  const t = getTranslation(language);

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('tata-ace');
  const [distanceKm, setDistanceKm] = useState<number>(120);
  const [weightKg, setWeightKg] = useState<number>(750);
  const [includeLoading, setIncludeLoading] = useState<boolean>(true);

  const selectedVehicle = vehiclesList.find(v => v.id === selectedVehicleId) || vehiclesList[0];

  const baseFare = selectedVehicle.baseFare;
  const kmFare = distanceKm * selectedVehicle.perKmRate;
  const loadingFee = includeLoading ? 400 : 0;
  const subtotal = baseFare + kmFare + loadingFee;
  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst;

  const handleProceedToBook = () => {
    onInitiateBookingWithPricing({
      vehicleId: selectedVehicle.id,
      estimatedDistance: distanceKm,
      weightKg,
      quickEstimatedFare: grandTotal,
    });
    setCurrentView('booking');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
          TRANSPARENT FREIGHT ESTIMATOR
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {language === 'hi' ? 'पारदर्शी किराया कैलकुलेटर' : 'Instant Transport Fare Calculator'}
        </h1>
        <p className="text-sm text-slate-500">
          {language === 'hi'
            ? 'दूरी एवं वाहन के अनुसार तुरंत सही और निष्पक्ष किराया प्राप्त करें।'
            : 'Estimate accurate freight rates with zero hidden charges before booking.'}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Controls (7 cols) */}
        <div className="md:col-span-7 space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              1. {language === 'hi' ? 'वाहन का चयन करें' : 'Select Vehicle'}
            </label>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold"
            >
              {vehiclesList.map(v => (
                <option key={v.id} value={v.id}>
                  {language === 'hi' ? v.nameHi : v.nameEn} ({v.capacity}) - ₹{v.perKmRate}/KM
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">
                2. {language === 'hi' ? 'दूरी (Distance in Kilometers)' : 'Route Distance'}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm tabular-nums">
                {distanceKm} KM
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={1500}
              step={5}
              value={distanceKm}
              onChange={(e) => setDistanceKm(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10 KM (Local City)</span>
              <span>250 KM (Intra-State)</span>
              <span>1500 KM (Interstate)</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              3. {language === 'hi' ? 'अनुमानित वजन' : 'Approx Weight'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[500, 1000, 2500, 5000, 10000, 20000].map(wt => (
                <button
                  key={wt}
                  type="button"
                  onClick={() => setWeightKg(wt)}
                  className={`p-2 rounded-lg border text-xs font-semibold ${
                    weightKg === wt
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {wt < 1000 ? `${wt} Kg` : `${wt / 1000} Ton`}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {language === 'hi' ? 'लोडिंग / अनलोडिंग सहायता' : 'Loading/Unloading Assistance'}
              </p>
              <p className="text-[11px] text-slate-500">Professional helper on arrival</p>
            </div>
            <input
              type="checkbox"
              checked={includeLoading}
              onChange={(e) => setIncludeLoading(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </div>
        </div>

        {/* Calculation Invoice Card (5 cols) */}
        <div className="md:col-span-5 bg-slate-900 text-white p-6 rounded-2xl space-y-4 shadow-lg">
          <div className="pb-3 border-b border-slate-800">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold block">
              ESTIMATED INVOICE
            </span>
            <p className="text-sm font-bold text-slate-200 mt-0.5">
              {selectedVehicle.nameEn}
            </p>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Base Booking Rate</span>
              <span className="font-semibold text-white tabular-nums">₹{baseFare}</span>
            </div>
            <div className="flex justify-between">
              <span>Distance ({distanceKm} KM × ₹{selectedVehicle.perKmRate})</span>
              <span className="font-semibold text-white tabular-nums">₹{kmFare}</span>
            </div>
            {includeLoading && (
              <div className="flex justify-between">
                <span>Loading Helper Fee</span>
                <span className="font-semibold text-white tabular-nums">₹{loadingFee}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>GST (5% Transport Freight)</span>
              <span className="font-semibold text-white tabular-nums">₹{gst}</span>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
              <span className="font-bold text-white">Total Estimate</span>
              <span className="text-2xl font-black text-emerald-400 tabular-nums">
                ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleProceedToBook}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"
          >
            <span>{language === 'hi' ? 'इस दर पर वाहन बुक करें' : 'Book with This Estimate'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
