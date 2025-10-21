import React from "react"
import PadIcon from "../components/icons/PadIcon"
import TamponIcon from "../components/icons/TamponIcon"
import HeatingPatchIcon from "../components/icons/HeatingPatchIcon"
import PillIcon from "../components/icons/PillIcon"

export interface ProductInfo {
    icon: React.ReactElement
    color: string
}

export class ProductHelper {

    // Product ID to icon mapping
    private static productIconMap: Record<string, React.ComponentType<any>> = {
        // Ped products
        '68f75f6cd33c8a5679fc6b12': PadIcon, // Standart Ped
        '68f75f6cd33c8a5679fc6b14': PadIcon, // Süper Ped
        '68f75f6cd33c8a5679fc6b16': PadIcon, // Süper+ Ped
        '68f75f6cd33c8a5679fc6b18': PadIcon, // Günlük Ped Standart
        '68f75f6cd33c8a5679fc6b1a': PadIcon, // Günlük Ped İnce

        // Tampon products
        '68f75f6cd33c8a5679fc6b1c': TamponIcon, // Mini Tampon
        '68f75f6cd33c8a5679fc6b1e': TamponIcon, // Regular Tampon
        '68f75f6cd33c8a5679fc6b20': TamponIcon, // Süper Tampon

        // Supportive products
        '68f75f6cd33c8a5679fc6b22': HeatingPatchIcon, // Isı Bandı 2'li
        '68f75f6cd33c8a5679fc6b24': HeatingPatchIcon, // Isı Bandı 4'lü
        '68f75f6cd33c8a5679fc6b26': PillIcon, // Cycle Essentials
        '68f75f6cd33c8a5679fc6b28': PillIcon, // Cranberry Essentials
    }

    // Product ID to color mapping
    private static productColorMap: Record<string, string> = {
        // Ped colors
        '68f75f6cd33c8a5679fc6b12': '#ef4e25', // Standart Ped
        '68f75f6cd33c8a5679fc6b14': '#b62229', // Süper Ped
        '68f75f6cd33c8a5679fc6b16': '#610e00', // Süper+ Ped
        '68f75f6cd33c8a5679fc6b18': '#f68c1e', // Günlük Ped Standart
        '68f75f6cd33c8a5679fc6b1a': '#ce7328', // Günlük Ped İnce

        // Tampon colors
        '68f75f6cd33c8a5679fc6b1c': '#a2557c', // Mini Tampon
        '68f75f6cd33c8a5679fc6b1e': '#693566', // Regular Tampon
        '68f75f6cd33c8a5679fc6b20': '#3d223c', // Süper Tampon

        // Supportive product colors
        '68f75f6cd33c8a5679fc6b22': '#FF8C00', // Isı Bandı 2'li
        '68f75f6cd33c8a5679fc6b24': '#FF8C00', // Isı Bandı 4'lü
        '68f75f6cd33c8a5679fc6b26': '#ce7328', // Cycle Essentials
        '68f75f6cd33c8a5679fc6b28': '#693566', // Cranberry Essentials
    }

    /**
     * Gets the appropriate icon component for a product by ID
     */
    static getIconComponentById(productId: string, size: number = 24): React.ReactElement {
        const IconComponent = this.productIconMap[productId] || PadIcon
        const color = 'white'
        const iconProps = { size, color }

        return React.createElement(IconComponent, iconProps)
    }

    /**
     * Gets the appropriate color for a product by ID
     */
    static getColorById(productId: string): string {
        return this.productColorMap[productId] || '#666666'
    }

}

// Export convenience functions
export const getProductIconComponentById = (productId: string, size: number = 24): React.ReactElement =>
    ProductHelper.getIconComponentById(productId, size)
export const getProductColorById = (productId: string): string => ProductHelper.getColorById(productId)
