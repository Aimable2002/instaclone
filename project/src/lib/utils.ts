import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUsername(username: string): string {
  return `@${username.toLowerCase()}`;
}

export const generateMockId = () => Math.random().toString(36).substr(2, 9);