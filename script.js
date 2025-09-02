// Advanced AI Website JavaScript

// Authentication System
const users = {
    'admin': 'neural123',
    'developer': 'ai2024',
    'scientist': 'quantum',
    'user': 'demo'
};

let currentUser = null;
let aiModels = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    generateAIModels();
    setupCodeEditor();
    createDataVisualization();
});

function initializeApp() {
    // Add particle background
    createParticleBackground();
    
    // Setup biometric login animations
    setupBiometricLogin();
    
    // Initialize AI assistant
    initializeAIAssistant();
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (users[username] && users[username] === password) {
        currentUser = username;
        
        // Animate login success
        const loginScreen = document.getElementById('loginScreen');
        const mainApp = document.getElementById('mainApp');
        
        loginScreen.style.animation = 'fadeOut 0.5s ease-out forwards';
        
        setTimeout(() => {
            loginScreen.classList.add('hidden');
            mainApp.classList.remove('hidden');
            mainApp.style.animation = 'fadeIn 0.5s ease-in forwards';
            
            // Welcome message
            showNotification(`Welcome back, ${username}! Star AI Editor activated.`, 'success');
        }, 500);
        
    } else {
        showNotification('Access denied. Invalid credentials.', 'error');
        
        // Shake animation for failed login
        const loginContainer = document.querySelector('.login-container');
        loginContainer.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            loginContainer.style.animation = 'loginFloat 3s ease-in-out infinite';
        }, 500);
    }
}

function logout() {
    currentUser = null;
    const loginScreen = document.getElementById('loginScreen');
    const mainApp = document.getElementById('mainApp');
    
    mainApp.style.animation = 'fadeOut 0.5s ease-out forwards';
    
    setTimeout(() => {
        mainApp.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        loginScreen.style.animation = 'fadeIn 0.5s ease-in forwards';
        
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }, 500);
}

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Page-specific initialization
    if (pageId === 'models') {
        displayAIModels();
    } else if (pageId === 'neural') {
        animateNeuralNetworks();
    } else if (pageId === 'data') {
        updateDataVisualization();
    }
}

function setupBiometricLogin() {
    const bioBtns = document.querySelectorAll('.bio-btn');
    
    bioBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const originalClass = icon.className;
            
            // Simulate biometric scanning
            icon.className = 'fas fa-spinner fa-spin';
            this.style.background = 'var(--warning)';
            
            setTimeout(() => {
                icon.className = 'fas fa-check';
                this.style.background = 'var(--success)';
                
                setTimeout(() => {
                    // Auto-login with biometric
                    document.getElementById('username').value = 'user';
                    document.getElementById('password').value = 'demo';
                    login();
                }, 1000);
            }, 2000);
        });
    });
}

