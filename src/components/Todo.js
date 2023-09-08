import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { useToast } from '../contexts/SnackContext';
import { useTodos } from '../contexts/TodoContext';




export default function Todo({Todo, showDelete , showUpdate}) {
  const {dispatch} = useTodos()
  const {OpenCloseSnack} = useToast()


  const handleClickOpen = () => {
    showDelete(Todo)
  };



  const handleClickOpenUpdate = () => {
    showUpdate(Todo)
  };



  function handleChangeclick(){
    console.log("Handle Change Click");
    console.log("Todo prop:", Todo);
    console.log("Dispatch function:", dispatch);
  
  dispatch({ type: 'change', payload: Todo })

  OpenCloseSnack('Status of Errand was changed successfully')
    }


    return (
      <>
        <Card className= "todoCard" sx={{ maxWidth: "md" }}  style={{ background: "#AFDBF5" , borderRadius: '10px' , marginTop: "20px" , }} >
          <CardContent >
            <Grid container spacing={2}>
            <Grid xs={8} display="flex" justifyContent="center" flexDirection= "column" alignItems="flex-start">
            <Typography variant="h5" align="left" style={{textDecoration: Todo.isCompleted ? "line-through" : "none"}}>
            {Todo.title}
            </Typography>
            <Typography variant="h6" align="left">
            {Todo.details}
            </Typography>
            </Grid>
            <Grid xs={4} display="flex" justifyContent="space-around" alignItems="center">
            <IconButton className= "Iconbutton" onClick = {handleChangeclick} style={{ color: Todo.isCompleted ? "white" : "#4FFFB0"  , border : "solid 3px #4FFFB0" , background: Todo.isCompleted ? "#4FFFB0" : "white" }} >
              <CheckIcon/>
               </IconButton>
          <IconButton className= "Iconbutton" onClick={handleClickOpenUpdate} style={{ color: "#00BFFF" , border : "solid 3px #00BFFF" , background: "#F5F5F5" }} >
                 <EditIcon />
               </IconButton>
               <IconButton className= "Iconbutton" onClick={handleClickOpen}  style={{ color: "rgba(255, 8, 0, 0.5) " , border : "solid 3px rgba(255, 8, 0, 0.5) " , background: "#F5F5F5" }} >
                  <DeleteIcon />
               </IconButton>
           </Grid>
           </Grid>
          </CardContent>
      </Card>
      </>
    )
            }