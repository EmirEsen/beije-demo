"use client"

import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Alert } from "@mui/material"
import { ExpandMore } from "@mui/icons-material"
import { getSubCategoryDisplayName, getSubCategoryIcon } from "../lib/getCategoryAssets"
import { useCustomPacket } from "../contexts/CustomPacketContext"
import ProductItem from "./ProductItem"
import { ISubCategory, IProduct } from "@beije/shared"


interface ProductCategoryAccordionProps {
    subCategory: ISubCategory & { variants: IProduct[] }
    defaultExpanded?: boolean
}

export default function ProductCategoryAccordion({ subCategory, defaultExpanded = false }: ProductCategoryAccordionProps) {
    const { selections } = useCustomPacket()

    // Calculate total quantity for this category
    const categoryItems = selections.filter(item =>
        subCategory.variants.some(variant => variant.id === item.id)
    )

    // Get all items with quantity > 0 to show in header
    const addedItems = categoryItems.filter(item => item.packageSize > 0)

    // Create summary text for all added items
    const getSummaryText = () => {
        if (addedItems.length === 0) return null

        if (addedItems.length === 1) {
            const item = addedItems[0]
            return `${item.packageSize} adet ${item.name}`
        }

        if (addedItems.length === 2) {
            const [item1, item2] = addedItems
            return `${item1.packageSize} adet ${item1.name} ve ${item2.packageSize} adet ${item2.name}`
        }

        // For 3 or more items, show first three items
        const [item1, item2, item3, ...rest] = addedItems
        if (rest.length === 0) {
            return `${item1.packageSize} adet ${item1.name}, ${item2.packageSize} adet ${item2.name} ve ${item3.packageSize} adet ${item3.name}`
        } else {
            return `${item1.packageSize} adet ${item1.name}, ${item2.packageSize} adet ${item2.name}, ${item3.packageSize} adet ${item3.name}`
        }
    }

    return (
        <Accordion
            defaultExpanded={defaultExpanded}
            sx={{
                mb: 4,
                boxShadow: "none",
                "&:before": { display: "none" },
                backgroundColor: "transparent",
                borderRadius: "16px !important",
                overflow: "hidden",
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "#2D2D2D" }} />}
                sx={{
                    backgroundColor: "#FFFFFF",
                    minHeight: 64,
                    borderRadius: "12px",
                    "&.Mui-expanded": {
                        minHeight: 56,
                        borderRadius: "12px 12px 0 0",
                    }
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                    <Box
                        sx={{
                            width: 24,
                            height: 24,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.3rem",
                        }}
                    >
                        {getSubCategoryIcon(subCategory.name)}
                    </Box>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: "20px",
                            lineHeight: "24px",
                            color: "#2D2D2D"
                        }}>
                        {getSubCategoryDisplayName(subCategory.name)}
                    </Typography>
                    {getSummaryText() && (
                        <Typography sx={{
                            color: "#666666",
                            fontSize: "0.9rem",
                            fontWeight: 400,
                            ml: "auto",
                            mr: 1,
                            textAlign: "right",
                            maxWidth: "60%",
                            lineHeight: 1.2
                        }}>
                            {getSummaryText()}
                        </Typography>
                    )}
                </Box>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "0 0 12px 12px",
                    pt: 0,
                    pb: 0,
                    mb: 5
                }}
            >
                {subCategory.description && (
                    <Alert
                        severity="success"
                        icon={
                            <Box
                                sx={{
                                    width: 24,
                                    height: 24,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                >
                                    <path
                                        d="M11.993 5.136c-2-2.338-5.333-2.966-7.838-.826s-2.858 5.719-.89 8.25c1.635 2.105 6.585 6.544 8.207 7.98.182.162.272.242.378.274a.504.504 0 0 0 .286 0c.106-.032.197-.112.378-.273 1.623-1.437 6.573-5.876 8.208-7.98 1.967-2.532 1.658-6.133-.89-8.251-2.549-2.118-5.84-1.512-7.839.826Z"
                                        fill="#B9D54D"
                                        stroke="#B9D54D"
                                        strokeWidth="1"
                                    />
                                </svg>
                            </Box>
                        }
                        sx={{
                            mb: 3,
                            backgroundColor: "#ecf1cf",
                            borderRadius: "8px",
                            color: "#2c2f28",
                            fontSize: "16px",
                            fontWeight: 300,
                            py: 2,
                            px: 3,
                            "& .MuiAlert-icon": {
                                color: "#B9D54D",
                            },
                            "& .MuiAlert-message": {
                                padding: "0px 4px",
                            },
                        }}
                    >
                        {subCategory.description}
                    </Alert>
                )}

                {subCategory.variants.map((variant: IProduct, index: number) => (
                    <ProductItem
                        key={variant.id}
                        product={variant}
                        isFirst={index === 0}
                    />
                ))}
            </AccordionDetails>
        </Accordion>
    )
}
