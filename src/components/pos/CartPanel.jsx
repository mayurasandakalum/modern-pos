import React from 'react';
import { Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { GlassCard } from '../shared/GlassCard';


export function CartPanel({ onCheckout }) {
    const { items, updateQuantity, removeItem, getTotals, clearCart } = useCartStore();
    const { subtotal, tax, total } = getTotals();

    return (
        <GlassCard className="h-full flex flex-col p-4 bg-white/40">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">Current Order</h2>
                <button
                    onClick={clearCart}
                    className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                    <Trash2 className="w-3 h-3" /> Clear
                </button>
            </div>

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
                <div className="flex justify-between text-slate-500 text-sm">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-slate-200 my-2" />
                <div className="flex justify-between text-slate-800 font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                <button
                    onClick={onCheckout}
                    disabled={items.length === 0}
                    className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                >
                    Charge ${total.toFixed(2)}
                </button>
            </div>
        </GlassCard>
    );
}
