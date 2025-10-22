"use client"

import { Box, Typography, Button, IconButton, useMediaQuery, useTheme } from "@mui/material"
import { useDispatch } from "react-redux"
import { useCustomPacket } from "../contexts/CustomPacketContext"
import { addToCart } from "../store/slices/cartSlice"
import TrashIcon from "./icons/TrashIcon"
import { useEffect } from "react"
import { IProduct, ISubCategory } from "@beije/shared"

interface MobileCustomPacketModalProps {
    open: boolean
    onClose: () => void
    onOpen: () => void
    subCategories?: ISubCategory[]
}

export default function MobileCustomPacketModal({ open, onClose, onOpen, subCategories }: MobileCustomPacketModalProps) {
    const dispatch = useDispatch()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
    const { selections, removeProduct, getTotalItems, getTotalPrice, clearSelection } = useCustomPacket()
    const totalItems = getTotalItems()
    const totalPrice = getTotalPrice()

    // Close modal when screen size changes to desktop
    useEffect(() => {
        if (!isMobile && open) {
            onClose()
        }
    }, [isMobile, open, onClose])

    // Group items by subcategory
    const groupedItems = selections.reduce((acc, item) => {
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
                price: item.price,
                quantity: item.packageSize
            }))
        })

        // Clear the custom packet selections after adding to cart
        clearSelection()
        onClose()
    }

    return (
        <>
            {/* Collapsed State - Always Visible */}
            <Box sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "#F5F5F5",
                p: 2,
                display: { xs: "block", lg: "none" },
                zIndex: 1000,
                borderTop: "1px solid #E0E0E0",
                pointerEvents: "auto"
            }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.02)",
                            borderRadius: "8px",
                        },
                        p: 1,
                        mx: -1,
                    }}
                    onClick={onOpen}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography sx={{ color: "#666666", fontSize: "14px" }}>
                            Toplam
                        </Typography>
                        <Box sx={{ color: "#666666" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M6 15L12 9L18 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Box>
                    </Box>
                    <Typography sx={{ color: "#666666", fontSize: "16px", fontWeight: 500 }}>
                        ₺{totalPrice.toFixed(2)}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    fullWidth
                    disabled={totalItems === 0}
                    onClick={onOpen}
                    sx={{
                        backgroundColor: totalItems === 0 ? "#E8E8E8" : "#343131",
                        color: totalItems === 0 ? "#999999" : "#FFFFFF",
                        textTransform: "none",
                        py: 1.5,
                        borderRadius: "64px",
                        fontSize: "1rem",
                        fontWeight: 600,
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
                    Sepete Ekle
                </Button>
            </Box>

            {/* Expanded Modal */}
            <Box
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "#f7f6f5",
                    borderRadius: "8px 8px 0px 0px",
                    maxHeight: "80vh",
                    zIndex: 1001,
                    boxShadow: "rgba(0, 0, 0, 0.03) 0px -2px 3px, rgba(0, 0, 0, 0.05) 0px -5px 15px",
                    overflow: "hidden",
                    transform: open ? "translateY(0)" : "translateY(100%)",
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    visibility: open ? "visible" : "hidden",
                }}
            >
                <Box sx={{ p: 3, pb: 10 }}>
                    {/* Header */}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", mb: 3 }}>
                        <Typography
                            onClick={onClose}
                            sx={{
                                color: "#343131",
                                fontSize: "0.875rem",
                                fontWeight: 500,
                                cursor: "pointer",
                                "&:hover": {
                                    color: "#2D2D2D",
                                }
                            }}
                        >
                            Kapat
                        </Typography>
                    </Box>

                    {/* Package Contents */}
                    {Object.keys(groupedItems).length > 0 ? (
                        <Box sx={{
                            mb: 3,
                            maxHeight: "38vh",
                            overflowY: "auto",
                            "&::-webkit-scrollbar": {
                                width: "4px",
                            },
                            "&::-webkit-scrollbar-track": {
                                background: "#f1f1f1",
                                borderRadius: "2px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                background: "#c1c1c1",
                                borderRadius: "2px",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                background: "#a8a8a8",
                            },
                        }}>
                            {Object.entries(groupedItems).map(([subcategoryName, items]) => (
                                <Box
                                    key={subcategoryName}
                                    sx={{
                                        mb: 2,
                                        backgroundColor: "#FFFFFF",
                                        borderRadius: "8px",
                                        p: "1.5rem",
                                        border: "1px solid rgb(224, 224, 224)",
                                        position: "relative",
                                    }}
                                >
                                    {/* Category header */}
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                                        <Typography
                                            sx={{
                                                margin: "0px 0px 4px",
                                                fontStyle: "normal",
                                                fontWeight: 600,
                                                fontSize: "1rem",
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
                                                py: 1,
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
                                            <Typography sx={{ fontSize: "0.875rem", fontWeight: 500, color: "#666666" }}>
                                                ₺{(item.packageSize * item.price).toFixed(2)}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Box sx={{ mb: 3, py: 4, textAlign: "center" }}>
                            <Typography sx={{ color: "#666666", fontSize: "14px" }}>
                                Henüz ürün eklenmedi
                            </Typography>
                        </Box>
                    )}

                    {/* Total */}
                    {totalItems > 0 && (
                        <>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: "#717170" }}>
                                        Toplam
                                    </Typography>
                                    <Box sx={{ color: "#717170", cursor: "pointer" }} onClick={onClose}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Box>
                                </Box>
                                <Typography sx={{ fontSize: "1.2rem", fontWeight: 700, color: "#717170" }}>
                                    ₺{totalPrice.toFixed(2)}
                                </Typography>
                            </Box>
                        </>
                    )}

                    {/* Add to Cart Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        disabled={totalItems === 0}
                        onClick={handleAddToCart}
                        sx={{
                            backgroundColor: totalItems === 0 ? "#E8E8E8" : "#343131",
                            color: totalItems === 0 ? "#999999" : "#FFFFFF",
                            textTransform: "none",
                            padding: "12px 22px 10px 22px",
                            borderRadius: "64px",
                            fontSize: "1rem",
                            fontWeight: 600,
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
                        Sepete Ekle
                    </Button>
                </Box>
            </Box>
        </>
    )
}
