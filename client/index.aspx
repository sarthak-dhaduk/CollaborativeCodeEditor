<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Collaborative Code Editor</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs/loader.min.js"></script>
    <style>
    #codeEditor {
        width: 100%;
        height: 400px;
        border: 1px solid #ccc;
    }
    #outputBox {
        width: 100%;
        height: 200px;
        border: 1px solid #ccc;
        padding: 10px;
        overflow: auto;
        white-space: pre-wrap;
        background-color: #f9f9f9;
        font-family: monospace;
    }
    #stdinBox {
        width: 100%;
        height: 80px;
        padding: 10px;
        border: 1px solid #ccc;
        margin-top: 10px;
        background-color: #f1f1f1;
    }
    #controls {
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>
</head>
<body>
    <h1>Collaborative Code Editor</h1>
    <div id="controls">
    <button id="createRoom">Create Room</button>
<input id="roomId" placeholder="Enter Room ID" />
<button id="joinRoom">Join Room</button>
    <div>
        <label for="languageDropdown">Select Language:</label>
        <select id="languageDropdown">
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="csharp">C#</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="ruby">Ruby</option>
            <option value="go">Go</option>
            <option value="swift">Swift</option>
            <option value="rust">Rust</option>
            <option value="kotlin">Kotlin</option>
            <option value="php">PHP</option>
            <option value="sql">SQL</option>
            <option value="bash">Shell</option>
            <option value="haskell">Haskell</option>
            <option value="scala">Scala</option>
            <option value="perl">Perl</option>
            <option value="lua">Lua</option>
        </select>
    </div>
</div>
    <br />
<div id="codeEditor"></div>
<br />
<button type="button" onclick="runCode()">Run Code</button>
<br />
<div>
    <label>Output:</label>
    <textarea id="outputBox" readonly placeholder="Output will appear here..."></textarea>
    <textarea id="stdinBox" placeholder="Enter input for your code here..." rows="4"></textarea> <!-- Always visible input field -->
</div>
    <script src="script.js"></script>
</body>
</html>
