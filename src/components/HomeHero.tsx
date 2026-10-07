import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Calendar, 
  Package, 
  ShieldCheck, 
  Clock, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { Language, PageView, VehicleOption, FontStyle } from '../types';
import { getTranslation } from '../data/translations';
import { 
  vehiclesList, 
  indiaStatesData, 
  HERO_IMAGE, 
  TATA_ACE_IMAGE, 
  HEAVY_TRUCK_IMAGE, 
  PACKERS_MOVERS_IMAGE 
} from '../data/mockData';

interface HomeHeroProps {
  language: Language;
  setCurrentView: (view: PageView) => void;
  fontStyle?: FontStyle;
  toggleFontStyle?: () => void;
  onInitiateBooking: (initialData: any) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  language,
  setCurrentView,
  fontStyle = 'regular',
  toggleFontStyle,
  onInitiateBooking,
}) => {
  const t = getTranslation(language);

  // Quick form state
  const stateKeys = Object.keys(indiaStatesData);
  const [pickupState, setPickupState] = useState<string>('Rajasthan');
  const [pickupCity, setPickupCity] = useState<string>('Jaipur');
  const [dropState, setDropState] = useState<string>('Delhi NCR');
  const [dropCity, setDropCity] = useState<string>('New Delhi');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('tata-ace');
  const [goodsType, setGoodsType] = useState<string>('General Goods & Cartons');
  const [weightKg, setWeightKg] = useState<number>(750);
  const [bookingDate, setBookingDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const isItalicHeadline = fontStyle === 'italic';

  // Available cities dependent on selected states
  const pickupCities = indiaStatesData[pickupState] || [];
  const dropCities = indiaStatesData[dropState] || [];

  const handlePickupStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setPickupState(newState);
    const cities = indiaStatesData[newState] || [];
    if (cities.length > 0) setPickupCity(cities[0]);
  };

  const handleDropStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setDropState(newState);
    const cities = indiaStatesData[newState] || [];
    if (cities.length > 0) setDropCity(cities[0]);
  };

  const selectedVehicle = vehiclesList.find(v => v.id === selectedVehicleId) || vehiclesList[0];

  // Dynamic estimate calculation for hero card
  const estimatedDistance = (pickupState === dropState && pickupCity === dropCity) 
    ? 25 
    : (pickupState === dropState ? 120 : 260);
  const quickEstimatedFare = selectedVehicle.baseFare + (estimatedDistance * selectedVehicle.perKmRate);

  const handleSubmitQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    onInitiateBooking({
      pickupState,
      pickupCity,
      dropState,
      dropCity,
      vehicleId: selectedVehicleId,
      goodsType,
      weightKg,
      bookingDate,
      estimatedDistance,
      quickEstimatedFare
    });
    setCurrentView('booking');
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background radial glow */}
      <div className="hero-glow pointer-events-none" />

      {/* Main Hero Viewport */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Brand Statement & Trust Badges */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean metadata bar without static pills */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-live-pulse"></span>
              <span>{language === 'hi' ? 'ऑल इंडिया ट्रांसपोर्ट नेटवर्क' : 'All-India Transport Network'}</span>
              <span aria-hidden="true">·</span>
              <span>{language === 'hi' ? 'सत्यापित ड्राइवर' : 'Verified Fleet'}</span>
              <span aria-hidden="true">·</span>
              <span>{language === 'hi' ? 'लाइव जीपीएस' : 'Live GPS'}</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {language === 'hi' ? 'एक्सप्रेस माल ढुलाई सेवा' : 'EXPRESS FREIGHT LOGISTICS'}
                </span>
                <button
                  type="button"
                  onClick={toggleFontStyle}
                  className="text-[11px] font-medium px-2.5 py-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-xs"
                  title="Toggle Italic / Regular font"
                >
                  {isItalicHeadline ? 'Font: Italic ✨' : 'Font: Regular (Normal)'}
                </button>
              </div>

              <h1 className={`text-3xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-white leading-[1.12] ${isItalicHeadline ? 'italic' : ''}`}>
                {language === 'hi' ? (
                  <>
                    <span className="font-extrabold">भारत में कहीं भी</span> <br className="hidden sm:block" />
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">सामान भेजें</span> आसानी से
                  </>
                ) : (
                  <>
                    <span className={`font-extrabold text-slate-900 dark:text-white block sm:inline ${isItalicHeadline ? 'font-hero-italic' : 'font-heading'}`}>
                      Transport Your Goods
                    </span>{' '}
                    <br className="hidden sm:block" />
                    <span className={`font-black bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 dark:from-emerald-400 dark:via-green-400 dark:to-emerald-300 bg-clip-text text-transparent drop-shadow-sm ${isItalicHeadline ? 'font-hero-italic' : 'font-heading'}`}>
                      Anywhere in India
                    </span>
                  </>
                )}
              </h1>
              <p className={`text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium ${isItalicHeadline ? 'italic' : ''}`}>
                {language === 'hi' 
                  ? 'तेज़, सुरक्षित और भरोसेमंद ट्रांसपोर्ट बुकिंग' 
                  : 'Fast, Safe and Reliable Transport Booking Platform'}
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
              {t.heroDesc}
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setCurrentView('booking')}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>{language === 'hi' ? 'वाहन बुक करें' : 'Book Vehicle Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentView('tracking')}
                className="px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-live-pulse"></span>
                <span>{language === 'hi' ? 'लाइव गाड़ी ट्रैक करें' : 'Track Booking'}</span>
              </button>

              <a
                href="tel:+919461695205"
                className="px-4 py-3.5 rounded-xl text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-sm font-semibold transition-colors flex items-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4" />
                <span>9461695205</span>
              </a>
            </div>

            {/* Proof of impact metrics */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                  50,000+
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  {language === 'hi' ? 'सत्यापित वाहन' : 'Verified Trucks'}
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                  99.4%
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  {language === 'hi' ? 'समय पर डिलीवरी' : 'On-Time Trips'}
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                  28+
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  {language === 'hi' ? 'राज्य & केंद्र शासित' : 'States Covered'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Transport Booking Card */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 transition-all relative">
              {/* Header Badge */}
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  {language === 'hi' ? 'सामान कहाँ से भेजना है?' : 'Where are you sending from?'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'hi' ? 'तुरंत किराया दरें एवं वाहन उपलब्धता जांचें' : 'Check instant rates & truck availability'}
                </p>
              </div>

              <form onSubmit={handleSubmitQuickBook} className="space-y-4">
                {/* Pickup Section */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{language === 'hi' ? 'पिकअप स्थान (Pickup)' : 'Pickup Location'}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={pickupState}
                      onChange={handlePickupStateChange}
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white px-2.5 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      {stateKeys.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <select
                      value={pickupCity}
                      onChange={(e) => setPickupCity(e.target.value)}
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white px-2.5 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      {pickupCities.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Drop Section */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <span>{language === 'hi' ? 'ड्रॉप गंतव्य (Destination)' : 'Drop Location'}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={dropState}
                      onChange={handleDropStateChange}
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white px-2.5 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      {stateKeys.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <select
                      value={dropCity}
                      onChange={(e) => setDropCity(e.target.value)}
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white px-2.5 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      {dropCities.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Vehicle Selection & Goods Type */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                      {language === 'hi' ? 'वाहन चुनें' : 'Vehicle Type'}
                    </label>
                    <select
                      value={selectedVehicleId}
                      onChange={(e) => setSelectedVehicleId(e.target.value)}
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white px-2.5 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      {vehiclesList.map(v => (
                        <option key={v.id} value={v.id}>
                          {language === 'hi' ? v.nameHi : v.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                      {language === 'hi' ? 'सामान का प्रकार' : 'Goods Category'}
                    </label>
                    <select
                      value={goodsType}
                      onChange={(e) => setGoodsType(e.target.value)}
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white px-2.5 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="General Goods & Cartons">Commercial Cartons & Box</option>
                      <option value="Household Shifting">Household Shifting & Furniture</option>
                      <option value="Industrial Machinery">Industrial Parts & Machinery</option>
                      <option value="Agriculture & Food">Agricultural Produce & Grains</option>
                      <option value="Electronics & Fragile">Electronics & Fragile Items</option>
                    </select>
                  </div>
                </div>

                {/* Date & Weight */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                      {language === 'hi' ? 'वजन (लगभग)' : 'Approx Weight'}
                    </label>
                    <select
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white px-2.5 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value={500}>Up to 500 Kg</option>
                      <option value={750}>750 Kg (Tata Ace)</option>
                      <option value={1500}>1.5 Ton (Pickup)</option>
                      <option value={3500}>3.5 Ton (Tempo)</option>
                      <option value={5000}>5 Ton (LCV)</option>
                      <option value={10000}>10 Ton (6 Wheeler)</option>
                      <option value={20000}>20+ Ton (Heavy Multi-Axle)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 block">
                      {language === 'hi' ? 'तारीख' : 'Pickup Date'}
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white px-2.5 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Price Preview Strip */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-slate-500">
                      {language === 'hi' ? 'अनुमानित किराया (लगभग)' : 'Estimated Fare:'}
                    </p>
                    <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                      ₹{quickEstimatedFare.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="text-right text-[11px] text-slate-500">
                    <p>{language === 'hi' ? 'अनुमानित दूरी' : 'Est. Distance'}: <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">{estimatedDistance} KM</span></p>
                    <p>{language === 'hi' ? 'वाहन' : 'Vehicle'}: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedVehicle.nameEn.split(' ')[0]}</span></p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl text-white font-extrabold text-sm bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 active:scale-95 shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  <span>{language === 'hi' ? 'वाहन बुक करें / Book Vehicle' : 'Book Vehicle Now'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Marquee / Proof Showcase */}
      <section className="bg-slate-100 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                {language === 'hi' ? 'सत्यापित वाहन' : 'Verified Vehicles'}
              </p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                Tata Ace & Bolero Pickup
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                {language === 'hi' ? 'पारदर्शी दरें' : 'Transparent Pricing'}
              </p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                Zero Hidden Charges
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                {language === 'hi' ? 'अखिल भारतीय नेटवर्क' : 'Pan-India Reach'}
              </p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                28 States Direct
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                {language === 'hi' ? '24/7 कस्टमर हेल्पलाइन' : 'Direct Helpline'}
              </p>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                +91 94616 95205
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fleet Preview - Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <span>{language === 'hi' ? 'हमारा ट्रांसपोर्ट फ्लीट' : 'Our Transport Fleet'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              {language === 'hi' ? 'हर प्रकार के सामान के लिए उपयुक्त वाहन' : 'Right Transport Vehicle for Every Load'}
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('vehicles')}
            className="mt-4 md:mt-0 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>{language === 'hi' ? 'सभी 10+ वाहन देखें' : 'View all 10+ vehicles'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Tata Ace */}
          <div className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={TATA_ACE_IMAGE}
                alt="Tata Ace Mini Truck"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                ₹450 Base
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Tata Ace (छोटा हाथी)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  750 Kg - 1 Ton Capacity · 7ft × 4.5ft
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                {language === 'hi'
                  ? 'स्थानीय पार्सल, फर्नीचर, इलेक्ट्रॉनिक्स और खुदरा माल के त्वरित परिवहन के लिए सर्वश्रेष्ठ।'
                  : 'Ideal for intra-city express transport, furniture delivery, boxes and daily commercial dispatch.'}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">₹22 / KM</span>
                <button
                  onClick={() => {
                    setSelectedVehicleId('tata-ace');
                    setCurrentView('booking');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  {language === 'hi' ? 'बुक करें' : 'Book Now'}
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Heavy Highway Truck */}
          <div className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={HEAVY_TRUCK_IMAGE}
                alt="Heavy 12 Wheeler Logistics Truck"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-orange-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                Heavy Interstate
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  10 & 12 Wheeler Heavy Trucks
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  16 - 25 Ton Capacity · 24ft Bed Length
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                {language === 'hi'
                  ? 'अंतरराज्यीय भारी माल, स्टील, निर्माण सामग्री, मशीनरी और बल्क कार्गो हेतु समर्पित।'
                  : 'Engineered for long-haul national transport, heavy machinery, steel, and multi-state bulk freight.'}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Starting ₹3,600</span>
                <button
                  onClick={() => {
                    setSelectedVehicleId('heavy-12w');
                    setCurrentView('booking');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  {language === 'hi' ? 'बुक करें' : 'Book Now'}
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Packers & Movers */}
          <div className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={PACKERS_MOVERS_IMAGE}
                alt="Packers and Movers Logistics"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                Full Shifting
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Packers & Movers Logistics
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Home, Office & Factory Relocation
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                {language === 'hi'
                  ? 'सुरक्षित बबल रैप पैकिंग, कुशल लोडिंग टीम और समय पर डोर-टू-डोर डिलीवरी की गारंटी।'
                  : 'End-to-end relocation service with multi-layer bubble wrap, skilled loaders and insured transport.'}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">From ₹1,999</span>
                <button
                  onClick={() => {
                    setSelectedVehicleId('tempo-14ft');
                    setCurrentView('booking');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  {language === 'hi' ? 'बुक करें' : 'Book Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Partner Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
              {language === 'hi' ? 'ड्राइवर एवं वाहन मालिक पार्टनर' : 'Driver & Vehicle Owner Partners'}
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {language === 'hi'
                ? 'अपनी गाड़ी वाहन सेतु से जोड़ें और हर महीने ₹50,000+ कमाएं'
                : 'Attach Your Truck with Vahan Setu & Earn ₹50,000+ Monthly'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'टाटा एस, पिकअप, मिनी ट्रक, टेम्पो या भारी ट्रक - आसान ऑनलाइन रजिस्ट्रेशन, रोज़ाना भुगतान और 24/7 बैकएंड सपोर्ट।'
                : 'Direct digital bookings, instant daily UPI payouts, transparent commission rates, and round-the-clock road assistance.'}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setCurrentView('drivers')}
                className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm transition-all"
              >
                {language === 'hi' ? 'ड्राइवर रजिस्ट्रेशन फॉर्म भरें' : 'Register as Driver Partner'}
              </button>
              <a
                href="https://wa.me/919461695205?text=Hello%20Vahan%20Setu%2C%20I%20want%20to%20register%20as%20a%20driver%20partner."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white text-sm font-semibold border border-emerald-600/40 transition-colors"
              >
                WhatsApp Driver Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
