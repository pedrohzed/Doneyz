const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyMessage = document.getElementById('emptyMessage');
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const cancelBtn = document.getElementById('cancelBtn');

// Carregar tarefas do localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
}

// Salvar tarefas no localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Abrir modal
addBtn.addEventListener('click', () => {
    taskModal.style.display = 'block';
});

// Fechar modal
cancelBtn.addEventListener('click', () => {
    taskModal.style.display = 'none';
    taskForm.reset();
});

// Fechar modal ao clicar fora do conteúdo
window.addEventListener('click', (e) => {
    if (e.target === taskModal) {
        taskModal.style.display = 'none';
        taskForm.reset();
    }
});

// Adicionar tarefa
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const taskName = document.getElementById('taskName').value.trim();
    const taskCategory = document.getElementById('taskCategory').value;
    const taskPriority = document.getElementById('taskPriority').value;
    const taskDueDate = document.getElementById('taskDueDate').value;
    const taskDescription = document.getElementById('taskDescription').value.trim();
    
    if (taskName === '') return;
    
    const tasks = loadTasks();
    tasks.push({
        id: Date.now(),
        text: taskName,
        category: taskCategory,
        priority: taskPriority,
        dueDate: taskDueDate,
        description: taskDescription,
        completed: false
    });
    
    saveTasks(tasks);
    taskForm.reset();
    taskModal.style.display = 'none';
    renderTasks();
});

// Deletar tarefa
function deleteTask(id) {
    let tasks = loadTasks();
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
    renderTasks();
}

// Alternar conclusão da tarefa
function toggleTask(id) {
    let tasks = loadTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        renderTasks();
    }
}

// Renderizar tarefas
function renderTasks() {
    const tasks = loadTasks();
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }
    
    emptyMessage.style.display = 'none';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        let dueDateText = '';
        if (task.dueDate) {
            const date = new Date(task.dueDate);
            dueDateText = `<div class="task-details">📅 Due: ${date.toLocaleDateString()}</div>`;
        }
        
        let descriptionHtml = '';
        if (task.description) {
            descriptionHtml = `<div class="task-description">${task.description}</div>`;
        }
        
        li.innerHTML = `
            <div class="task-header">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})" class="task-checkbox">
                <span class="task-text" style="${task.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${task.text}</span>
            </div>
            <div class="task-badges">
                <span class="category-badge category-${task.category}">${task.category}</span>
                <span class="priority-badge priority-${task.priority}">🔥 ${task.priority}</span>
            </div>
            ${dueDateText}
            ${descriptionHtml}
            <div class="task-actions">
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Renderizar ao carregar
renderTasks();
