import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../shared/GlassCard';
import { useProductStore } from '../../store/useProductStore';
import { productService } from '../../services/productService';
import { useLanguage } from '../../context/LanguageContext';

export function ProductFormModal({ isOpen, onClose, productToEdit }) {
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        price: '',
        costPrice: '',
        stock: '',
        category: '',
        brand: '',
        barcode: '',
        description: ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const { fetchProducts, addProduct, updateProduct } = useProductStore();
    const { t } = useLanguage();

    useEffect(() => {
        if (productToEdit) {
            setFormData({
                name: productToEdit.name || '',
                sku: productToEdit.sku || '',
                price: productToEdit.price || '',
                costPrice: productToEdit.costPrice || '',
                stock: productToEdit.stock || '',
                category: productToEdit.category || '',
                brand: productToEdit.brand || '',
                barcode: productToEdit.barcode || '',
                description: productToEdit.description || ''
            });
        } else {
            setFormData({
                name: '',
                sku: '',
                price: '',
                costPrice: '',
                stock: '',
                category: '',
                brand: '',
                barcode: '',
                description: ''
            });
        }
    }, [productToEdit, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                costPrice: parseFloat(formData.costPrice) || 0,
                stock: parseInt(formData.stock)
            };

            if (productToEdit) {
                await productService.updateProduct(productToEdit.id, productData);
            } else {
                const newProduct = { ...productData, id: Date.now() };
                addProduct(newProduct);
            }
            await fetchProducts();
            onClose();
        } catch (error) {
            console.error('Failed to save product', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-2xl"
                >
                    <GlassCard className="p-6 bg-white/95 border-white/50 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-800">
                                {productToEdit ? t('form.editProduct') : t('form.addProduct')}
                            </h2>
                            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-slate-500 mb-1">{t('form.name')}</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-1">{t('form.brand')}</label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
                                        value={formData.brand}
                                        onChange={e => setFormData({ ...formData, brand: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-1">{t('form.category')}</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-1">{t('form.sku')}</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
                                        value={formData.sku}
                                        onChange={e => setFormData({ ...formData, sku: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-1">{t('form.barcode')}</label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
                                        value={formData.barcode}
                                        onChange={e => setFormData({ ...formData, barcode: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-1">{t('form.price')}</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-1">{t('form.cost')}</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
                                        value={formData.costPrice}
                                        onChange={e => setFormData({ ...formData, costPrice: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-1">{t('form.stock')}</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:border-blue-500 focus:outline-none"
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-1">{t('form.description')}</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:border-blue-500 focus:outline-none resize-none h-24"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all"
                                >
                                    {isSaving ? t('form.saving') : (productToEdit ? t('form.saveChanges') : t('form.save'))}
                                </button>
                            </div>
                        </form>
                    </GlassCard>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
