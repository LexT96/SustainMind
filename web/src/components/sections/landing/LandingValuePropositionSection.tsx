import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Icon1 from '@mui/icons-material/Timer';
import Icon2 from '@mui/icons-material/ErrorOutline';
import Icon3 from '@mui/icons-material/PlaylistAddCheck';
import Icon4 from '@mui/icons-material/MoneyOff';

export default function LandingValuePropositionSection() {
  return (
    <section id="value_propositions" className="overflow-hidden py-12 sm:py-20">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 2, textAlign: 'center', color: 'text.secondary', backgroundColor: '#FFEBEE', transition: '0.3s', ':hover': { transform: 'scale(1.02)', boxShadow: 3 }, height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Icon2 style={{ fontSize: 50 , color: '#E53935' }} />
                </Box>
                <Typography variant="h5" component="div">
                  Avoid Penalties
                </Typography>
                <Typography variant="body2">
                  Violating the German Supply Chain Due Diligence Act can result in huge penalties of up to 8 million euros or 2% of your revenue. We help you to comply with laws and to avoid paying penalties.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 2, textAlign: 'center', color: 'text.secondary', backgroundColor: '#FFF3E0', transition: '0.3s', ':hover': { transform: 'scale(1.02)', boxShadow: 3 }, height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Icon4 style={{ fontSize: 50, color: '#FF6D00' }} />
                </Box>
                <Typography variant="h5" component="div">
                  Reduce Legal Costs
                </Typography>
                <Typography variant="body2">
                  Make your legal department work more cost-efficient.
                </Typography>
              </Paper>
            </Grid><Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 2, textAlign: 'center', color: 'text.secondary', backgroundColor: '#E0F7FA', transition: '0.3s', ':hover': { transform: 'scale(1.02)', boxShadow: 3 }, height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Icon1 style={{ fontSize: 50, color: '#0097A7'}} />
                </Box>
                <Typography variant="h5" component="div">
                  Save Time
                </Typography>
                <Typography variant="body2">
                  With our automatic risk analysis and reporting tools, you can cut down days of work to a few minutes.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 2, textAlign: 'center', color: 'text.secondary', backgroundColor: '#E8F5E9', transition: '0.3s', ':hover': { transform: 'scale(1.02)', boxShadow: 3 }, height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Icon3 style={{ fontSize: 50, color: '#2E7D32' }} />
                </Box>
                <Typography variant="h5" component="div">
                  Clear ToDos
                </Typography>
                <Typography variant="body2">
                  We suggest you individual prevention measures for each of your suppliers and help you to implement them.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
    </section>
  );
}
