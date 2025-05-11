import "./App.css";
import Todolist from "./component/Todolist";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TodosContext } from "./contexts/todoscontext";
import { useState, useEffect } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#f44336",
    },
  },
});

function App() {
  const [todos, setTodos] = useState(() => {
    const localData = localStorage.getItem("todos");
    return localData ? JSON.parse(localData) : [];
  });

  // كل ما تتغير todos، نخزنها في localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          direction: "rtl",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#665577",
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <Todolist />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
