import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { TodosContext } from '../contexts/TodosContext';
import { useEffect, useContext, useState } from 'react';
import { FormikHelpers } from 'formik';
import {
  List,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import styled from 'styled-components';
import Todo from '../components/Todo';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TodoForm from '../components/TodoForm';
import { useSnackBar } from '../contexts/SnackbarContext';

export default function Dashboard({ user }: any) {
  const { todos, refreshTodos, addTodo } = useContext(TodosContext);
  const [open, setOpen] = useState<boolean>(false);
  const { updateSnackBarMessage } = useSnackBar();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (
    {
      description,
      deadline,
    }: {
      description: string;
      deadline: Date;
    },
    {
      setSubmitting,
    }: FormikHelpers<{
      description: string;
      deadline: Date;
    }>,
  ) => {
    addTodo(description, deadline);
    updateSnackBarMessage('You have added a Todo in your Todo list.');
    setSubmitting(false);
  };

  useEffect(() => {
    if (user) {
      refreshTodos(user.sub);
    }
  }, [refreshTodos, user]);

  return (
    <Container>
      <ListHeader display="flex" flexDirection="row">
        <Typography variant="h4" gutterBottom>
          To Do List
        </Typography>
        <Box>
          <IconButton edge="end" aria-label="comments" onClick={handleClickOpen}>
            <PlaylistAddIcon fontSize="large" color="action" />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Add something new to your Todo List'}</DialogTitle>
            <DialogContent>
              <TodoForm handleSubmit={handleSubmit} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </ListHeader>
      <ListContainer>
        {todos.length
          ? todos.map((todo: any) => {
              return <Todo todo={todo} key={todo.id} />;
            })
          : null}
      </ListContainer>
    </Container>
  );
}

export const getServerSideProps = withPageAuthRequired();

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 20px;
`;

const ListContainer = styled(List)`
  width: 100%;
  max-width: 600px;
`;

const ListHeader = styled(Box)`
  max-width: 600px;
  display: flex;
  justify-content: space-between;
`;
