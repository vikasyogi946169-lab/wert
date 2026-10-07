import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, ArrowUp, X } from 'lucide-react';
import { Language } from '../types';

interface FloatingActionsProps {
  language: Language;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ language }) => {
  const [showCallMenu, setShowCallMenu] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent('Hello Vahan Setu, I want to book a transport vehicle.');
  const whatsappUrl = `https://wa.me/919461695205?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Call numbers popup menu */}
      {showCallMenu && (
        <div className="pointer-events-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-4 w-72 mb-1 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {language === 'hi' ? 'सीधा संपर्क हेल्पलाइन' : 'Direct Helpline Numbers'}
            </span>
            <button 
              onClick={() => setShowCallMenu(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-slate-500 my-2">
            {language === 'hi' ? '24/7 तुरंत बुकिंग व सहायता के लिए कॉल करें:' : 'Call our 24/7 operations desk directly:'}
          </p>
          <div className="space-y-2">
            <a
              href="tel:+919461695205"
              className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-all"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>9461695205 (Vikas Yogi)</span>
              </div>
              <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-normal">Primary</span>
            </a>
            <a
              href="tel:+917014087695"
              className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium transition-all"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>7014087695</span>
              </div>
              <span className="text-[10px] text-slate-400">Support 2</span>
            </a>
            <a
              href="tel:+917615011370"
              className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium transition-all"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>7615011370</span>
              </div>
              <span className="text-[10px] text-slate-400">Support 3</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Buttons Group */}
      <div className="pointer-events-auto flex items-center gap-2.5">
        {/* Back to top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-slate-800 text-white shadow-lg hover:bg-slate-700 active:scale-90 transition-all flex items-center justify-center"
            title="Back to Top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Quick Call Button */}
        <button
          onClick={() => setShowCallMenu(!showCallMenu)}
          className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 active:scale-95 transition-all flex items-center justify-center relative group"
          title="Call Helpline"
          aria-label="Call Helpline"
        >
          <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        </button>

        {/* Floating WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 px-4 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/35 active:scale-95 transition-all flex items-center gap-2 font-bold text-xs"
          title="Chat on WhatsApp"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4 fill-white" />
          </div>
          <span className="hidden sm:inline">
            {language === 'hi' ? 'WhatsApp पर संपर्क करें' : 'Chat on WhatsApp'}
          </span>
        </a>
      </div>
    </div>
  );
};
