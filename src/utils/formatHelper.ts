import moment from 'moment';
import numeral from "numeral";

/**
 * Convert a value in standard currency units (e.g. 12.34)
 * to cents (integer).
 */
export function toCents(amount: number | string): number {
  return numeral(amount).multiply(100).value() ?? 0;
}

/**
 * Convert a value in cents (integer) back to standard currency units.
 */
export function fromCents(cents: number): number {
  if (cents) {
return numeral(cents).divide(100).value() ?? 0
  }
  return 0
}

/**
 * Format a cents value into a currency string using numeral.
 *
 * @param cents - The amount in cents
 * @param format - Numeral format string (default: '0,0.00')
 * @returns A formatted currency string (e.g. "12.34" or "1,234.56")
 */
export function formatCents(cents: number, format: string = "0,0.00"): string {
  return numeral(fromCents(cents)).format(format);
}

/**
 * Format Name in Capital case
 * @param name 
 * @returns 
 */
export const  formatName = (name: string) => {
  const lower = name.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/**
 * Format human readable date
 * @param date 
 * @returns 
 */
export const formatDate = (date: any): string => {
  return moment(date).format('MMM DD, YYYY hh:mm A')
}