import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ContactStatus } from '@/lib/types';

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        active: "bg-skyblue text-white",
        stalled: "bg-charcoal text-white",
        won: "bg-green-500 text-white",
        lost: "bg-red-500 text-white",
        new: "bg-mint text-charcoal border border-skyblue",
      },
    },
    defaultVariants: {
      variant: "active",
    },
  }
);

export interface StatusBadgeProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  status: ContactStatus;
}

export function StatusBadge({ 
  className, 
  status, 
  variant,
  ...props 
}: StatusBadgeProps) {
  // Map status to variant if variant is not explicitly provided
  const mappedVariant = variant || status.toLowerCase() as any;
  
  return (
    <div 
      className={cn(statusBadgeVariants({ variant: mappedVariant }), className)}
      {...props}
    >
      {status}
    </div>
  );
}