#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const tasksPath = path.resolve(__dirname, 'tasks.json');

const args = process.argv.slice(2);
const command = args[0];

const loadTasks = () => {
  const fileData = JSON.parse(fs.readFileSync(tasksPath, 'utf8'));

  if (!fs.existsSync(tasksPath) || fileData.length === 0) {
    fs.writeFileSync(tasksPath, '[]');
    return [];
  } else {
    return fileData;
  }
}

const saveTasks = (tasks) => {
  fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
}

const changeStatus = (taskId, status) => {
  
  if (isNaN(taskId)) {
    return 'Invalid arguments. Please provide a valid task ID';
  }

  const tasks = loadTasks();
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return `Task not found (ID: ${taskId})`;
  } else {
    tasks[taskIndex].status = status;
    tasks[taskIndex].updatedAt = new Date();

    saveTasks(tasks);
    return `Task marked as ${status} (ID: ${taskId})`;
  }

}

switch (command) {
  case 'add': {
    const description = args[1];
    const tasks = loadTasks();

    const task = {
      id: tasks.length + 1,
      description,
      status: 'todo',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    tasks.push(task);
    saveTasks(tasks);
    console.log(`Task added successfully (ID: ${task.id})`)
    break;
  }
  case 'list': {
    const tasksStatus = args[1];
    const allTasks = loadTasks();
    const tasksFiltered = tasksStatus ? allTasks.filter(task => task.status === tasksStatus) : allTasks;

    const message = tasksFiltered.length > 0 ? tasksFiltered : 'No tasks found';
    console.log(message);
    break;
  }
  case 'update': {
    const taskId = parseInt(args[1]);
    const description = args[2];

    if (isNaN(taskId) || !description) {
      console.log('Invalid arguments. Please provide a valid task ID and description');
      break;
    }

    const tasks = loadTasks();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      console.log(`Task not found (ID: ${taskId})`);
    } else {
      tasks[taskIndex].description = description;
      tasks[taskIndex].updatedAt = new Date();
      
      saveTasks(tasks);
      
      console.log(`Task updated successfully (ID: ${taskId})`)
    }
    
    break;
  }

  case 'delete': {
    const taskId = parseInt(args[1]);

    if (isNaN(taskId)) {
      console.log('Invalid arguments. Please provide a valid task ID');
      break;
    }

    const tasks = loadTasks();
    const tasksFiltered = tasks.filter(task => task.id !== taskId);
    if (tasks.length === tasksFiltered.length) {
      console.log(`Task not found (ID: ${taskId})`);
    } else {
      saveTasks(tasksFiltered);
    }

    break;
  }

  case 'mark-in-progress': {
    const taskId = parseInt(args[1]);

    const message = changeStatus(taskId, 'in-progress');
    console.log(message);
    
    break;
  }

  case 'mark-done': {
    const taskId = parseInt(args[1]);

    const message = changeStatus(taskId, 'done');
    console.log(message);
  }

  default:
    break;
}