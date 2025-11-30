
import React from 'react';
import { Language, Tab } from '../types';
import { TRANSLATIONS } from '../constants';

interface HomeWidgetsProps {
    lang: Language;
    setTab: (t: Tab) => void;
    onOpenArticle: (title: string, category: string) => void;
}

const HomeWidgets: React.FC<HomeWidgetsProps> = ({ lang, setTab, onOpenArticle }) => {
    const t = TRANSLATIONS[lang];

    return (
        <div className="mt-16 pb-20">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Latest Insights */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                         <h3 className="text-xl font-serif font-bold text-navy">{t.latestInsights}</h3>
                         <button onClick={() => setTab('politics')} className="text-sm text-primary cursor-pointer hover:underline">{t.viewAll}</button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div 
                            onClick={() => onOpenArticle('Renewable Energy Future', 'Economy')}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
                        >
                            <img src="https://picsum.photos/id/16/600/400" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" alt="Insight 1" />
                            <div className="p-5 text-left rtl:text-right">
                                <span className="text-xs font-bold text-primary uppercase tracking-wider">Economy</span>
                                <h4 className="text-lg font-bold text-navy mt-1 mb-2">Renewable Energy Future</h4>
                                <p className="text-gray-600 text-sm line-clamp-2">Analyzing the potential for solar and wind power to revolutionize the energy sector.</p>
                            </div>
                        </div>
                        <div 
                            onClick={() => onOpenArticle('Electoral Reforms 2026', 'Politics')}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
                        >
                            <img src="https://picsum.photos/id/20/600/400" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" alt="Insight 2" />
                            <div className="p-5 text-left rtl:text-right">
                                <span className="text-xs font-bold text-primary uppercase tracking-wider">Politics</span>
                                <h4 className="text-lg font-bold text-navy mt-1 mb-2">Electoral Reforms 2026</h4>
                                <p className="text-gray-600 text-sm line-clamp-2">A deep dive into the proposed changes for the upcoming elections.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trending (Sidebar) */}
                <div>
                    <h3 className="text-xl font-serif font-bold text-navy mb-6">{t.trendingNow}</h3>
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 space-y-4">
                        <div className="flex items-center gap-3 pb-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors" onClick={() => setTab('business')}>
                            <span className="text-2xl">🔥</span>
                            <div className="text-left rtl:text-right">
                                <p className="font-bold text-navy text-sm">Hormuud Telecom</p>
                                <p className="text-xs text-gray-500">Business • 95% <span>{t.fame}</span></p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pb-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors" onClick={() => setTab('politics')}>
                            <span className="text-2xl">📈</span>
                            <div className="text-left rtl:text-right">
                                <p className="font-bold text-navy text-sm">Hassan Ali Khaire</p>
                                <p className="text-xs text-gray-500">Politician • 85% <span>{t.fame}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeWidgets;
