import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { v4 as uuidv4 } from "uuid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TodosContext } from "../contexts/todoscontext";
import { useContext, useState, useEffect } from "react";

export default function Todolist() {
  const { todos, setTodos } = useContext(TodosContext);
  const [displayedTodosType, setdisplayedTodosType] = useState("all");

  //
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });
  //
  const notCompleted = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosTobeRender = todos;
  if (displayedTodosType === "completed") {
    todosTobeRender = completedTodos;
  } else if (displayedTodosType === "notCompleted") {
    todosTobeRender = notCompleted;
  }

  const [inputItems, setInputItems] = useState("");

  function changeDispalyedType(e) {
    setdisplayedTodosType(e.target.value);
  }

  // كل ما todos تتغير نحفظها في localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handlecheck(todoId) {
    const updatedTodos = todos.map((t) =>
      t.id === todoId ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updatedTodos);
  }

  function handleAddClick() {
    if (!inputItems.trim()) return;

    const newTodo = {
      id: uuidv4(),
      title: inputItems,
      details: "",
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setInputItems("");
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275, maxHeight: "80vh", overflow: "scroll" }}>
          <CardContent>
            <Typography gutterBottom variant="h2">
              مهامي
            </Typography>
            <Divider />
            <ToggleButtonGroup
              value={displayedTodosType}
              onChange={changeDispalyedType}
              style={{ direction: "ltr" }}
              color="primary"
              exclusive
              aria-label="text alignment"
            >
              <ToggleButton value="notCompleted">غير المنجز</ToggleButton>
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
          </CardContent>

          {todosTobeRender.map((t) => (
            <Todo key={t.id} todo={t} handlecheck={handlecheck} />
          ))}

          <Grid
            container
            spacing={2}
            sx={{
              padding: "0 8px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid item xs={8}>
              <TextField
                sx={{ width: "100%", background: "#d7ccc8" }}
                label="عنوان المهمة"
                variant="outlined"
                value={inputItems}
                onChange={(e) => setInputItems(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                sx={{ width: "100%", height: "50px" }}
                onClick={handleAddClick}
                disabled={inputItems == 0}
              >
                زر الاضافة
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </React.Fragment>
  );
}
