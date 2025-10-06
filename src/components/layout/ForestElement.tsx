import { cn } from '@/lib/utils';
import React from 'react';
const elements = {
  fern: {
    path: "M20 22c-2-2-2-4-2-4s2-2 4-4c2-2 4-2 4-2s2 2 4 4c2 2 2 4 2 4M2 22c2-2 2-4 2-4s-2-2-4-4c-2-2-4-2-4-2S-2 14 0 16c2 2 2 4 2 4",
    viewBox: "0 0 24 24",
  },
  leaf: {
    path: "M12 2a9.8 9.8 0 0 0-8 5 9.8 9.8 0 0 0 8 15 9.8 9.8 0 0 0 8-15 9.8 9.8 0 0 0-8-5zm0 17a7.8 7.8 0 0 1-6-3 7.8 7.8 0 0 1 6-11 7.8 7.8 0 0 1 6 11 7.8 7.8 0 0 1-6 3zM12 4v16",
    viewBox: "0 0 24 24",
  },
  branch: {
    path: "M12 2v4M12 10v12M12 6a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    viewBox: "0 0 24 24",
  },
  pine: {
    path: "m12 2 7 10h-5l4 5-6 5-6-5 4-5H5L12 2z",
    viewBox: "0 0 24 24",
  },
};
type ElementName = keyof typeof elements;
interface ForestElementProps extends React.SVGProps<SVGSVGElement> {
  name: ElementName;
}
export function ForestElement({ name, className, ...props }: ForestElementProps) {
  const element = elements[name];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={element.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('pointer-events-none', className)}
      {...props}
    >
      <path d={element.path} />
    </svg>
  );
}