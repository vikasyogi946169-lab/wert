import React, { useState, useRef, useEffect } from 'react';
import { 
  Truck, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  ChevronDown, 
  Sun, 
  Moon, 
  ShieldCheck, 
  UserCheck, 
  LayoutDashboard,
  Layers,
  Sparkles,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { Language, PageView, Theme, FontStyle } from '../types';
import { getTranslation } from '../data/translations';

interface NavbarProps {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  fontStyle: FontStyle;
  toggleFontStyle: () => void;
  onOpenQuickBook: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  language,
  setLanguage,
  theme,
  toggleTheme,
  fontStyle,
  toggleFontStyle,
  onOpenQuickBook,
}) => {
  const t = getTranslation(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [driversDropdown, setDriversDropdown] = useState(false);
  const [dashboardsDropdown, setDashboardsDropdown] = useState(false);
  const [moreDropdown, setMoreDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemClass = (view: PageView) => `
    relative px-3 py-2 text-sm font-medium transition-colors cursor-pointer select-none whitespace-nowrap
    ${currentView === view 
      ? 'text-emerald-600 dark:text-emerald-400 font-semibold' 
      : 'text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400'}
  `;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      scrolled 
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800' 
        : 'bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80'
    }`}>
      {/* Top micro-bar for quick helpline & emergency booking */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-slate-900 text-slate-300 text-xs tracking-wide">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {language === 'hi' ? '24/7 ऑल इंडिया ट्रांसपोर्ट बुकिंग चालू है' : '24/7 All-India Transport Booking Operational'}
          </span>
          <span className="text-slate-400 hidden xl:inline">|</span>
          <span className="hidden xl:inline">
            {language === 'hi' ? 'संचालन प्रमुख: विकास योगी' : 'Operations Head: Vikas Yogi'}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="tel:+919461695205" className="flex items-center gap-1.5 text-slate-200 hover:text-emerald-400 transition-colors">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">+91 94616 95205</span>
          </a>
          <a href="tel:+917014087695" className="text-slate-400 hover:text-white transition-colors hidden sm:inline">
            7014087695
          </a>
          <a href="tel:+917615011370" className="text-slate-400 hover:text-white transition-colors hidden md:inline">
            7615011370
          </a>
          <a 
            href="https://wa.me/919461695205?text=Hello%20Vahan%20Setu%2C%20I%20want%20to%20book%20a%20transport%20vehicle." 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:underline"
          >
            WhatsApp Support
          </a>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                VAHAN <span className="text-emerald-600 dark:text-emerald-400">SETU</span>
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 font-bold border border-orange-200 dark:border-orange-800">
                {language === 'hi' ? 'वाहन सेतु' : 'INDIA'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5 hidden sm:block">
              {language === 'hi' ? 'भारत का भरोसेमंद परिवहन साथी' : "India's Trusted Transport Partner"}
            </p>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Clean single-row desktop) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button 
            onClick={() => setCurrentView('home')} 
            className={navItemClass('home')}
          >
            {t.home}
          </button>

          {/* Services Mega Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesDropdown(true)}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <button 
              onClick={() => setCurrentView('services')}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <span>{t.services}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {servicesDropdown && (
              <div className="absolute top-full left-0 w-80 p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-1 animate-in fade-in zoom-in-95 duration-150">
                <button 
                  onClick={() => { setCurrentView('vehicles'); setServicesDropdown(false); }}
                  className="p-2 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Tata Ace (छोटा हाथी)</p>
                  <p className="text-[10px] text-slate-500">750 kg capacity</p>
                </button>
                <button 
                  onClick={() => { setCurrentView('vehicles'); setServicesDropdown(false); }}
                  className="p-2 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Pickup / पिकअप</p>
                  <p className="text-[10px] text-slate-500">1.5 Ton Bolero</p>
                </button>
                <button 
                  onClick={() => { setCurrentView('vehicles'); setServicesDropdown(false); }}
                  className="p-2 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Tempo & LCV</p>
                  <p className="text-[10px] text-slate-500">14ft - 19ft</p>
                </button>
                <button 
                  onClick={() => { setCurrentView('vehicles'); setServicesDropdown(false); }}
                  className="p-2 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Heavy Multi-Axle</p>
                  <p className="text-[10px] text-slate-500">6 to 14 Wheeler</p>
                </button>
                <button 
                  onClick={() => { setCurrentView('vehicles'); setServicesDropdown(false); }}
                  className="p-2 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-white">32ft Containers</p>
                  <p className="text-[10px] text-slate-500">High security</p>
                </button>
                <button 
                  onClick={() => { setCurrentView('services'); setServicesDropdown(false); }}
                  className="p-2 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Packers & Movers</p>
                  <p className="text-[10px] text-slate-500">Safe Home Shifting</p>
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={() => setCurrentView('booking')} 
            className={navItemClass('booking')}
          >
            {t.bookTruck}
          </button>

          <button 
            onClick={() => setCurrentView('tracking')} 
            className={`${navItemClass('tracking')} flex items-center gap-1.5`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-live-pulse"></span>
            <span>{t.trackBooking}</span>
          </button>

          <button 
            onClick={() => setCurrentView('pricing')} 
            className={navItemClass('pricing')}
          >
            {t.pricing}
          </button>

          <button 
            onClick={() => setCurrentView('offers')} 
            className={navItemClass('offers')}
          >
            {t.offers}
          </button>

          {/* Drivers Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setDriversDropdown(true)}
            onMouseLeave={() => setDriversDropdown(false)}
          >
            <button 
              onClick={() => setCurrentView('drivers')}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <span>{t.drivers}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {driversDropdown && (
              <div className="absolute top-full left-0 w-64 p-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
                <button 
                  onClick={() => { setCurrentView('drivers'); setDriversDropdown(false); }}
                  className="w-full p-2.5 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"
                >
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">
                      {language === 'hi' ? 'ड्राइवर रजिस्ट्रेशन' : 'Register as Driver'}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {language === 'hi' ? 'वाहन जोड़ें और कमाई करें' : 'Attach truck & earn'}
                    </p>
                  </div>
                </button>
                <button 
                  onClick={() => { setCurrentView('driver-dashboard'); setDriversDropdown(false); }}
                  className="w-full p-2.5 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"
                >
                  <LayoutDashboard className="w-4 h-4 text-orange-500" />
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">
                      {t.driverDashboard}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {language === 'hi' ? 'ट्रिप स्वीकारें और लाइव रूट' : 'Accept trips & live trip updates'}
                    </p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Dashboards Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setDashboardsDropdown(true)}
            onMouseLeave={() => setDashboardsDropdown(false)}
          >
            <button 
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <span>{language === 'hi' ? 'पोर्टल' : 'Portals'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {dashboardsDropdown && (
              <div className="absolute top-full right-0 w-60 p-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
                <button 
                  onClick={() => { setCurrentView('customer-dashboard'); setDashboardsDropdown(false); }}
                  className="w-full p-2.5 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">{t.customerDashboard}</p>
                  <p className="text-[10px] text-slate-500">{language === 'hi' ? 'बुकिंग इतिहास व वॉलेट' : 'My bookings & live tracking'}</p>
                </button>
                <button 
                  onClick={() => { setCurrentView('admin-dashboard'); setDashboardsDropdown(false); }}
                  className="w-full p-2.5 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">{t.adminDashboard}</p>
                  <p className="text-[10px] text-slate-500">{language === 'hi' ? 'फ्लीट मॉनिटर व भारत मैप' : 'Pan-India fleet control'}</p>
                </button>
              </div>
            )}
          </div>

          {/* More menu */}
          <div 
            className="relative"
            onMouseEnter={() => setMoreDropdown(true)}
            onMouseLeave={() => setMoreDropdown(false)}
          >
            <button 
              className="flex items-center gap-1 px-2.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <span>{language === 'hi' ? 'अधिक' : 'More'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {moreDropdown && (
              <div className="absolute top-full right-0 w-48 p-1.5 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
                <button 
                  onClick={() => { setCurrentView('about'); setMoreDropdown(false); }}
                  className="w-full px-3 py-2 text-left text-xs font-medium rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  {t.about}
                </button>
                <button 
                  onClick={() => { setCurrentView('safety'); setMoreDropdown(false); }}
                  className="w-full px-3 py-2 text-left text-xs font-medium rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  {t.safety}
                </button>
                <button 
                  onClick={() => { setCurrentView('how-it-works'); setMoreDropdown(false); }}
                  className="w-full px-3 py-2 text-left text-xs font-medium rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  {t.howItWorks}
                </button>
                <button 
                  onClick={() => { setCurrentView('partner'); setMoreDropdown(false); }}
                  className="w-full px-3 py-2 text-left text-xs font-medium rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  {t.partner}
                </button>
                <button 
                  onClick={() => { setCurrentView('faq'); setMoreDropdown(false); }}
                  className="w-full px-3 py-2 text-left text-xs font-medium rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  FAQ
                </button>
                <button 
                  onClick={() => { setCurrentView('contact'); setMoreDropdown(false); }}
                  className="w-full px-3 py-2 text-left text-xs font-medium rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  {t.contact}
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: Actions (Language switch, Theme toggle, Call, Primary CTA) */}
        <div className="flex items-center gap-2 sm:gap-2.5">

          {/* Font Style Switcher: Regular Normal vs Italic */}
          <button
            onClick={toggleFontStyle}
            className={`hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
              fontStyle === 'italic'
                ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={fontStyle === 'italic' ? 'Font: Italic (Click for Regular Normal)' : 'Font: Regular Normal (Click for Italic)'}
          >
            <span className="text-[10px] opacity-70">Font:</span>
            <span className={fontStyle === 'italic' ? 'italic font-black text-emerald-600 dark:text-emerald-400' : 'font-bold'}>
              {fontStyle === 'italic' ? 'Italic' : 'Regular'}
            </span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            title="Toggle Hindi / English"
          >
            <span className={language === 'hi' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'opacity-60'}>हिन्दी</span>
            <span className="opacity-40">/</span>
            <span className={language === 'en' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'opacity-60'}>EN</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Quick Call Button */}
          <a
            href="tel:+919461695205"
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900 border border-orange-200 dark:border-orange-800 text-xs font-semibold transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>9461695205</span>
          </a>

          {/* Primary CTA Book Vehicle */}
          <button
            onClick={() => { setCurrentView('booking'); }}
            className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-lg shadow-sm shadow-emerald-700/20 transition-all whitespace-nowrap flex items-center gap-1.5"
          >
            <Truck className="w-4 h-4 hidden sm:inline" />
            <span>{t.bookNow}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Off-Canvas / Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-18 bottom-0 bg-slate-950/50 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-4/5 max-w-sm h-full bg-white dark:bg-slate-900 shadow-2xl p-5 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white">
                  VAHAN SETU <span className="text-emerald-600">(वाहन सेतु)</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleFontStyle}
                    className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
                    title="Toggle Font: Regular vs Italic"
                  >
                    {fontStyle === 'italic' ? 'Italic' : 'Regular'}
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
                  </button>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-sm font-medium">
                <button
                  onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {t.home}
                </button>
                <button
                  onClick={() => { setCurrentView('booking'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold"
                >
                  {t.bookTruck}
                </button>
                <button
                  onClick={() => { setCurrentView('tracking'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-between"
                >
                  <span>{t.trackBooking}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                </button>
                <button
                  onClick={() => { setCurrentView('services'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {t.services} & Vehicles
                </button>
                <button
                  onClick={() => { setCurrentView('pricing'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {t.pricing}
                </button>
                <button
                  onClick={() => { setCurrentView('offers'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {t.offers}
                </button>
                <button
                  onClick={() => { setCurrentView('drivers'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-orange-600 dark:text-orange-400 font-semibold"
                >
                  {language === 'hi' ? 'ड्राइवर रजिस्ट्रेशन / Enquiry' : 'Driver Registration'}
                </button>
                <button
                  onClick={() => { setCurrentView('driver-dashboard'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {t.driverDashboard}
                </button>
                <button
                  onClick={() => { setCurrentView('customer-dashboard'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {t.customerDashboard}
                </button>
                <button
                  onClick={() => { setCurrentView('admin-dashboard'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {t.adminDashboard}
                </button>
                <button
                  onClick={() => { setCurrentView('contact'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {t.contact}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs text-slate-500">
                <p className="font-semibold text-slate-700 dark:text-slate-300">Helpline Numbers:</p>
                <p className="mt-1">Vikas Yogi: 9461695205</p>
                <p>7014087695 · 7615011370</p>
              </div>
              <a
                href="https://wa.me/919461695205?text=Hello%20Vahan%20Setu%2C%20I%20want%20to%20book%20a%20transport%20vehicle."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-green-600 rounded-lg block shadow"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
