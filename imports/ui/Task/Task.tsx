import {Avatar, Button, Chip, Divider, Grid, IconButton, Paper, Popover, TextField, Typography} from "@material-ui/core";
import React from "react";
import { Task as TaskType } from "../../types/Task";
import { useStyles } from "./Task.style";
import { Priority } from "/imports/types/Priority";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import RemoveIcon from "@material-ui/icons/Remove";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { TasksCollection } from "/imports/api/TasksCollection";
import { Categories, getCategory } from "../App";

export interface TaskProps {
  task: TaskType;
}


const updateDone = (_id: string, done: boolean) => {
  TasksCollection.update(_id, {
    $set: {
      done: done,
      doneDate: done ? new Date() : undefined
    }
  });
};

export const updatePriority = (_id: string, priority: Priority) => {
  TasksCollection.update(_id, {
    $set: {
      priority: ((Number(priority) + 1) % 3) as Priority
    }
  });
}

const updateCategory = (_id: string, _cId: string | undefined) => {
  if (_cId) {
    TasksCollection.update(_id, {
      $set: {
        category: getCategory(_cId)
      }
    });
  } else {
    TasksCollection.update(_id, {
      $unset: {
        category: true
      }
    });
  }
}

export const updateTitle = (_id: string, title: string) => {
  TasksCollection.update(_id, {
    $set: {
      title: title
    }
  });
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [title, setTitle] = React.useState(task.title);
  const [editTitle, setEditTitle] = React.useState(false);

  const open = Boolean(anchorEl);

  const todoColor = "#FFFCAC";
  const doneColor = "#BCFFCF";
  const cardColor = task.done ? doneColor :  todoColor;

  const handleChipClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectCategory = (_cId: string | undefined) => {
    setAnchorEl(null);
    updateCategory(task._id, _cId);
  }

  const handleKeyDown = (e) => {
    if(e.keyCode == 13 && title.trim() !== "") {
      updateTitle(task._id, title.trim());
      setEditTitle(false);
    }
  }


  const buttons = task.done ? (
    <div>
      <IconButton onClick={() => updateDone(task._id, false)}>
        <CancelIcon color="error"/>
      </IconButton>
    </div>
  ) : (
    <div>
      <IconButton onClick={() => updateDone(task._id, true)}>
        <CheckCircleIcon style={{fill: "#71C51C"}} />
      </IconButton>
    </div>
  )

  return (
    <Paper className={classes.paper} elevation={5} style={{backgroundColor: cardColor}}>
      <div>
        <div className={classes.section}>
          <Grid container wrap="nowrap" >
          <Grid item xs>
            {editTitle ? (
              <TextField 
                value={title}
                onKeyDown={handleKeyDown}
                onChange={t => {setTitle(t.target.value)}}
                multiline
                fullWidth
                ></TextField>
            ) : (
              <Typography variant="subtitle1">{task.title} 
                <IconButton color="primary" onClick={() => setEditTitle(true)}>
                  <EditIcon />
                </IconButton>
              </Typography>
            ) }
              
            </Grid>
            <Grid item>
              <div>
                {buttons}
              </div>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <div className={classes.section}>
          <Button onClick={handleChipClick} >
           <Chip 
             className={classes.chip} 
             label={task.category?.name || "None"}  
             style={{backgroundColor: task.category?.color}} />
          </Button>
          <Popover
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
          <Button className={classes.section} onClick={() => handleSelectCategory(undefined)}>
            <Chip className={classes.chip} label={"None"} />
          </Button>
          {Categories.map(c => (
            <Button 
              className={classes.section} 
              key={c._id} 
              onClick={() => handleSelectCategory(c._id)}
            >
              <Chip className={classes.chip} label={c.name} style={{backgroundColor: c.color}}/> 
            </Button>))}
        </Popover>    
          <IconButton size="small" onClick={() => updatePriority(task._id, task.priority)}>{
            getPriorityIcon(task.priority)}
            </IconButton>
        </div>
        <Divider />
        <div className={classes.section}>
          <Grid container>
            <Grid item >
              <Avatar className={classes.avatar} />
            </Grid>
            <Grid >
              <Typography>{task.ownerId}</Typography>
            </Grid>
          </Grid>
        </div>     
      </div>
    </Paper>
  );
};

const getPriorityIcon = (p: Priority) => {
  switch (p) {
    case Priority.High:
      return <ExpandLessIcon fontSize="large" color="secondary" />;
    case Priority.Medium:
      return <RemoveIcon fontSize="large" />;
    case Priority.Low:
      return <ExpandMoreIcon fontSize="large" color="primary" />;
  }
};