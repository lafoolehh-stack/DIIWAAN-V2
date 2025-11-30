
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryCards from './components/CategoryCards';
import Listing from './components/Listing';
import HomeWidgets from './components/HomeWidgets';
import ProfileModal from './components/ProfileModal';
import { Language, Tab, Profile, LocalizedString } from './types';
import { PROFILES, TRANSLATIONS } from './constants';
import { X, Lock, Unlock } from 'lucide-react';

const App: React.FC = () => {
    const [lang, setLang] = useState<Language>('so');
    const [currentTab, setTab] = useState<Tab>('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [modalProfile, setModalProfile] = useState<Profile | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profiles, setProfiles] = useState<Profile[]>(PROFILES);
    const [isAdmin, setIsAdmin] = useState(false); // Default to false (hidden admin)
    const [articleModal, setArticleModal] = useState<{ isOpen: boolean; title: string; category: string } | null>(null);

    // Update HTML dir attribute for RTL support
    useEffect(() => {
        const dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.dir = dir;
        document.documentElement.lang = lang;
    }, [lang]);

    // Handle Deep Linking on Mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const profileIdParam = params.get('profileId');
        
        if (profileIdParam) {
            const id = parseInt(profileIdParam, 10);
            const foundProfile = profiles.find(p => p.id === id);
            
            if (foundProfile) {
                // Ensure proper tab context is set
                if (foundProfile.category === 'Politician') setTab('politics');
                else if (foundProfile.category === 'Business') setTab('business');
                else if (foundProfile.category === 'Army') setTab('army');
                
                setModalProfile(foundProfile);
                setIsModalOpen(true);
            }
        }
    }, [profiles]);

    // Filtering logic
    const filteredProfiles = useMemo(() => {
        const term = searchQuery.toLowerCase();
        
        return profiles.filter(profile => {
            const name = (profile.name[lang] || profile.name['so']).toLowerCase();
            const role = (profile.role[lang] || profile.role['so']).toLowerCase();
            
            const matchesSearch = name.includes(term) || role.includes(term);

            if (searchQuery !== '') {
                return matchesSearch;
            } else {
                if (currentTab === 'politics') return profile.category === 'Politician';
                if (currentTab === 'business') return profile.category === 'Business';
                if (currentTab === 'army') return profile.category === 'Army';
                return false;
            }
        });
    }, [searchQuery, lang, currentTab, profiles]);

    const handleOpenModal = (profile: Profile) => {
        setModalProfile(profile);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setModalProfile(null), 300);
    };

    const handleUpdateProfile = (updatedProfile: Profile) => {
        setProfiles(prev => prev.map(p => p.id === updatedProfile.id ? updatedProfile : p));
        setModalProfile(updatedProfile);
    };

    const handleDeleteProfile = (profileId: number) => {
        setProfiles(prev => prev.filter(p => p.id !== profileId));
        handleCloseModal();
    };

    const handleAddProfile = () => {
        const newId = Math.max(...profiles.map(p => p.id)) + 1;
        let defaultCategory: 'Politician' | 'Business' | 'Army' = 'Politician';
        if (currentTab === 'business') defaultCategory = 'Business';
        if (currentTab === 'army') defaultCategory = 'Army';

        const newProfile: Profile = {
            id: newId,
            name: { so: '', en: '', ar: '' },
            role: { so: '', en: '', ar: '' },
            location: { so: 'Muqdisho', en: 'Mogadishu', ar: 'مقديشو' },
            category: defaultCategory,
            verified: false,
            image: 'https://via.placeholder.com/200',
            bio: { so: '', en: '', ar: '' },
            ratings: { fame: 50, popularity: 50 }
        };
        setProfiles([newProfile, ...profiles]);
        setModalProfile(newProfile);
        setIsModalOpen(true);
    };

    const resetToHome = () => {
        setTab('home');
        setSearchQuery('');
    };

    const checkLogin = () => {
        const t = TRANSLATIONS[lang];
        if (isAdmin) {
             const confirmLogout = confirm(t.logout + "?");
             if(confirmLogout) {
                 setIsAdmin(false);
                 alert(t.adminLogout);
             }
             return;
        }

        const password = prompt("Enter Admin Password:");
        if(password === "admin") {
            setIsAdmin(true);
            alert(t.adminAccess);
        } else if (password) {
            alert("Incorrect Password");
        }
    };

    return (
        <div className="min-h-screen text-[#222831]">
            <Header 
                lang={lang} 
                setLang={setLang} 
                currentTab={currentTab} 
                setTab={setTab} 
            />

            {/* Hero Section - Only visible on Home and when not searching */}
            {currentTab === 'home' && searchQuery === '' && (
                <Hero 
                    lang={lang} 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                    profilesCount={profiles.length} 
                />
            )}

            <main className="max-w-7xl mx-auto px-4 pb-20 relative z-20 min-h-[60vh]">
                
                {/* Floating Category Cards - Only visible on Home and when not searching */}
                {currentTab === 'home' && searchQuery === '' && (
                    <CategoryCards lang={lang} setTab={setTab} />
                )}

                {/* Listing / Search Results View */}
                {(currentTab !== 'home' || searchQuery !== '') && (
                    <Listing 
                        lang={lang}
                        currentTab={currentTab}
                        searchQuery={searchQuery}
                        filteredProfiles={filteredProfiles}
                        resetToHome={resetToHome}
                        setSearchQuery={setSearchQuery}
                        setTab={setTab}
                        openModal={handleOpenModal}
                        isAdmin={isAdmin}
                        onAddProfile={handleAddProfile}
                    />
                )}

                {/* Home Page Widgets */}
                {currentTab === 'home' && searchQuery === '' && (
                    <HomeWidgets 
                        lang={lang} 
                        setTab={setTab} 
                        onOpenArticle={(title, category) => setArticleModal({ isOpen: true, title, category })}
                    />
                )}

            </main>

            {/* Modal */}
            <ProfileModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                profile={modalProfile} 
                lang={lang} 
                isAdmin={isAdmin}
                onSave={handleUpdateProfile}
                onDelete={handleDeleteProfile}
            />

            {/* Simple Article Modal */}
            {articleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setArticleModal(null)}>
                     <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setArticleModal(null)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                            <X className="w-5 h-5" />
                        </button>
                        <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">{articleModal.category}</span>
                        <h2 className="text-3xl font-serif font-bold text-navy mb-4">{articleModal.title}</h2>
                        <div className="prose prose-blue max-w-none text-gray-600">
                            <p>
                                {TRANSLATIONS[lang].bioPlaceholder}
                                <br/><br/>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                     </div>
                </div>
            )}

            {/* Hidden Admin Button - Fixed Bottom Right */}
            <button 
                onClick={checkLogin}
                className={`fixed bottom-4 right-4 p-3 rounded-full bg-navy text-white shadow-lg transition-all duration-300 z-50 ${isAdmin ? 'opacity-100' : 'opacity-10 hover:opacity-100'}`}
                title="Admin Access"
            >
                {isAdmin ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </button>
        </div>
    );
};

export default App;