'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface MenuSelectionContextValue {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const MenuSelectionContext = createContext<MenuSelectionContextValue | null>(
  null,
);

export function MenuSelectionProvider({
  defaultLabel,
  children,
}: {
  defaultLabel: string;
  children: ReactNode;
}) {
  const [selectedCategory, setSelectedCategory] = useState(defaultLabel);

  const value = useMemo(
    () => ({ selectedCategory, setSelectedCategory }),
    [selectedCategory],
  );

  return (
    <MenuSelectionContext.Provider value={value}>
      {children}
    </MenuSelectionContext.Provider>
  );
}

export function useMenuSelection(defaultLabel = '') {
  const sharedSelection = useContext(MenuSelectionContext);
  const [localSelectedCategory, setLocalSelectedCategory] =
    useState(defaultLabel);

  if (sharedSelection) {
    return sharedSelection;
  }

  return {
    selectedCategory: localSelectedCategory,
    setSelectedCategory: setLocalSelectedCategory,
  };
}
