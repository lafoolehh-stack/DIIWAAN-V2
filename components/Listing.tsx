
import React from 'react';
import { CheckCircle, MapPin, ArrowRight, XCircle, PlusCircle } from 'lucide-react';
import { Language, Tab, Profile } from '../types';
import { TRANSLATIONS } from '../constants';

interface ListingProps {
    lang: Language;
    currentTab: Tab;
    searchQuery: string;
    filteredProfiles: Profile[];
    resetToHome: () => void;
    setSearchQuery: (q: string) => void;
    setTab: (t: Tab) => void;
    openModal: (p: Profile) => void;
    isAdmin: boolean;
    onAddProfile: () => void;
}

const Listing: React.FC<ListingProps> = ({ 
    lang, currentTab, searchQuery, filteredProfiles, resetToHome, setSearchQuery, setTab, openModal, isAdmin, onAddProfile 
}) => {
    const t = TRANSLATIONS[lang];

    return (
        <div className="pt-8">
            {/* Header for Listing */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-navy">
                        {searchQuery !== '' && <span>{t.searchResults}</span>}
                        {searchQuery === '' && currentTab === 'politics' && <span>{t.politicsDirectory}</span>}
                        {searchQuery === '' && currentTab === 'business' && <span>{t.businessDirectory}</span>}
                        {searchQuery === '' && currentTab === 'army' && <span>{t.armyDirectory}</span>}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        <span>{t.showing}</span> <span className="font-semibold text-navy">{filteredProfiles.length}</span> <span>{t.results}</span>
                    </p>
                </div>
                
                {/* Clear Search Button */}
                {searchQuery !== '' && (
                    <div className="relative w-full max-w-xs md:block hidden text-right rtl:text-left">
                        <button onClick={resetToHome} className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline">
                            <XCircle className="w-4 h-4 rtl:ml-2" /> <span>{t.clearSearch}</span>
                        </button>
                    </div>
                )}
            </div>

            {/* DYNAMIC LOOP GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Admin Add New Card */}
                {isAdmin && searchQuery === '' && (
                    <div 
                        onClick={onAddProfile} 
                        className="bg-white rounded-2xl p-5 shadow-sm border border-dashed border-primary/50 hover:bg-blue-50/50 hover:border-primary transition-all cursor-pointer flex flex-col items-center justify-center min-h-[160px] group"
                    >
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                            <PlusCircle className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-primary text-lg">{t.addProfile}</h3>
                    </div>
                )}

                {filteredProfiles.map((profile) => (
                    <div 
                        key={profile.id}
                        onClick={() => openModal(profile)} 
                        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer group text-left rtl:text-right"
                    >
                        <div className="flex items-start gap-4">
                            <div className="relative shrink-0">
                                <img src={profile.image} alt={profile.name[lang]} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 group-hover:border-primary transition-colors" />
                                {profile.verified && (
                                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 rtl:right-auto rtl:-left-1">
                                        <CheckCircle className="w-4 h-4 text-primary fill-white" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-navy text-lg group-hover:text-primary transition-colors">{profile.name[lang]}</h3>
                                <p className="text-sm font-medium text-gray-600 line-clamp-1">{profile.role[lang]}</p>
                                <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                    <MapPin className="w-3 h-3 rtl:ml-1" />
                                    <span>{profile.location[lang]}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="px-2 py-1 bg-blue-50 text-primary text-xs font-bold rounded uppercase tracking-wider">{profile.category}</span>
                            <span className="text-sm font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>{t.viewDetails}</span> <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                            </span>
                        </div>
                    </div>
                ))}
                
                {/* Empty State */}
                {filteredProfiles.length === 0 && !isAdmin && (
                    <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">
                            <span>{t.noResults}</span> "<span className="font-semibold">{searchQuery}</span>"
                        </p>
                        <button onClick={() => { setSearchQuery(''); setTab('home'); }} className="mt-4 text-primary font-medium hover:underline">
                            {t.clearSearch}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Listing;