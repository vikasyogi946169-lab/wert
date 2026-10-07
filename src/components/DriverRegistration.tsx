import React, { useState } from 'react';
import { 
  UserCheck, 
  FileText, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Upload, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { Language, DriverApplication, DriverEnquiry } from '../types';
import { getTranslation } from '../data/translations';
import { sampleDriverApplications } from '../data/mockData';

interface DriverRegistrationProps {
  language: Language;
  onApplicationSubmitted: (app: DriverApplication) => void;
  onEnquirySubmitted: (enquiry: DriverEnquiry) => void;
}

export const DriverRegistration: React.FC<DriverRegistrationProps> = ({
  language,
  onApplicationSubmitted,
  onEnquirySubmitted,
}) => {
  const t = getTranslation(language);

  // Form State
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [mobile, setMobile] = useState('');
  const [altMobile, setAltMobile] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Sikar');
  const [state, setState] = useState('Rajasthan');
  const [pinCode, setPinCode] = useState('332001');

  // License
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseHolderName, setLicenseHolderName] = useState('');
  const [licenseCategory, setLicenseCategory] = useState('Commercial Transport (LMV-TR)');
  const [licenseExpiry, setLicenseExpiry] = useState('');
  const [uploadedLicenseDoc, setUploadedLicenseDoc] = useState<string | null>(null);

  // Vehicle
  const [vehicleOwnerName, setVehicleOwnerName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('Tata Ace');
  const [vehicleModel, setVehicleModel] = useState('Tata Ace Gold Diesel');
  const [vehicleYear, setVehicleYear] = useState('2023');
  const [rcNumber, setRcNumber] = useState('');
  const [uploadedRcDoc, setUploadedRcDoc] = useState<string | null>(null);

  // Experience & Routes
  const [experienceYears, setExperienceYears] = useState('5');
  const [preferredRoutes, setPreferredRoutes] = useState<string[]>([
    'Local Transport',
    'Intercity Transport',
    'Part Load'
  ]);

  // Bank / Payment
  const [bankAccount, setBankAccount] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');
  const [bankName, setBankName] = useState('');
  const [upiId, setUpiId] = useState('');

  // Agreement
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedCorrect, setAgreedCorrect] = useState(false);

  // Submitted Application result
  const [submittedApp, setSubmittedApp] = useState<DriverApplication | null>(null);

  // Quick Enquiry Form State
  const [enqName, setEnqName] = useState('');
  const [enqPhone, setEnqPhone] = useState('');
  const [enqCity, setEnqCity] = useState('');
  const [enqVehicle, setEnqVehicle] = useState('Tata Ace');
  const [enqMsg, setEnqMsg] = useState('');
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  const toggleRoute = (route: string) => {
    if (preferredRoutes.includes(route)) {
      setPreferredRoutes(preferredRoutes.filter(r => r !== route));
    } else {
      setPreferredRoutes([...preferredRoutes, route]);
    }
  };

  const handleSimulateDocUpload = (type: 'license' | 'rc') => {
    if (type === 'license') {
      setUploadedLicenseDoc('DL_DOCUMENT_PREVIEW_VERIFIED.pdf (Demo Scan)');
    } else {
      setUploadedRcDoc('VEHICLE_RC_DOCUMENT_PREVIEW.pdf (Demo Scan)');
    }
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms || !agreedCorrect) {
      alert(language === 'hi' ? 'कृपया सभी नियम व शर्तों पर टिक करें।' : 'Please accept terms and confirm accuracy.');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newAppId = `VS-DRV-2026-${randomNum}`;

    const newApp: DriverApplication = {
      id: newAppId,
      fullName,
      fatherName,
      mobile,
      altMobile,
      email,
      dob,
      city,
      state,
      pinCode,
      licenseNumber,
      licenseHolderName: licenseHolderName || fullName,
      licenseCategory,
      licenseExpiry,
      vehicleType,
      vehicleNumber,
      vehicleModel,
      vehicleYear,
      rcNumber,
      experienceYears: `${experienceYears} Years`,
      routes: preferredRoutes,
      bankAccount,
      bankIfsc,
      upiId,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'pending',
      hasLicenseDoc: !!uploadedLicenseDoc,
      hasRcDoc: !!uploadedRcDoc,
    };

    setSubmittedApp(newApp);
    onApplicationSubmitted(newApp);
  };

  const handleQuickEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEnquiry: DriverEnquiry = {
      id: 'ENQ-' + Date.now().toString().slice(-4),
      name: enqName,
      mobile: enqPhone,
      city: enqCity,
      vehicleType: enqVehicle,
      vehicleNumber: 'Pending',
      experience: '2+ Years',
      message: enqMsg,
      submittedAt: new Date().toISOString().split('T')[0],
    };
    onEnquirySubmitted(newEnquiry);
    setEnquirySuccess(true);
    setTimeout(() => setEnquirySuccess(false), 5000);
    setEnqName('');
    setEnqPhone('');
    setEnqCity('');
    setEnqMsg('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
          {language === 'hi' ? 'ड्राइवर पार्टनर भर्ती पोर्टल' : 'DRIVER PARTNER NETWORK'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {language === 'hi' ? 'वाहन सेतु के साथ ड्राइवर बनें' : 'Become a Driver Partner with Vahan Setu'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {language === 'hi'
            ? 'अपना वाहन चलाएं, अधिक ट्रिप पाएं और अपनी कमाई बढ़ाएं। दैनिक पारदर्शी भुगतान एवं 24/7 सहायता।'
            : 'Drive your vehicle, get steady trips and grow your earnings. Daily instant payouts and 24/7 road support.'}
        </p>
      </div>

      {/* Main Grid: Registration Form (8 cols) + Enquiry / Benefits Card (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Complete Multi-Section Form */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg">
          {submittedApp ? (
            /* Success confirmation card */
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                  ✓ Registration Submitted
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {language === 'hi'
                    ? 'आपका ड्राइवर आवेदन सफलतापूर्वक प्राप्त हो गया है!'
                    : 'Your Driver Application Has Been Received!'}
                </h2>
                <p className="text-xs text-slate-500 mt-2">
                  {language === 'hi'
                    ? 'वाहन सेतु संचालन टीम 24 घंटे के भीतर दस्तावेजों का सत्यापन कर आपकी आईडी सक्रिय करेगी।'
                    : 'Our verification team will review your submitted documents and activate your driver account within 24 hours.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-slate-500 font-medium">Application ID</span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {submittedApp.id}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-slate-500">{language === 'hi' ? 'ड्राइवर का नाम' : 'Driver Name'}</p>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">{submittedApp.fullName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">{language === 'hi' ? 'मोबाइल नंबर' : 'Phone'}</p>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">{submittedApp.mobile}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">{language === 'hi' ? 'वाहन प्रकार' : 'Vehicle'}</p>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">{submittedApp.vehicleType}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">{language === 'hi' ? 'वाहन नंबर' : 'Vehicle Plate'}</p>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">{submittedApp.vehicleNumber}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://wa.me/919461695205?text=Hello%20Vahan%20Setu%2C%20I%20have%20submitted%20my%20driver%20application."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Driver Support</span>
                </a>

                <a
                  href="tel:+919461695205"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Operations: 9461695205</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSubmittedApp(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitRegistration} className="space-y-8">
              {/* SECTION 1: Personal Details */}
              <div className="space-y-4">
                <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 text-xs flex items-center justify-center font-bold">1</span>
                    <span>{t.personalDetails}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar Sharma"
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'पिता का नाम' : "Father's Name"}
                    </label>
                    <input
                      type="text"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      placeholder="e.g. Shri Ramswaroop Sharma"
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                    </label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="10-digit Mobile number"
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'वैकल्पिक मोबाइल / घर का नंबर' : 'Alternate Mobile Number'}
                    </label>
                    <input
                      type="tel"
                      value={altMobile}
                      onChange={(e) => setAltMobile(e.target.value)}
                      placeholder="Alternate phone"
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'शहर / जिला' : 'City / District'} *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'राज्य (State)' : 'State'} *
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">PIN Code</label>
                    <input
                      type="text"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Driving License Details */}
              <div className="space-y-4">
                <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 text-xs flex items-center justify-center font-bold">2</span>
                    <span>{t.licenseDetails}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'ड्राइविंग लाइसेंस नंबर *' : 'Driving License Number *'}
                    </label>
                    <input
                      type="text"
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      placeholder="e.g. RJ14 20180012345"
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'लाइसेंस पर धारक का नाम' : 'License Holder Name'}
                    </label>
                    <input
                      type="text"
                      value={licenseHolderName}
                      onChange={(e) => setLicenseHolderName(e.target.value)}
                      placeholder="As printed on license"
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'लाइसेंस श्रेणी' : 'License Category'}
                    </label>
                    <select
                      value={licenseCategory}
                      onChange={(e) => setLicenseCategory(e.target.value)}
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                    >
                      <option value="Commercial Transport (LMV-TR)">LMV-TR (Commercial Transport)</option>
                      <option value="Heavy Motor Vehicle (HMV)">HMV (Heavy Commercial Multi-axle)</option>
                      <option value="LMV Non-Transport">LMV (Light Motor Vehicle)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'लाइसेंस समाप्ति तारीख (Expiry)' : 'Expiry Date'}
                    </label>
                    <input
                      type="date"
                      value={licenseExpiry}
                      onChange={(e) => setLicenseExpiry(e.target.value)}
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                    />
                  </div>
                </div>

                {/* Upload Driving License (simulated preview) */}
                <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {language === 'hi' ? 'ड्राइविंग लाइसेंस कॉपी अपलोड करें' : 'Upload Driving License Copy'}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {uploadedLicenseDoc || (language === 'hi' ? 'JPG, PNG या PDF (डेमो सिमुलेशन)' : 'Clear front and back image / PDF')}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSimulateDocUpload('license')}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadedLicenseDoc ? 'Uploaded ✓' : 'Choose File'}</span>
                  </button>
                </div>
              </div>

              {/* SECTION 3: Vehicle Information */}
              <div className="space-y-4">
                <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 text-xs flex items-center justify-center font-bold">3</span>
                    <span>{t.vehicleDetails}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'वाहन मालिक का नाम *' : 'Vehicle Owner Name *'}
                    </label>
                    <input
                      type="text"
                      value={vehicleOwnerName}
                      onChange={(e) => setVehicleOwnerName(e.target.value)}
                      placeholder="Owner Name on RC"
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'गाड़ी का नंबर (Vehicle Plate) *' : 'Vehicle Registration Number *'}
                    </label>
                    <input
                      type="text"
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value)}
                      placeholder="e.g. RJ14 AB 1234"
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5 uppercase"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'वाहन का प्रकार *' : 'Vehicle Type *'}
                    </label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                    >
                      <option value="Tata Ace (छोटा हाथी)">Tata Ace (छोटा हाथी)</option>
                      <option value="Mahindra Bolero Pickup">Mahindra Bolero Pickup</option>
                      <option value="Ashok Leyland Dost / Mini Truck">Ashok Leyland Dost / Mini Truck</option>
                      <option value="Tempo 14ft">Tempo 14ft (आयशर)</option>
                      <option value="LCV 17ft - 19ft">LCV 17ft - 19ft</option>
                      <option value="6 Wheeler Truck">6 Wheeler Truck (9 Ton)</option>
                      <option value="10 Wheeler Heavy Truck">10 Wheeler Heavy Truck</option>
                      <option value="12 Wheeler Heavy Truck">12 Wheeler Heavy Truck</option>
                      <option value="14 Wheeler Multi-Axle">14 Wheeler Multi-Axle</option>
                      <option value="32ft Container">32ft High-cube Container</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'मॉडल व कंपनी' : 'Vehicle Model / Make'}
                    </label>
                    <input
                      type="text"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      placeholder="e.g. Tata Ace Gold / Bolero"
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'निर्माण वर्ष (Year)' : 'Manufacturing Year'}
                    </label>
                    <input
                      type="number"
                      value={vehicleYear}
                      onChange={(e) => setVehicleYear(e.target.value)}
                      min={2010}
                      max={2026}
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                    />
                  </div>
                </div>

                {/* Upload RC (simulated preview) */}
                <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Truck className="w-8 h-8 text-orange-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {language === 'hi' ? 'वाहन आरसी (RC) व इंश्योरेंस अपलोड करें' : 'Upload Vehicle RC & Insurance'}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {uploadedRcDoc || (language === 'hi' ? 'आरसी कॉपी एवं वैध फिटनेस प्रमाणपत्र' : 'Vehicle registration certificate copy')}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSimulateDocUpload('rc')}
                    className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadedRcDoc ? 'Uploaded ✓' : 'Choose RC File'}</span>
                  </button>
                </div>
              </div>

              {/* SECTION 4: Experience & Preferred Routes */}
              <div className="space-y-4">
                <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 text-xs flex items-center justify-center font-bold">4</span>
                    <span>{t.experienceDetails}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'ड्राइविंग का कुल अनुभव (वर्ष)' : 'Total Driving Experience (Years)'}
                    </label>
                    <input
                      type="number"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      min={1}
                      max={40}
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'पूर्व ट्रांसपोर्ट कंपनी (वैकल्पिक)' : 'Previous Transport Firm'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Self-employed / Local Transport"
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">
                    {language === 'hi' ? 'पसंदीदा रूट एवं कार्य क्षेत्र' : 'Preferred Working Routes'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'Local Transport',
                      'Intercity Transport',
                      'All India Transport',
                      'Full Truck Load',
                      'Part Load'
                    ].map(r => (
                      <label
                        key={r}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                          preferredRoutes.includes(r)
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={preferredRoutes.includes(r)}
                          onChange={() => toggleRoute(r)}
                          className="w-4 h-4 text-emerald-600 rounded"
                        />
                        <span>{r}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 5: Bank / Settlement Details */}
              <div className="space-y-4">
                <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 text-xs flex items-center justify-center font-bold">5</span>
                    <span>{t.bankDetails}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'खाता धारक का नाम' : 'Account Holder Name'}
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      readOnly
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 p-2.5"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'बैंक का नाम' : 'Bank Name'}
                    </label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. State Bank of India / Bank of Baroda"
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                      {language === 'hi' ? 'बैंक खाता संख्या' : 'Account Number'}
                    </label>
                    <input
                      type="text"
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                      placeholder="Bank Account Number"
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">IFSC Code</label>
                    <input
                      type="text"
                      value={bankIfsc}
                      onChange={(e) => setBankIfsc(e.target.value)}
                      placeholder="e.g. SBIN0031245"
                      className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5 uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">UPI ID (Google Pay / PhonePe / Paytm)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. 9461695205@upi"
                    className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                  />
                </div>
              </div>

              {/* SECTION 6: Declarations & CTA */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-3">
                <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded mt-0.5"
                    required
                  />
                  <span>{t.iAgreeTerms}</span>
                </label>

                <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedCorrect}
                    onChange={(e) => setAgreedCorrect(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded mt-0.5"
                    required
                  />
                  <span>{t.iConfirmCorrect}</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 active:scale-95 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <UserCheck className="w-5 h-5" />
                <span>{t.registerDriverCTA}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column (4 cols): Quick Enquiry Card + Partner Benefits */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Enquiry Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
            <div>
              <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block">
                QUICK ENQUIRY
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                {t.driverEnquiryTitle}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'hi' ? 'संक्षिप्त जानकारी भेजें, हमारी टीम तुरंत कॉल करेगी' : 'Submit your quick details, our team will call back'}
              </p>
            </div>

            {enquirySuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                ✓ {language === 'hi' ? 'धन्यवाद! वाहन सेतु टीम शीघ्र ही संपर्क करेगी।' : 'Thank you! Vahan Setu team will contact you soon.'}
              </div>
            )}

            <form onSubmit={handleQuickEnquirySubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={enqName}
                  onChange={(e) => setEnqName(e.target.value)}
                  placeholder={language === 'hi' ? 'आपका नाम' : 'Your Name'}
                  className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  value={enqPhone}
                  onChange={(e) => setEnqPhone(e.target.value)}
                  placeholder={language === 'hi' ? 'मोबाइल नंबर' : 'Phone Number'}
                  className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={enqCity}
                  onChange={(e) => setEnqCity(e.target.value)}
                  placeholder={language === 'hi' ? 'शहर' : 'City'}
                  className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                  required
                />
                <select
                  value={enqVehicle}
                  onChange={(e) => setEnqVehicle(e.target.value)}
                  className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                >
                  <option value="Tata Ace">Tata Ace</option>
                  <option value="Pickup">Pickup</option>
                  <option value="Tempo">Tempo</option>
                  <option value="LCV">LCV</option>
                  <option value="Heavy Truck">Heavy Truck</option>
                </select>
              </div>

              <div>
                <textarea
                  value={enqMsg}
                  onChange={(e) => setEnqMsg(e.target.value)}
                  rows={2}
                  placeholder={language === 'hi' ? 'कोई सवाल या रूट का विवरण...' : 'Message / route queries...'}
                  className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-2.5"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-all"
              >
                {t.submitEnquiry}
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <a
                href="https://wa.me/919461695205?text=Hello%20Vahan%20Setu%2C%20I%20want%20to%20register%20as%20a%20driver%20partner."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all block text-center"
              >
                <MessageSquare className="w-4 h-4 inline" />
                <span>WhatsApp Driver Support</span>
              </a>
            </div>
          </div>

          {/* Benefits Showcase Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>{language === 'hi' ? 'वाहन सेतु से जुड़ने के फायदे' : 'Why Partner with Vahan Setu?'}</span>
            </h4>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                <p><strong className="text-white">दैनिक त्वरित भुगतान:</strong> प्रत्येक पूर्ण ट्रिप का भुगतान सीधे आपके बैंक खाते या UPI में।</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                <p><strong className="text-white">न्यूनतम कमीशन:</strong> भारत में सबसे कम प्लेटफॉर्म शुल्क ताकि आपकी कमाई अधिकतम हो।</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                <p><strong className="text-white">वापसी का भाड़ा (Return Load):</strong> खाली गाड़ी वापस आने की चिंता नहीं, दोनों तरफ का माल उपलब्ध।</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                <p><strong className="text-white">24/7 रोड असिस्टेंस:</strong> हाईवे पर किसी भी आपात स्थिति में विकास योगी एवं हेल्पलाइन सपोर्ट।</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
