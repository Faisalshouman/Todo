import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {forwardRef, useState , useContext} from 'react'
import Button from '@mui/material/Button';
import { TodoContext } from '../contexts/TodoContext';
import TextField from '@mui/material/TextField';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Todo({Todo}) {

  const {todo , setTodo}= useContext(TodoContext)
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [UpdatedTodo , setUpdatedTodo] = useState({title : Todo.title , details : Todo.details
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  function handleChangeclick(){
    const updatedtodo= todo.map((t)=>{
      if (t.id === Todo.id){
      t.isCompleted = !t.isCompleted}
      return t
  })
  setTodo(updatedtodo)
  localStorage.setItem("todo",JSON.stringify(updatedtodo))
    }

    function handleDelete(){
      const updatedtodo= todo.filter((t)=>{
        if (t.id === Todo.id){
        return false
        }
        else {
          return true
        }
    })
    setTodo(updatedtodo)
    setOpen(false)
    localStorage.setItem("todo",JSON.stringify(updatedtodo))
      }

      function handleConfirmUpdate(){
        const updatedtodo= todo.map((t)=>{
          if (t.id === Todo.id){
          return t = {...t , title : UpdatedTodo.title , details : UpdatedTodo.details}
          }
          else {
            return t
          }
      })
      setTodo(updatedtodo)
      setOpenUpdate(false)
      localStorage.setItem("todo",JSON.stringify(updatedtodo))
        }

    return (
      <>
      { /*delete dialog*/ }
      <Dialog
        open={open}
        TransitionComponent={Transition}
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
            value={UpdatedTodo.title}
            onChange={(e)=>{setUpdatedTodo({...UpdatedTodo , title: e.target.value})}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Details"
            fullWidth
            variant="standard"
            value={UpdatedTodo.details}
            onChange={(e)=>{setUpdatedTodo({...UpdatedTodo , details: e.target.value})}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmUpdate}>Confirm</Button>
        </DialogActions>
      </Dialog>
      { /* end of update dialog*/ }
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