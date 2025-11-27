import React, { useEffect } from 'react';
import { Search, Barcode } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useCartStore } from '../../store/useCartStore';
import { GlassCard } from '../shared/GlassCard';
import { useLanguage } from '../../context/LanguageContext';

export function CatalogPanel() {
    const {
        products,
        isLoading,
        fetchProducts,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        getFilteredProducts
    } = useProductStore();

    const { addItem } = useCartStore();
    const { t } = useLanguage();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const filteredProducts = getFilteredProducts();
    const categories = ['All', ...new Set(products.map(p => p.category))];

    return (
        <GlassCard className="h-full flex flex-col p-4">
            {/* Header & Search */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder={t('catalog.searchPlaceholder')}
                        className="w-full bg-white/50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Barcode className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 cursor-pointer hover:text-blue-500" />
                </div>
            </div>

            {/* Categories */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                            : 'bg-white/50 text-slate-600 hover:bg-white/80 border border-transparent hover:border-slate-200'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-2 custom-scrollbar">
                {isLoading ? (
                    <div className="col-span-full text-center text-slate-400 py-10">{t('catalog.loading')}</div>
                ) : filteredProducts.map(product => (
                    <button
                        key={product.id}
                        onClick={() => addItem(product)}
                        className="group relative flex flex-col items-start text-left"
                    >
                        <GlassCard className="w-full p-3 h-full hover:bg-white/80 transition-all hover:scale-[1.02] hover:shadow-blue-500/10 border-white/50">
                            <div className="aspect-square w-full rounded-lg bg-slate-100 mb-3 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                            <div className="mt-auto">
                                <h3 className="font-medium text-slate-800 line-clamp-2 mb-1">{product.name}</h3>
                                <div className="flex justify-between items-center w-full">
                                    <span className="text-blue-600 font-bold">${product.price.toFixed(2)}</span>
                                    <span className="text-xs text-slate-500">{product.stock} {t('catalog.inStock')}</span>
                                </div>
                            </div>
                        </GlassCard>
                    </button>
                ))}
            </div>
        </GlassCard>
    );
}
