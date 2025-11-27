const DELAY = 800;

export const cartService = {
    processTransaction: async (cartItems, paymentMethod, total) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate successful transaction
                const transactionId = 'txn_' + Date.now();
                resolve({
                    success: true,
                    transactionId,
                    date: new Date().toISOString(),
                    total,
                    items: cartItems,
                    paymentMethod
                });
            }, DELAY);
        });
    }
};
