import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todoscontext";

export default function Todo({ todo, handlecheck }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [updatedDetails, setUpdatedDetails] = useState(todo.details);
  const { todos, setTodos } = useContext(TodosContext);

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
    setShowDeleteDialog(false);
    // ❌ حذفنا localStorage.setItem من هنا
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? { ...t, title: updatedTitle, details: updatedDetails }
        : t
    );
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    // ❌ حذفنا localStorage.setItem من هنا
  }

  return (
    <>
      {/* حذف */}
      <Dialog
        onClose={() => setShowDeleteDialog(false)}
        open={showDeleteDialog}
      >
        <DialogTitle>هل متأكد من حذف المهمة؟</DialogTitle>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>إغلاق</Button>
          <Button onClick={handleDeleteConfirm}>حذف</Button>
        </DialogActions>
      </Dialog>

      {/* تعديل */}
      <Dialog
        onClose={() => setShowUpdateDialog(false)}
        open={showUpdateDialog}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="عنوان المهمة"
            fullWidth
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="تفاصيل المهمة"
            fullWidth
            value={updatedDetails}
            onChange={(e) => setUpdatedDetails(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUpdateDialog(false)}>إغلاق</Button>
          <Button onClick={handleUpdateConfirm}>تعديل</Button>
        </DialogActions>
      </Dialog>

      {/* كارت المهمة */}
      <Card className="todocard" sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid
            className="todocardsmall"
            container
            sx={{ background: "purple", color: "white" }}
          >
            <Grid item xs={8} sx={{ textAlign: "right" }}>
              <Typography variant="h5">{todo.title}</Typography>
              <Typography variant="h6">{todo.details}</Typography>
            </Grid>
            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                onClick={() => handlecheck(todo.id)}
                className="iconBtn"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                  padding: "1px",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={() => setShowUpdateDialog(true)}
                className="iconBtn"
                style={{
                  color: "#00bcd4",
                  background: "white",
                  border: "solid #00bcd4 3px",
                  padding: "1px",
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={handleDeleteClick}
                className="iconBtn"
                style={{
                  color: "#ab003c",
                  background: "white",
                  border: "solid #ab003c 3px",
                  padding: "1px",
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
