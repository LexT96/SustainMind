import Box from '@mui/material/Box';

interface BoxSxProps {
  title: string;
  description: string;
}

export default function BoxSx({ title, description }: BoxSxProps) {
  return (
    <Box
      sx={{
        width: '300px',
        height: '300px',
        backgroundColor: 'white',
        borderRadius: '10px',
        border: '1px solid black',
        boxShadow: '0px 2px 4px 1px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
          backgroundColor: 'grey',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <h3 style={{ marginBottom: '10px' }}>{title}</h3>
      <p style={{ margin: '10px', textAlign: 'center' }}>{description}</p>
    </Box>
  );
}
