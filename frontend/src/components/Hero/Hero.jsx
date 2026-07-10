import React from 'react';
import { Box, Typography, Button, Container, Chip, Paper, Avatar } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

export default function Hero() {
  return (
    <Box sx={{ pt: { xs: 15, md: 20 }, pb: { xs: 10, md: 15 }, overflow: 'hidden' }}>
       <Container maxWidth={false}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6, alignItems: 'center' }}>
          
          <Box sx={{ flex: 1 }}>
            <Chip 
              label="✦ AI-Powered Hiring Platform" 
              sx={{ 
                bgcolor: '#EFF6FF', 
                color: '#2563EB', 
                fontWeight: 600, 
                mb: 3,
                px: 1
              }} 
            />
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' }, 
                fontWeight: 800, 
                lineHeight: 1.1, 
                color: '#0F172A',
                mb: 3
              }}
            >
              Hire Smarter,<br />
              <Box component="span" sx={{ 
                background: 'linear-gradient(to right, #2563EB, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                With AI
              </Box>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400, lineHeight: 1.6, maxWidth: 500 }}>
              Streamline recruitment with AI-powered resume screening, intelligent candidate ranking, and real-time hiring analytics — all in one platform.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5 }}>
              <Button variant="contained" size="large" sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}>
                Get Started →
              </Button>
              <Button variant="outlined" size="large" sx={{ px: 4, py: 1.5, fontSize: '1.1rem', borderColor: '#E2E8F0', color: '#0F172A', '&:hover': { borderColor: '#0F172A' } }}>
                Watch Demo ▶
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, flexWrap: 'wrap' }}>
              {['AI Resume Screening', 'Smart Candidate Ranking', 'One-click Hiring'].map((feature) => (
                <Box key={feature} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle color="success" fontSize="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          
          <Box sx={{ flex: 1, position: 'relative', width: '100%' }}>
            <Box 
              sx={{ 
                position: 'absolute',
                top: -20,
                right: -20,
                bottom: -20,
                left: -20,
                background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(0,0,0,0) 70%)',
                zIndex: 0
              }}
            />
            <Paper 
              elevation={24}
              sx={{ 
                bgcolor: '#0F172A', 
                borderRadius: '24px', 
                p: 3,
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.25)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
                  <Box sx={{ width: 12, height: 12, bgcolor: '#EF4444', borderRadius: '50%' }} />
                  <Box sx={{ width: 12, height: 12, bgcolor: '#F59E0B', borderRadius: '50%' }} />
                  <Box sx={{ width: 12, height: 12, bgcolor: '#10B981', borderRadius: '50%' }} />
                </Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>TalentFlow Dashboard</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                {[
                 { label: "Active Jobs", value: "128", color: "#3B82F6" },
{ label: "Applications", value: "2450", color: "#8B5CF6" },
{ label: "AI Match", value: "96%", color: "#10B981" }
                ].map(stat => (
                  <Box key={stat.label} sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.05)', p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 0.5 }}>{stat.label}</Typography>
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>{stat.value}</Typography>
                  </Box>
                ))}
              </Box>
              
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.02)', p: 3, borderRadius: 2, mb: 4 }}>
                <Typography variant="body2" sx={{ color: 'white', mb: 2, fontWeight: 500 }}>Hiring Pipeline</Typography>
                <Box sx={{ display: 'flex', height: 120, alignItems: 'flex-end', gap: 2 }}>
                  <Box sx={{ flex: 1, height: '100%', background: 'linear-gradient(to top, #3B82F6, rgba(59,130,246,0.2))', borderRadius: 1 }} />
                  <Box sx={{ flex: 1, height: '70%', background: 'linear-gradient(to top, #8B5CF6, rgba(139,92,246,0.2))', borderRadius: 1 }} />
                  <Box sx={{ flex: 1, height: '40%', background: 'linear-gradient(to top, #EC4899, rgba(236,72,153,0.2))', borderRadius: 1 }} />
                  <Box sx={{ flex: 1, height: '20%', background: 'linear-gradient(to top, #10B981, rgba(16,185,129,0.2))', borderRadius: 1 }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Applied</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Screening</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Interview</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Offer</Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                 { name: "Rahul Sharma", role: "Frontend Developer", badge: "Strong Match", color: "success" },
{ name: "Priya Verma", role: "UI/UX Designer", badge: "Excellent", color: "primary" },
{ name: "Aarav Singh", role: "Backend Developer", badge: "Reviewing", color: "warning" }
                ].map((candidate, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'rgba(255,255,255,0.05)', p: 1.5, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 36, height: 36, bgcolor: '#3B82F6', fontSize: 14 }}>{candidate.name[0]}</Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>{candidate.name}</Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>{candidate.role}</Typography>
                      </Box>
                    </Box>
                    <Chip label={candidate.badge} color={candidate.color} size="small" sx={{ height: 24, fontSize: '0.7rem', fontWeight: 600 }} />
                  </Box>
                ))}
              </Box>
              
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}