import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function GlassCard({ children, className, ...props }) {
    return (
        <div
            className={twMerge(
                "bg-white/70 backdrop-blur-md border border-white/50 rounded-xl shadow-lg shadow-slate-200/50",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
