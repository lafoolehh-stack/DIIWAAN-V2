import React from 'react';
import { Database, Search } from 'lucide-react';
import { Language, Tab, Profile } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeroProps {
    lang: Language;
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    profilesCount: number;
}

const Hero: React.FC<HeroProps> = ({ lang, searchQuery, setSearchQuery, profilesCount }) => {
    const t = TRANSLATIONS[lang];

    return (
        <section className="bg-navy pt-12 pb-24 px-4 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none rtl:left-0 rtl:right-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="white">
                    <path d="M0 0 L100 0 L100 100 Z" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div className="text-white space-y-6">
                    {/* Tag */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-blue-100 text-sm font-medium">
                        <Database className="w-4 h-4 rtl:ml-2" />
                        <span>{t.heroTag}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                        <span>{t.heroTitle1}</span> <br />
                        <span className="text-lightblue">{t.heroTitle2}</span>
                    </h1>
                    
                    <p className="text-gray-300 text-lg max-w-lg leading-relaxed">
                        {t.heroSub}
                    </p>

                    {/* Big Search Bar */}
                    <div className="relative max-w-lg mt-6">
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.searchPlaceholder}
                            className="w-full h-14 pl-12 pr-12 rounded-xl text-navy placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/30 shadow-2xl rtl:pl-4 rtl:pr-12"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 rtl:left-auto rtl:right-4" />
                    </div>
                </div>

                {/* Glassmorphism Stats */}
                <div className="hidden md:block">
                    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-500">
                        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                            <div className="space-y-1">
                                <h3 className="text-white font-bold text-lg">{t.liveStats}</h3>
                                <p className="text-gray-400 text-xs">{t.updatedNow}</p>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-accentgreen animate-pulse"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-primary">{profilesCount}</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wide">{t.totalEntries}</div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-accentgreen">100%</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wide">{t.verified}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;