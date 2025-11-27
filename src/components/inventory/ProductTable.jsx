import React from 'react';
import { Edit, Trash2, AlertCircle } from 'lucide-react';
import { GlassCard } from '../shared/GlassCard';
import { useProductStore } from '../../store/useProductStore';

export function ProductTable({ onEdit }) {
    const { products, isLoading } = useProductStore();

    if (isLoading) return <div className="text-center text-slate-400 py-10">Loading...</div>;

    return (
        <GlassCard className="overflow-hidden bg-white/60">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50/50 text-xs uppercase text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Brand</th>
                            <th className="px-6 py-4">SKU / Barcode</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Stock</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/50">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-white/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded bg-slate-100 overflow-hidden border border-slate-200">
                                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="font-medium text-slate-800">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {product.brand || '-'}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-mono text-xs text-slate-600">{product.sku}</span>
                                        {product.barcode && (
                                            <span className="font-mono text-[10px] text-slate-400">{product.barcode}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-full bg-slate-100 text-xs border border-slate-200 text-slate-600">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-800 font-medium">${product.price.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <div className={`flex items-center gap-2 ${product.stock < 5 ? 'text-red-500' :
                                        product.stock < 10 ? 'text-yellow-600' : 'text-green-600'
                                        }`}>
                                        {product.stock < 5 && <AlertCircle className="w-4 h-4" />}
                                        <span className="font-bold">{product.stock}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(product)}
                                            className="p-2 hover:bg-blue-50 rounded-lg text-blue-500 transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </GlassCard>
    );
}
