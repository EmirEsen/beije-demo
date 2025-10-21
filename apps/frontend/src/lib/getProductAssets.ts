import React from "react"
import PadIcon from "../components/icons/PadIcon"
import TamponIcon from "../components/icons/TamponIcon"
import HeatingPatchIcon from "../components/icons/HeatingPatchIcon"
import PillIcon from "../components/icons/PillIcon"
import TongPadIcon from "../components/icons/TongPadIcon"

export interface ProductInfo {
    icon: React.ReactElement
    color: string
}

export class ProductHelper {

    /**
     * Gets the appropriate icon component for a product by name
     */
    static getIconComponentByName(productName: string, size: number = 24): React.ReactElement {
        const name = productName.toLowerCase()
        const iconProps = { size, color: 'white' }

        // Check for specific patterns
        if (name.includes('tanga')) return React.createElement(TongPadIcon, iconProps)
        if (name.includes('tampon')) return React.createElement(TamponIcon, iconProps)
        if (name.includes('günlük')) return React.createElement(PadIcon, iconProps)
        if (name.includes('ped')) return React.createElement(PadIcon, iconProps)
        if (name.includes('ısı') || name.includes('bandı')) return React.createElement(HeatingPatchIcon, iconProps)
        if (name.includes('cycle') || name.includes('cranberry')) return React.createElement(PillIcon, iconProps)

        // Default fallback
        return React.createElement(PadIcon, iconProps)
    }

    /**
     * Gets the appropriate color for a product by name
     */
    static getColorByName(productName: string): string {
        const name = productName.toLowerCase()

        // Ped colors
        if (name.includes('standart') && name.includes('ped')) return '#ef4e25'
        if (name.includes('süper+')) return '#610e00'
        if (name.includes('süper') && name.includes('ped')) return '#b62229'
        if (name.includes('tanga')) return '#ce7328'
        if (name.includes('günlük')) return '#f68c1e'

        // Tampon colors
        if (name.includes('mini')) return '#a2557c'
        if (name.includes('standart') && name.includes('tampon')) return '#693566'
        if (name.includes('süper') && name.includes('tampon')) return '#3d223c'

        // Supportive product colors
        if (name.includes('ısı') || name.includes('bandı')) return '#FF8C00'
        if (name.includes('cycle')) return '#ce7328'
        if (name.includes('cranberry')) return '#693566'

        // Default fallback
        return '#666666'
    }

}

// Export convenience functions
export const getProductIconComponentByName = (productName: string, size: number = 24): React.ReactElement =>
    ProductHelper.getIconComponentByName(productName, size)

export const getProductColorByName = (productName: string): string => ProductHelper.getColorByName(productName)