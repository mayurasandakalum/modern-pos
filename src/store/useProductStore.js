import { create } from 'zustand';
import { productService } from '../services/productService';

export const useProductStore = create((set, get) => ({
    products: [],
    isLoading: false,
    error: null,
    searchQuery: '',
    selectedCategory: 'All',

    // New fields support is mainly in the data objects themselves, 
    // but we might want to ensure we can filter/search by them if needed later.
    // For now, the store just holds the array.

    fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
            const products = await productService.getProducts();
            set({ products, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch products', isLoading: false });
        }
    },

    setSearchQuery: (query) => set({ searchQuery: query }),

    setSelectedCategory: (category) => set({ selectedCategory: category }),

    getFilteredProducts: () => {
        const { products, searchQuery, selectedCategory } = get();
        return products.filter(product => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                product.name.toLowerCase().includes(searchLower) ||
                product.sku.toLowerCase().includes(searchLower) ||
                (product.barcode && product.barcode.includes(searchLower)) || // Added barcode search
                (product.brand && product.brand.toLowerCase().includes(searchLower)); // Added brand search

            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    },

    // Optimistic update for stock
    updateProductStock: (productId, quantityChange) => {
        set(state => ({
            products: state.products.map(p =>
                p.id === productId
                    ? { ...p, stock: p.stock - quantityChange }
                    : p
            )
        }));
    },

    addProduct: (product) => {
        set(state => ({
            products: [...state.products, product]
        }));
    },

    updateProduct: (id, updates) => {
        set(state => ({
            products: state.products.map(p =>
                p.id === id ? { ...p, ...updates } : p
            )
        }));
    }
}));
