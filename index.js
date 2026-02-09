import readline from "readline";
import chalk from "chalk";
import boxen from "boxen";
import Table from "cli-table3";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let todos = [];

function showMenu() {
    console.clear(); 
    
    const menuTitle = chalk.bold.white("✨ TO DO APP PRO ✨");
    const menuContent = 
        `${chalk.green("1.")} Add New Task\n` +
        `${chalk.blue("2.")} View Task List\n` +
        `${chalk.yellow("3.")} Remove a Task\n` + 
        `${chalk.red("4.")} Exit System`;         

    console.log(boxen(menuContent, {
        title: menuTitle,
        titleAlignment: 'center',
        padding: 1,
        margin: { top: 1, bottom: 1 },
        borderStyle: 'double',
        borderColor: 'cyan'
    }));

    rl.question(chalk.bold.magenta(" ➤ Select an option: "), handleInput);
}

function handleInput(option) {
    switch (option) {
        case "1":
            console.log(chalk.cyan("\n─── Adding New Task ───"));
            rl.question(chalk.italic(" What needs to be done? "), (task) => {
                if (task.trim()) {
                    todos.push(task.trim());
                    console.log(`\n${chalk.bgGreen.black(" DONE ")} ${chalk.green("Task saved successfully!")}`);
                } else {
                    console.log(`\n${chalk.bgRed.white(" ERROR ")} ${chalk.red("Task cannot be empty.")}`);
                }
                waitForKey();
            });
            break;

        case "2":
            renderTable();
            waitForKey();
            break;

        case "3": 
            if (todos.length === 0) {
                console.log(chalk.red("\n No tasks to delete."));
                waitForKey();
            } else {
                renderTable();
                rl.question(chalk.bold.yellow("\n Enter the ID to remove: "), (num) => {
                    const index = parseInt(num) - 1;
                    if (!isNaN(index) && index >= 0 && index < todos.length) {
                        const removed = todos.splice(index, 1);
                        console.log(`\n${chalk.bgYellow.black(" REMOVED ")} ${chalk.white(`"${removed}" has been deleted.`)}`);
                    } else {
                        console.log(chalk.red("\n Invalid ID number."));
                    }
                    waitForKey();
                });
            }
            break;

        case "4":
            console.log(chalk.cyan("\n Thank you for staying organized! Goodbye. 👋\n"));
            rl.close();
            break;

        default:
            console.log(chalk.red("\n [!] Invalid selection. Please choose 1, 2, 3, or 4."));
            setTimeout(showMenu, 1200);
            break;
    }
}


function renderTable() {
    if (todos.length === 0) {
        console.log(chalk.dim("\n (The list is currently empty) "));
        return;
    }

    const table = new Table({
        head: [chalk.bold.cyan('ID'), chalk.bold.cyan('Task Description')],
        colWidths: [6, 45],
        wordWrap: true,
        style: { border: ['gray'] }
    });

    todos.forEach((task, index) => {
        table.push([chalk.gray(index + 1), task]);
    });

    console.log("\n" + table.toString());
}

function waitForKey() {
    rl.question(chalk.dim("\n Press Enter to continue..."), () => {
        showMenu();
    });
}

showMenu();