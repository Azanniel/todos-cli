import fs from 'fs';
import Table from 'cli-table';
import Chalk from 'chalk';

interface TodoProps {
  title: string;
  done: boolean;
}

export const getJson = (path: string) => {
  const data = fs.existsSync(path) ? fs.readFileSync(path) : [];

  try {
    return JSON.parse(String(data));
  } catch (error) {
    return [];
  }
};

export const saveJson = (path: string, todo: TodoProps) => {
  fs.writeFileSync(path, JSON.stringify(todo, null, '\t'));
};

export const showTodoTable = (todos: TodoProps[]) => {
  const table = new Table({
    head: ['id', 'tarefa', 'status'],
  });

  todos.map((todo, index) => {
    table.push(
      [
        index,
        todo.title,
        todo.done ? Chalk.green('feito') : Chalk.yellow('pendente'),
      ],
    );
  });

  console.log(table.toString());
};
