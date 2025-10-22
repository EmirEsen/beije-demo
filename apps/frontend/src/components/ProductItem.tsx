"use client"

import { Box, Typography, IconButton } from "@mui/material"
import { Add, Remove } from "@mui/icons-material"
import { getProductIconComponentByName, getProductColorByName } from "../lib/getProductAssets"
import { useCustomPacket } from "../contexts/CustomPacketContext"
import { IProduct } from "@beije/shared"


interface ProductItemProps {
    product: IProduct
    isFirst?: boolean
}

export default function ProductItem({ product, isFirst = false }: ProductItemProps) {
    const { selections, addProduct, updateQuantity } = useCustomPacket()
    const quantity = selections.find((item) => item.id === product.id)?.packageSize || 0


    const handleIncrement = () => {
        if (quantity === 0) {
            addProduct({
                ...product
            })
        } else {
            updateQuantity(product.id, quantity + product.packageSize)
        }
    }

    const handleDecrement = () => {
        if (quantity >= product.packageSize) {
            updateQuantity(product.id, quantity - product.packageSize)
        } else if (quantity > 0) {
            updateQuantity(product.id, 0)
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                py: 1.5,
                pt: isFirst ? -1 : 1.5,
                width: "100%",
            }}
        >
            {/* Left Side (Icon + Text) */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 1.5,
                    flex: 1,
                    ml: -2,
                }}
            >
                {/* Icon */}
                <Box
                    sx={{
                        backgroundColor: getProductColorByName(product.name),
                        borderRadius: "0px 4px 4px 0px",
                        px: 1.5,
                        pl: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: 60,
                        height: 32,
                        flexShrink: 0,
                    }}
                >
                    {getProductIconComponentByName(product.name, 24)}
                </Box>

                {/* Product Name */}
                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: "0.875rem",
                        color: "#2D2D2D",
                        whiteSpace: "nowrap",
                    }}
                >
                    {product.name}
                </Typography>
            </Box>

            {/* Right Side (Quantity Control) */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1.5px solid #E0E0E0",
                    borderRadius: "24px",
                    overflow: "hidden",
                    backgroundColor: "#FFFFFF",
                }}
            >
                <IconButton
                    size="small"
                    onClick={handleDecrement}
                    disabled={quantity === 0}
                    sx={{
                        p: 1.5,
                        "&:hover": {
                            backgroundColor: "#F5F5F5",
                            borderRadius: "50%"
                        },
                        "&.Mui-disabled": { opacity: 0.3 },
                    }}
                >
                    <Remove fontSize="medium" sx={{ color: "#757575" }} />
                </IconButton>

                <Typography
                    sx={{
                        minWidth: 45,
                        textAlign: "center",
                        mx: 1.2,
                        fontSize: "1.4rem",
                        fontWeight: 400,
                        color: "#757575",
                    }}
                >
                    {quantity}
                </Typography>

                <IconButton
                    size="small"
                    onClick={handleIncrement}
                    sx={{
                        p: 1.5,
                        "&:hover": {
                            backgroundColor: "#F5F5F5",
                            borderRadius: "50%"
                        },
                    }}
                >
                    <Add fontSize="medium" sx={{ color: "#757575" }} />
                </IconButton>
            </Box>
        </Box>
    )
}
