import React from 'react';
import * as Icons from 'lucide-react';
type IconName = keyof typeof Icons;
interface IconRendererProps extends Icons.LucideProps {
  iconName: string;
}
export function IconRenderer({ iconName, ...props }: IconRendererProps) {
  const LucideIcon = Icons[iconName as IconName];
  // A more robust type guard for lucide-react icons.
  // Valid icon components are functions (functional components) and typically have 0 or 1 argument (props).
  // Helper functions exported by the library, like `createLucideIcon`, have more arguments.
  if (typeof LucideIcon === 'function' && LucideIcon.length < 2) {
    return <LucideIcon {...props} />;
  }
  // Fallback icon if the name is invalid or doesn't resolve to a renderable component.
  return <Icons.HelpCircle {...props} />;
}