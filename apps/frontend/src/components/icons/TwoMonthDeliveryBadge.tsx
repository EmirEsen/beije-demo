import { Box, Chip } from "@mui/material"

export default function TwoMonthDeliveryBadge() {
    return (
        <Chip
            label="2 ayda bir gönderim"
            size="medium"
            sx={{
                backgroundColor: "#d2e7df",
                color: "#2D2D2D",
                fontWeight: 600,
                fontSize: "0.9rem",
                height: "30px",
                px: 1,
                borderRadius: "8px",
                width: "fit-content",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "& .MuiChip-label": {
                    marginLeft: "auto"
                },
                "& .MuiChip-icon": {
                    marginRight: "auto"
                }
            }}
            icon={
                <Box
                    sx={{
                        width: "8px",
                        height: "8px",
                        padding: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#11b9b3",
                    }}
                />
            }
        />
    )
}