function createParticleBackground() {
    const particleCount = 50;
    const body = document.body;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(0, 255, 255, ${Math.random() * 0.5 + 0.2});
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            animation: float ${Math.random() * 20 + 10}s linear infinite;
        `;
        body.appendChild(particle);
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes fadeOut {
            to { opacity: 0; transform: scale(0.8); }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
}

function generateAIModels() {
    const modelTypes = [
        'GPT-4 Turbo', 'BERT Large', 'ResNet-50', 'YOLO v8', 'Transformer XL',
        'StyleGAN 3', 'CLIP Vision', 'T5 Text', 'MobileNet v3', 'EfficientNet B7',
        'RoBERTa Base', 'DeBERTa v3', 'Vision Transformer', 'DALL-E 2', 'Whisper Large',
        'CodeT5+', 'PaLM 2', 'LaMDA', 'Flamingo', 'Gopher'
    ];
    
    const categories = ['NLP', 'Computer Vision', 'Generative AI', 'Speech', 'Code Generation'];
    const accuracies = [85, 90, 92, 88, 95, 87, 91, 89, 93, 86];
    
    aiModels = modelTypes.map((name, index) => ({
        id: index + 1,
        name: name,
        category: categories[Math.floor(Math.random() * categories.length)],
        accuracy: accuracies[Math.floor(Math.random() * accuracies.length)],
        size: `${Math.floor(Math.random() * 500 + 100)}MB`,
        downloads: Math.floor(Math.random() * 10000 + 1000)
    }));
}

function displayAIModels() {
    const modelsGrid = document.getElementById('modelsGrid');
    modelsGrid.innerHTML = '';
    
    aiModels.forEach(model => {
        const modelCard = document.createElement('div');
        modelCard.className = 'model-card';
        modelCard.innerHTML = `
            <h4>${model.name}</h4>
            <p><strong>Category:</strong> ${model.category}</p>
            <p><strong>Accuracy:</strong> ${model.accuracy}%</p>
            <p><strong>Size:</strong> ${model.size}</p>
            <p><strong>Downloads:</strong> ${model.downloads.toLocaleString()}</p>
            <button onclick="downloadModel(${model.id})" style="
                background: var(--primary);
                border: none;
                padding: 8px 16px;
                border-radius: 5px;
                color: white;
                cursor: pointer;
                margin-top: 10px;
                transition: all 0.3s;
            ">Download Model</button>
        `;
        modelsGrid.appendChild(modelCard);
    });
}

function downloadModel(modelId) {
    const model = aiModels.find(m => m.id === modelId);
    showNotification(`Downloading ${model.name}... Neural pathways activated.`, 'info');
    
    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            clearInterval(interval);
            showNotification(`${model.name} downloaded successfully! Ready for deployment.`, 'success');
        }
    }, 500);
}

function setupCodeEditor() {
    const codeArea = document.getElementById('codeArea');
    
    // Add syntax highlighting simulation
    codeArea.addEventListener('input', function() {
        // Simple syntax highlighting would go here
        // For demo purposes, we'll just add some AI assistance
        if (this.value.includes('help')) {
            addAIMessage('I see you need help! What would you like to code?');
        }
    });
    
    // Add line numbers
    codeArea.addEventListener('scroll', function() {
        // Line numbers would be synchronized here
    });
}

function initializeAIAssistant() {
    const aiInput = document.querySelector('.ai-input');
    
    if (aiInput) {
        aiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const message = this.value.trim();
                if (message) {
                    addUserMessage(message);
                    this.value = '';
                    
                    // Simulate AI response
                    setTimeout(() => {
                        const response = generateAIResponse(message);
                        addAIMessage(response);
                    }, 1000);
                }
            }
        });
    }
}

function addUserMessage(message) {
    const aiChat = document.querySelector('.ai-chat');
    const userMsg = document.createElement('div');
    userMsg.style.cssText = `
        background: rgba(102, 126, 234, 0.2);
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 10px;
        border-right: 3px solid #667eea;
        text-align: right;
    `;
    userMsg.textContent = message;
    aiChat.appendChild(userMsg);
    aiChat.scrollTop = aiChat.scrollHeight;
}

function addAIMessage(message) {
    const aiChat = document.querySelector('.ai-chat');
    const aiMsg = document.createElement('div');
    aiMsg.className = 'ai-message';
    aiMsg.textContent = message;
    aiChat.appendChild(aiMsg);
    aiChat.scrollTop = aiChat.scrollHeight;
}

function generateAIResponse(input) {
    const responses = {
        'hello': '🌟 Hello! I\'m Star AI, your coding companion. Ready to create amazing code together?',
        'help': '🚀 I can help with: Code generation, debugging, optimization, explanations, and tutorials!',
        'python': '🐍 Python is perfect! Want me to generate some code? Try: "create a calculator" or "make a web scraper"',
        'javascript': '⚡ JavaScript rocks! I can help with React, Node.js, APIs, and more. What do you need?',
        'html': '🌐 HTML time! I can create responsive layouts, forms, animations. What should we build?',
        'css': '🎨 CSS magic! Want animations, layouts, or responsive designs? I\'ve got you covered!',
        'create': '✨ Creating code for you! What type of application or function do you need?',
        'generate': '🔥 Code generation activated! Describe what you want and I\'ll build it!',
        'bug': '🐛 Bug hunting mode! Paste your code and I\'ll help you fix it!',
        'explain': '📚 I love explaining code! Share what you want to understand better.',
        'api': '🔌 API integration specialist here! REST, GraphQL, webhooks - what do you need?',
        'database': '💾 Database expert ready! SQL, NoSQL, queries, schemas - let\'s build it!',
        'default': '🌟 Star AI processing... Ask me to create, explain, debug, or generate any code!'
    };
    
    const lowerInput = input.toLowerCase();
    for (const key in responses) {
        if (lowerInput.includes(key)) {
            return responses[key];
        }
    }
    return responses['default'];
}

function animateNeuralNetworks() {
    const neuralViz = document.querySelectorAll('.neural-viz');
    
    neuralViz.forEach((viz, index) => {
        // Create animated neural network visualization
        viz.innerHTML = '';
        
        // Add nodes and connections
        for (let i = 0; i < 5; i++) {
            const node = document.createElement('div');
            node.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: var(--accent);
                border-radius: 50%;
                top: ${Math.random() * 80 + 10}%;
                left: ${Math.random() * 80 + 10}%;
                animation: pulse 2s ease-in-out infinite;
                animation-delay: ${i * 0.2}s;
            `;
            viz.appendChild(node);
        }
    });
    
    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.2); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

