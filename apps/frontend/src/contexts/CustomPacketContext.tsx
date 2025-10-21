"use client";
import { createContext, useContext, useState } from "react";

type SelectedProduct = {
    id: string;
    name: string;
    quantity: number;
    price: number;
    subcategoryId: string;
};

interface CustomPacketContextType {
    selections: SelectedProduct[];
    addProduct: (product: SelectedProduct) => void;
    removeProduct: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearSelection: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

const CustomPacketContext = createContext<CustomPacketContextType | null>(null);

export const CustomPacketProvider = ({ children }: { children: React.ReactNode }) => {
    const [selections, setSelections] = useState<SelectedProduct[]>([]);

    const addProduct = (product: SelectedProduct) => {
        setSelections((prev) => {
            const existing = prev.find((p) => p.id === product.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p
                );
            }
            return [...prev, product];
        });
    };

    const removeProduct = (id: string) => {
        setSelections((prev) => prev.filter((p) => p.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        setSelections((prev) => {
            if (quantity <= 0) {
                return prev.filter((p) => p.id !== id);
            }
            return prev.map((p) => (p.id === id ? { ...p, quantity } : p));
        });
    };

    const clearSelection = () => setSelections([]);

    const getTotalItems = () => {
        return selections.reduce((sum, item) => sum + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return selections.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    };

    return (
        <CustomPacketContext.Provider
            value={{
                selections,
                addProduct,
                removeProduct,
                updateQuantity,
                clearSelection,
                getTotalItems,
                getTotalPrice
            }}
        >
            {children}
        </CustomPacketContext.Provider>
    );
};

export const useCustomPacket = () => {
    const context = useContext(CustomPacketContext);
    if (!context) {
        throw new Error('useCustomPacket must be used within a CustomPacketProvider');
    }
    return context;
};
