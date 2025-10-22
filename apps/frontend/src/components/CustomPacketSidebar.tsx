"use client"

import { Box, Typography, Button, IconButton } from "@mui/material"
import { useDispatch } from "react-redux"
import { useCustomPacket } from "../contexts/CustomPacketContext"
import { useGetSubCategoriesQuery } from "../store/apis/subCategoryApi"
import { addToCart } from "../store/slices/cartSlice"
import TrashIcon from "./icons/TrashIcon"
import TwoMonthDeliveryBadge from "./icons/TwoMonthDeliveryBadge"
import { IProduct } from "@beije/shared"

export default function CustomPacketSidebar() {
    const dispatch = useDispatch()
    const { selections, removeProduct, getTotalItems, getTotalPrice, clearSelection } = useCustomPacket()
    const { data: subCategories } = useGetSubCategoriesQuery()
    const totalItems = getTotalItems()
    const totalPrice = getTotalPrice()

    // Group items by subcategory
    const groupedItems = selections.reduce((acc: Record<string, IProduct[]>, item: IProduct) => {
        const subcategory = subCategories?.find(sub => sub.id === item.subcategoryId)
        if (subcategory) {
            const subcategoryKey = subcategory.name
            if (!acc[subcategoryKey]) {
                acc[subcategoryKey] = []
            }
            acc[subcategoryKey].push(item)
        }
        return acc
    }, {} as Record<string, typeof selections>)


    function getSubcategoryDisplayName(subcategoryName: string): string {
        // Map subcategory names to display names
        const subcategoryMap: Record<string, string> = {
            // Menstrual subcategories
            'PAD': 'Ped Paketleri',
            'PANTY_LINER': 'Günlük Ped Paketleri',
            'TAMPON': 'Tampon Paketleri',
            // Supportive subcategories - all grouped under one category
            'HEATING_PAD': 'Isı Bandı Paketleri',
            'CYCLE_ESSENTIALS': 'Cycle Essentials Paketleri',
            'CRANBERRY_ESSENTIALS': 'Cranberry Essentials Paketleri',
        }

        return subcategoryMap[subcategoryName] || subcategoryName
    }

    const handleRemoveCategory = (subcategoryName: string) => {
        const itemsInCategory = groupedItems[subcategoryName] || []
        itemsInCategory.forEach(item => {
            removeProduct(item.id)
        })
    }

    const handleAddToCart = () => {
        // Add all selected items to the global cart
        selections.forEach(item => {
            dispatch(addToCart({
                productId: item.id,
                name: item.name,
                price: item.price * item.packageSize, // Total price for the package
                quantity: 1 // Each selection is one package
            }))
        })

        // Clear the custom packet selections after adding to cart
        clearSelection()
    }

    return (
        <Box
            sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                p: { xs: 3, lg: "32px" },
                width: { xs: "100%", lg: "466px" },
                position: { xs: "static", lg: "sticky" },
                top: { xs: 0, lg: 100 }
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 550, fontSize: "1.7rem", color: "#2D2D2D" }}>
                    Özel Paketin
                </Typography>
                <TwoMonthDeliveryBadge />
            </Box>

            <Typography sx={{ color: "#666666", mb: 4, lineHeight: 1.6, fontSize: "14px", fontWeight: 400 }}>
                Kişisel ihtiyacına yönelik istediğin miktarda Ped, Günlük Ped, Tampon veya destekleyici ürünler ekleyerek
                kendine özel bir paket oluşturabilirsin.
            </Typography>

            {/* Package Contents */}
            {Object.keys(groupedItems).length > 0 ? (
                <Box sx={{ mb: 4 }}>
                    {Object.entries(groupedItems).map(([subcategoryName, items]: [string, IProduct[]]) => (
                        <Box
                            key={subcategoryName}
                            sx={{
                                backgroundColor: "#FFFFFF",
                                borderRadius: "8px",
                                p: '1.5rem',
                                mb: 2,
                                border: "1px solid rgb(224, 224, 224)",
                                position: "relative",
                            }}
                        >
                            {/* Category header */}
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Typography
                                    sx={{
                                        margin: "0px 0px 4px",
                                        fontWeight: 500,
                                        fontSize: "18px",
                                        lineHeight: "140%",
                                        letterSpacing: "-0.015em",
                                        color: "#2D2D2D",
                                    }}
                                >
                                    {getSubcategoryDisplayName(subcategoryName)}
                                </Typography>
                                <IconButton
                                    size="small"
                                    onClick={() => handleRemoveCategory(subcategoryName)}
                                    sx={{
                                        color: "#999999",
                                        padding: 0.5,
                                        "&:hover": {
                                            color: "#FF4444",
                                            backgroundColor: "#FFF5F5",
                                        },
                                    }}
                                >
                                    <TrashIcon size={24} color="#343131" />
                                </IconButton>
                            </Box>

                            {/* Product items */}
                            {items.map((item: IProduct) => (
                                <Box
                                    key={item.id}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        py: 1
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Typography sx={{ fontSize: "0.875rem", fontWeight: 500, color: "#7c7c7c" }}>
                                            {item.packageSize} x
                                        </Typography>
                                        <Typography sx={{ fontSize: "0.875rem", color: "#7c7c7c" }}>
                                            {item.name}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                        <Typography sx={{ fontSize: "0.875rem", fontWeight: 500, color: "#666666", lineHeight: "%120" }}>
                                            ₺{(item.packageSize * item.price).toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box sx={{ mb: 4, py: 2 }}>

                </Box>
            )}

            <Button
                variant="contained"
                fullWidth
                disabled={totalItems === 0}
                onClick={handleAddToCart}
                sx={{
                    backgroundColor: totalItems === 0 ? "#E8E8E8" : "#343131",
                    color: totalItems === 0 ? "#999999" : "#FFFFFF",
                    textTransform: "none",
                    py: 1.5,
                    borderRadius: "24px",
                    fontSize: "1rem",
                    fontWeight: 500,
                    boxShadow: "none",
                    "&:hover": {
                        backgroundColor: totalItems === 0 ? "#E8E8E8" : "#1A1A1A",
                        boxShadow: "none",
                    },
                    "&.Mui-disabled": {
                        backgroundColor: "#E8E8E8",
                        color: "#999999",
                    },
                }}
            >
                Sepete Ekle (₺{totalPrice.toFixed(2)})
            </Button>
        </Box>
    )
}
