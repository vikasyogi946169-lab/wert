import React, { useState } from 'react';
import { Tag, Check, ArrowRight, Sparkles, Percent } from 'lucide-react';
import { Language, PageView } from '../types';
import { getTranslation } from '../data/translations';
import { sampleCoupons } from '../data/mockData';

interface OffersViewProps {
  language: Language;
  setCurrentView: (view: PageView) => void;
  onApplyCouponToBooking: (couponCode: string) => void;
}

export const OffersView: React.FC<OffersViewProps> = ({
  language,
  setCurrentView,
  onApplyCouponToBooking,
}) => {
  const t = getTranslation(language);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleBookWithCoupon = (code: string) => {
    onApplyCouponToBooking(code);
    setCurrentView('booking');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
          SAVE ON TRANSPORT
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {language === 'hi' ? 'विशेष छूट एवं ऑफर्स' : 'Exclusive Freight Offers & Deals'}
        </h1>
        <p className="text-sm text-slate-500">
          {language === 'hi'
            ? 'अपनी पहली बुकिंग, व्यापारिक कार्गो और हाईवे रूट्स पर भारी छूट पाएं।'
            : 'Verified coupons for first booking, corporate contracts, and interstate cargo.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleCoupons.map((coupon) => (
          <div
            key={coupon.code}
            className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-dashed border-emerald-500/50 p-6 shadow-md flex flex-col justify-between space-y-4 hover:shadow-lg transition-all relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-black">
                <Percent className="w-5 h-5" />
              </div>

              <div>
                <h3 className="font-black text-lg text-slate-900 dark:text-white">
                  {language === 'hi' ? coupon.titleHi : coupon.titleEn}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'hi' ? coupon.descHi : coupon.descEn}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">COUPON CODE</span>
                  <span className="font-mono font-black text-base text-emerald-600 dark:text-emerald-400">
                    {coupon.code}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCode(coupon.code)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold"
                >
                  {copiedCode === coupon.code ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleBookWithCoupon(coupon.code)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <span>{language === 'hi' ? 'कूपन लागू कर बुक करें' : 'Apply & Book Vehicle'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
