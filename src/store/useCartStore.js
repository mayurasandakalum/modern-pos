import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
    items: [],
    customer: null,
    discount: 0,
    discountType: 'percentage', // 'percentage' | 'fixed'
    taxRate: 0.08, // 8%
    parkedSales: [],

    addItem: (product) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === product.id);

        if (existingItem) {
            set({
                items: items.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            });
        } else {
            set({ items: [...items, { ...product, quantity: 1 }] });
        }
    },

    removeItem: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) });
    },

    updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
            get().removeItem(productId);
            return;
        }
        set({
            items: get().items.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        });
    },

    setCustomer: (customer) => set({ customer }),

    setDiscount: (value, type = 'percentage') => set({ discount: value, discountType: type }),

    clearCart: () => set({ items: [], customer: null, discount: 0, discountType: 'percentage' }),

    parkSale: () => {
        const { items, customer, discount, discountType } = get();
        if (items.length === 0) return;

        const sale = {
            id: Date.now(),
            date: new Date().toISOString(),
            items,
            customer,
            discount,
            discountType,
            total: get().getTotals().total
        };

        set(state => ({
            parkedSales: [...state.parkedSales, sale],
            items: [],
            customer: null,
            discount: 0,
            discountType: 'percentage'
        }));
    },

    resumeSale: (saleId) => {
        const { parkedSales } = get();
        const sale = parkedSales.find(s => s.id === saleId);
        if (!sale) return;

        set(state => ({
            items: sale.items,
            customer: sale.customer,
            discount: sale.discount,
            discountType: sale.discountType || 'percentage',
            parkedSales: state.parkedSales.filter(s => s.id !== saleId)
        }));
    },

    removeParkedSale: (saleId) => {
        set(state => ({
            parkedSales: state.parkedSales.filter(s => s.id !== saleId)
        }));
    },

    // Selectors/Computed
    getTotals: () => {
        const { items, discount, discountType, taxRate } = get();
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        let discountAmount = 0;
        if (discountType === 'percentage') {
            discountAmount = subtotal * (discount / 100);
        } else {
            discountAmount = discount;
        }

        // Ensure discount doesn't exceed subtotal
        discountAmount = Math.min(discountAmount, subtotal);

        const taxableAmount = subtotal - discountAmount;
        const tax = taxableAmount * taxRate;
        const total = taxableAmount + tax;

        return {
            subtotal,
            discountAmount,
            tax,
            total
        };
    }
}));
