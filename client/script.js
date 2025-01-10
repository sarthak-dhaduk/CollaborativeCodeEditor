// DOM Elements
const createRoomButton = document.getElementById("createRoom");
const joinRoomButton = document.getElementById("joinRoom");
const roomIdInput = document.getElementById("roomId");
const languageDropdown = document.getElementById("languageDropdown");
const stdinBox = document.getElementById("stdinBox");
const outputBox = document.getElementById("outputBox");
const userListDiv = document.getElementById("usersList");
const userEmail = document.getElementById("lblUserEmail").innerText;

let editor;
let ws;
let currentRoomId;
let suppressEditorChanges = false; // To avoid recursive updates

// Initialize Monaco Editor
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs' } });
require(['vs/editor/editor.main'], function () {
    editor = monaco.editor.create(document.getElementById("codeEditor"), {
        value: "// Start coding here...\n",
        language: 'python',
        theme: 'vs-dark',
        automaticLayout: true
    });

    // Handle editor input changes for live collaboration
    editor.onDidChangeModelContent(() => {
        if (!suppressEditorChanges && ws && ws.readyState === WebSocket.OPEN) {
            const content = editor.getValue();
            ws.send(content); // Send editor content to server
        }
    });
});

// Change language dynamically based on selection
languageDropdown.addEventListener("change", function () {
    const selectedLanguage = this.value;
    monaco.editor.setModelLanguage(editor.getModel(), selectedLanguage);
});

// Generate unique Room ID
function generateRoomId() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
}

// Create Room Button Click
createRoomButton.addEventListener("click", () => {
    currentRoomId = generateRoomId();
    roomIdInput.value = currentRoomId;

    connectToServer(currentRoomId);
    alert(`Room created with ID: ${currentRoomId}`);
});

// Join Room Button Click
joinRoomButton.addEventListener("click", () => {
    const roomId = roomIdInput.value;
    if (!roomId) {
        alert("Please enter a valid Room ID.");
        return;
    }

    currentRoomId = roomId;
    connectToServer(currentRoomId);
    alert(`Joined room with ID: ${roomId}`);
});

// Connect to WebSocket Server
function connectToServer(roomId) {
    ws = new WebSocket("ws://localhost:8080/ws/");

    ws.onopen = () => {
        ws.send(`JOIN:${roomId}`);
        ws.send(`Email:${userEmail}`);
    };

    ws.onmessage = (event) => {
        const message = event.data;

        if (message.startsWith("USERS:")) {
            const usersList = message.replace("USERS:", "").split(",");
            userListDiv.innerHTML = ""; // Clear existing list
            usersList.forEach((user) => {
                const userItem = document.createElement("li");
                userItem.textContent = user.trim();
                userListDiv.appendChild(userItem);
            });
        } else {
            suppressEditorChanges = true;

            // Update editor content if it differs
            if (editor && message && editor.getValue() !== message) {
                editor.setValue(message);
            }

            suppressEditorChanges = false;
        }
    };
}


// Run Code Button Functionality
function runCode() {
    const sourceCode = editor.getValue();
    const userInput = stdinBox.value;

    const requestBody = {
        language: languageDropdown.value,
        version: '*',
        files: [
            { content: sourceCode }
        ],
        stdin: userInput || ""
    };

    fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {
            if (data.run && data.run.stdout) {
                outputBox.value = data.run.stdout;
            } else if (data.run && data.run.stderr) {
                outputBox.value = "Error: " + data.run.stderr;
            } else {
                outputBox.value = "Unknown error occurred.";
            }
        })
        .catch(error => {
            console.error('Error executing code:', error);
            outputBox.value = "API request failed.";
        });
}
