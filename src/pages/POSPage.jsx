import React, { useState } from 'react';
import { GlassLayout } from '../components/layout/GlassLayout';
import { CatalogPanel } from '../components/pos/CatalogPanel';
import { CartPanel } from '../components/pos/CartPanel';
import { PaymentModal } from '../components/pos/PaymentModal';
import { useCartStore } from '../store/useCartStore';

export default function POSPage({ currentPage, onNavigate }) {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const { getTotals } = useCartStore();
    const { total } = getTotals();

    return (
        <GlassLayout currentPage={currentPage} onNavigate={onNavigate}>
            <div className="grid grid-cols-12 gap-6 h-full">
                {/* Left Panel - Catalog (8 cols) */}
                <div className="col-span-12 lg:col-span-8 h-full">
                    <CatalogPanel />
                </div>

                {/* Right Panel - Cart (4 cols) */}
                <div className="col-span-12 lg:col-span-4 h-full">
                    <CartPanel onCheckout={() => setIsPaymentModalOpen(true)} />
                </div>
            </div>

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                total={total}
            />
        </GlassLayout>
    );
}
