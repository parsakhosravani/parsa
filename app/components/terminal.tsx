"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Terminal as TerminalIcon, Minimize2, Maximize2, X } from "lucide-react";

interface TerminalLine {
  id: number;
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

interface FileSystem {
  [key: string]: {
    type: 'file' | 'directory';
    content?: string;
    children?: FileSystem;
  };
}

export function Terminal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState("/home/parsa");
  const [user] = useState("parsa");
  const [hostname] = useState("dev-machine");
  const [cursorVisible, setCursorVisible] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530); // Standard terminal cursor blink rate

    return () => clearInterval(interval);
  }, []);

  // Mock file system
  const [fileSystem] = useState<FileSystem>({
    home: {
      type: 'directory',
      children: {
        parsa: {
          type: 'directory',
          children: {
            'projects': {
              type: 'directory',
              children: {
                'doom-ts': { type: 'file', content: 'TypeScript DOOM game source code' },
                'portfolio': { type: 'file', content: 'Next.js portfolio website' },
                'readme.md': { type: 'file', content: '# My Projects\n\nWelcome to my development workspace!' }
              }
            },
            'documents': {
              type: 'directory',
              children: {
                'notes.txt': { type: 'file', content: 'Random development notes...' },
                'todo.md': { type: 'file', content: '- [ ] Finish terminal component\n- [x] Create DOOM game\n- [ ] World domination' }
              }
            },
            '.bashrc': { type: 'file', content: 'export PATH=$PATH:/usr/local/bin' },
            '.gitconfig': { type: 'file', content: '[user]\n  name = Parsa Khosravani\n  email = parsa@example.com' }
          }
        }
      }
    },
    usr: {
      type: 'directory',
      children: {
        bin: {
          type: 'directory',
          children: {
            'node': { type: 'file', content: 'Node.js executable' },
            'npm': { type: 'file', content: 'Node Package Manager' },
            'git': { type: 'file', content: 'Git version control' }
          }
        }
      }
    },
    var: {
      type: 'directory',
      children: {
        log: {
          type: 'directory',
          children: {
            'system.log': { type: 'file', content: 'System log entries...' }
          }
        }
      }
    }
  });

  const addLine = useCallback((content: string, type: TerminalLine['type'] = 'output') => {
    setLines(prev => [...prev, {
      id: Date.now() + Math.random(),
      type,
      content,
      timestamp: new Date()
    }]);
  }, []);

  const getPath = useCallback((path: string): FileSystem | null => {
    if (path === '/') return fileSystem;

    const parts = path.split('/').filter(Boolean);
    let current: FileSystem | undefined = fileSystem;

    for (const part of parts) {
      if (current && current[part] && current[part].type === 'directory') {
        current = current[part].children;
      } else {
        return null;
      }
    }

    return current || null;
  }, [fileSystem]);

  const getFile = useCallback((path: string): { type: 'file' | 'directory'; content?: string } | null => {
    const parts = path.split('/').filter(Boolean);
    const fileName = parts.pop();
    const dirPath = '/' + parts.join('/');

    const dir = getPath(dirPath);
    if (!dir || !fileName || !dir[fileName]) return null;

    return dir[fileName];
  }, [getPath]);

  const resolvePath = useCallback((path: string): string => {
    if (path.startsWith('/')) return path;

    const current = currentDir.split('/').filter(Boolean);
    const parts = path.split('/');

    for (const part of parts) {
      if (part === '..') {
        current.pop();
      } else if (part !== '.' && part !== '') {
        current.push(part);
      }
    }

    return '/' + current.join('/');
  }, [currentDir]);

  const executeCommand = useCallback((command: string) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    // Add command to history
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Add command line
    addLine(`${user}@${hostname}:${currentDir}$ ${trimmed}`, 'command');

    const [cmd, ...args] = trimmed.split(' ');

    switch (cmd) {
      case 'help':
        addLine('Available commands:');
        addLine('  ls [path]         - List directory contents');
        addLine('  cd <path>         - Change directory');
        addLine('  cat <file>        - Display file contents');
        addLine('  pwd               - Print working directory');
        addLine('  mkdir <name>      - Create directory (simulation)');
        addLine('  touch <name>      - Create file (simulation)');
        addLine('  echo <text>       - Display text');
        addLine('  whoami            - Display current user');
        addLine('  date              - Display current date/time');
        addLine('  uname             - System information');
        addLine('  ps                - List running processes');
        addLine('  top               - Display system processes');
        addLine('  history           - Show command history');
        addLine('  clear             - Clear terminal');
        addLine('  neofetch          - System info with style');
        addLine('  cowsay <text>     - Make a cow say something');
        addLine('  fortune           - Display a random quote');
        addLine('  matrix            - Enter the matrix');
        addLine('  hack              - Initiate hacking sequence');
        break;

      case 'ls':
        const lsPath = args[0] ? resolvePath(args[0]) : currentDir;
        const lsDir = getPath(lsPath);

        if (!lsDir) {
          addLine(`ls: cannot access '${args[0]}': No such file or directory`, 'error');
        } else {
          const items = Object.entries(lsDir)
            .map(([name, item]) => item.type === 'directory' ? `${name}/` : name)
            .sort();

          if (items.length === 0) {
            addLine('(empty directory)');
          } else {
            addLine(items.join('  '));
          }
        }
        break;

      case 'cd':
        if (!args[0]) {
          setCurrentDir('/home/parsa');
        } else {
          const newPath = resolvePath(args[0]);
          const dir = getPath(newPath);

          if (!dir) {
            addLine(`cd: no such file or directory: ${args[0]}`, 'error');
          } else {
            setCurrentDir(newPath);
          }
        }
        break;

      case 'pwd':
        addLine(currentDir);
        break;

      case 'cat':
        if (!args[0]) {
          addLine('cat: missing file operand', 'error');
        } else {
          const filePath = resolvePath(args[0]);
          const file = getFile(filePath);

          if (!file) {
            addLine(`cat: ${args[0]}: No such file or directory`, 'error');
          } else if (file.type === 'directory') {
            addLine(`cat: ${args[0]}: Is a directory`, 'error');
          } else {
            addLine(file.content || '(empty file)');
          }
        }
        break;

      case 'echo':
        addLine(args.join(' '));
        break;

      case 'whoami':
        addLine(user);
        break;

      case 'date':
        addLine(new Date().toString());
        break;

      case 'uname':
        addLine('Linux dev-machine 5.15.0-generic #72-Ubuntu SMP x86_64 GNU/Linux');
        break;

      case 'ps':
        addLine('  PID TTY          TIME CMD');
        addLine(' 1234 pts/0    00:00:01 bash');
        addLine(' 5678 pts/0    00:00:00 node');
        addLine(' 9012 pts/0    00:00:02 next-dev');
        addLine(' 3456 pts/0    00:00:00 ps');
        break;

      case 'top':
        addLine('Tasks: 42 total, 1 running, 41 sleeping');
        addLine('CPU: 15.3% user, 2.1% system, 82.6% idle');
        addLine('Memory: 8GB total, 4.2GB used, 3.8GB free');
        addLine('');
        addLine('  PID USER      CPU% MEM%    TIME COMMAND');
        addLine(' 1234 parsa     12.5  8.3  0:02:15 next-dev');
        addLine(' 5678 parsa      8.2  4.1  0:01:30 node');
        addLine(' 9012 parsa      2.1  2.0  0:00:45 typescript');
        break;

      case 'history':
        commandHistory.forEach((cmd, i) => {
          addLine(`${i + 1}  ${cmd}`);
        });
        break;

      case 'clear':
        setLines([]);
        break;

      case 'mkdir':
        if (!args[0]) {
          addLine('mkdir: missing operand', 'error');
        } else {
          addLine(`Directory '${args[0]}' created (simulated)`);
        }
        break;

      case 'touch':
        if (!args[0]) {
          addLine('touch: missing file operand', 'error');
        } else {
          addLine(`File '${args[0]}' created (simulated)`);
        }
        break;

      case 'neofetch':
        addLine('                    parsa@dev-machine');
        addLine('     .,:loool:,.    ─────────────────');
        addLine('  .,coooooooooooc.  OS: Ubuntu 22.04.3 LTS');
        addLine(' .lllllllllllllll.  Host: Developer Machine');
        addLine(';ccccccccccccccccc;  Kernel: 5.15.0-generic');
        addLine(';;;;;;;;;;;;;;;;;;  Shell: bash 5.1.16');
        addLine(';;;;;;;;;;;;;;;;;;  Terminal: Web Terminal');
        addLine(';;;;;;;;;;;;;;;;;;  CPU: TypeScript Engine');
        addLine(';;;;;;;;;;;;;;;;;;  Memory: Infinite');
        addLine("';;;;;;;;;;;;;;;'   Disk: Cloud Storage");
        addLine(' .lllllllllllll.   Theme: Dark Mode');
        addLine('  \'cccccccccccc\'    Icons: Lucide');
        addLine('   `\'\'\'\'\'\'\'\'\'\'\'     Terminal: Custom React');
        break;

      case 'cowsay':
        const text = args.join(' ') || 'Hello, World!';
        const border = '_'.repeat(text.length + 2);
        addLine(` ${border} `);
        addLine(`< ${text} >`);
        addLine(` ${'-'.repeat(text.length + 2)} `);
        addLine('        \\   ^__^');
        addLine('         \\  (oo)\\_______');
        addLine('            (__)\\       )\\/\\');
        addLine('                ||----w |');
        addLine('                ||     ||');
        break;

      case 'fortune':
        const fortunes = [
          '"Code is poetry." - Anonymous',
          '"First, solve the problem. Then, write the code." - John Johnson',
          '"Experience is the name everyone gives to their mistakes." - Oscar Wilde',
          '"In order to be irreplaceable, one must always be different." - Coco Chanel',
          '"Java is to JavaScript what car is to carpet." - Chris Heilmann',
          '"The best error message is the one that never shows up." - Thomas Fuchs'
        ];
        addLine(fortunes[Math.floor(Math.random() * fortunes.length)]);
        break;

      case 'matrix':
        addLine('Wake up, Neo...');
        setTimeout(() => addLine('The Matrix has you...'), 1000);
        setTimeout(() => addLine('Follow the white rabbit.'), 2000);
        setTimeout(() => addLine('Knock, knock, Neo.'), 3000);
        break;

      case 'hack':
        addLine('Initiating hack sequence...');
        setTimeout(() => addLine('Scanning for vulnerabilities...'), 500);
        setTimeout(() => addLine('Found 0 vulnerabilities (you\'re safe!)'), 1000);
        setTimeout(() => addLine('Access denied: You\'re too wholesome to hack!'), 1500);
        break;

      case 'git':
        if (args[0] === 'status') {
          addLine('On branch main');
          addLine('Your branch is up to date with \'origin/main\'.');
          addLine('');
          addLine('Changes not staged for commit:');
          addLine('  modified:   app/components/terminal.tsx');
          addLine('');
          addLine('no changes added to commit');
        } else {
          addLine('git: command not fully implemented');
        }
        break;

      case 'npm':
        if (args[0] === 'version') {
          addLine('9.8.1');
        } else if (args[0] === 'list') {
          addLine('parsa@1.0.0 /home/parsa');
          addLine('├── next@14.0.0');
          addLine('├── react@18.2.0');
          addLine('├── typescript@5.2.0');
          addLine('└── tailwindcss@3.3.0');
        } else {
          addLine('npm: command not fully implemented');
        }
        break;

      default:
        addLine(`bash: ${cmd}: command not found`, 'error');
        addLine(`Type 'help' for available commands`);
    }
  }, [user, hostname, currentDir, addLine, commandHistory, resolvePath, getPath, getFile]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple auto-completion for common commands
      const commands = ['ls', 'cd', 'cat', 'pwd', 'help', 'clear', 'echo', 'git', 'npm'];
      const matches = commands.filter(cmd => cmd.startsWith(currentInput));
      if (matches.length === 1) {
        setCurrentInput(matches[0] + ' ');
      }
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input when terminal is opened
  useEffect(() => {
    if (isVisible && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible, isMinimized]);

  // Welcome message
  useEffect(() => {
    if (lines.length === 0) {
      addLine('Welcome to the Parsa Terminal v1.0.0');
      addLine('Type "help" for available commands.');
      addLine('');
    }
  }, [lines.length, addLine]);

  const terminalHeight = isFullscreen ? 'h-screen' : isMinimized ? 'h-8' : 'h-full';
  const terminalWidth = isFullscreen ? 'w-screen' : 'w-full max-w-2xl';

  return (
    <div className="relative">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="mb-2 px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded text-zinc-300 hover:bg-zinc-800 transition-colors text-xs font-mono flex items-center gap-1"
      >
        <TerminalIcon size={12} />
        Terminal
      </button>

      {isVisible && (
        <div className={`bg-black/95 border border-zinc-600 rounded-lg backdrop-blur-sm font-mono text-sm ${terminalWidth} ${terminalHeight} ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
          {/* Terminal Header */}
          <div className="flex items-center justify-between bg-zinc-800 px-3 py-2 rounded-t-lg border-b border-zinc-600">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-zinc-300 text-xs">
                {user}@{hostname}: {currentDir}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-zinc-200"
              >
                <Minimize2 size={12} />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-zinc-200"
              >
                <Maximize2 size={12} />
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-zinc-200"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          {/* Terminal Content */}
          {!isMinimized && (
            <div className="flex flex-col h-full">
              <div
                ref={terminalRef}
                className="flex-1 p-3 overflow-y-auto text-green-400 whitespace-pre-wrap cursor-text"
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((line) => (
                  <div
                    key={line.id}
                    className={`leading-relaxed ${line.type === 'command' ? 'text-white' :
                      line.type === 'error' ? 'text-red-400' :
                        'text-green-400'
                      }`}
                  >
                    {line.content}
                  </div>
                ))}

                {/* Current input line */}
                <div className="flex items-center text-white leading-relaxed">
                  <span className="text-green-400">{user}@{hostname}</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">{currentDir}</span>
                  <span className="text-white">$ </span>
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full bg-transparent outline-none text-white caret-green-400"
                      style={{
                        caretColor: '#4ade80',
                        caretShape: 'block'
                      }}
                      autoComplete="off"
                      spellCheck={false}
                    />
                    {/* Custom terminal cursor */}
                    <div
                      className={`absolute top-0 h-full w-2 bg-green-400 pointer-events-none ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-75`}
                      style={{
                        left: `${currentInput.length * 0.6}em`,
                        animation: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}