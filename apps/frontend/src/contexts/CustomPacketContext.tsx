"use client";
import { createContext, useContext, useState } from "react";
import { ProductEntity } from "@beije/shared";


interface CustomPacketContextType {
    selections: ProductEntity[];
    addProduct: (product: ProductEntity) => void;
    removeProduct: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearSelection: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

const CustomPacketContext = createContext<CustomPacketContextType | null>(null);

export const CustomPacketProvider = ({ children }: { children: React.ReactNode }) => {
    const [selections, setSelections] = useState<ProductEntity[]>([]);

    const addProduct = (product: ProductEntity) => {
        setSelections((prev) => {
            const existing = prev.find((p) => p._id === product._id);
            if (existing) {
                const newPackageSize = existing.packageSize + product.packageSize;
                return prev.map((p) =>
                    p._id === product._id ? { ...p, packageSize: newPackageSize } : p
                );
            }
            return [...prev, product];
        });
    };

    const removeProduct = (id: string) => {
        setSelections((prev) => prev.filter((p) => p._id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        setSelections((prev) => {
            if (quantity <= 0) {
                return prev.filter((p) => p._id !== id);
            }
            return prev.map((p) => (p._id === id ? { ...p, packageSize: quantity } : p));
        });
    };

    const clearSelection = () => setSelections([]);

    const getTotalItems = () => {
        return selections.reduce((sum, item) => sum + item.packageSize, 0);
    };

    const getTotalPrice = () => {
        return selections.reduce((sum, item) => sum + (item.packageSize * item.price), 0);
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
