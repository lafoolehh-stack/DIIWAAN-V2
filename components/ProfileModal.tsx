
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, MapPin, Briefcase, ShieldCheck, Share2, Check, Facebook, Twitter, Linkedin, Link as LinkIcon, Smartphone, Pencil, Save, Trash2 } from 'lucide-react';
import { Language, Profile } from '../types';
import { TRANSLATIONS } from '../constants';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    profile: Profile | null;
    lang: Language;
    isAdmin: boolean;
    onSave: (updatedProfile: Profile) => void;
    onDelete: (profileId: number) => void;
}

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 1 0-1 13.6 6.84 6.84 0 0 0 6.25-6.62V9.42c.05.02.12.03.18.03a4.86 4.86 0 0 0 4.8-4.86V2h-3.45a4.86 4.86 0 0 1 2.45 4.69z"/>
    </svg>
);

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, profile, lang, isAdmin, onSave, onDelete }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'biography' | 'work_history' | 'archive'>('overview');
    const [copied, setCopied] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Profile | null>(null);

    const t = TRANSLATIONS[lang];

    useEffect(() => {
        if (isOpen) {
            setActiveTab('overview');
            document.body.style.overflow = 'hidden';
            setCopied(false);
            setShowShareMenu(false);
            if (profile && profile.name.en === '') {
                 setIsEditing(true);
            } else {
                 setIsEditing(false);
            }
            if (profile) setFormData({ ...profile });
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen, profile]);

    const profileUrl = profile ? `${window.location.origin}${window.location.pathname}?profileId=${profile.id}` : '';

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(profileUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            setShowShareMenu(false);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleWebShare = async () => {
        if (!profile || !navigator.share) return;
        try {
            await navigator.share({
                title: profile.name[lang],
                text: profile.role[lang],
                url: profileUrl
            });
            setShowShareMenu(false);
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    const openSocialPopup = (url: string) => {
        const width = 600;
        const height = 500;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
        window.open(url, 'share_popup', `width=${width},height=${height},top=${top},left=${left},noopener,noreferrer`);
        setShowShareMenu(false);
    };

    const handleSave = () => {
        if (formData) {
            onSave(formData);
            setIsEditing(false);
        }
    };

    const handleDelete = () => {
        if (formData && confirm(t.confirmDelete)) {
            onDelete(formData.id);
        }
    };

    const socialLinks = [
        { 
            name: 'Facebook', 
            icon: <Facebook className="w-5 h-5" />, 
            color: 'text-[#1877F2] bg-blue-50 hover:bg-[#1877F2] hover:text-white',
            action: () => openSocialPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`)
        },
        { 
            name: 'Twitter', 
            icon: <Twitter className="w-5 h-5" />, 
            color: 'text-[#1DA1F2] bg-blue-50 hover:bg-[#1DA1F2] hover:text-white',
            action: () => openSocialPopup(`https://twitter.com/intent/tweet?text=${encodeURIComponent((profile?.name[lang] || '') + ' - ' + (profile?.role[lang] || ''))}&url=${encodeURIComponent(profileUrl)}`)
        },
        { 
            name: 'LinkedIn', 
            icon: <Linkedin className="w-5 h-5" />, 
            color: 'text-[#0A66C2] bg-blue-50 hover:bg-[#0A66C2] hover:text-white',
            action: () => openSocialPopup(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`)
        },
        {
            name: 'TikTok',
            icon: <TikTokIcon className="w-5 h-5" />,
            color: 'text-black bg-gray-100 hover:bg-black hover:text-white',
            action: handleCopy 
        }
    ];

    if (!isOpen || !profile || !formData) return null;

    return (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            ></div>

            {/* Panel Wrapper */}
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-2 sm:p-4 text-center">
                    
                    {/* Dynamic Content Container */}
                    <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:w-full sm:max-w-4xl border border-gray-200 flex flex-col max-h-[90vh] rtl:text-right w-full">
                        
                        <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 flex items-center gap-3">
                            
                            {/* Share Button */}
                            <div className="relative">
                                <button 
                                    onClick={() => setShowShareMenu(!showShareMenu)}
                                    className={`p-2 rounded-full transition-colors text-gray-600 hover:text-navy group ${showShareMenu ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                                    aria-label={t.share}
                                    title={t.shareProfile}
                                >
                                    {copied ? <Check className="w-5 h-5 text-accentgreen" /> : <Share2 className="w-5 h-5" />}
                                </button>
                                
                                {/* Share Dropdown */}
                                {showShareMenu && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setShowShareMenu(false)}></div>
                                        <div className="absolute top-12 right-0 rtl:right-auto rtl:left-0 z-20 bg-white rounded-xl shadow-xl border border-gray-100 p-4 w-72 text-left rtl:text-right">
                                            <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">{t.shareVia}</p>
                                            
                                            <div className="grid grid-cols-4 gap-2 mb-4">
                                                {socialLinks.map((social) => (
                                                    <button 
                                                        key={social.name}
                                                        onClick={() => social.action()}
                                                        className={`flex items-center justify-center aspect-square rounded-lg transition-all ${social.color}`}
                                                        title={social.name === 'TikTok' ? t.copyLink : social.name}
                                                    >
                                                        {social.icon}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="space-y-1">
                                                <button 
                                                    onClick={handleCopy}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors"
                                                >
                                                    <div className="p-1.5 bg-gray-100 rounded-md">
                                                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <LinkIcon className="w-4 h-4 text-gray-600" />}
                                                    </div>
                                                    <span>{copied ? t.linkCopied : t.copyLink}</span>
                                                </button>
                                                
                                                {navigator.share && (
                                                    <button 
                                                        onClick={handleWebShare}
                                                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors"
                                                    >
                                                        <div className="p-1.5 bg-gray-100 rounded-md">
                                                            <Smartphone className="w-4 h-4 text-gray-600" />
                                                        </div>
                                                        <span>{t.shareVia}</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Edit Button (Admin Only) */}
                            {isAdmin && !isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-2 rounded-full transition-colors bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-navy"
                                    aria-label={t.edit}
                                    title={t.edit}
                                >
                                    <Pencil className="w-5 h-5" />
                                </button>
                            )}

                            {/* Close Button */}
                            <button 
                                onClick={onClose} 
                                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* EDIT MODE */}
                        {isEditing ? (
                            <div className="flex flex-col h-full overflow-hidden bg-white">
                                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                    <h2 className="text-xl font-bold font-serif text-navy">{t.editProfile}</h2>
                                    
                                    <button 
                                        onClick={handleDelete}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                                        title={t.deleteProfile}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span className="hidden sm:inline">{t.deleteProfile}</span>
                                    </button>
                                </div>
                                
                                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                    {/* Image URL */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.imageUrl}</label>
                                        <input 
                                            type="text"
                                            value={formData.image}
                                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                                        />
                                    </div>

                                    {/* Verified & Category */}
                                    <div className="flex items-center gap-8">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={formData.verified} 
                                                onChange={(e) => setFormData({...formData, verified: e.target.checked})}
                                                className="w-5 h-5 rounded text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm font-medium text-gray-700">{t.verified}</span>
                                        </label>
                                        
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm font-medium text-gray-700">{t.category}</label>
                                            <select 
                                                value={formData.category} 
                                                onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                                                className="px-3 py-1.5 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                            >
                                                <option value="Politician">Politician</option>
                                                <option value="Business">Business</option>
                                                <option value="Army">Army & Security</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Localized Sections */}
                                    {(['name', 'role', 'location', 'bio'] as const).map(field => (
                                        <div key={field} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                            <h3 className="capitalize font-bold text-navy mb-4">{t[field]}</h3>
                                            <div className="grid grid-cols-1 gap-4">
                                                {(['so', 'en', 'ar'] as const).map(l => (
                                                    <div key={l}>
                                                        <label className="block text-xs uppercase text-gray-500 font-semibold mb-1">{l}</label>
                                                        {field === 'bio' ? (
                                                            <textarea 
                                                                value={formData[field][l]} 
                                                                onChange={(e) => setFormData({
                                                                    ...formData, 
                                                                    [field]: { ...formData[field], [l]: e.target.value }
                                                                })}
                                                                rows={3}
                                                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                                            />
                                                        ) : (
                                                            <input 
                                                                type="text"
                                                                value={formData[field][l]}
                                                                onChange={(e) => setFormData({
                                                                    ...formData, 
                                                                    [field]: { ...formData[field], [l]: e.target.value }
                                                                })}
                                                                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                                    <button 
                                        onClick={() => setIsEditing(false)} 
                                        className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        {t.cancel}
                                    </button>
                                    <button 
                                        onClick={handleSave} 
                                        className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        {t.save}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // VIEW MODE
                            <div className="flex flex-col h-full overflow-hidden">
                                
                                {/* Header */}
                                <div className="bg-white px-6 pt-8 pb-6 border-b border-gray-100">
                                    <div className="flex flex-col items-center md:items-start md:flex-row gap-6">
                                        <div className="relative shrink-0">
                                            <img src={profile.image} className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-lg" alt={profile.name[lang]} />
                                            {profile.verified && (
                                                <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-sm rtl:right-auto rtl:left-1">
                                                    <CheckCircle className="w-6 h-6 text-primary fill-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-center md:text-left rtl:md:text-right pt-2 flex-1">
                                            <h2 className="text-3xl font-serif font-bold text-navy">{profile.name[lang]}</h2>
                                            <p className="text-lg font-medium text-gray-600 mt-1">{profile.role[lang]}</p>
                                            <div className="flex flex-wrap items-center justify-center md:justify-start rtl:md:justify-end gap-3 mt-3 text-sm text-gray-500">
                                                <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                                                    <MapPin className="w-3 h-3 rtl:ml-1" /> 
                                                    <span>{profile.location[lang]}</span>
                                                </span>
                                                <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                                                    <Briefcase className="w-3 h-3 rtl:ml-1" /> 
                                                    <span>{profile.category}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Tabs */}
                                <div className="px-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                                    <nav className="flex space-x-2 overflow-x-auto no-scrollbar py-3 rtl:space-x-reverse" aria-label="Tabs">
                                        <button 
                                            onClick={() => setActiveTab('overview')} 
                                            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeTab === 'overview' ? 'bg-navy text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            {t.tabOverview}
                                        </button>
                                        <button 
                                            onClick={() => setActiveTab('biography')} 
                                            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeTab === 'biography' ? 'bg-navy text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            {t.tabBio}
                                        </button>
                                        <button 
                                            onClick={() => setActiveTab('work_history')} 
                                            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeTab === 'work_history' ? 'bg-navy text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            {t.tabWork}
                                        </button>
                                        <button 
                                            onClick={() => setActiveTab('archive')} 
                                            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeTab === 'archive' ? 'bg-navy text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            {t.tabArchive}
                                        </button>
                                    </nav>
                                </div>

                                {/* Dynamic Content Area */}
                                <div className="overflow-y-auto flex-1 bg-gray-50 p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        
                                        <div className="md:col-span-2 space-y-6">
                                            {/* Overview Tab */}
                                            {activeTab === 'overview' && (
                                                <div>
                                                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                                                        <h3 className="font-bold text-navy text-lg mb-4">{t.summary}</h3>
                                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{profile.bio[lang]}</p>
                                                        
                                                        {profile.category === 'Business' && profile.services && (
                                                            <div className="mt-6 pt-6 border-t border-gray-100">
                                                                <h4 className="font-bold text-navy text-xs uppercase mb-3">{t.coreServices}</h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {profile.services.map((service, idx) => (
                                                                        <span key={idx} className="px-3 py-1 bg-blue-50 text-primary text-xs font-semibold rounded-full border border-blue-100">
                                                                            {service[lang]}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-4 items-start">
                                                        <div className="bg-white p-2 rounded-full shadow-sm">
                                                            <ShieldCheck className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-navy text-sm">{t.verificationStatus}</h4>
                                                            <p className="text-sm text-gray-600 mt-1">{t.verifiedMsg}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Biography Tab */}
                                            {activeTab === 'biography' && (
                                                <div>
                                                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-6">
                                                        <div>
                                                            <h3 className="font-bold text-navy text-lg mb-2">{t.earlyLife}</h3>
                                                            <p className="text-gray-600 text-sm leading-relaxed">{t.bioPlaceholder}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Placeholders for other tabs */}
                                            {(activeTab === 'work_history' || activeTab === 'archive') && (
                                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center py-12">
                                                    <p className="text-gray-500 italic">{t.bioPlaceholder}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Sidebar Stats */}
                                        <div className="md:col-span-1">
                                            <div className="sticky top-0 space-y-6">
                                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                                    <h4 className="font-bold text-navy text-sm uppercase mb-4 text-center border-b border-gray-100 pb-2">{t.influenceScore}</h4>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <div className="flex justify-between text-xs mb-1 font-medium">
                                                                <span className="text-primary">{t.fame}</span>
                                                                <span>{profile.ratings.fame}%</span>
                                                            </div>
                                                            <div className="w-full bg-blue-50 rounded-full h-2">
                                                                <div className="bg-primary h-2 rounded-full" style={{ width: `${profile.ratings.fame}%` }}></div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="flex justify-between text-xs mb-1 font-medium">
                                                                <span className="text-accentgreen">{t.popularity}</span>
                                                                <span>{profile.ratings.popularity}%</span>
                                                            </div>
                                                            <div className="w-full bg-green-50 rounded-full h-2">
                                                                <div className="bg-accentgreen h-2 rounded-full" style={{ width: `${profile.ratings.popularity}%` }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;