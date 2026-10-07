import React from 'react';
import { Truck, Phone, MessageSquare, MapPin, Shield, Clock, ExternalLink } from 'lucide-react';
import { Language, PageView } from '../types';
import { getTranslation } from '../data/translations';

interface FooterProps {
  language: Language;
  setCurrentView: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, setCurrentView }) => {
  const t = getTranslation(language);

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Bar inside Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800/70 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">
                {language === 'hi' ? '100% सत्यापित फ्लीट' : '100% Verified Fleet'}
              </p>
              <p className="text-slate-400">
                {language === 'hi' ? 'सत्यापित ड्राइवर और वैध आरसी' : 'Background checked drivers & RC'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-950 text-orange-400 border border-orange-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">
                {language === 'hi' ? 'समय पर डिलीवरी' : 'On-Time Dispatch'}
              </p>
              <p className="text-slate-400">
                {language === 'hi' ? 'त्वरित पिकअप और रीयल-टाइम ईटीए' : 'Quick pickup & real-time ETA'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">
                {language === 'hi' ? 'अखिल भारतीय नेटवर्क' : 'Pan-India Reach'}
              </p>
              <p className="text-slate-400">
                {language === 'hi' ? '28 राज्यों में सक्रिय ट्रांसपोर्ट' : 'Direct interstate connectivity'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-950 text-green-400 border border-green-800 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">
                {language === 'hi' ? '24/7 कस्टमर हेल्पलाइन' : '24/7 Support Desk'}
              </p>
              <p className="text-slate-400">
                {language === 'hi' ? 'व्हाट्सएप व कॉल पर तुरंत समाधान' : 'Instant phone & WhatsApp assistance'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white">
                  VAHAN <span className="text-emerald-500">SETU</span>
                </span>
                <p className="text-xs text-orange-400 font-semibold">
                  "भारत का भरोसेमंद परिवहन साथी"
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {language === 'hi'
                ? 'वाहन सेतु एक आधुनिक डिजिटल लॉजिस्टिक्स प्लेटफॉर्म है जो ग्राहकों और व्यवसायों को भारत भर में सुरक्षित, तेज़ और पारदर्शी माल परिवहन सेवाओं से जोड़ता है।'
                : 'Vahan Setu is a modern digital freight and logistics platform connecting businesses and individuals with verified trucks, mini trucks, tempos, and containers across India.'}
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="text-slate-200">
                <span className="text-emerald-400 font-medium">
                  {language === 'hi' ? 'प्रबंधक / संपर्क:' : 'Operations Manager:'}
                </span>{' '}
                <span className="font-bold">विकास योगी (Vikas Yogi)</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <a href="tel:+919461695205" className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-semibold text-white">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  +91 94616 95205
                </a>
                <a href="tel:+917014087695" className="hover:text-emerald-400 transition-colors">
                  +91 70140 87695
                </a>
                <a href="tel:+917615011370" className="hover:text-emerald-400 transition-colors">
                  +91 76150 11370
                </a>
              </div>
              <div className="pt-1">
                <a
                  href="https://wa.me/919461695205?text=Hello%20Vahan%20Setu%2C%20I%20want%20to%20book%20a%20transport%20vehicle."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 border border-emerald-700/60 transition-colors font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'WhatsApp पर संपर्क करें' : 'Chat on WhatsApp'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Services & Vehicles */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4 uppercase">
              {language === 'hi' ? 'वाहन एवं सेवाएं' : 'Vehicles & Services'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentView('vehicles')} className="hover:text-emerald-400 transition-colors">
                  Tata Ace (छोटा हाथी)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('vehicles')} className="hover:text-emerald-400 transition-colors">
                  Bolero Pickup / पिकअप
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('vehicles')} className="hover:text-emerald-400 transition-colors">
                  Ashok Leyland Dost
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('vehicles')} className="hover:text-emerald-400 transition-colors">
                  Tempo 14ft - 19ft (LCV)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('vehicles')} className="hover:text-emerald-400 transition-colors">
                  Heavy 10 & 12 Wheeler Trucks
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('vehicles')} className="hover:text-emerald-400 transition-colors">
                  32ft Multi-Axle Containers
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('services')} className="hover:text-emerald-400 transition-colors">
                  Packers & Movers
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('services')} className="hover:text-emerald-400 transition-colors">
                  Business & Fleet Contract
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Hubs */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4 uppercase">
              {language === 'hi' ? 'प्रमुख ट्रांसपोर्ट हब' : 'Transport Hubs'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentView('booking')} className="hover:text-emerald-400 transition-colors">
                  Rajasthan (Jaipur, Sikar, Kota)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('booking')} className="hover:text-emerald-400 transition-colors">
                  Delhi NCR (Gurugram, Noida)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('booking')} className="hover:text-emerald-400 transition-colors">
                  Haryana (Hisar, Rohtak, Panipat)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('booking')} className="hover:text-emerald-400 transition-colors">
                  Punjab (Chandigarh, Ludhiana)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('booking')} className="hover:text-emerald-400 transition-colors">
                  Gujarat (Ahmedabad, Surat)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('booking')} className="hover:text-emerald-400 transition-colors">
                  Uttar Pradesh (Lucknow, Kanpur)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('booking')} className="hover:text-emerald-400 transition-colors">
                  Maharashtra (Mumbai, Pune)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('booking')} className="hover:text-emerald-400 transition-colors">
                  All India Inter-State Routes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Portals & Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-4 uppercase">
              {language === 'hi' ? 'ड्राइवर व पोर्टल' : 'Portals & Support'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentView('drivers')} className="text-orange-400 font-semibold hover:underline">
                  {language === 'hi' ? 'ड्राइवर रजिस्ट्रेशन (रजिस्टर करें)' : 'Driver Registration'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('driver-dashboard')} className="hover:text-emerald-400 transition-colors">
                  {t.driverDashboard}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('customer-dashboard')} className="hover:text-emerald-400 transition-colors">
                  {t.customerDashboard}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('admin-dashboard')} className="hover:text-emerald-400 transition-colors">
                  {t.adminDashboard}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('tracking')} className="hover:text-emerald-400 transition-colors">
                  {t.trackBooking}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('pricing')} className="hover:text-emerald-400 transition-colors">
                  {t.pricing}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('safety')} className="hover:text-emerald-400 transition-colors">
                  {t.safety}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('contact')} className="hover:text-emerald-400 transition-colors">
                  {t.contact}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Vahan Setu (वाहन सेतु). {t.rightsReserved}
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentView('safety')} className="hover:text-slate-300">
              Privacy Policy
            </button>
            <button onClick={() => setCurrentView('safety')} className="hover:text-slate-300">
              Terms & Conditions
            </button>
            <button onClick={() => setCurrentView('faq')} className="hover:text-slate-300">
              FAQ
            </button>
            <a 
              href="https://wa.me/919461695205" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-400 hover:underline"
            >
              Direct WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
