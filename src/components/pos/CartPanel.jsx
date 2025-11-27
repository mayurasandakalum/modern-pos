import React, { useState } from 'react';
import { Trash2, Plus, Minus, CreditCard, User, Percent, PauseCircle, PlayCircle, X } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { GlassCard } from '../shared/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

export function CartPanel({ onCheckout }) {
    const {
        items, updateQuantity, removeItem, getTotals, clearCart,
        parkSale, resumeSale, parkedSales, removeParkedSale,
        setDiscount, discount, discountType,
        customer, setCustomer
    } = useCartStore();

    const { subtotal, discountAmount, tax, total } = getTotals();
    const [showParked, setShowParked] = useState(false);
    const [showDiscount, setShowDiscount] = useState(false);
    const [discountVal, setDiscountVal] = useState('');

    const handleApplyDiscount = () => {
        const val = parseFloat(discountVal);
        if (!isNaN(val)) {
            setDiscount(val, 'percentage'); // Defaulting to percentage for now as per UI simplicity
            setShowDiscount(false);
        }
    };

    const handleParkSale = () => {
        parkSale();
    };

    const handleResumeSale = (saleId) => {
        resumeSale(saleId);
        setShowParked(false);
    };

    return (
        <GlassCard className="h-full flex flex-col p-4 bg-white/40 relative overflow-hidden">
            {/* Header Actions */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800">Current Order</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowParked(true)}
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors relative"
                        title="Parked Sales"
                    >
                        <PauseCircle className="w-5 h-5" />
                        {parkedSales.length > 0 && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        )}
                    </button>
                    <button
                        onClick={clearCart}
                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Clear Cart"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Customer Selection (Mock) */}
            <button
                className="flex items-center gap-3 p-3 mb-4 rounded-xl bg-white/50 border border-white/50 hover:bg-white/80 transition-all text-left group"
                onClick={() => setCustomer(customer ? null : { id: 1, name: 'John Doe' })} // Toggle mock customer
            >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <User className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Customer</div>
                    <div className="font-medium text-slate-800">{customer ? customer.name : 'Walk-in Customer'}</div>
                </div>
            </button>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar mb-4">
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                        <CreditCard className="w-12 h-12 mb-2" />
                        <p>Cart is empty</p>
                    </div>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/60 border border-white/50 shadow-sm">
                            <div className="w-12 h-12 rounded bg-slate-100 overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-slate-800 truncate">{item.name}</h4>
                                <div className="text-blue-600 text-sm">${item.price.toFixed(2)}</div>
                            </div>

                            <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1 border border-slate-200">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 hover:text-slate-800 text-slate-500 transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-4 text-center text-sm font-medium text-slate-800">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 hover:text-slate-800 text-slate-500 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Totals */}
            <div className="mt-auto space-y-3 bg-white/60 p-4 rounded-xl border border-white/50 shadow-sm">
                <div className="flex justify-between text-slate-500 text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                {/* Discount Row */}
                <div className="flex justify-between text-slate-500 text-sm items-center">
                    <button
                        onClick={() => setShowDiscount(!showDiscount)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium"
                    >
                        <Percent className="w-3 h-3" />
                        {discount > 0 ? `Discount (${discount}%)` : 'Add Discount'}
                    </button>
                    <span className={discount > 0 ? 'text-green-600' : ''}>
                        {discount > 0 ? `-$${discountAmount.toFixed(2)}` : '$0.00'}
                    </span>
                </div>

                {showDiscount && (
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="%"
                            className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-sm"
                            value={discountVal}
                            onChange={(e) => setDiscountVal(e.target.value)}
                            autoFocus
                        />
                        <button
                            onClick={handleApplyDiscount}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-bold"
                        >
                            Apply
                        </button>
                    </div>
                )}

                <div className="flex justify-between text-slate-500 text-sm">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-slate-200 my-2" />
                <div className="flex justify-between text-slate-800 font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                <div className="grid grid-cols-4 gap-2 mt-4">
                    <button
                        onClick={handleParkSale}
                        disabled={items.length === 0}
                        className="col-span-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl flex items-center justify-center disabled:opacity-50"
                        title="Park Sale"
                    >
                        <PauseCircle className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onCheckout}
                        disabled={items.length === 0}
                        className="col-span-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                    >
                        Charge ${total.toFixed(2)}
                    </button>
                </div>
            </div>

            {/* Parked Sales Overlay */}
            <AnimatePresence>
                {showParked && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 p-4 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-800">Parked Sales</h3>
                            <button onClick={() => setShowParked(false)}><X className="w-5 h-5 text-slate-500" /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-2">
                            {parkedSales.length === 0 ? (
                                <div className="text-center text-slate-400 mt-10">No parked sales</div>
                            ) : (
                                parkedSales.map(sale => (
                                    <div key={sale.id} className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm flex justify-between items-center">
                                        <div>
                                            <div className="font-medium text-slate-800">
                                                {sale.customer ? sale.customer.name : 'Walk-in'}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {new Date(sale.date).toLocaleTimeString()} • {sale.items.length} items
                                            </div>
                                            <div className="font-bold text-blue-600">${sale.total.toFixed(2)}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleResumeSale(sale.id)}
                                                className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                                            >
                                                <PlayCircle className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => removeParkedSale(sale.id)}
                                                className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </GlassCard>
    );
}
