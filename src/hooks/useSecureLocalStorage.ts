"use client";

import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

// Helper to check if a string is encrypted (naive check, assumes specific prefix)
const PREFIX = "TURVA_ENC:";

export function useSecureLocalStorage<T>(key: string, initialValue: T) {
    // State for the actual data
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    // State for the session PIN (in memory only, not saved to disk!)
    const [pin, setPin] = useState<string>("");
    // Is the vault currently locked?
    const [isLocked, setIsLocked] = useState(true);
    // Does any data exist for this key?
    const [hasData, setHasData] = useState(false);

    // Initial check on mount
    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setHasData(true);
                // If it starts with prefix, it's encrypted. If not, it's legacy plaintext.
                if (!item.startsWith(PREFIX)) {
                    // Legacy migration: It's plain text. We should encrypt it later.
                    setStoredValue(JSON.parse(item));
                    setIsLocked(false); // No encryption yet, so it's "open"
                }
            } else {
                setHasData(false);
                setIsLocked(false); // New user, no lock needed yet
            }
        } catch (error) {
            console.error("Storage read error", error);
        }
    }, [key]);

    const unlock = (inputPin: string): boolean => {
        if (typeof window === "undefined") return false;

        try {
            const item = window.localStorage.getItem(key);

            if (!item) {
                // Nothing to unlock, just set PIN for future writes
                setPin(inputPin);
                setIsLocked(false);
                return true;
            }

            if (!item.startsWith(PREFIX)) {
                // Legacy data, no pin needed effectively, but let's set it
                setPin(inputPin);
                setIsLocked(false);
                return true;
            }

            // Attempt decrypt
            const encryptedData = item.slice(PREFIX.length);
            const bytes = CryptoJS.AES.decrypt(encryptedData, inputPin);
            const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

            if (!decryptedString) {
                // Decryption failed (wrong pin)
                return false;
            }

            // Success
            setStoredValue(JSON.parse(decryptedString));
            setPin(inputPin);
            setIsLocked(false);
            return true;

        } catch (e) {
            console.error(e);
            return false;
        }
    };

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);

            if (typeof window !== "undefined") {
                if (pin) {
                    // Encrypt
                    const stringVal = JSON.stringify(valueToStore);
                    const encrypted = CryptoJS.AES.encrypt(stringVal, pin).toString();
                    window.localStorage.setItem(key, PREFIX + encrypted);
                } else {
                    // Fallback (shouldn't happen if flow is correct): Plain text
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                }
            }
        } catch (error) {
            console.error("Storage write error", error);
        }
    };

    return {
        data: storedValue,
        setData: setValue,
        isLocked,
        hasData,
        unlock
    };
}
