"use client"

import { Box, CircularProgress, Typography } from "@mui/material"
import { useGetSubCategoriesQuery } from "../store/apis/subCategoryApi"
import { useGetProductsQuery } from "../store/apis/productApi"
import ProductCategoryAccordion from "./ProductCategoryAccordion"
import { getSubCategoryIcon } from "../lib/getCategoryAssets"

interface ProductSectionProps {
    activeTab: number
    mainCategories?: any[]
}

export default function ProductSection({ activeTab, mainCategories }: ProductSectionProps) {
    // Fetch sub categories
    const { data: subCategories, isLoading: subCategoriesLoading, error: subCategoriesError } = useGetSubCategoriesQuery()

    // Fetch products
    const { data: products, isLoading: productsLoading, error: productsError } = useGetProductsQuery()

    if (subCategoriesLoading || productsLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress sx={{ color: "#B52129" }} />
            </Box>
        )
    }

    if (subCategoriesError || productsError) {
        return (
            <Box sx={{ py: 4 }}>
                <Typography sx={{ color: "#666666", textAlign: "center" }}>
                    Ürünler yüklenirken bir hata oluştu.
                </Typography>
            </Box>
        )
    }

    // Get the selected main category
    const selectedMainCategory = mainCategories?.[activeTab]

    // Filter subcategories by the selected main category
    const filteredSubCategories = subCategories?.filter(subCategory =>
        subCategory.mainCategoryId === selectedMainCategory?._id
    ) || []

    // Filter products based on the filtered subcategories
    const filteredProducts = products?.filter(product =>
        filteredSubCategories.some(sub => sub._id === product.subcategoryId)
    ) || []

    // Group products by subcategory
    const groupedProducts = filteredProducts.reduce((acc, product) => {
        const subCategory = subCategories?.find(sub => sub._id === product.subcategoryId)
        if (subCategory) {
            const subCategoryKey = subCategory._id
            if (!acc[subCategoryKey]) {
                acc[subCategoryKey] = {
                    _id: subCategory._id,
                    name: subCategory.name,
                    icon: getSubCategoryIcon(subCategory.name),
                    description: subCategory.description,
                    variants: []
                }
            }
            acc[subCategoryKey].variants.push({
                _id: product._id,
                name: product.name,
                price: product.price,
                packageSize: product.packageSize,
                subcategoryId: product.subcategoryId,
                isActive: product.isActive,
            })
        }
        return acc
    }, {} as Record<string, any>)

    const subCategoriesList = Object.values(groupedProducts)

    return (
        <Box>
            {subCategoriesList.map((subCategory, index) => (
                <ProductCategoryAccordion
                    key={subCategory._id}
                    subCategory={subCategory}
                    defaultExpanded={index === 0}
                />
            ))}
        </Box>
    )
}

