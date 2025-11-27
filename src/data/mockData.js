export const PRODUCTS = [
    {
        id: 'p1',
        sku: 'NIKE-AIR-001',
        name: 'Nike Air Max 270',
        price: 150.00,
        cost: 90.00,
        stock: 25,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80',
        variants: [
            { id: 'v1', name: 'Size 9', stock: 10 },
            { id: 'v2', name: 'Size 10', stock: 15 }
        ],
        barcode: '123456789012'
    },
    {
        id: 'p2',
        sku: 'ADIDAS-UB-002',
        name: 'Adidas Ultraboost',
        price: 180.00,
        cost: 110.00,
        stock: 4,
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=300&q=80',
        variants: [
            { id: 'v3', name: 'Size 9', stock: 2 },
            { id: 'v4', name: 'Size 10', stock: 2 }
        ],
        barcode: '123456789013'
    },
    {
        id: 'p3',
        sku: 'LEVIS-501-003',
        name: 'Levi\'s 501 Original',
        price: 69.50,
        cost: 35.00,
        stock: 50,
        category: 'Apparel',
        image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&w=300&q=80',
        variants: [
            { id: 'v5', name: '32x32', stock: 20 },
            { id: 'v6', name: '34x32', stock: 30 }
        ],
        barcode: '123456789014'
    },
    {
        id: 'p4',
        sku: 'RAYBAN-AV-004',
        name: 'Ray-Ban Aviator',
        price: 160.00,
        cost: 80.00,
        stock: 12,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=300&q=80',
        variants: [],
        barcode: '123456789015'
    },
    {
        id: 'p5',
        sku: 'APPLE-WATCH-005',
        name: 'Apple Watch Series 9',
        price: 399.00,
        cost: 320.00,
        stock: 8,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=300&q=80',
        variants: [
            { id: 'v7', name: '41mm', stock: 3 },
            { id: 'v8', name: '45mm', stock: 5 }
        ],
        barcode: '123456789016'
    }
];

export const CUSTOMERS = [
    {
        id: 'c1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-0101',
        loyaltyPoints: 150,
        history: []
    },
    {
        id: 'c2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '555-0102',
        loyaltyPoints: 320,
        history: []
    }
];

export const TRANSACTIONS = [
    {
        id: 't1',
        date: '2023-10-25T10:30:00Z',
        total: 150.00,
        items: [
            { productId: 'p1', quantity: 1, price: 150.00 }
        ],
        paymentMethod: 'Card'
    }
];
