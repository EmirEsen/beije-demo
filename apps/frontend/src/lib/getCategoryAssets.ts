import React from "react"
import { MainCategory, MenstrualSubCategory, SupportiveSubCategory } from "@beije/shared"
import PadIcon from "../components/icons/PadIcon"
import TamponIcon from "../components/icons/TamponIcon"
import HeatingPatchIcon from "../components/icons/HeatingPatchIcon"
import PillIcon from "../components/icons/PillIcon"

export const getMainCategoryDisplayName = (category: MainCategory) => {
    switch (category) {
        case MainCategory.MENSTRUAL:
            return "Menstruel Ürünler"
        case MainCategory.SUPPORTIVE:
            return "Destekleyici Ürünler"
        default:
            return "Unknown"
    }
}

export const getSubCategoryDisplayName = (categoryName: string) => {
    switch (categoryName) {
        case MenstrualSubCategory.PAD:
            return "Beije Ped"
        case MenstrualSubCategory.PANTY_LINER:
            return "Beije Günlük Ped"
        case MenstrualSubCategory.TAMPON:
            return "Beije Tampon"
        case SupportiveSubCategory.HEATING_PAD:
            return "Isı Bandı"
        case SupportiveSubCategory.CYCLE_ESSENTIALS:
            return "Beije Cycle Essentials"
        case SupportiveSubCategory.CRANBERRY_ESSENTIALS:
            return "Beije Cranberry Essentials"
        default:
            return categoryName
    }
}

/**
 * Gets the appropriate icon component for a subcategory
 */
export const getSubCategoryIcon = (categoryName: string, size: number = 24, color: string = "black"): React.ReactElement => {
    const iconProps = { size, color }

    switch (categoryName) {
        case MenstrualSubCategory.PAD:
            return React.createElement(PadIcon, iconProps)
        case MenstrualSubCategory.PANTY_LINER:
            return React.createElement(PadIcon, iconProps)
        case MenstrualSubCategory.TAMPON:
            return React.createElement(TamponIcon, iconProps)
        case SupportiveSubCategory.HEATING_PAD:
            return React.createElement(HeatingPatchIcon, iconProps)
        case SupportiveSubCategory.CYCLE_ESSENTIALS:
            return React.createElement(PillIcon, iconProps)
        case SupportiveSubCategory.CRANBERRY_ESSENTIALS:
            return React.createElement(PillIcon, iconProps)
        default:
            return React.createElement(PadIcon, iconProps)
    }
}