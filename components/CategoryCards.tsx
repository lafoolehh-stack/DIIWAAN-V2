
import React from 'react';
import { Language, Tab } from '../types';
import { TRANSLATIONS } from '../constants';

interface CategoryCardsProps {
    lang: Language;
    setTab: (t: Tab) => void;
}

const CategoryCards: React.FC<CategoryCardsProps> = ({ lang, setTab }) => {
    const t = TRANSLATIONS[lang];

    return (
        <div className="-mt-10 flex gap-6 justify-center flex-wrap mb-16 relative z-30">
            <button 
                onClick={() => setTab('politics')} 
                className="group flex items-center gap-4 bg-white px-8 py-5 rounded-2xl shadow-lg border border-gray-100 w-[280px] hover:-translate-y-2 transition-all duration-300"
            >
                <span className="text-3xl group-hover:scale-110 transition-transform">🎙️</span>
                <div className="text-left rtl:text-right">
                    <span className="block font-serif font-bold text-navy text-lg">{t.politician}</span>
                    <span className="text-xs text-gray-500">{t.politicianDesc}</span>
                </div>
            </button>

            <button 
                onClick={() => setTab('business')} 
                className="group flex items-center gap-4 bg-white px-8 py-5 rounded-2xl shadow-lg border border-gray-100 w-[280px] hover:-translate-y-2 transition-all duration-300"
            >
                <span className="text-3xl group-hover:scale-110 transition-transform">💼</span>
                <div className="text-left rtl:text-right">
                    <span className="block font-serif font-bold text-navy text-lg">{t.business}</span>
                    <span className="text-xs text-gray-500">{t.businessDesc}</span>
                </div>
            </button>

            <button 
                onClick={() => setTab('army')} 
                className="group flex items-center gap-4 bg-white px-8 py-5 rounded-2xl shadow-lg border border-gray-100 w-[280px] hover:-translate-y-2 transition-all duration-300"
            >
                <span className="text-3xl group-hover:scale-110 transition-transform">🛡️</span>
                <div className="text-left rtl:text-right">
                    <span className="block font-serif font-bold text-navy text-lg">{t.army}</span>
                    <span className="text-xs text-gray-500">{t.armyDesc}</span>
                </div>
            </button>
        </div>
    );
};

export default CategoryCards;