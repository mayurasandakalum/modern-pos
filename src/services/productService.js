import { PRODUCTS } from '../data/mockData';

const DELAY = 500;

export const productService = {
    getProducts: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...PRODUCTS]);
            }, DELAY);
        });
    },

    getProductBySku: async (sku) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const product = PRODUCTS.find(p => p.sku === sku || p.barcode === sku);
                if (product) {
                    resolve({ ...product });
                } else {
                    resolve(null);
                }
            }, DELAY);
        });
    },

    updateProduct: async (id, updates) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // In a real app, we would update the DB here.
                // For now, we just return the updated object merged with existing.
                const product = PRODUCTS.find(p => p.id === id);
                if (product) {
                    resolve({ ...product, ...updates });
                } else {
                    resolve(null);
                }
            }, DELAY);
        });
    },

    deleteProduct: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, DELAY);
        });
    }
};
