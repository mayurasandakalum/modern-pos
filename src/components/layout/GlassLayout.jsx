import React from 'react';
import { LayoutGrid, ShoppingCart } from 'lucide-react';
import { RetailCopilot } from '../ai/RetailCopilot';

import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../shared/LanguageSwitcher';

export function GlassLayout({ children, currentPage, onNavigate }) {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden flex flex-col">
            {/* Navigation Header */}
            <div className="h-16 border-b border-slate-200 bg-white/70 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
                        G
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-800">{t('app.title')}</span>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                    <button
                        onClick={() => onNavigate('pos')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${currentPage === 'pos'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        {t('nav.pos')}
                    </button>
                    <button
                        onClick={() => onNavigate('inventory')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${currentPage === 'inventory'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <LayoutGrid className="w-4 h-4" />
                        {t('nav.inventory')}
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                    <div className="w-px h-8 bg-slate-200 mx-1" />
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 border-2 border-white shadow-sm" />
                        <div className="text-sm">
                            <div className="font-medium text-slate-800">{t('user.admin')}</div>
                            <div className="text-xs text-slate-500">{t('user.role')}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 overflow-hidden">
                <div className="max-w-[1920px] mx-auto h-full">
                    {children}
                </div>
            </div>

            <RetailCopilot />
        </div>
    );
}
