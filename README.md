# Task CLI

Task CLI is a command-line interface (CLI) tool designed to help you manage your tasks efficiently. With Task CLI, you can easily add, remove, and list tasks directly from your terminal.

## Features

- Add new tasks
- Remove existing tasks
- List all tasks
- Mark tasks as completed
- Filter tasks by status

## Installation

To install Task CLI, clone the repository and run the setup script:

```bash
git clone https://github.com/yourusername/task-cli.git
cd task-cli
npm install
npm link
```

## Usage

Here are some basic commands to get you started:

- Example:
```bash
  # Adding a new task
  task-cli add "Buy groceries"
  # Output: Task added successfully (ID: 1)

  # Updating and deleting tasks
  task-cli update 1 "Buy groceries and cook dinner"
  task-cli delete 1

  # Marking a task as in progress or done
  task-cli mark-in-progress 1
  task-cli mark-done 1

  # Listing all tasks
  task-cli list

  # Listing tasks by status
  task-cli list done
  task-cli list todo
  task-cli list in-progress
```