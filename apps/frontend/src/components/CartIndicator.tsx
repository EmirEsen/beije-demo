"use client"

import { Box, Badge, IconButton, Tooltip } from "@mui/material"
import { ShoppingCart } from "@mui/icons-material"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

export default function CartIndicator() {
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <Box sx={{ position: "relative" }}>
            <Tooltip
                title={totalItems > 0 ? `${totalItems} ürün - ₺${totalPrice.toFixed(2)}` : "Sepet boş"}
                arrow
            >
                <IconButton
                    sx={{
                        color: "#2D2D2D",
                        "&:hover": {
                            backgroundColor: "#F5F5F5",
                        },
                    }}
                >
                    <ShoppingCart />
                </IconButton>
            </Tooltip>

            {totalItems > 0 && (
                <Badge
                    badgeContent={totalItems}
                    color="error"
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        "& .MuiBadge-badge": {
                            backgroundColor: "#B52129",
                            color: "white",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            minWidth: "18px",
                            height: "18px",
                        },
                    }}
                />
            )}
        </Box>
    )
}
