import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';





export default function SnackbarComponent({open , Message}) {



  return (
    <Stack spacing={2} sx={{ width: '100%' }} >
      <Snackbar open={open} >
        <Alert severity="success" sx={{ width: '100%' }}  style={{background: '#00BFFF' , color:'#F5F5F5'}}>
          {Message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}