import { create } from 'zustand';
import { productService } from '../services/productService';

export const useProductStore = create((set, get) => ({
    products: [],
    isLoading: false,
    error: null,
    searchQuery: '',
    selectedCategory: 'All',

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
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.barcode === searchQuery;
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
    }
}));
