"use client"

import { Box, CircularProgress, Typography } from "@mui/material"
import { useGetSubCategoriesQuery } from "../store/apis/subCategoryApi"
import { useGetProductsQuery } from "../store/apis/productApi"
import ProductCategoryAccordion from "./ProductCategoryAccordion"
import { IProduct, IMainCategory, ISubCategory } from "@beije/shared"

interface ProductSectionProps {
    activeTab: number
    mainCategories?: IMainCategory[]
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
        subCategory.mainCategoryId === selectedMainCategory?.id
    ) || []

    // Filter products based on the filtered subcategories
    const filteredProducts = products?.filter(product =>
        filteredSubCategories.some(sub => sub.id === product.subcategoryId)
    ) || []

    // adding products to subcategories
    const groupedProducts = filteredProducts.reduce((acc: Record<string, ISubCategory & { variants: IProduct[] }>, product: IProduct) => {
        const subCategory = subCategories?.find(sub => sub.id === product.subcategoryId)
        if (subCategory) {
            const subCategoryKey = subCategory.id
            if (!acc[subCategoryKey]) {
                acc[subCategoryKey] = {
                    ...subCategory,
                    variants: []
                }
            }
            acc[subCategoryKey].variants.push(product)
        }
        return acc
    }, {} as Record<string, ISubCategory & { variants: IProduct[] }>)

    const subCategoriesList = Object.values(groupedProducts)

    return (
        <Box>
            {subCategoriesList.map((subCategory: ISubCategory & { variants: IProduct[] }, index: number) => (
                <ProductCategoryAccordion
                    key={subCategory.id}
                    subCategory={subCategory}
                    defaultExpanded={index === 0}
                />
            ))}
        </Box>
    )
}

