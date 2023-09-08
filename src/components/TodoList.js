import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Todo from './Todo';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useMemo, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useToast} from '../contexts/SnackContext';
import { useTodos } from '../contexts/TodoContext';





export default function TodoList() {
  const [initTitle , setTitle] = useState('')
  const [displayedToggle , changeToggle] = useState("All")
  const [dialoge , setDialoge] = useState({})
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const {OpenCloseSnack} = useToast()
  const {todo ,dispatch} = useTodos()



  let renderedTodo = todo
  const incompTodo = useMemo(()=>{return todo.filter((t)=>{return !t.isCompleted})} , [todo]) 
  const compTodo = useMemo(()=>{return todo.filter((t)=>{return t.isCompleted})} , [todo])

  if (displayedToggle === "Incompleted"){
    renderedTodo = incompTodo
  } else if (displayedToggle === "Completed"){
    renderedTodo = compTodo
  } else {
    renderedTodo = todo
  }

  function changeDisplay(e){
    changeToggle(e.target.value)
  }

  useEffect(() => {
    const storedTodo = localStorage.getItem("todo");
    if (storedTodo) {
      try {
        dispatch({type: 'storage' , payload : storedTodo})
      } catch (error) {
        console.error("Error parsing stored todo data:", error);
      }
    }
  }, [dispatch]);



  
  
    function handleChange(){

      dispatch({type : 'added' , payload : {title : initTitle}})
      OpenCloseSnack('Errand was added successfully')
    }


    function handleClickOpen (todoInfo){
      setDialoge(todoInfo)
      setOpen(true);
      
    }
    const handleClose = () => {
      setOpen(false);
    };
  
    function handleClickOpenUpdate(todoInfo){
      setDialoge(todoInfo)
      setOpenUpdate(true);
    }
  
    const handleCloseUpdate = () => {
      setOpenUpdate(false);
    };
  
  
      function handleDelete(){

      dispatch({type : 'deleted' , payload : dialoge})
      setOpen(false)
      OpenCloseSnack('Errand was deleted successfully')
        }
  
        function handleConfirmUpdate(){
        dispatch({type : 'updated' , payload : dialoge})
        setOpenUpdate(false)
        OpenCloseSnack('Errand was updated successfully')
          }

          const todom = renderedTodo.map((t) => {
            return <Todo key={t.id} Todo={t} showDelete={handleClickOpen} showUpdate={handleClickOpenUpdate} />
            ;
          });
    


  return (
    <>
          { /*delete dialog*/ }
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        style={{  borderRadius: '35px' ,}}
      >
        <DialogTitle>{'Deleting this errand'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Are you sure that you want to delete this errand ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No,I don't want to</Button>
          <Button   onClick={handleDelete}>yes, please</Button>
        </DialogActions>
      </Dialog>
      { /* end of delete dialog*/ }
      { /*update dialog*/ }
      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
        <DialogTitle>Edit this errand</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can change the title and the details of this errand.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            fullWidth
            variant="standard"
            value={dialoge.title}
            onChange={(e)=>{setDialoge({...dialoge , title: e.target.value})}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Details"
            fullWidth
            variant="standard"
            value={dialoge.details}
            onChange={(e)=>{setDialoge({...dialoge , details: e.target.value})}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Cancel</Button>
          <Button onClick={handleConfirmUpdate}>Confirm</Button>
        </DialogActions>
      </Dialog>
      { /* end of update dialog*/ }
      <Container maxWidth="sm"  >
      <Card sx={{ maxWidth: "md" }} style={{background: "#F5F5F5" , borderRadius: "20px", }} >
          <CardContent style={{maxHeight: "80vh" , overflow: "scroll"}}>
            <Typography variant="h3" align="center" marginBottom= "20px"  >
              My Errands
            </Typography>
            <Divider variant="middle" />
            <ToggleButtonGroup
            color="primary"
            value={displayedToggle}
            exclusive
            onChange={changeDisplay}
            aria-label="Platform"
            style={{display: "flex" ,justifyContent: "center", alignItems: "center", marginTop: "20px",}}
            >
      <ToggleButton value="All">All</ToggleButton>
      <ToggleButton value="Completed">Completed</ToggleButton>
      <ToggleButton value="Incompleted">Incompleted</ToggleButton>
    </ToggleButtonGroup>
          {todom}
          <Grid container spacing={2} style={{ marginTop: "20px"}}>
            <Grid xs={8}>
            <TextField id="outlined-basic" label="Enter title" value={initTitle} onChange={
              (e)=>{
                setTitle(e.target.value)
              }
            } variant="outlined" style={{width: "100%" , height:"100%"}}/>
            </Grid>
            <Grid xs={4}>
            <Button variant="contained" 
            onClick={()=>{
              handleChange()
            }} style={{width: "100%" , height:"100%" ,backgroundColor:"#1da1f2"}}
            disabled = {initTitle.length === 0}
            >Add</Button>
              </Grid>
          </Grid>
          </CardContent>
      </Card>
      </Container>
    </>
  );
}