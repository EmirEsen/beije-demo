'use client';

import { Box, Typography } from '@mui/material';

export default function CustomPacket() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#f9fafb',
                paddingY: 2
            }}
        >
            <Typography variant="h1">Custom Packet</Typography>
        </Box>
    );
}
