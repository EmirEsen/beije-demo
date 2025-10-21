"use client"

import type React from "react"

import { Box, Container, Typography, TextField, Button, Link } from "@mui/material"
import Grid from "@mui/material/Grid"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter signup:", email)
    // Handle newsletter signup
  }

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#262626",
        color: "#FFFFFF",
        pt: 8,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Main footer content */}
        <Grid container spacing={6} sx={{ mb: 6 }}>
          {/* Newsletter section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 1,
                fontSize: "1.5rem",
                fontWeight: 400,
                letterSpacing: "-0.5px",
              }}
            >
              beije.
            </Typography>
            <Typography
              sx={{
                mb: 2,
                fontSize: "1.1rem",
                fontWeight: 500,
                mt: 3,
              }}
            >
              Arayı açmayalım!
            </Typography>
            <Typography
              sx={{
                mb: 3,
                fontSize: "0.9rem",
                color: "#CCCCCC",
                lineHeight: 1.6,
              }}
            >
              beije'deki yeni ürün ve gelişmeleri sana haber verelim & aylık e-gazetemiz döngü'ye abone ol!
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 1 }}>
              <TextField
                placeholder="e-mail adresin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "transparent",
                    color: "#FFFFFF",
                    "& fieldset": {
                      borderColor: "#666666",
                    },
                    "&:hover fieldset": {
                      borderColor: "#999999",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FFFFFF",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#999999",
                    opacity: 1,
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#F5F1ED",
                  color: "#2D2D2D",
                  textTransform: "none",
                  px: 3,
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#E5E1DD",
                  },
                }}
              >
                Gönder
              </Button>
            </Box>
            <Typography
              sx={{
                mt: 2,
                fontSize: "0.75rem",
                color: "#999999",
                lineHeight: 1.5,
              }}
            >
              Abone olarak, beije KVKK ve Gizlilik Politikası'nı kabul ediyor ve beije'den haber almayı onaylıyorum.
            </Typography>
          </Grid>

          {/* Product links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Link
                href="#"
                sx={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  "&:hover": {
                    color: "#CCCCCC",
                  },
                }}
              >
                beije Ped
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  "&:hover": {
                    color: "#CCCCCC",
                  },
                }}
              >
                beije Günlük Ped
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  "&:hover": {
                    color: "#CCCCCC",
                  },
                }}
              >
                beije Tampon
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  "&:hover": {
                    color: "#CCCCCC",
                  },
                }}
              >
                beije Store
              </Link>
            </Box>
          </Grid>

          {/* Info links */}
          <Grid size={{ xs: 6, md: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Link
                href="#"
                sx={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  "&:hover": {
                    color: "#CCCCCC",
                  },
                }}
              >
                Blog
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  "&:hover": {
                    color: "#CCCCCC",
                  },
                }}
              >
                Sıkça Sorulan Sorular
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  "&:hover": {
                    color: "#CCCCCC",
                  },
                }}
              >
                Biz Kimiz?
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  "&:hover": {
                    color: "#CCCCCC",
                  },
                }}
              >
                Quiz
              </Link>
            </Box>
            {/* B Corp Badge */}
            <Box
              sx={{
                mt: 3,
                width: 60,
                height: 60,
                backgroundColor: "#FFFFFF",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#2D2D2D",
                }}
              >
                B
              </Typography>
            </Box>
          </Grid>

          {/* Social media links */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Link
                href="#"
                sx={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": {
                    color: "#CCCCCC",
                  },
                }}
              >
                <FacebookIcon sx={{ fontSize: "1.2rem" }} />
                Facebook
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": {
                    color: "#CCCCCC",
                  },
                }}
              >
                <InstagramIcon sx={{ fontSize: "1.2rem" }} />
                Instagram
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": {
                    color: "#CCCCCC",
                  },
                }}
              >
                <TwitterIcon sx={{ fontSize: "1.2rem" }} />
                Twitter
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": {
                    color: "#CCCCCC",
                  },
                }}
              >
                <LinkedInIcon sx={{ fontSize: "1.2rem" }} />
                Linkedin
              </Link>
              <Link
                href="#"
                sx={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": {
                    color: "#CCCCCC",
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ♪
                </Box>
                Spotify
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Box sx={{ borderTop: "1px solid #444444", pt: 4, pb: 3 }}>
          {/* Bottom section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              gap: 3,
              mb: 3,
            }}
          >
            <Typography sx={{ fontSize: "0.85rem", color: "#999999" }}>2025 beije. Tüm hakları saklıdır.</Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {[
                "KVKK",
                "KVKK Başvuru Formu",
                "Üyelik Sözleşmesi",
                "Gizlilik Politikası",
                "Çerez Politikası",
                "Test Sonuçları",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  sx={{
                    color: "#999999",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    "&:hover": {
                      color: "#CCCCCC",
                    },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Link
                href="#"
                sx={{
                  color: "#999999",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  "&:hover": {
                    color: "#CCCCCC",
                  },
                }}
              >
                EN
              </Link>
              <Typography sx={{ color: "#666666" }}>|</Typography>
              <Link
                href="#"
                sx={{
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                TR
              </Link>
            </Box>
          </Box>

          {/* Payment methods */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 28,
                backgroundColor: "#1877F2",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              PayPal
            </Box>
            <Box
              sx={{
                width: 40,
                height: 28,
                backgroundColor: "#EB001B",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: "#FF5F00",
                  position: "relative",
                }}
              />
            </Box>
            <Box
              sx={{
                width: 40,
                height: 28,
                backgroundColor: "#1A1F71",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              VISA
            </Box>
            <Box
              sx={{
                width: 40,
                height: 28,
                backgroundColor: "#006FCF",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.6rem",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              AMEX
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
