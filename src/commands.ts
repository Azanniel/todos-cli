import Commander from 'commander';
import Inquirer from 'inquirer';
import Chalk from 'chalk';
import {join} from 'path';

import {getJson, saveJson, showTodoTable} from './todoActions';

const todosPath = join(__dirname, '..', 'todos.json');

Commander.version('1.0.0');

Commander
  .command('add [tarefa]')
  .description('Adiciona uma tarefa')
  .option('-s, --status [status]', 'Status inicial da Tarefa')
  .action(async (todo, options) => {
    let answers;

    if (!todo) {
      answers = await Inquirer.prompt([
        {
          type: 'input',
          name: 'todo',
          message: 'Qual tarefa você quer adicionar ?',
          validate: (value) => value ?
            true :
            'Não é permitido adicionar uma tarefa vazia',
        },
      ]);
    }

    const todos = getJson(todosPath);
    todos.push({
      title: todo || answers.todo,
      done: (options.status === 'true') || false,
    });

    saveJson(todosPath, todos);

    console.log(`${Chalk.green('Tarefa adicionada com sucesso !')}`);
    showTodoTable(todos);
  });

Commander
  .command('list')
  .description('Lista as tarefas')
  .action(() => {
    const todos = getJson(todosPath);
    showTodoTable(todos);
  });


Commander
  .command('do [ID]')
  .description('Marca a tarefa como feita')
  .action(async (todo) => {
    let answers;

    if (!todo) {
      answers = await Inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Qual o ID da tarefa que quer marcar ?',
          validate: (value) => value !== undefined ?
            true :
            'Defina uma tarefa a ser atualizada',
        },
      ]);
    }

    const todos = getJson(todosPath);
    todos[todo || answers.id].done = true;
    saveJson(todosPath, todos);

    console.log(`${Chalk.green('To-do salvo com sucesso!')}`);
    showTodoTable(todos);
  });

Commander
  .command('undo [ID]')
  .description('Marca a tarefa como pendente')
  .action(async (todo) => {
    let answers;

    if (!todo) {
      answers = await Inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Qual o ID da tarefa que quer marcar ?',
          validate: (value) => value ?
            true :
            'Defina uma tarefa a ser atualizada',
        },
      ]);
    }

    const todos = getJson(todosPath);
    todos[todo || answers.id].done = false;
    saveJson(todosPath, todos);

    console.log(`${Chalk.green('To-do salvo com sucesso!')}`);
    showTodoTable(todos);
  });


export default Commander;
