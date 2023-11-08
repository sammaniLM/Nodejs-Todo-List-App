const fs = require('fs');
const readlineSync = require('readline-sync');

const taskFile = 'tasks.txt';

function displayTasks(){
    try{
        const data = fs.readFileSync(taskFile, 'utf8');
        const tasks= data.split('\n');
        console.log('Your To-Do List : ');
        tasks.forEach((task, index)=>{
           if (task){
               console.log(`${index+ 1}. ${task}`);
           }
        });
    }catch (err){
        console.error("Error reading tasks : ", err);
    }
}

function addTask(){
    const task = readlineSync.question('Enter a new task: ');
    if (task){
        try{
            fs.appendFileSync(taskFile, task+ '\n');
            console.log('Task added successfully');
        }catch (err){
            console.log('Error adding task : ', err);
        }
    }
}

function completeTask(){
    const tasks = fs.readFileSync(taskFile, 'utf8').split('\n');
    if (tasks.length >0){
        displayTasks();
        const taskIndex = readlineSync.question("Enter the number of the task you want to complete: ");
        if(taskIndex >= 1 && taskIndex <= tasks.length){
            const compltetedTask = tasks.splice(taskIndex -1, 1).join('');
            fs.writeFileSync(taskFile, tasks.join('\n'));
            console.log(`Task completed: ${compltetedTask}`);
        }else {
            console.log('Invalid Task Number');
        }
    }else {
        console.log('No Tasks to Complete');
    }
}

function main(){
    while (true){
        console.log('\nOptions : ');
        console.log('1. Display Tasks');
        console.log('2.Add a Task');
        console.log('3. Complete a Taks')
        console.log('4. Quit');
        const choice = readlineSync.question('Enter your choice : ');

        switch (choice){
            case '1':
                displayTasks();
                break;

            case '2':
                addTask();
                break;

            case '3':
                completeTask();
                break;

            case '4':
                process.exit(0);

            default:
                console.log('Invalid choice.Please try again!');
        }
    }
}
main();