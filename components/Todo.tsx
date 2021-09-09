import { useContext, useState, useEffect } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import {
  Chip,
  ListItem,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styled from 'styled-components';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import { FormikHelpers } from 'formik';
import TodoForm from '../components/TodoForm';
import { useSnackBar } from '../contexts/SnackbarContext';

interface Props {
  todo: any;
}

function Todo({ todo }: Props) {
  const { updateTodo, deleteTodo } = useContext(TodosContext);
  const [deadline, setDeadline] = useState<string>('');
  const { updateSnackBarMessage } = useSnackBar();

  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    dateFormat(todo.fields.deadline);
  }, [todo.fields.deadline]);

  const handleClose = () => {
    setOpen(false);
  };

  const dateFormat = (date: string) => {
    const newDate = moment(date).format('DD MMM, YYYY');
    setDeadline(newDate);
  };

  const handleToggleCompleted = () => {
    const updatedFields = {
      ...todo.fields,
      completed: !todo.fields.completed,
    };
    const updatedTodo = { id: todo.id, fields: updatedFields };
    updateTodo(updatedTodo);
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
    const updatedFields = {
      ...todo.fields,
      description,
      deadline,
    };

    const updatedTodo = { id: todo.id, fields: updatedFields };
    updateTodo(updatedTodo);
    dateFormat(deadline.toISOString());
    updateSnackBarMessage('You have updated this Todo.');
    setSubmitting(false);
  };

  return (
    <ItemContainer component={Paper}>
      <ListItem key={todo} role={undefined} dense button>
        <ListItemIcon>
          <Checkbox
            edge="start"
            tabIndex={-1}
            disableRipple
            checked={todo.fields.completed}
            onChange={handleToggleCompleted}
          />
        </ListItemIcon>
        <ListItemTextBox>
          <ListItemText id={todo.id} primary={` ${todo.fields.description}`} />
        </ListItemTextBox>
        <ListItemSecondaryActionBox>
          <StatusBox>
            {todo.fields.completed ? (
              <FinishChip size="small" label="Done" />
            ) : (
              <UnfinsihChip size="small" label="Unfinished" />
            )}
            {new Date(deadline) > new Date() ? (
              <ActiveChip size="small" label="Active" />
            ) : (
              <ExpiredChip size="small" label="Expired" />
            )}
          </StatusBox>
          <IconButton edge="end" aria-label="comments" onClick={handleClickOpen}>
            <EditIcon color="primary" />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Update your Todo item'}</DialogTitle>
            <DialogContent>
              <TodoForm handleSubmit={handleSubmit} description={todo.fields.description} date={todo.fields.deadline} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <IconButton edge="end" aria-label="comments" onClick={() => deleteTodo(todo.id)}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </ListItemSecondaryActionBox>
      </ListItem>
      <DueDateText variant="subtitle2">Due Date: {deadline}</DueDateText>
    </ItemContainer>
  );
}

export default Todo;

const ItemContainer = styled(Box)`
  margin-bottom: 10px;
`;

const UnfinsihChip = styled(Chip)`
  &&& {
    background-color: #66ccff;
    margin-right: 5px;
  }
`;

const ExpiredChip = styled(Chip)`
  &&& {
    background-color: #ff6699;
    margin-right: 5px;
  }
`;

const ActiveChip = styled(Chip)`
  &&& {
    background-color: #00ff00;
    margin-right: 5px;
  }
`;

const FinishChip = styled(Chip)`
  &&& {
    background-color: #ffff00;
    margin-right: 5px;
  }
`;

const DueDateText = styled(Typography)`
  &&& {
    margin-left: 10px;
  }
`;

const ListItemTextBox = styled.div`
  flex-grow: 1;
  @media only screen and (max-width: 600px) {
    max-width: 100px;
    flex-grow: 1;
    overflow-wrap: break-word;
  }
`;

const StatusBox = styled.div`
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

const ListItemSecondaryActionBox = styled(ListItemSecondaryAction)`
  &&& {
    display: flex;
    align-items: center;
  }
`;
