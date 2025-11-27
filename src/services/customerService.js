import { CUSTOMERS } from '../data/mockData';

const DELAY = 300;

export const customerService = {
    searchCustomers: async (query) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const lowerQuery = query.toLowerCase();
                const results = CUSTOMERS.filter(c =>
                    c.name.toLowerCase().includes(lowerQuery) ||
                    c.phone.includes(query) ||
                    c.email.toLowerCase().includes(lowerQuery)
                );
                resolve(results);
            }, DELAY);
        });
    }
};
