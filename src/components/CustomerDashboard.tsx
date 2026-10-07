import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Navigation, 
  Download, 
  Phone, 
  MessageSquare, 
  Wallet, 
  Tag, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Language, PageView, BookingRecord } from '../types';
import { getTranslation } from '../data/translations';

interface CustomerDashboardProps {
  language: Language;
  setCurrentView: (view: PageView) => void;
  allBookings: BookingRecord[];
  onSelectBookingForTracking: (bookingId: string) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  language,
  setCurrentView,
  allBookings,
  onSelectBookingForTracking,
}) => {
  const t = getTranslation(language);
  const [activeTab, setActiveTab] = useState<'bookings' | 'history' | 'wallet' | 'saved'>('bookings');

  const activeBooking = allBookings.find(b => b.status !== 'delivered') || allBookings[0];
  const completedBookings = allBookings.filter(b => b.status === 'delivered');

  const handleTrackActiveBooking = (bookingId: string) => {
    onSelectBookingForTracking(bookingId);
    setCurrentView('tracking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Customer Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-emerald-600/20">
            AS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 dark:text-white">
                Amit Sharma
              </h1>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                Verified Customer
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              +91 98290 12345 · amit.sharma@example.com · Jaipur, Rajasthan
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('booking')}
          className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center gap-2"
        >
          <Truck className="w-4 h-4" />
          <span>{language === 'hi' ? 'नया वाहन बुक करें' : 'Book New Truck'}</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Bookings
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">
            {allBookings.length}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Commercial & Household</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Active Booking
          </span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
            {allBookings.filter(b => b.status !== 'delivered').length} Active
          </p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Live tracking active</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Completed Trips
          </span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">
            {completedBookings.length}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">E-bilty receipts saved</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Wallet Balance
          </span>
          <p className="text-2xl font-black text-orange-600 dark:text-orange-400 mt-1 tabular-nums">
            ₹850
          </p>
          <p className="text-[10px] text-orange-600 font-semibold mt-0.5">Cashback credits</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'bookings'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'hi' ? 'सक्रिय बुकिंग' : 'Active Booking'}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'history'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'hi' ? 'बुकिंग इतिहास' : 'Booking History'}
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'saved'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'hi' ? 'सहेजे गए स्थान' : 'Saved Locations'}
        </button>
      </div>

      {/* Tab 1: Active Booking Live Card */}
      {activeTab === 'bookings' && activeBooking && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                ACTIVE SHIPMENT
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Booking ID: {activeBooking.id}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-live-pulse" />
                {activeBooking.statusTextEn}
              </span>
              <button
                onClick={() => handleTrackActiveBooking(activeBooking.id)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-emerald-600/20"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Track My Vehicle</span>
              </button>
            </div>
          </div>

          {/* Details Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">ROUTE DETAILS</p>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">From: {activeBooking.pickupCity}</p>
                <p className="text-slate-500 text-[11px]">{activeBooking.pickupAddress}</p>
              </div>
              <div className="pt-1">
                <p className="font-bold text-slate-900 dark:text-white">To: {activeBooking.dropCity}</p>
                <p className="text-slate-500 text-[11px]">{activeBooking.dropAddress}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">VEHICLE & DRIVER</p>
              <p className="text-sm font-black text-slate-900 dark:text-white">{activeBooking.vehicleNumber}</p>
              <p className="text-slate-600 dark:text-slate-300 font-semibold">{activeBooking.vehicleName}</p>
              <p className="text-slate-500">Driver: {activeBooking.driverName} (⭐ {activeBooking.driverRating})</p>
              <div className="flex gap-2 pt-1">
                <a
                  href={`tel:+91${activeBooking.driverPhone}`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/91${activeBooking.driverPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-green-600 text-white font-bold flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">STATUS & ETA</p>
              <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                ETA: {activeBooking.eta}
              </p>
              <p className="text-slate-600 dark:text-slate-400">Current: {activeBooking.currentLocationName}</p>
              <p className="text-slate-600 dark:text-slate-400">Fare: <strong className="text-slate-900 dark:text-white tabular-nums">₹{activeBooking.estimatedFare}</strong></p>
              <p className="text-[11px] text-slate-400">Payment: {activeBooking.paymentMethod}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: History Table */}
      {activeTab === 'history' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Booking ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Route</th>
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Fare</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {allBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white tabular-nums">{b.id}</td>
                    <td className="p-4 text-slate-500">{b.bookingDate}</td>
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                      {b.pickupCity} → {b.dropCity}
                    </td>
                    <td className="p-4 text-slate-500">{b.vehicleName}</td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white tabular-nums">
                      ₹{b.estimatedFare}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        b.status === 'delivered'
                          ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {b.status === 'delivered' ? 'Delivered' : 'In Transit'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => window.print()}
                        className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 justify-end"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Saved Locations */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-emerald-600">Primary Warehouse</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">Jaipur VKIA Factory Hub</p>
            <p className="text-xs text-slate-500">Road No. 14, Vishwakarma Industrial Area, Jaipur, Rajasthan</p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-orange-600">Distribution Depot</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">Delhi Okhla Depot</p>
            <p className="text-xs text-slate-500">Phase-III, Okhla Industrial Estate, New Delhi</p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold text-blue-600">Regional Branch</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">Sikar Commercial Outlet</p>
            <p className="text-xs text-slate-500">Piprali Road Circle, Station Area, Sikar, Rajasthan</p>
          </div>
        </div>
      )}
    </div>
  );
};
