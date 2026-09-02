import { Box, Container, Divider, Typography } from "@mui/material";

const footerLinks = {
  Company: ["About", "Careers", "Contact"],
  Product: ["Jobs", "Features"],
};

const Footer = ({ compact = false, workspace = "TalentFlow workspace" }) => {
  if (compact) {
    return (
      <Box component="footer" sx={{ bgcolor: "#0F172A", color: "#94A3B8", px: { xs: 2, sm: 4 }, py: 1.5 }}>
        <Typography sx={{ fontSize: "0.76rem", textAlign: "center" }}>
          © 2026 TalentFlow · {workspace}
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="footer" sx={{ bgcolor: "#0F172A", color: "white", mt: compact ? 4 : 10, pt: compact ? 5 : 8, pb: 3 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "minmax(220px, 2fr) repeat(2, minmax(120px, 1fr))", md: "2fr repeat(3, 1fr)" },
            gap: { xs: 5, sm: 4, md: 6 },
            textAlign: "left",
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              TalentFlow
            </Typography>
            <Typography sx={{ color: "#CBD5E1", lineHeight: 1.7, maxWidth: 310 }}>
              AI-powered applicant tracking that helps teams hire smarter and faster.
            </Typography>
          </Box>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <Box key={heading}>
              <Typography sx={{ fontWeight: 700, mb: 2 }}>{heading}</Typography>
              <Box sx={{ display: "grid", gap: 1.25 }}>
                {links.map((link) => (
                  <Typography key={link} component="a" href={link === "Contact" ? "#contact" : "#"} sx={{ color: "#CBD5E1", textDecoration: "none", width: "fit-content", "&:hover": { color: "#60A5FA" } }}>
                    {link}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}

          <Box id="contact" sx={{ scrollMarginTop: 88 }}>
            <Typography sx={{ fontWeight: 700, mb: 2 }}>Contact</Typography>
            <Typography component="a" href="mailto:support@aiats.com" sx={{ color: "#CBD5E1", textDecoration: "none", "&:hover": { color: "#60A5FA" } }}>
              support@aiats.com
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(203, 213, 225, 0.2)", my: 5 }} />
        <Typography sx={{ color: "#94A3B8", textAlign: "left", fontSize: "0.9rem" }}>
          © 2026 TalentFlow. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
