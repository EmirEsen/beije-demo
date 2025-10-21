"use client"

import { Box, Container, Typography, Tabs, Tab, CircularProgress } from "@mui/material"
import { useState } from "react"
import { useGetMainCategoriesQuery } from "../../store/apis/mainCategoryApi"
import { useGetSubCategoriesQuery } from "../../store/apis/subCategoryApi"
import TwoMonthDeliveryBadge from "../../components/icons/TwoMonthDeliveryBadge"
import ProductSection from "../../components/ProductSection"
import CustomPacketSidebar from "../../components/CustomPacketSidebar"
import MobileCustomPacketModal from "../../components/MobileCustomPacketModal"
import { MainCategory, MainCategoryEntity } from "@beije/shared"
import { getMainCategoryDisplayName } from "../../lib/getCategoryAssets"
import { CustomPacketProvider } from "../../contexts/CustomPacketContext"


export default function CustomPacketPage() {
    const [activeTab, setActiveTab] = useState(0)
    const [mobileModalOpen, setMobileModalOpen] = useState(false)

    // Fetch main categories for tab labels
    const { data: mainCategories, isLoading: categoriesLoading, error: categoriesError } = useGetMainCategoriesQuery()

    // Fetch subcategories for mobile modal
    const { data: subCategories } = useGetSubCategoriesQuery()

    // Show loading state
    if (categoriesLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <CircularProgress sx={{ color: "#B52129" }} />
            </Box>
        )
    }

    // Show error state
    if (categoriesError) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <Typography sx={{ color: "#666666" }}>Kategoriler yüklenirken bir hata oluştu.</Typography>
            </Box>
        )
    }

    // Show loading state if no data yet
    if (!mainCategories) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <CircularProgress sx={{ color: "#B52129" }} />
            </Box>
        )
    }

    return (
        <CustomPacketProvider>
            <Box sx={{
                backgroundColor: "#F5F1ED",
                display: "flex",
                flexDirection: "column"
            }}>
                <Container maxWidth="lg" sx={{ pt: { xs: 8, lg: 12 }, pb: 6, px: { xs: 2, lg: 3 } }}>
                    <Box sx={{ display: "flex", gap: 18, flexDirection: { xs: "column", lg: "row" } }}>
                        {/* Main content */}
                        <Box sx={{ flex: 1 }}>
                            {/* Page title and description */}
                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: "1.95rem",
                                            fontWeight: 500,
                                            color: "#2D2D2D",
                                            flex: 1,
                                        }}
                                    >
                                        Kendi Paketini Oluştur
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#666666",
                                            fontSize: "1rem",
                                            fontWeight: 500,
                                            cursor: "pointer",
                                            "&:hover": {
                                                color: "#2D2D2D",
                                            },
                                        }}
                                    >
                                        Nasıl Çalışır?
                                    </Typography>
                                </Box>
                                {/* Mobile delivery badge */}
                                <Box sx={{ display: { xs: "block", lg: "none" }, mb: 3 }}>
                                    <TwoMonthDeliveryBadge />
                                </Box>
                                <Typography sx={{ color: "#666666", fontSize: "16px", lineHeight: 1.6 }}>
                                    Tercih ve ihtiyaçların doğrultusunda seçeceğin ürünlerden ve miktarlardan, sana özel bir paket
                                    oluşturalım.
                                </Typography>
                            </Box>

                            {/* Tabs for product categories */}
                            <Box sx={{
                                mb: 3,
                                width: "100%",
                                display: "flex",
                                position: { xs: "sticky", lg: "static" },
                                top: { xs: 0, lg: "auto" },
                                zIndex: { xs: 1000, lg: "auto" },
                                backgroundColor: { xs: "#F5F1ED", lg: "transparent" },
                                pt: { xs: 0, lg: 0 },
                                pb: { xs: 0, lg: 0 }
                            }}>
                                <Tabs
                                    value={activeTab}
                                    onChange={(_, newValue) => setActiveTab(newValue)}
                                    variant="fullWidth"
                                    sx={{
                                        width: "100%",
                                        "& .MuiTabs-indicator": {
                                            backgroundColor: "#2D2D2D",
                                            height: 2,
                                        },
                                        "& .MuiTab-root": {
                                            minHeight: 48,
                                            flex: 1,
                                        },
                                    }}
                                >
                                    {mainCategories.map((category: MainCategoryEntity) => (
                                        <Tab
                                            key={category._id}
                                            label={getMainCategoryDisplayName(category.name as MainCategory)}
                                            sx={{
                                                textTransform: "none",
                                                fontSize: "0.95rem",
                                                fontWeight: 400,
                                                color: "#666666",
                                                "&.Mui-selected": {
                                                    color: "#2D2D2D",
                                                    fontWeight: 500,
                                                },
                                            }}
                                        />
                                    ))}
                                </Tabs>
                            </Box>

                            <ProductSection activeTab={activeTab} mainCategories={mainCategories} />
                        </Box>

                        {/* Sidebar - Desktop Only */}
                        <Box sx={{ width: { xs: "100%", lg: 500 }, display: { xs: "none", lg: "block" } }}>
                            <CustomPacketSidebar />
                        </Box>
                    </Box>
                </Container>

                {/* Mobile Modal with Collapsed State */}
                <MobileCustomPacketModal
                    open={mobileModalOpen}
                    onClose={() => setMobileModalOpen(false)}
                    onOpen={() => setMobileModalOpen(true)}
                    subCategories={subCategories}
                />
            </Box>
        </CustomPacketProvider>
    )
}