function createDataVisualization() {
    const canvas = document.getElementById('dataChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Simple animated chart
    function drawChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < 10; i++) {
            const x = (canvas.width / 10) * i;
            const y = (canvas.height / 10) * i;
            
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Draw data line
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let i = 0; i < canvas.width; i += 10) {
            const y = canvas.height / 2 + Math.sin((i + Date.now() * 0.01) * 0.02) * 50;
            if (i === 0) {
                ctx.moveTo(i, y);
            } else {
                ctx.lineTo(i, y);
            }
        }
        ctx.stroke();
    }
    
    setInterval(drawChart, 50);
}

function updateDataVisualization() {
    // Refresh data visualization when data page is shown
    setTimeout(createDataVisualization, 100);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--accent)'};
        color: ${type === 'error' ? 'white' : 'black'};
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        font-weight: bold;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
    
    // Add slide animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                showPage('dashboard');
                break;
            case '2':
                e.preventDefault();
                showPage('editor');
                break;
            case '3':
                e.preventDefault();
                showPage('neural');
                break;
            case '4':
                e.preventDefault();
                showPage('models');
                break;
            case '5':
                e.preventDefault();
                showPage('data');
                break;
        }
    }
});

// AI Code Execution Functions
function runCode() {
    const code = document.getElementById('codeArea').value;
    const language = document.querySelector('.language-select').value.toLowerCase();
    const output = document.getElementById('outputContent');
    
    if (!code.trim()) {
        output.textContent = 'No code to run!';
        return;
    }
    
    output.textContent = 'Running code...';
    
    setTimeout(() => {
        try {
            if (language === 'javascript') {
                const result = simulateJSExecution(code);
                output.textContent = result;
            } else if (language === 'python') {
                const result = simulatePythonExecution(code);
                output.textContent = result;
            } else {
                output.textContent = `✅ ${language} code executed successfully!\n\nOutput: Code compiled and ready!`;
            }
        } catch (error) {
            output.textContent = `❌ Error: ${error.message}`;
        }
    }, 1000);
    
    showNotification('Code execution started!', 'info');
}

