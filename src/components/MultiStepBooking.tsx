import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Truck, 
  MapPin, 
  Package, 
  Calendar, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  Phone, 
  MessageSquare, 
  Tag, 
  ShieldCheck,
  Download
} from 'lucide-react';
import { Language, PageView, BookingRecord, VehicleOption } from '../types';
import { getTranslation } from '../data/translations';
import { 
  vehiclesList, 
  indiaStatesData, 
  sampleCoupons 
} from '../data/mockData';

interface MultiStepBookingProps {
  language: Language;
  setCurrentView: (view: PageView) => void;
  initialBookingData?: any;
  onBookingConfirmed: (newBooking: BookingRecord) => void;
}

export const MultiStepBooking: React.FC<MultiStepBookingProps> = ({
  language,
  setCurrentView,
  initialBookingData,
  onBookingConfirmed,
}) => {
  const t = getTranslation(language);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const stateKeys = Object.keys(indiaStatesData);
  const [pickupState, setPickupState] = useState<string>(initialBookingData?.pickupState || 'Rajasthan');
  const [pickupCity, setPickupCity] = useState<string>(initialBookingData?.pickupCity || 'Jaipur');
  const [pickupAddress, setPickupAddress] = useState<string>('Industrial Area, Road No. 14, Vishwakarma');

  const [dropState, setDropState] = useState<string>(initialBookingData?.dropState || 'Delhi NCR');
  const [dropCity, setDropCity] = useState<string>(initialBookingData?.dropCity || 'New Delhi');
  const [dropAddress, setDropAddress] = useState<string>('Okhla Industrial Area Phase-III');

  const [vehicleId, setVehicleId] = useState<string>(initialBookingData?.vehicleId || 'tata-ace');
  const [goodsType, setGoodsType] = useState<string>(initialBookingData?.goodsType || 'Commercial Cartons & Box');
  const [weightKg, setWeightKg] = useState<number>(initialBookingData?.weightKg || 750);
  const [specialInstructions, setSpecialInstructions] = useState<string>('Cover with waterproof tarpaulin; handle with care.');

  const [bookingDate, setBookingDate] = useState<string>(
    initialBookingData?.bookingDate || new Date().toISOString().split('T')[0]
  );
  const [bookingTime, setBookingTime] = useState<string>('10:00 AM');
  const [isUrgent, setIsUrgent] = useState<boolean>(false);

  const [customerName, setCustomerName] = useState<string>('Rohit Verma');
  const [customerPhone, setCustomerPhone] = useState<string>('9829098765');
  const [customerEmail, setCustomerEmail] = useState<string>('rohit.verma@example.com');
  const [paymentMethod, setPaymentMethod] = useState<string>('UPI / Net Banking');

  // Coupon state
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string>('');
  const [needLabor, setNeedLabor] = useState<boolean>(true);

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  const pickupCities = indiaStatesData[pickupState] || [];
  const dropCities = indiaStatesData[dropState] || [];

  const selectedVehicle = vehiclesList.find(v => v.id === vehicleId) || vehiclesList[0];

  // Calculated distance & fare
  const distanceKm = (pickupState === dropState && pickupCity === dropCity) 
    ? 25 
    : (pickupState === dropState ? 120 : 255);

  const baseFare = selectedVehicle.baseFare;
  const distanceFare = distanceKm * selectedVehicle.perKmRate;
  const laborCharge = needLabor ? 400 : 0;
  const urgentSurcharge = isUrgent ? 300 : 0;
  const subtotal = baseFare + distanceFare + laborCharge + urgentSurcharge;
  const gstAmount = Math.round(subtotal * 0.05); // 5% GST on transport
  const totalFare = Math.max(0, subtotal + gstAmount - appliedDiscount);

  const handleApplyCoupon = () => {
    const coupon = sampleCoupons.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (coupon) {
      if (subtotal >= coupon.minAmount) {
        const discount = coupon.discountType === 'flat' 
          ? coupon.discountValue 
          : Math.min(1000, Math.round((subtotal * coupon.discountValue) / 100));
        setAppliedDiscount(discount);
        setCouponMessage(language === 'hi' ? `कूपन लागू हुआ! ₹${discount} की छूट मिली` : `Coupon Applied! Saved ₹${discount}`);
      } else {
        setCouponMessage(language === 'hi' ? `न्यूनतम ऑर्डर मूल्य ₹${coupon.minAmount} होना चाहिए` : `Minimum order value must be ₹${coupon.minAmount}`);
      }
    } else {
      setCouponMessage(language === 'hi' ? 'अमान्य कूपन कोड' : 'Invalid coupon code');
    }
  };

  const handleFinalConfirmBooking = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBookingId = `VS202610${randomSuffix}`;

    const newBooking: BookingRecord = {
      id: newBookingId,
      customerName,
      customerPhone,
      customerEmail,
      pickupState,
      pickupCity,
      pickupAddress,
      dropState,
      dropCity,
      dropAddress,
      vehicleId: selectedVehicle.id,
      vehicleName: language === 'hi' ? selectedVehicle.nameHi : selectedVehicle.nameEn,
      vehicleNumber: 'RJ14 CP ' + Math.floor(1000 + Math.random() * 9000),
      driverName: 'Suresh Gurjar',
      driverPhone: '9461695205',
      driverRating: 4.9,
      goodsType,
      weightKg,
      distanceKm,
      estimatedFare: totalFare,
      bookingDate,
      bookingTime,
      status: 'booking_confirmed',
      statusTextEn: 'Booking Confirmed - Driver Assigned',
      statusTextHi: 'बुकिंग कन्फर्म हो गई - ड्राइवर नियुक्त',
      currentLocationName: `${pickupCity} Hub`,
      currentCoords: [26.9124, 75.7873],
      pickupCoords: [26.9124, 75.7873],
      dropCoords: [28.6139, 77.2090],
      eta: '30 mins to pickup',
      specialInstructions,
      paymentMethod
    };

    setConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
    setCurrentStep(7);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback safe
    }
  };

  const handleDownloadReceipt = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb / Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span>{language === 'hi' ? 'चरण' : 'Step'} {currentStep} of 7</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
            {currentStep === 1 && (language === 'hi' ? 'स्थान' : 'Locations')}
            {currentStep === 2 && (language === 'hi' ? 'वाहन' : 'Vehicle')}
            {currentStep === 3 && (language === 'hi' ? 'सामान' : 'Cargo')}
            {currentStep === 4 && (language === 'hi' ? 'शेड्यूल' : 'Schedule')}
            {currentStep === 5 && (language === 'hi' ? 'ग्राहक' : 'Customer')}
            {currentStep === 6 && (language === 'hi' ? 'किराया' : 'Fare')}
            {currentStep === 7 && (language === 'hi' ? 'कन्फर्मेशन' : 'Confirmed')}
          </span>
        </div>
        <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div
              key={s}
              className={`flex-1 h-full transition-all duration-300 ${
                s <= currentStep ? 'bg-emerald-600' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Step Cards */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8">
        {/* STEP 1: Pickup & Drop */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {language === 'hi' ? '1. पिकअप और ड्रॉप स्थान चुनें' : '1. Select Pickup & Drop Locations'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'hi' ? 'सटीक राज्य, शहर व पता दर्ज करें जहां से माल भेजना है' : 'Enter state, city and landmark addresses for transport'}
              </p>
            </div>

            {/* Pickup */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{language === 'hi' ? 'पिकअप स्थान (Pickup Point)' : 'Pickup Location'}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">राज्य (State)</label>
                  <select
                    value={pickupState}
                    onChange={(e) => {
                      setPickupState(e.target.value);
                      const c = indiaStatesData[e.target.value] || [];
                      if (c.length) setPickupCity(c[0]);
                    }}
                    className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                  >
                    {stateKeys.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">शहर (City)</label>
                  <select
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                  >
                    {pickupCities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 mb-1 block">सटीक पता / लैंडमार्क (Full Address)</label>
                <input
                  type="text"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Street, Plot No, Industrial Area, Landmark"
                  className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                />
              </div>
            </div>

            {/* Drop */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{language === 'hi' ? 'ड्रॉप गंतव्य (Drop Destination)' : 'Drop Location'}</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">राज्य (State)</label>
                  <select
                    value={dropState}
                    onChange={(e) => {
                      setDropState(e.target.value);
                      const c = indiaStatesData[e.target.value] || [];
                      if (c.length) setDropCity(c[0]);
                    }}
                    className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                  >
                    {stateKeys.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">शहर (City)</label>
                  <select
                    value={dropCity}
                    onChange={(e) => setDropCity(e.target.value)}
                    className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                  >
                    {dropCities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 mb-1 block">गंतव्य का सटीक पता (Destination Address)</label>
                <input
                  type="text"
                  value={dropAddress}
                  onChange={(e) => setDropAddress(e.target.value)}
                  placeholder="Shop/Warehouse/House No, Area, City"
                  className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2"
              >
                <span>{language === 'hi' ? 'आगे बढ़ें: वाहन चुनें' : 'Next: Select Vehicle'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Select Vehicle */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {language === 'hi' ? '2. वाहन का प्रकार चुनें' : '2. Select Vehicle Type'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'hi' ? 'अपने सामान के वजन एवं आयतन के अनुकूल सही गाड़ी का चयन करें' : 'Choose optimal truck for your load weight and dimensions'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
              {vehiclesList.map((vehicle) => {
                const isSelected = vehicle.id === vehicleId;
                return (
                  <div
                    key={vehicle.id}
                    onClick={() => setVehicleId(vehicle.id)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                          {language === 'hi' ? vehicle.nameHi : vehicle.nameEn}
                        </h4>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                          {vehicle.capacity} · {vehicle.dimensions}
                        </p>
                      </div>
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 my-2">
                      {language === 'hi' ? vehicle.suitableForHi : vehicle.suitableForEn}
                    </p>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Base: ₹{vehicle.baseFare}</span>
                      <span className="font-bold text-slate-900 dark:text-white">₹{vehicle.perKmRate} / KM</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2"
              >
                <span>{language === 'hi' ? 'आगे: सामान विवरण' : 'Next: Cargo Details'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Goods Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {language === 'hi' ? '3. सामान का विवरण' : '3. Goods & Cargo Details'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'hi' ? 'माल का प्रकार, अनुमानित वजन एवं विशेष निर्देश दें' : 'Provide cargo type, approximate weight and care handling notes'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                  {language === 'hi' ? 'सामान की श्रेणी (Category of Goods)' : 'Goods Category'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Commercial Cartons & Box',
                    'Household Shifting & Furniture',
                    'Industrial Hardware & Parts',
                    'Textiles & Garments',
                    'Agricultural Produce & Grain',
                    'Electronics & Fragile'
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setGoodsType(cat)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                        goodsType === cat
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                    {language === 'hi' ? 'अनुमानित वजन (Approx Weight in Kg)' : 'Approx Weight (Kg)'}
                  </label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    min={50}
                    max={25000}
                    className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    {selectedVehicle.nameEn} Maximum: {selectedVehicle.capacity}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                    {language === 'hi' ? 'लोडिंग व अनलोडिंग सहायता' : 'Loading/Unloading Labor'}
                  </label>
                  <div className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                    <input
                      type="checkbox"
                      id="laborCheck"
                      checked={needLabor}
                      onChange={(e) => setNeedLabor(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <label htmlFor="laborCheck" className="text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                      {language === 'hi' ? 'लोडर/मजदूर सहायता चाहिए (+₹400)' : 'Include Helper for Loading (+₹400)'}
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                  {language === 'hi' ? 'विशेष निर्देश / नोट (Special Instructions)' : 'Special Instructions'}
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={3}
                  className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                  placeholder="E.g., Fragile glassware, keep waterproof cover, call 30 mins before arrival"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2"
              >
                <span>{language === 'hi' ? 'आगे: समय निर्धारण' : 'Next: Schedule'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Schedule */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {language === 'hi' ? '4. पिकअप का समय निर्धारित करें' : '4. Schedule Date & Time'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'hi' ? 'अपनी सुविधानुसार गाड़ी के आगमन की तारीख और समय चुनें' : 'Choose preferred dispatch date, hour slot, and delivery priority'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                  {language === 'hi' ? 'पिकअप तारीख (Date)' : 'Pickup Date'}
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                  {language === 'hi' ? 'समय स्लॉट (Time Slot)' : 'Time Slot'}
                </label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                >
                  <option value="08:00 AM">08:00 AM - Morning Slot</option>
                  <option value="10:00 AM">10:00 AM - Regular Slot</option>
                  <option value="01:00 PM">01:00 PM - Afternoon Slot</option>
                  <option value="04:00 PM">04:00 PM - Evening Slot</option>
                  <option value="08:00 PM">08:00 PM - Night Long Haul</option>
                  <option value="Immediate">Immediate Dispatch (within 45 mins)</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-950/20 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-orange-900 dark:text-orange-300">
                  {language === 'hi' ? 'अर्जेंट एक्सप्रेस डिलीवरी' : 'Urgent Express Dispatch (+₹300)'}
                </p>
                <p className="text-[11px] text-slate-500">
                  {language === 'hi' ? 'प्राथमिकता के साथ निकटतम गाड़ी 30 मिनट में रवाना की जाएगी' : 'Nearest verified vehicle allocated with top priority dispatch'}
                </p>
              </div>
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="w-5 h-5 text-orange-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2"
              >
                <span>{language === 'hi' ? 'आगे: ग्राहक विवरण' : 'Next: Customer Info'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Customer Details */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {language === 'hi' ? '5. ग्राहक संपर्क विवरण' : '5. Customer Information'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'hi' ? 'ड्राइवर समन्वय एवं ई-बिल्टी रसीद हेतु मोबाइल नंबर दर्ज करें' : 'Driver contact and e-bilty SMS/WhatsApp updates'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                  {language === 'hi' ? 'ग्राहक का पूरा नाम (Full Name)' : 'Customer Name'} *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                    {language === 'hi' ? 'मोबाइल नंबर (Mobile)' : 'Phone Number'} *
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                    {language === 'hi' ? 'ईमेल (वैकल्पिक)' : 'Email (Optional)'}
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                  {language === 'hi' ? 'भुगतान का तरीका' : 'Payment Preference'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['UPI / Online', 'Cash on Delivery', 'Vahan Setu Wallet'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                        paymentMethod === method
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(6)}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2"
              >
                <span>{language === 'hi' ? 'आगे: किराया अनुमान' : 'Next: Price Estimate'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Price Estimate & Coupon */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {language === 'hi' ? '6. किराया अनुमान एवं कूपन' : '6. Fare Breakdown & Coupon'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'hi' ? 'पारदर्शी बिलिंग, बिना किसी अतिरिक्त शुल्क के' : 'Transparent invoice with zero hidden surcharges'}
              </p>
            </div>

            {/* Breakdown card */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>{language === 'hi' ? 'वाहन बेस किराया' : 'Vehicle Base Rate'} ({selectedVehicle.nameEn})</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">₹{baseFare}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>{language === 'hi' ? 'दूरी किराया' : 'Distance Rate'} ({distanceKm} KM @ ₹{selectedVehicle.perKmRate}/KM)</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">₹{distanceFare}</span>
              </div>
              {needLabor && (
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>{language === 'hi' ? 'लोडिंग सहायक' : 'Loading Helper'}</span>
                  <span className="font-semibold text-slate-900 dark:text-white tabular-nums">₹{laborCharge}</span>
                </div>
              )}
              {isUrgent && (
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>{language === 'hi' ? 'अर्जेंट एक्सप्रेस डिस्पैच' : 'Urgent Dispatch'}</span>
                  <span className="font-semibold text-slate-900 dark:text-white tabular-nums">₹{urgentSurcharge}</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>GST (5% Freight Tax)</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">₹{gstAmount}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>{language === 'hi' ? 'कूपन छूट' : 'Discount Applied'}</span>
                  <span className="tabular-nums">- ₹{appliedDiscount}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                    {language === 'hi' ? 'कुल देय राशि' : 'Total Payable Fare'}
                  </p>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                    ₹{totalFare.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <p>{distanceKm} KM Route</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{pickupCity} → {dropCity}</p>
                </div>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'hi' ? 'डिस्काउंट कूपन कोड दर्ज करें' : 'Apply Promo Code / Coupon'}</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="E.g. FIRST200, BUSINESS10"
                  className="flex-1 text-xs uppercase font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold hover:opacity-90"
                >
                  {language === 'hi' ? 'लागू करें' : 'Apply'}
                </button>
              </div>
              {couponMessage && (
                <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {couponMessage}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'hi' ? 'पीछे' : 'Back'}</span>
              </button>

              <button
                type="button"
                onClick={handleFinalConfirmBooking}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 active:scale-95 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/30 flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{language === 'hi' ? 'बुकिंग कन्फर्म करें / Confirm Booking' : 'Confirm & Book Truck'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: Booking Confirmed Confirmation View */}
        {currentStep === 7 && confirmedBooking && (
          <div className="space-y-6 text-center sm:text-left animate-in fade-in zoom-in-95 duration-200">
            {/* Success icon */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                  ✓ Booking Confirmed
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {language === 'hi' ? 'आपकी बुकिंग कन्फर्म हो गई है!' : 'Your Transport is Successfully Booked!'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'hi' ? 'बुकिंग आईडी एसएमएस एवं व्हाट्सएप पर भी भेज दी गई है।' : 'Confirmation sent to your phone and email.'}
                </p>
              </div>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <p className="text-[11px] text-slate-500">{t.bookingId}</p>
                  <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {confirmedBooking.id}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">{language === 'hi' ? 'ग्राहक' : 'Customer'}</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {confirmedBooking.customerName}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">{language === 'hi' ? 'गाड़ी व ड्राइवर' : 'Vehicle & Driver'}</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {confirmedBooking.vehicleName}
                  </p>
                  <p className="text-[10px] text-slate-500">{confirmedBooking.driverName}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500">{language === 'hi' ? 'अनुमानित किराया' : 'Total Fare'}</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white tabular-nums">
                    ₹{confirmedBooking.estimatedFare.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-slate-500 font-semibold mb-1 flex items-center gap-1 text-emerald-600">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'पिकअप स्थान' : 'Pickup Location'}:</span>
                  </p>
                  <p className="font-bold text-slate-900 dark:text-white">{confirmedBooking.pickupCity}</p>
                  <p className="text-slate-500 text-[11px]">{confirmedBooking.pickupAddress}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-semibold mb-1 flex items-center gap-1 text-orange-600">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'ड्रॉप स्थान' : 'Drop Destination'}:</span>
                  </p>
                  <p className="font-bold text-slate-900 dark:text-white">{confirmedBooking.dropCity}</p>
                  <p className="text-slate-500 text-[11px]">{confirmedBooking.dropAddress}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCurrentView('tracking')}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-emerald-600/30"
              >
                <Truck className="w-4 h-4" />
                <span>{language === 'hi' ? 'लाइव ट्रैक करें' : 'Track Booking Now'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadReceipt}
                className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'hi' ? 'रसीद डाउनलोड करें' : 'Download Receipt'}</span>
              </button>

              <a
                href={`tel:+91${confirmedBooking.driverPhone}`}
                className="px-4 py-3 rounded-xl bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800 font-semibold text-xs sm:text-sm flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>{language === 'hi' ? 'ड्राइवर से बात करें' : 'Call Driver'}</span>
              </a>

              <a
                href={`https://wa.me/919461695205?text=Hello%20Vahan%20Setu%2C%20Booking%20ID%20${confirmedBooking.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 font-semibold text-xs sm:text-sm flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
