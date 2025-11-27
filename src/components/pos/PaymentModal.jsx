import React, { useState } from 'react';
import { X, CreditCard, Banknote, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../shared/GlassCard';
import { useCartStore } from '../../store/useCartStore';
import { cartService } from '../../services/cartService';

export function PaymentModal({ isOpen, onClose, total }) {
    const [paymentMethod, setPaymentMethod] = useState('Card');
    const [isProcessing, setIsProcessing] = useState(false);
    const { items, clearCart } = useCartStore();

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            await cartService.processTransaction(items, paymentMethod, total);
            // Success
            clearCart();
            onClose();
            // In a real app, show success toast/receipt
        } catch (error) {
            console.error('Payment failed', error);
        } finally {
            setIsProcessing(false);
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
                    className="w-full max-w-md"
                >
                    <GlassCard className="p-6 bg-white/90 border-white/50 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-800">Payment</h2>
                            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="text-center mb-8">
                            <div className="text-slate-500 text-sm mb-1">Total Amount</div>
                            <div className="text-4xl font-bold text-slate-800">${total.toFixed(2)}</div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-8">
                            {['Card', 'Cash', 'Split'].map((method) => (
                                <button
                                    key={method}
                                    onClick={() => setPaymentMethod(method)}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${paymentMethod === method
                                            ? 'bg-blue-50 border-blue-500 text-blue-600'
                                            : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                                        }`}
                                >
                                    {method === 'Card' && <CreditCard className="w-6 h-6 mb-2" />}
                                    {method === 'Cash' && <Banknote className="w-6 h-6 mb-2" />}
                                    {method === 'Split' && <Wallet className="w-6 h-6 mb-2" />}
                                    <span className="text-sm font-medium">{method}</span>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2"
                        >
                            {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                        </button>
                    </GlassCard>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
