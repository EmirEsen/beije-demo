"use client"

import { Box, Typography, IconButton } from "@mui/material"
import { Add, Remove } from "@mui/icons-material"
import { getProductIconComponentByName, getProductColorByName } from "../lib/getProductAssets"
import { useCustomPacket } from "../contexts/CustomPacketContext"

interface ProductItemProps {
    name: string
    productId: string
    price: number
    packageSize: number
    subcategoryId: string
    isFirst?: boolean
}

export default function ProductItem({ name, productId, price, packageSize, subcategoryId, isFirst = false }: ProductItemProps) {
    console.log('ProductItem rendered:', { name, productId, packageSize })
    const { selections, addProduct, updateQuantity } = useCustomPacket()
    const quantity = selections.find((item) => item._id === productId)?.packageSize || 0


    const handleIncrement = () => {
        console.log('handleIncrement called', {
            productName: name,
            productId,
            quantity,
            packageSize,
            allSelections: selections.map(s => ({ id: s._id, name: s.name, packageSize: s.packageSize }))
        })
        if (quantity === 0) {
            console.log('Adding new product')
            addProduct({
                _id: productId,
                name,
                price,
                packageSize: packageSize,
                subcategoryId,
                isActive: true
            })
        } else {
            console.log('Updating quantity', quantity + packageSize)
            updateQuantity(productId, quantity + packageSize)
        }
    }

    const handleDecrement = () => {
        if (quantity >= packageSize) {
            updateQuantity(productId, quantity - packageSize)
        } else if (quantity > 0) {
            updateQuantity(productId, 0)
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
                        backgroundColor: getProductColorByName(name),
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
                    {getProductIconComponentByName(name, 24)}
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
                    {name}
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
