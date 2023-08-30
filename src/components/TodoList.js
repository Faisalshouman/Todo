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
import { v4 as uid } from 'uuid'
import { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';



export default function TodoList() {
  const {todo , setTodo} = useContext(TodoContext)
  const [initTitle , setTitle] = useState('')
  const [displayedToggle , changeToggle] = useState("All")

  let renderedTodo = todo
  const incompTodo = todo.filter((t)=>{return !t.isCompleted})
  const compTodo = todo.filter((t)=>{return t.isCompleted})
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

  useEffect(()=>{
    const storageTodos = JSON.parse(localStorage.getItem("todo"))
    setTodo(storageTodos)
  },[setTodo])


  const todom = renderedTodo.map((t) => {
    return <Todo id={t.id} Todo={t} />
  })
  
  
    function handleChange(){
      const newTodo =
      {id: uid(),
      title: initTitle,
      details: '',
      isCompleted: false,}

      const updatedtodo = [...todo , newTodo]
      setTodo(updatedtodo)
      localStorage.setItem("todo",JSON.stringify(updatedtodo))
    }

  return (
    <>
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