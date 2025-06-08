/**
 * Utility functions for managing cookies in the browser
 */

export interface CookieOptions {
  expires?: Date;
  maxAge?: number; // seconds
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Set a cookie with the given name and value
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  const defaults: CookieOptions = {
    path: '/',
    sameSite: 'lax',
    // Default to 7 days expiration for admin keys
    maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
  };

  const finalOptions = { ...defaults, ...options };
  
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  
  if (finalOptions.expires) {
    cookieString += `; expires=${finalOptions.expires.toUTCString()}`;
  }
  
  if (finalOptions.maxAge) {
    cookieString += `; max-age=${finalOptions.maxAge}`;
  }
  
  if (finalOptions.path) {
    cookieString += `; path=${finalOptions.path}`;
  }
  
  if (finalOptions.domain) {
    cookieString += `; domain=${finalOptions.domain}`;
  }
  
  if (finalOptions.secure) {
    cookieString += `; secure`;
  }
  
  if (finalOptions.sameSite) {
    cookieString += `; samesite=${finalOptions.sameSite}`;
  }
  
  document.cookie = cookieString;
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');
  
  for (const cookie of cookies) {
    const c = cookie.trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  
  return null;
}

/**
 * Delete a cookie by name
 */
export function deleteCookie(name: string, path: string = '/'): void {
  setCookie(name, '', {
    expires: new Date(0),
    path: path
  });
}

/**
 * Admin-specific cookie utilities
 */
export const adminCookies = {
  ADMIN_KEY: 'dachshund_admin_key',
  
  /**
   * Save admin key to cookie
   */
  saveAdminKey(key: string, remember: boolean = true): void {
    if (remember) {
      setCookie(this.ADMIN_KEY, key, {
        maxAge: 7 * 24 * 60 * 60, // 7 days
        secure: location.protocol === 'https:',
        sameSite: 'lax'
      });
    } else {
      // Session cookie - expires when browser closes
      setCookie(this.ADMIN_KEY, key, {
        secure: location.protocol === 'https:',
        sameSite: 'lax'
      });
    }
  },
  
  /**
   * Get saved admin key from cookie
   */
  getAdminKey(): string | null {
    return getCookie(this.ADMIN_KEY);
  },
  
  /**
   * Remove admin key cookie
   */
  clearAdminKey(): void {
    deleteCookie(this.ADMIN_KEY);
  }
};
