import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Truck, 
  ChevronDown, 
  Send, 
  Briefcase,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Language, PageView } from '../types';
import { getTranslation } from '../data/translations';

interface StaticPagesProps {
  language: Language;
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
}

export const StaticPages: React.FC<StaticPagesProps> = ({
  language,
  currentView,
  setCurrentView,
}) => {
  const t = getTranslation(language);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);

  // Partner form state
  const [partnerCompany, setPartnerCompany] = useState('');
  const [partnerOwner, setPartnerOwner] = useState('');
  const [partnerPhone, setPartnerPhone] = useState('');
  const [partnerCity, setPartnerCity] = useState('');
  const [partnerTruckCount, setPartnerTruckCount] = useState('5');
  const [partnerVehicleType, setPartnerVehicleType] = useState('Multiple / Fleet');
  const [partnerSent, setPartnerSent] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      qHi: 'वाहन सेतु पर गाड़ी कैसे बुक करें?',
      qEn: 'How do I book a transport vehicle on Vahan Setu?',
      aHi: 'आप होमपेज या "वाहन बुक करें" पेज पर जाकर अपना पिकअप और ड्रॉप स्थान, गाड़ी का प्रकार और तारीख चुनकर तुरंत अनुमानित किराया देख सकते हैं और एक क्लिक में गाड़ी बुक कर सकते हैं।',
      aEn: 'Simply enter your pickup and drop city on our homepage or Booking page, select your desired vehicle category, check the transparent rate estimate, and confirm your booking in minutes.'
    },
    {
      qHi: 'क्या ड्राइवर और वाहन सत्यापित (Verified) होते हैं?',
      qEn: 'Are the driver partners and vehicles thoroughly verified?',
      aHi: 'हाँ, वाहन सेतु पर प्रत्येक वाहन का आरसी (RC), फिटनेस, प्रदूषण और बीमा तथा ड्राइवर का वैध कमर्शियल ड्राइविंग लाइसेंस हमारी टीम द्वारा व्यक्तिगत रूप से जांचा जाता है।',
      aEn: 'Yes, 100% of our driver partners undergo strict document verification including Commercial Driving License, Vehicle RC, Insurance and background screening.'
    },
    {
      qHi: 'लाइव ट्रैकिंग कैसे काम करती है?',
      qEn: 'How does live GPS vehicle tracking work?',
      aHi: 'बुकिंग कन्फर्म होने पर आपको एक अद्वितीय बुकिंग आईडी मिलती है। आप "लाइव ट्रैकिंग" पेज पर आईडी डालकर गाड़ी की वास्तविक स्थिति, हाईवे रूट और ईटीए देख सकते हैं।',
      aEn: 'Upon booking confirmation, you receive a Booking ID (e.g. VS202610001). Enter it into our Live Tracking page to view the vehicle moving on the map with real-time ETA and checkpoint updates.'
    },
    {
      qHi: 'क्या लोडिंग और अनलोडिंग सहायता मिलती है?',
      qEn: 'Do you provide labor helpers for loading and unloading?',
      aHi: 'हाँ, बुकिंग करते समय आप लोडिंग सहायक का विकल्प चुन सकते हैं। हमारी टीम सामान को सुरक्षित चढ़ाने और उतारने में मदद करती है।',
      aEn: 'Yes, during booking you can easily check the "Include Helper" option to request skilled loaders for handling your freight safely.'
    },
    {
      qHi: 'ड्राइवर या वाहन मालिक अपनी गाड़ी कैसे जोड़ सकते हैं?',
      qEn: 'How can truck owners and drivers attach their vehicle?',
      aHi: 'हमारी वेबसाइट पर "ड्राइवर रजिस्ट्रेशन" पेज पर जाएं, अपने लाइसेंस और गाड़ी की जानकारी दर्ज करें। हमारी टीम 24 घंटे में आपसे संपर्क कर आपकी आईडी सक्रिय करेगी।',
      aEn: 'Visit the "Driver Registration" page on our top navigation bar, submit your driving license and RC details. Our operations desk will activate your partner account within 24 hours.'
    },
    {
      qHi: 'भुगतान के कौन-कौन से तरीके उपलब्ध हैं?',
      qEn: 'What payment methods are supported?',
      aHi: 'आप यूपीआई (Google Pay, PhonePe, Paytm), नेट बैंकिंग, कैश ऑन डिलीवरी (COD) या वाहन सेतु वॉलेट द्वारा भुगतान कर सकते हैं।',
      aEn: 'We support all major payment modes including UPI (GPay, PhonePe, Paytm), Net Banking, Cash on Delivery (COD), and Vahan Setu Digital Wallet.'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => setContactSent(false), 5000);
    setContactName('');
    setContactPhone('');
    setContactMsg('');
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerSent(true);
    setTimeout(() => setPartnerSent(false), 5000);
    setPartnerCompany('');
    setPartnerOwner('');
    setPartnerPhone('');
    setPartnerCity('');
  };

  // ABOUT US VIEW
  if (currentView === 'about') {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            {language === 'hi' ? 'हमारे बारे में' : 'ABOUT VAHAN SETU'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            {language === 'hi' ? 'भारत का भरोसेमंद डिजिटल परिवहन साथी' : "India's Trusted Digital Transport Partner"}
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            {language === 'hi'
              ? 'वाहन सेतु एक आधुनिक डिजिटल लॉजिस्टिक्स प्लेटफॉर्म है जो ग्राहकों, व्यापारियों और उद्योगों को भारत भर में सुरक्षित, समयबद्ध और पारदर्शी माल परिवहन सेवाओं से जोड़ता है।'
              : 'Vahan Setu is a technology-enabled road logistics network bridging shippers and vehicle owners with upfront rates, verified drivers, and live GPS tracking across 28 Indian states.'}
          </p>
        </div>

        {/* Mission & Vision Bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-black">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {language === 'hi' ? 'हमारा मिशन (Our Mission)' : 'Our Mission'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'hi'
                ? 'भारत के हर कोने में पारदर्शी दरों, अत्याधुनिक जीपीएस तकनीक और विश्वसनीय ड्राइवरों के साथ माल परिवहन को सरल, सुगम और किफायती बनाना ताकि देश का व्यापार निर्बाध रूप से आगे बढ़े।'
                : 'To revolutionize Indian road freight by offering transparent spot pricing, real-time shipment visibility, and fair livelihood opportunities to thousands of commercial driver partners.'}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950 text-orange-600 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {language === 'hi' ? 'हमारा विज़न (Our Vision)' : 'Our Vision'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'hi'
                ? 'भारत का सबसे पसंदीदा और सुरक्षित डिजिटल लॉजिस्टिक्स नेटवर्क बनना जहाँ छोटे व्यापारी से लेकर बड़े उद्योगपति तक अपनी हर माल ढुलाई आवश्यकता पर पूर्ण भरोसा कर सकें।'
                : 'To become India’s most dependable multimodal road logistics standard where every delivery is backed by 100% verified carriers, prompt customer support, and seamless highway mobility.'}
            </p>
          </div>
        </div>

        {/* Operational Leadership Highlight */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
              OPERATIONS LEADERSHIP
            </span>
            <h4 className="text-xl font-extrabold">
              विकास योगी (Vikas Yogi) · Operations Manager
            </h4>
            <p className="text-xs text-slate-300 max-w-xl">
              {language === 'hi'
                ? 'राजस्थान, दिल्ली एनसीआर और राष्ट्रीय राजमार्गों पर 24/7 सक्रिय फ्लीट समन्वय एवं ग्राहक सहायता प्रबंधन।'
                : 'Overseeing fleet dispatch, carrier verification, and round-the-clock roadside logistics operations across North and Western India.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:+919461695205"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call: 9461695205</span>
            </a>
            <a
              href="https://wa.me/919461695205"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // HOW IT WORKS VIEW
  if (currentView === 'how-it-works') {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            SIMPLE & FAST
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            {language === 'hi' ? 'यह कैसे काम करता है?' : 'How Vahan Setu Works'}
          </h1>
          <p className="text-sm text-slate-500">
            {language === 'hi'
              ? 'सिर्फ 5 आसान चरणों में अपना ट्रांसपोर्ट वाहन बुक करें और माल भेजें।'
              : 'Book your commercial vehicle in 5 seamless steps with end-to-end visibility.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '01', titleHi: 'पिकअप और ड्रॉप चुनें', titleEn: 'Enter Locations', descHi: 'कहाँ से कहाँ माल भेजना है, पता दर्ज करें।', descEn: 'Input exact pickup address and destination city.' },
            { step: '02', titleHi: 'सही वाहन चुनें', titleEn: 'Select Vehicle', descHi: 'टाटा एस, पिकअप, टेम्पो या भारी ट्रक चुनें।', descEn: 'Choose truck matching your cargo weight and volume.' },
            { step: '03', titleHi: 'बुकिंग कन्फर्म करें', titleEn: 'Confirm Booking', descHi: 'पारदर्शी किराया देखकर तुरंत बुक करें।', descEn: 'Check upfront quote and receive your unique Booking ID.' },
            { step: '04', titleHi: 'लाइव जीपीएस ट्रैकिंग', titleEn: 'Track Vehicle', descHi: 'हाईवे पर गाड़ी की रीयल-टाइम स्थिति देखें।', descEn: 'Monitor live movement, speed and ETA on interactive map.' },
            { step: '05', titleHi: 'सुरक्षित डिलीवरी प्राप्त करें', titleEn: 'Safe Delivery', descHi: 'माल गंतव्य पर पहुंचे, डिजिटल रसीद लें।', descEn: 'Cargo delivered safely with instant e-bilty invoice.' },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 relative"
            >
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                {item.step}
              </span>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                {language === 'hi' ? item.titleHi : item.titleEn}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'hi' ? item.descHi : item.descEn}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentView('booking')}
            className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30"
          >
            {language === 'hi' ? 'अभी वाहन बुक करें' : 'Start Booking Now'}
          </button>
        </div>
      </div>
    );
  }

  // SAFETY VIEW
  if (currentView === 'safety') {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            ZERO COMPROMISE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            {language === 'hi' ? 'सुरक्षा एवं विश्वसनीयता' : 'Safety & Compliance Standards'}
          </h1>
          <p className="text-sm text-slate-500">
            {language === 'hi'
              ? 'आपका माल हमारे लिए सर्वोपरि है। हर ट्रिप पर 100% सुरक्षा एवं जवाबदेही।'
              : 'Our commitment to secure cargo transit, verified drivers, and road safety.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <ShieldCheck className="w-10 h-10 text-emerald-600" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              {language === 'hi' ? '100% सत्यापित ड्राइवर पार्टनर' : '100% Verified Drivers'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === 'hi'
                ? 'कमर्शियल ड्राइविंग लाइसेंस, पृष्ठभूमि सत्यापन और ट्रैक रिकॉर्ड का गहन परीक्षण।'
                : 'Commercial driver licenses, background checks, and driving history are verified before onboard.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <Truck className="w-10 h-10 text-orange-600" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              {language === 'hi' ? 'फिटनेस एवं आरसी सत्यापन' : 'Vehicle Fitness & RC Checks'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === 'hi'
                ? 'प्रत्येक ट्रक का वैध आरसी, प्रदूषण प्रमाणपत्र (PUC), नेशनल परमिट और बीमा अनिवार्य है।'
                : 'Mandatory vehicle registration, pollution control, national road permit, and comprehensive insurance.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <MapPin className="w-10 h-10 text-emerald-600" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              {language === 'hi' ? 'रीयल-टाइम जीपीएस ट्रैकिंग' : 'Continuous GPS Tracking'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {language === 'hi'
                ? 'पिकअप से लेकर गंतव्य तक गाड़ी की सटीक स्थिति, ठहराव और स्पीड पर निरंतर निगरानी।'
                : 'Live location monitoring from point of dispatch to destination with speed alerts.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // PARTNER WITH US VIEW
  if (currentView === 'partner') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
            FLEET OWNERS & TRANSPORTERS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            {language === 'hi' ? 'वाहन सेतु के साथ बिजनेस पार्टनर बनें' : 'Partner With Us (Fleet Owners)'}
          </h1>
          <p className="text-sm text-slate-500">
            {language === 'hi'
              ? 'यदि आपके पास 2 या उससे अधिक कमर्शियल गाड़ियाँ हैं, तो हमारे नेटवर्क से जुड़कर नियमित बल्क ऑर्डर पाएं।'
              : 'Attach multiple commercial trucks, get corporate contracts and guaranteed freight volumes.'}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg">
          {partnerSent ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {language === 'hi' ? 'पार्टनर आवेदन प्राप्त हुआ!' : 'Partner Enquiry Submitted!'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'hi' ? 'विकास योगी एवं फ्लीट टीम आपसे 24 घंटे में संपर्क करेगी।' : 'Vikas Yogi and our fleet onboarding team will connect with you.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handlePartnerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Company / Transport Name</label>
                  <input
                    type="text"
                    value={partnerCompany}
                    onChange={(e) => setPartnerCompany(e.target.value)}
                    placeholder="e.g. Sikar Roadways Logistics"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Owner Name</label>
                  <input
                    type="text"
                    value={partnerOwner}
                    onChange={(e) => setPartnerOwner(e.target.value)}
                    placeholder="Owner Full Name"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={partnerPhone}
                    onChange={(e) => setPartnerPhone(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">City / Base</label>
                  <input
                    type="text"
                    value={partnerCity}
                    onChange={(e) => setPartnerCity(e.target.value)}
                    placeholder="e.g. Jaipur"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Number of Vehicles</label>
                  <input
                    type="number"
                    value={partnerTruckCount}
                    onChange={(e) => setPartnerTruckCount(e.target.value)}
                    min={1}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm shadow-md"
              >
                {language === 'hi' ? 'पार्टनर के रूप में आवेदन भेजें' : 'Become a Vahan Setu Partner'}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // FAQ VIEW
  if (currentView === 'faq') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            {language === 'hi' ? 'अक्सर पूछे जाने वाले सवाल' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-sm text-slate-500">
            {language === 'hi' ? 'बुकिंग, दरें, ट्रैकिंग एवं ड्राइवर रजिस्ट्रेशन से संबंधित सभी उत्तर' : 'Clear answers on pricing, booking, and operations'}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-extrabold text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4"
                >
                  <span>{language === 'hi' ? faq.qHi : faq.qEn}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {language === 'hi' ? faq.aHi : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // CONTACT US VIEW (Default fallback for contact)
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
          WE ARE HERE TO HELP
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {language === 'hi' ? 'वाहन सेतु से संपर्क करें' : 'Contact Vahan Setu'}
        </h1>
        <p className="text-sm text-slate-500">
          {language === 'hi'
            ? '24/7 कस्टमर हेल्पलाइन, माल बुकिंग एवं ड्राइवर सहायता के लिए सीधा संपर्क।'
            : 'Get in touch for freight bookings, transport contracts, and driver support.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Info (5 cols) */}
        <div className="md:col-span-5 bg-slate-900 text-white p-8 rounded-3xl space-y-6 shadow-xl">
          <div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
              COMPANY & OPERATIONS
            </span>
            <h3 className="text-2xl font-black mt-1">
              VAHAN SETU (वाहन सेतु)
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              "भारत का भरोसेमंद परिवहन साथी"
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-200">
            <div>
              <p className="text-slate-400 font-semibold mb-1">Primary Operations Contact:</p>
              <p className="text-base font-bold text-white">विकास योगी (Vikas Yogi)</p>
            </div>

            <div>
              <p className="text-slate-400 font-semibold mb-1">Clickable Helpline Numbers:</p>
              <div className="space-y-1.5">
                <a
                  href="tel:+919461695205"
                  className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  +91 94616 95205 (Primary)
                </a>
                <a
                  href="tel:+917014087695"
                  className="flex items-center gap-2 text-slate-300 font-semibold text-xs hover:text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  +91 70140 87695
                </a>
                <a
                  href="tel:+917615011370"
                  className="flex items-center gap-2 text-slate-300 font-semibold text-xs hover:text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  +91 76150 11370
                </a>
              </div>
            </div>

            <div>
              <p className="text-slate-400 font-semibold mb-1">WhatsApp Fast Assistance:</p>
              <a
                href="https://wa.me/919461695205?text=Hello%20Vahan%20Setu%2C%20I%20want%20to%20book%20a%20transport%20vehicle."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div>
              <p className="text-slate-400 font-semibold mb-1">Coverage:</p>
              <p>Pan-India (Rajasthan, Delhi NCR, Haryana, Punjab, Gujarat, UP, MP, Maharashtra & All States)</p>
            </div>
          </div>
        </div>

        {/* Message Form (7 cols) */}
        <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm space-y-4">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            {language === 'hi' ? 'सीधा संदेश भेजें' : 'Send us a Direct Message'}
          </h3>

          {contactSent && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
              ✓ {language === 'hi' ? 'संदेश प्राप्त हो गया! हम शीघ्र ही आपसे संपर्क करेंगे।' : 'Message received! Our team will respond promptly.'}
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {language === 'hi' ? 'आपका नाम' : 'Your Name'}
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Full Name"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {language === 'hi' ? 'मोबाइल नंबर' : 'Phone Number'}
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="10-digit phone"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {language === 'hi' ? 'संदेश या परिवहन आवश्यकता' : 'Message or Transport Requirement'}
              </label>
              <textarea
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                rows={4}
                placeholder="Enter your query, route details or cargo description..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'hi' ? 'संदेश भेजें' : 'Send Inquiry Message'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
