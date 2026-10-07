/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, PageView, Theme, FontStyle, BookingRecord, DriverApplication, DriverEnquiry } from './types';
import { initialBookings, sampleDriverApplications } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { HomeHero } from './components/HomeHero';
import { MultiStepBooking } from './components/MultiStepBooking';
import { LiveTracking } from './components/LiveTracking';
import { DriverRegistration } from './components/DriverRegistration';
import { DriverDashboard } from './components/DriverDashboard';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ServicesAndVehiclesView } from './components/ServicesAndVehiclesView';
import { PricingCalculator } from './components/PricingCalculator';
import { OffersView } from './components/OffersView';
import { StaticPages } from './components/StaticPages';

export default function App() {
  // Language State (Defaults to English as requested)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('vahan_setu_lang');
    return (saved === 'en' || saved === 'hi') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('vahan_setu_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  // Theme State
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('vahan_setu_theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  useEffect(() => {
    localStorage.setItem('vahan_setu_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Font Style State (Default to Pure Italic)
  const [fontStyle, setFontStyle] = useState<FontStyle>(() => {
    const saved = localStorage.getItem('vahan_setu_font_style');
    return (saved === 'regular' || saved === 'italic') ? saved : 'italic';
  });

  useEffect(() => {
    localStorage.setItem('vahan_setu_font_style', fontStyle);
    const root = document.documentElement;
    if (fontStyle === 'italic') {
      root.classList.add('app-font-italic');
      root.classList.remove('app-font-regular');
    } else {
      root.classList.add('app-font-regular');
      root.classList.remove('app-font-italic');
    }
  }, [fontStyle]);

  const toggleFontStyle = () => {
    setFontStyle(prev => (prev === 'regular' ? 'italic' : 'regular'));
  };

  // Page View State
  const [currentView, setCurrentView] = useState<PageView>('home');

  // Bookings State
  const [allBookings, setAllBookings] = useState<BookingRecord[]>(() => {
    const saved = localStorage.getItem('vahan_setu_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialBookings;
      }
    }
    return initialBookings;
  });

  const handleBookingConfirmed = (newBooking: BookingRecord) => {
    const updated = [newBooking, ...allBookings];
    setAllBookings(updated);
    localStorage.setItem('vahan_setu_bookings', JSON.stringify(updated));
    setSelectedTrackingId(newBooking.id);
  };

  // Driver Applications State
  const [allDriverApplications, setAllDriverApplications] = useState<DriverApplication[]>(() => {
    const saved = localStorage.getItem('vahan_setu_driver_apps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return sampleDriverApplications;
      }
    }
    return sampleDriverApplications;
  });

  const handleApplicationSubmitted = (newApp: DriverApplication) => {
    const updated = [newApp, ...allDriverApplications];
    setAllDriverApplications(updated);
    localStorage.setItem('vahan_setu_driver_apps', JSON.stringify(updated));
  };

  const handleApproveDriver = (id: string) => {
    const updated = allDriverApplications.map(app => 
      app.id === id ? { ...app, status: 'approved' as const } : app
    );
    setAllDriverApplications(updated);
    localStorage.setItem('vahan_setu_driver_apps', JSON.stringify(updated));
  };

  const handleRejectDriver = (id: string) => {
    const updated = allDriverApplications.map(app => 
      app.id === id ? { ...app, status: 'rejected' as const } : app
    );
    setAllDriverApplications(updated);
    localStorage.setItem('vahan_setu_driver_apps', JSON.stringify(updated));
  };

  // Enquiries State
  const [allEnquiries, setAllEnquiries] = useState<DriverEnquiry[]>(() => {
    const saved = localStorage.getItem('vahan_setu_enquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'ENQ-901',
        name: 'रामनिवास कुमावत (Ramniwas Kumawat)',
        mobile: '9828012345',
        city: 'Jaipur',
        vehicleType: 'Tata Ace',
        vehicleNumber: 'RJ14 CP 7890',
        experience: '4 Years',
        message: 'Looking for regular FTL loads between Jaipur and Delhi.',
        submittedAt: '2026-10-01'
      }
    ];
  });

  const handleEnquirySubmitted = (enquiry: DriverEnquiry) => {
    const updated = [enquiry, ...allEnquiries];
    setAllEnquiries(updated);
    localStorage.setItem('vahan_setu_enquiries', JSON.stringify(updated));
  };

  // Booking initial data when navigating from hero/cards
  const [initialBookingData, setInitialBookingData] = useState<any>(null);

  // Selected Booking for Tracking
  const [selectedTrackingId, setSelectedTrackingId] = useState<string>('VS202610001');

  // Smooth scroll to top on page view change
  const navigateTo = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={navigateTo}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
        fontStyle={fontStyle}
        toggleFontStyle={toggleFontStyle}
        onOpenQuickBook={() => navigateTo('booking')}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeHero
            language={language}
            setCurrentView={navigateTo}
            fontStyle={fontStyle}
            toggleFontStyle={toggleFontStyle}
            onInitiateBooking={(data) => {
              setInitialBookingData(data);
              navigateTo('booking');
            }}
          />
        )}

        {currentView === 'booking' && (
          <MultiStepBooking
            language={language}
            setCurrentView={navigateTo}
            initialBookingData={initialBookingData}
            onBookingConfirmed={handleBookingConfirmed}
          />
        )}

        {currentView === 'tracking' && (
          <LiveTracking
            language={language}
            selectedBookingId={selectedTrackingId}
            allBookings={allBookings}
          />
        )}

        {currentView === 'drivers' && (
          <DriverRegistration
            language={language}
            onApplicationSubmitted={handleApplicationSubmitted}
            onEnquirySubmitted={handleEnquirySubmitted}
          />
        )}

        {currentView === 'driver-dashboard' && (
          <DriverDashboard
            language={language}
          />
        )}

        {currentView === 'customer-dashboard' && (
          <CustomerDashboard
            language={language}
            setCurrentView={navigateTo}
            allBookings={allBookings}
            onSelectBookingForTracking={(bId) => {
              setSelectedTrackingId(bId);
              navigateTo('tracking');
            }}
          />
        )}

        {currentView === 'admin-dashboard' && (
          <AdminDashboard
            language={language}
            allDriverApplications={allDriverApplications}
            allEnquiries={allEnquiries}
            allBookings={allBookings}
            onApproveDriver={handleApproveDriver}
            onRejectDriver={handleRejectDriver}
          />
        )}

        {(currentView === 'services' || currentView === 'vehicles') && (
          <ServicesAndVehiclesView
            language={language}
            setCurrentView={navigateTo}
            onSelectVehicleForBooking={(vId) => {
              setInitialBookingData({ vehicleId: vId });
            }}
          />
        )}

        {currentView === 'pricing' && (
          <PricingCalculator
            language={language}
            setCurrentView={navigateTo}
            onInitiateBookingWithPricing={(pricingData) => {
              setInitialBookingData(pricingData);
            }}
          />
        )}

        {currentView === 'offers' && (
          <OffersView
            language={language}
            setCurrentView={navigateTo}
            onApplyCouponToBooking={(couponCode) => {
              setInitialBookingData({ couponCode });
            }}
          />
        )}

        {[
          'about', 
          'safety', 
          'how-it-works', 
          'partner', 
          'contact', 
          'faq'
        ].includes(currentView) && (
          <StaticPages
            language={language}
            currentView={currentView}
            setCurrentView={navigateTo}
          />
        )}
      </main>

      {/* Floating Action Buttons */}
      <FloatingActions language={language} />

      {/* Footer */}
      <Footer
        language={language}
        setCurrentView={navigateTo}
      />
    </div>
  );
}
