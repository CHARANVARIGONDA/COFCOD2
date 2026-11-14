// ============================================================================
// COFOCO Compare Context
// Manages kit selection state for the 2-kit comparison matrix
// ============================================================================

import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'cofoco_compare_slugs_v1';
const MAX_COMPARE = 2; // Strict 2-column comparative parity for mobile-first

interface CompareContextValue {
  selectedSlugs: string[];
  addKit: (slug: string) => void;
  removeKit: (slug: string) => void;
  toggleKit: (slug: string) => void;
  clearCompare: () => void;
  isInCompare: (slug: string) => boolean;
  canAdd: boolean;
}

const CompareContext = createContext<CompareContextValue | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(() => {
    if (typeof window === 'undefined') return ['arjun-morning-prep-kit', 'bheema-heavy-training-kit'];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.slice(0, MAX_COMPARE);
      }
    } catch (e) {
      console.warn('Failed to parse compare slugs:', e);
    }
    // Default pre-loaded kits for instant demonstration
    return ['arjun-morning-prep-kit', 'bheema-heavy-training-kit'];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedSlugs));
    } catch (e) {
      console.warn('Failed to save compare slugs:', e);
    }
  }, [selectedSlugs]);

  const addKit = (slug: string) => {
    if (selectedSlugs.includes(slug)) return;
    if (selectedSlugs.length >= MAX_COMPARE) {
      // Replace oldest
      setSelectedSlugs([selectedSlugs[1], slug]);
    } else {
      setSelectedSlugs([...selectedSlugs, slug]);
    }
  };

  const removeKit = (slug: string) => {
    setSelectedSlugs(selectedSlugs.filter((s) => s !== slug));
  };

  const toggleKit = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      removeKit(slug);
    } else {
      addKit(slug);
    }
  };

  const clearCompare = () => {
    setSelectedSlugs([]);
  };

  const isInCompare = (slug: string) => selectedSlugs.includes(slug);
  const canAdd = selectedSlugs.length < MAX_COMPARE;

  return (
    <CompareContext.Provider
      value={{
        selectedSlugs,
        addKit,
        removeKit,
        toggleKit,
        clearCompare,
        isInCompare,
        canAdd,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export function useCompare(): CompareContextValue {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
