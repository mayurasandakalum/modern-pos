import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, AlertTriangle, Package, DollarSign } from 'lucide-react';
import { GlassCard } from '../shared/GlassCard';
import { useLanguage } from '../../context/LanguageContext';

function AnimatedCounter({ value, prefix = '', suffix = '' }) {
    const spring = useSpring(0, { bounce: 0, duration: 2000 });
    const display = useTransform(spring, (current) =>
        prefix + Math.floor(current).toLocaleString() + suffix
    );

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return <motion.span>{display}</motion.span>;
}

export function DashboardStats() {
    const { t } = useLanguage();
    // Mock data for stats
    const stats = [
        {
            label: t('stats.totalSales'),
            value: 1250,
            prefix: '$',
            icon: DollarSign,
            color: 'text-green-600',
            bg: 'bg-green-100'
        },
        {
            label: t('stats.lowStock'),
            value: 3,
            icon: AlertTriangle,
            color: 'text-red-600',
            bg: 'bg-red-100'
        },
        {
            label: t('stats.totalProducts'),
            value: 45,
            icon: Package,
            color: 'text-blue-600',
            bg: 'bg-blue-100'
        },
        {
            label: t('stats.transactions'),
            value: 28,
            icon: TrendingUp,
            color: 'text-purple-600',
            bg: 'bg-purple-100'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
                <GlassCard key={index} className="p-4 flex items-center gap-4 bg-white/60">
                    <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-slate-500 text-sm">{stat.label}</div>
                        <div className="text-2xl font-bold text-slate-800">
                            <AnimatedCounter value={stat.value} prefix={stat.prefix} />
                        </div>
                    </div>
                </GlassCard>
            ))}
        </div>
    );
}
