document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    // Function to add a new task
    const addTask = () => {
        const text = input.value.trim();
        if (text !== "") {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${text}</span>
                <button class="delete-btn">✕</button>
            `;
            
            // Add delete functionality to the new button
            li.querySelector('.delete-btn').addEventListener('click', () => li.remove());
            
            todoList.prepend(li);
            input.value = "";
        }
    };

    // Event Listeners
    addButton.addEventListener('click', addTask);
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Add delete functionality to existing items
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => e.target.parentElement.remove());
    });
});