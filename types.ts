
export type Language = 'so' | 'en' | 'ar';
export type Tab = 'home' | 'politics' | 'business' | 'army';

export interface LocalizedString {
    so: string;
    en: string;
    ar: string;
}

export interface Profile {
    id: number;
    name: LocalizedString;
    role: LocalizedString;
    location: LocalizedString;
    category: 'Politician' | 'Business' | 'Army';
    verified: boolean;
    image: string;
    bio: LocalizedString;
    services?: LocalizedString[];
    ratings: { fame: number; popularity: number };
}

export interface Translation {
    politics: string;
    business: string;
    army: string;
    login: string;
    logout: string;
    heroTag: string;
    heroTitle1: string;
    heroTitle2: string;
    heroSub: string;
    searchPlaceholder: string;
    liveStats: string;
    updatedNow: string;
    totalEntries: string;
    verified: string;
    politician: string;
    politicianDesc: string;
    politicianDescFull: string;
    businessDesc: string;
    businessDescFull: string;
    armyDesc: string;
    politicsDirectory: string;
    businessDirectory: string;
    armyDirectory: string;
    searchResults: string;
    showing: string;
    results: string;
    clearSearch: string;
    viewDetails: string;
    noResults: string;
    latestInsights: string;
    viewAll: string;
    trendingNow: string;
    fame: string;
    popularity: string;
    tabOverview: string;
    tabBio: string;
    tabWork: string;
    tabArchive: string;
    summary: string;
    coreServices: string;
    verificationStatus: string;
    verifiedMsg: string;
    earlyLife: string;
    bioPlaceholder: string;
    influenceScore: string;
    share: string;
    linkCopied: string;
    shareProfile: string;
    copyLink: string;
    shareVia: string;
    edit: string;
    save: string;
    cancel: string;
    editProfile: string;
    imageUrl: string;
    name: string;
    role: string;
    location: string;
    bio: string;
    category: string;
    addProfile: string;
    deleteProfile: string;
    confirmDelete: string;
    adminAccess: string;
    adminLogout: string;
    articleRead: string;
    close: string;
}