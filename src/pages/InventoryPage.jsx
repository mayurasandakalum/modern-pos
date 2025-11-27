import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { GlassLayout } from '../components/layout/GlassLayout';
import { DashboardStats } from '../components/inventory/DashboardStats';
import { ProductTable } from '../components/inventory/ProductTable';
import { ProductFormModal } from '../components/inventory/ProductFormModal';
import { useProductStore } from '../store/useProductStore';

export default function InventoryPage({ currentPage, onNavigate }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const { fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    return (
        <GlassLayout currentPage={currentPage} onNavigate={onNavigate}>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Inventory Management</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-cyan-500/20"
                >
                    <Plus className="w-5 h-5" />
                    Add Product
                </button>
            </div>

            <DashboardStats />
            <ProductTable onEdit={handleEdit} />

            <ProductFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productToEdit={editingProduct}
            />
        </GlassLayout>
    );
}
