import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import { styled } from '@mui/system';

const AnimatedCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  transition: '0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const stats = [
  { feature: 'Supplier Marketplace', description: 'Find new suppliers who value sustainablility' },
  { feature: 'Data Collection', description: 'Import data effortlessly from your ERP-systems like SAP, Oracle, or Microsoft Dynamics and we conduct more research on your suppliers' },
  { feature: 'Risk Analysis', description: 'Automatically calculate risks for your suppliers' },
  { feature: 'Prevention Measures', description: 'Manage and conduct prevention measures with an intuitive user interface' },
  { feature: 'Automatic Reporting', description: 'Generate ESG reports which include the results of your risk analysis and the progress of your prevention measures' },
]

export function LandingMissionSection() {
  return (
    <section id="features" className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Grid container spacing={20}>
          <Grid item xs={12} md={7}>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl" style={{ marginBottom: 20 }}>
              Create sustainable supply chains through cooperation
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Revolutionize your supply chain and stay ahead of the game with our cutting-edge cloud-based collaboration software! We empower corporations and their suppliers to analyze, optimize, and drive sustainable practices across their entire supply chain, ensuring compliance with the latest regulations, including the LkSG (Lieferkettengesetz).
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              In today's rapidly evolving business landscape, it's more important than ever for companies to embrace environmental, social, and governance (ESG) principles. Our innovative software takes the guesswork out of ESG compliance and the requirements of the LkSG by providing comprehensive tools and automated reporting capabilities.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              With our solution, you can effortlessly identify and mitigate risks, ensure ethical sourcing, eliminate labor exploitation, reduce environmental impact, and enhance social responsibility throughout your supply chain. Collaborate seamlessly with your suppliers, exchange vital data, and gain valuable insights to make informed decisions that align with both your sustainability goals and legal obligations under the LkSG.
            </p>
          </Grid>
          <Grid item xs={12} md={5}>
            <Grid container spacing={2} direction="column">
              {stats.map((stat, index) => (
                <Grid item key={index}>
                  <AnimatedCard>
                    <CardContent style={{ padding: "20px 20px" }}>
                      <p style={{ marginBottom: "10px", marginTop: "0px", fontSize: "1.5em" }} className="tracking-tight text-gray-900 sm:text-2xl">
                        {stat.feature}
                      </p>
                      <p style={{ marginTop: "10px", lineHeight: "1.2", fontSize: "1em" }} className="text-gray-600">
                        {stat.description}
                      </p>
                    </CardContent>
                  </AnimatedCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </section>
  )
}
