import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
    items: [],
    customer: null,
    discount: 0, // Percentage 0-100
    taxRate: 0.08, // 8%

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

    setDiscount: (discount) => set({ discount }),

    clearCart: () => set({ items: [], customer: null, discount: 0 }),

    // Selectors/Computed
    getTotals: () => {
        const { items, discount, taxRate } = get();
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discountAmount = subtotal * (discount / 100);
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
