
import React from 'react';
import { Language, Tab } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeaderProps {
    lang: Language;
    setLang: (l: Language) => void;
    currentTab: Tab;
    setTab: (t: Tab) => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, currentTab, setTab }) => {
    const t = TRANSLATIONS[lang];

    return (
        <header className="sticky top-0 z-40 bg-navy text-white shadow-lg h-[64px]">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                {/* Logo */}
                <button 
                    onClick={() => setTab('home')} 
                    className="flex items-center gap-2 group hover:opacity-90 transition focus:outline-none"
                >
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold shadow-md text-lg font-serif">
                        D
                    </div>
                    <span className="font-serif font-bold text-xl tracking-tight">DIIWAAN</span>
                </button>

                {/* Desktop Nav & Lang Switcher */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Nav Links */}
                    <div className="flex items-center gap-6 border-e border-white/20 pe-6 rtl:border-e-0 rtl:border-s rtl:pe-0 rtl:ps-6">
                        <button 
                            onClick={() => setTab('politics')} 
                            className={`text-sm font-medium transition-colors focus:outline-none ${currentTab === 'politics' ? 'text-white font-bold' : 'text-gray-300 hover:text-white'}`}
                        >
                            {t.politics}
                        </button>
                        <button 
                            onClick={() => setTab('business')} 
                            className={`text-sm font-medium transition-colors focus:outline-none ${currentTab === 'business' ? 'text-white font-bold' : 'text-gray-300 hover:text-white'}`}
                        >
                            {t.business}
                        </button>
                        <button 
                            onClick={() => setTab('army')} 
                            className={`text-sm font-medium transition-colors focus:outline-none ${currentTab === 'army' ? 'text-white font-bold' : 'text-gray-300 hover:text-white'}`}
                        >
                            {t.army}
                        </button>
                    </div>

                    {/* Language Switcher */}
                    <div className="flex items-center gap-2 text-xs">
                        {(['so', 'en', 'ar'] as Language[]).map((l) => (
                            <button 
                                key={l}
                                onClick={() => setLang(l)} 
                                className={`px-2 py-1 rounded transition-colors uppercase ${lang === l ? 'bg-white text-navy font-bold' : 'text-gray-300 hover:text-white'}`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;