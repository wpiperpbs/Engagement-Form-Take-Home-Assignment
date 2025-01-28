/**
 * Generates a unique customer ID with format: USER_YYYYMMDD_XXXXX
 * This simulates a backend service generating unique identifiers.
 * 
 * @returns A unique customer ID string
 * @example
 * const id = generateCustomerId() // Returns something like "USER_20240128_A7B3C"
 */
export const generateCustomerId = (): string => {
  // Get current date in YYYYMMDD format
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  
  // Generate random suffix (5 characters)
  const suffix = Math.random().toString(36).substring(2, 7).toUpperCase();
  
  return `USER_${date}_${suffix}`;
}; 