function simulateJSExecution(code) {
    if (code.includes('console.log')) {
        const matches = code.match(/console\.log\(['"`]([^'"`]*)['"`]\)/g);
        if (matches) {
            return matches.map(match => {
                const text = match.match(/['"`]([^'"`]*)['"`]/)[1];
                return text;
            }).join('\n');
        }
    }
    return '✅ JavaScript executed successfully!\n\n🌟 Star AI: Your code looks great!';
}

function simulatePythonExecution(code) {
    if (code.includes('print')) {
        const matches = code.match(/print\(['"`]([^'"`]*)['"`]\)/g);
        if (matches) {
            return matches.map(match => {
                const text = match.match(/['"`]([^'"`]*)['"`]/)[1];
                return text;
            }).join('\n');
        }
    }
    return '✅ Python executed successfully!\n\n🌟 Star AI: Beautiful Python code!';
}

function askAI() {
    const aiInput = document.getElementById('aiInput');
    aiInput.focus();
    aiInput.placeholder = 'Ask me anything about your code...';
    addAIMessage('🌟 Star AI: What would you like to know about your code?');
}

function generateCode() {
    const prompt = window.prompt('What code would you like me to generate?\n\nExamples:\n- "Create a calculator"\n- "Make a todo list"\n- "Build a login form"');
    
    if (prompt) {
        const codeArea = document.getElementById('codeArea');
        const generatedCode = generateCodeFromPrompt(prompt);
        codeArea.value = generatedCode;
        showNotification('Code generated by Star AI!', 'success');
        addAIMessage(`🌟 Star AI: I've generated ${prompt} code for you! Check the editor.`);
    }
}

function generateCodeFromPrompt(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('calculator')) {
        return `# Star AI Generated Calculator\n\nclass Calculator:\n    def add(self, a, b):\n        return a + b\n    \n    def subtract(self, a, b):\n        return a - b\n    \n    def multiply(self, a, b):\n        return a * b\n    \n    def divide(self, a, b):\n        return a / b if b != 0 else "Error: Division by zero"\n\n# Usage\ncalc = Calculator()\nprint(calc.add(10, 5))\nprint(calc.multiply(4, 3))`;
    }
    
    if (lowerPrompt.includes('todo')) {
        return `<!-- Star AI Generated Todo List -->\n<!DOCTYPE html>\n<html>\n<head>\n    <title>Todo List</title>\n    <style>\n        body { font-family: Arial, sans-serif; max-width: 500px; margin: 50px auto; }\n        .todo-item { padding: 10px; border: 1px solid #ddd; margin: 5px 0; }\n    </style>\n</head>\n<body>\n    <h1>My Todo List</h1>\n    <input type="text" id="todoInput" placeholder="Add new task...">\n    <button onclick="addTodo()">Add</button>\n    <div id="todoList"></div>\n    \n    <script>\n        function addTodo() {\n            const input = document.getElementById('todoInput');\n            const list = document.getElementById('todoList');\n            const div = document.createElement('div');\n            div.className = 'todo-item';\n            div.innerHTML = input.value + ' <button onclick="this.parentElement.remove()">Delete</button>';\n            list.appendChild(div);\n            input.value = '';\n        }\n    </script>\n</body>\n</html>`;
    }
    
    return `# Star AI Generated Code\n# Prompt: ${prompt}\n\nprint("Hello from Star AI!")\nprint("Working on: ${prompt}")\n\n# Ask me for more specific features!`;
}

function saveCode() {
    const code = document.getElementById('codeArea').value;
    localStorage.setItem('starai_code', code);
    showNotification('Code saved successfully!', 'success');
}

function handleAIInput(event) {
    if (event.key === 'Enter') {
        const input = event.target;
        const message = input.value.trim();
        if (message) {
            addUserMessage(message);
            input.value = '';
            
            setTimeout(() => {
                const response = generateAIResponse(message);
                addAIMessage(response);
            }, 500);
        }
    }
}

// Auto-save functionality
setInterval(() => {
    const codeArea = document.getElementById('codeArea');
    if (codeArea && codeArea.value.trim()) {
        localStorage.setItem('starai_autosave', codeArea.value);
    }
}, 30000);

// Load saved code
window.addEventListener('load', () => {
    const savedCode = localStorage.getItem('starai_code') || localStorage.getItem('starai_autosave');
    const codeArea = document.getElementById('codeArea');
    if (savedCode && codeArea) {
        codeArea.value = savedCode;
    }
});