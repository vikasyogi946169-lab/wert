import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  Users, 
  Truck, 
  MapPin, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { Language, DriverApplication, DriverEnquiry, BookingRecord } from '../types';
import { getTranslation } from '../data/translations';

interface AdminDashboardProps {
  language: Language;
  allDriverApplications: DriverApplication[];
  allEnquiries: DriverEnquiry[];
  allBookings: BookingRecord[];
  onApproveDriver: (id: string) => void;
  onRejectDriver: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  language,
  allDriverApplications,
  allEnquiries,
  allBookings,
  onApproveDriver,
  onRejectDriver,
}) => {
  const t = getTranslation(language);
  const [filterState, setFilterState] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'map' | 'drivers' | 'bookings' | 'enquiries'>('map');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Mock Fleet vehicles across India for map
  const fleetVehicles = [
    { id: 'V1', number: 'RJ14 AB 1234', driver: 'Rajesh Kumar', city: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873, type: 'Tata Ace', status: 'ontrip' },
    { id: 'V2', number: 'HR26 DK 8901', driver: 'Suresh Gurjar', city: 'Gurugram', state: 'Haryana', lat: 28.4595, lng: 77.0266, type: 'Pickup', status: 'online' },
    { id: 'V3', number: 'DL01 EA 4455', driver: 'Manoj Verma', city: 'New Delhi', state: 'Delhi NCR', lat: 28.6139, lng: 77.2090, type: 'Tempo 14ft', status: 'idle' },
    { id: 'V4', number: 'RJ23 GA 4567', driver: 'Mukesh Saini', city: 'Sikar', state: 'Rajasthan', lat: 27.6094, lng: 75.1398, type: 'Mini Truck', status: 'ontrip' },
    { id: 'V5', number: 'GJ01 XX 7788', driver: 'Patel Jignesh', city: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714, type: 'Heavy 12W', status: 'online' },
    { id: 'V6', number: 'MH02 CC 9900', driver: 'Sachin Patil', city: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777, type: '32ft Container', status: 'ontrip' },
    { id: 'V7', number: 'UP32 BB 3322', driver: 'Dinesh Yadav', city: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462, type: '6 Wheeler', status: 'idle' },
    { id: 'V8', number: 'PB10 KK 1122', driver: 'Harpreet Singh', city: 'Ludhiana', state: 'Punjab', lat: 30.9010, lng: 75.8573, type: 'Heavy 10W', status: 'offline' }
  ];

  const filteredVehicles = fleetVehicles.filter(v => {
    const matchesSearch = v.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.city.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filterState !== 'all' && v.state !== filterState) return false;
    if (filterStatus !== 'all' && v.status !== filterStatus) return false;
    return true;
  });

  // Initialize Admin Fleet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [25.5, 76.5],
        zoom: 6,
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

    // Clear previous markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Color map for status
    const statusColors: Record<string, string> = {
      online: '#16a34a',  // Green
      idle: '#eab308',    // Yellow
      ontrip: '#2563eb',  // Blue
      offline: '#dc2626'  // Red
    };

    filteredVehicles.forEach(v => {
      const markerColor = statusColors[v.status] || '#16a34a';
      const icon = L.divIcon({
        className: 'admin-truck-marker',
        html: `
          <div style="background:${markerColor};color:white;padding:3px 7px;border-radius:6px;font-size:10px;font-weight:bold;white-space:nowrap;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;gap:3px;">
            <span>🚚</span> ${v.number}
          </div>
        `,
        iconSize: [90, 22],
        iconAnchor: [45, 11]
      });

      L.marker([v.lat, v.lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="font-size:12px;line-height:1.4;">
            <b>${v.number}</b> (${v.type})<br>
            Driver: <b>${v.driver}</b><br>
            City: ${v.city} (${v.state})<br>
            Status: <b style="color:${markerColor};text-transform:uppercase;">${v.status}</b>
          </div>
        `);
    });
  }, [filteredVehicles]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest block">
            OPERATIONS & FLEET CONTROL ROOM
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {language === 'hi' ? 'वाहन सेतु एडमिन डैशबोर्ड' : 'Vahan Setu Admin Control Center'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Fleet monitoring, driver approvals, active shipments & revenue metrics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-live-pulse" />
            Operations Lead: Vikas Yogi
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Trucks</span>
          <p className="text-xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">1,480</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">+48 this week</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Drivers</span>
          <p className="text-xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">920</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Verified RC & DL</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Online Right Now</span>
          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">640</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Ready for dispatch</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Trips</span>
          <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1 tabular-nums">142</p>
          <p className="text-[10px] text-blue-600 font-semibold mt-0.5">Live on highways</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Completed Trips</span>
          <p className="text-xl font-black text-slate-900 dark:text-white mt-1 tabular-nums">8,450</p>
          <p className="text-[10px] text-slate-500 mt-0.5">99.4% On-time</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Gross Freight</span>
          <p className="text-xl font-black text-orange-600 dark:text-orange-400 mt-1 tabular-nums">₹42.8 Lakh</p>
          <p className="text-[10px] text-orange-600 font-semibold mt-0.5">Current month</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('map')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'map'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'hi' ? 'लाइव फ्लीट मैप (Live Map)' : 'Pan-India Fleet Map'}
        </button>
        <button
          onClick={() => setActiveTab('drivers')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'drivers'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>{language === 'hi' ? 'ड्राइवर रजिस्ट्रेशन समीक्षा' : 'Driver Registration Review'}</span>
          <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 text-xs flex items-center justify-center font-bold">
            {allDriverApplications.filter(a => a.status === 'pending').length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'bookings'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'hi' ? 'बुकिंग्स मास्टर लिस्ट' : 'All Bookings'}
        </button>
        <button
          onClick={() => setActiveTab('enquiries')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'enquiries'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {language === 'hi' ? 'पूछताछ व लीड्स' : 'Customer Enquiries'}
        </button>
      </div>

      {/* TAB 1: Live Fleet Map & Filters */}
      {activeTab === 'map' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <label className="text-slate-500 font-bold block mb-1">State Filter</label>
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
              >
                <option value="all">All States</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Haryana">Haryana</option>
                <option value="Punjab">Punjab</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
            </div>

            <div>
              <label className="text-slate-500 font-bold block mb-1">Status Filter</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
              >
                <option value="all">All Statuses</option>
                <option value="online">🟢 Online (Available)</option>
                <option value="ontrip">🔵 On Trip (In Transit)</option>
                <option value="idle">🟡 Idle</option>
                <option value="offline">🔴 Offline</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-slate-500 font-bold block mb-1">Search Plate or Driver</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="E.g. RJ14, Rajesh, Jaipur..."
                  className="w-full pl-9 pr-3 p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                />
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm h-[520px] relative">
            <div ref={mapContainerRef} className="w-full h-full relative z-10" />
            <div className="absolute top-4 right-4 z-20 bg-slate-950/90 backdrop-blur-md text-white text-[11px] p-3 rounded-xl border border-slate-800 space-y-1 pointer-events-none shadow-xl">
              <p className="font-bold text-slate-300">Fleet Markers Legend:</p>
              <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> 🟢 Online & Available</p>
              <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> 🔵 On Active Trip</p>
              <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500" /> 🟡 Idle at Hub</p>
              <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /> 🔴 Offline</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Driver Applications Approval Queue */}
      {activeTab === 'drivers' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Driver Partner Applications Verification Queue
            </h3>
            <span className="text-xs text-slate-500">
              {allDriverApplications.length} Submissions recorded
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">App ID</th>
                  <th className="p-4">Driver Name</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">City</th>
                  <th className="p-4">Vehicle Type</th>
                  <th className="p-4">Vehicle Plate</th>
                  <th className="p-4">License No.</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Review Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {allDriverApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white tabular-nums">{app.id}</td>
                    <td className="p-4 font-medium">{app.fullName}</td>
                    <td className="p-4 text-slate-500">{app.mobile}</td>
                    <td className="p-4 text-slate-500">{app.city}</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300 font-semibold">{app.vehicleType}</td>
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white uppercase">{app.vehicleNumber}</td>
                    <td className="p-4 font-mono text-slate-500">{app.licenseNumber}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        app.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : app.status === 'rejected'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {app.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onApproveDriver(app.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => onRejectDriver(app.id)}
                            className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 font-bold text-[11px]"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: All Bookings Master List */}
      {activeTab === 'bookings' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Booking ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Route</th>
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Driver</th>
                  <th className="p-4">Fare</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {allBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white tabular-nums">{b.id}</td>
                    <td className="p-4 font-medium">{b.customerName}</td>
                    <td className="p-4">{b.pickupCity} → {b.dropCity}</td>
                    <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">{b.vehicleName}</td>
                    <td className="p-4 text-slate-500">{b.driverName}</td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white tabular-nums">₹{b.estimatedFare}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        {b.statusTextEn}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Customer Enquiries */}
      {activeTab === 'enquiries' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Lead Inquiries & Driver Callbacks
          </h3>
          <div className="space-y-3">
            {allEnquiries.length === 0 ? (
              <p className="text-xs text-slate-500">No pending enquiries at the moment.</p>
            ) : (
              allEnquiries.map(enq => (
                <div key={enq.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{enq.name} ({enq.city})</p>
                    <p className="text-slate-500">Vehicle: {enq.vehicleType} · Phone: {enq.mobile}</p>
                    {enq.message && <p className="text-slate-600 dark:text-slate-300 mt-1 italic">"{enq.message}"</p>}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${enq.mobile}`}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                    >
                      Call Lead
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
