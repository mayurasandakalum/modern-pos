import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'si' : 'en');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/50 hover:bg-white/80 border border-slate-200 transition-all text-sm font-medium text-slate-700"
            title={language === 'en' ? 'Switch to Sinhala' : 'Switch to English'}
        >
            <Globe className="w-4 h-4 text-blue-500" />
            <span>{language === 'en' ? 'EN' : 'සිං'}</span>
        </button>
    );
}
