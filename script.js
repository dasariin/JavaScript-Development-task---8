    <script>
        // DOM elements
        const taskInput = document.getElementById('task-input');
        const addBtn = document.getElementById('add-btn');
        const taskList = document.getElementById('task-list');
        const taskCount = document.getElementById('task-count');

        // Load tasks from localStorage on page load
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Function to save tasks to localStorage
        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
            updateTaskCount();
        }

        // Function to update task count
        function updateTaskCount() {
            const totalTasks = tasks.length;
            const completedTasks = tasks.filter(task => task.completed).length;
            taskCount.textContent = `${completedTasks}/${totalTasks}`;
        }

        // Function to render tasks
        function renderTasks() {
            taskList.innerHTML = '';
            
            if (tasks.length === 0) {
                taskList.innerHTML = `
                    <div class="empty-state">
                        <i>📝</i>
                        <p>No tasks yet. Add a task to get started!</p>
                    </div>
                `;
                return;
            }
            
            tasks.forEach((task, index) => {
                const taskItem = document.createElement('li');
                taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
                taskItem.innerHTML = `
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="task-text">${task.text}</span>
                    <button class="delete-btn">×</button>
                `;
                
                // Add event listeners for this task
                const checkbox = taskItem.querySelector('.task-checkbox');
                const deleteBtn = taskItem.querySelector('.delete-btn');
                const taskText = taskItem.querySelector('.task-text');
                
                // Toggle completed status
                checkbox.addEventListener('change', () => {
                    tasks[index].completed = checkbox.checked;
                    taskItem.classList.toggle('completed', checkbox.checked);
                    saveTasks();
                });
                
                // Delete task
                deleteBtn.addEventListener('click', () => {
                    tasks.splice(index, 1);
                    renderTasks();
                    saveTasks();
                });
                
                // Edit task on double click
                taskText.addEventListener('dblclick', () => {
                    const newText = prompt('Edit your task:', task.text);
                    if (newText !== null && newText.trim() !== '') {
                        tasks[index].text = newText.trim();
                        renderTasks();
                        saveTasks();
                    }
                });
                
                taskList.appendChild(taskItem);
            });
            
            updateTaskCount();
        }

        // Function to add a new task
        function addTask() {
            const text = taskInput.value.trim();
            if (text === '') {
                alert('Please enter a task!');
                return;
            }
            
            tasks.push({
                text: text,
                completed: false
            });
            
            taskInput.value = '';
            renderTasks();
            saveTasks();
        }

        // Event listeners
        addBtn.addEventListener('click', addTask);
        
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTask();
            }
        });

        // Initial render
        renderTasks();
    </script>
</html>
