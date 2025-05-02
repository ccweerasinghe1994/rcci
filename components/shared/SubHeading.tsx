// src/components/SubHeading.tsx (or .jsx)

import clsx from 'clsx'; // Optional: for cleaner class name merging
import React, { FC } from 'react';

interface SubHeadingProps {
  /** The text content for the subheading */
  children: React.ReactNode;
  /** Optional additional CSS classes to apply */
  className?: string;
  /** The HTML tag to render the component as (default: 'h2') */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
}

/**
 * A reusable subheading component with responsive text size.
 * Default styling applies text-3xl on mobile and shrinks to text-2xl
 * on the 'sm' breakpoint and larger, matching the example provided.
 * Includes font-bold and tracking-tight.
 */
const SubHeading: FC<SubHeadingProps> = ({
  children,
  className,
  as: Component = 'h2', // Default to h2 semantically
}) => {
  return (
    <Component
      className={clsx(
        // --- Base styles mimicking the example ---
        'text-3xl',           // Default size (mobile-first)
        'sm:text-2xl',        // Size for 'sm' breakpoint (640px) and up
        'font-bold',          // Bold font weight
        'tracking-tight',     // Tight letter spacing
        // --- Allow for custom classes ---
        className
      )}
    >
      {children}
    </Component>
  );
};

export default SubHeading;