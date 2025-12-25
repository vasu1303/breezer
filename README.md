# Breeze

A high-performance desktop application for real-time voice-to-text transcription that seamlessly injects transcribed text into any active application window. Built with Tauri v2, React, and Deepgram's Nova-2 speech recognition model.

## Overview

Breeze enables users to speak naturally and have their words automatically typed into whichever application is currently focused, whether that's VS Code, Slack, Notion, or any other text input field. The application runs in the background with minimal resource usage and provides an invisible interface that stays out of your way.

## Features

- **Global Keyboard Shortcuts**: Activate transcription from anywhere using `Ctrl+T` to toggle recording or `Ctrl+K` as an instant kill switch
- **Real-Time Transcription**: Live streaming transcription using Deepgram's WebSocket API with 250ms audio chunk intervals
- **Cross-Application Text Injection**: Automatically types transcribed text into the currently focused window using native OS input simulation
- **Onboarding Flow**: Interactive setup wizard that guides users through microphone permissions, shortcut configuration, and a test run
- **Live Transcription View**: Dedicated interface for monitoring transcription status and viewing real-time output
- **Modular Architecture**: Clean separation between frontend React components and Rust backend for maintainability

## Technology Stack

### Frontend
- **React 18.3** with TypeScript
- **Vite 6** for build tooling and development server
- **Tailwind CSS 3.4** for styling
- **Lucide React** for iconography

### Backend
- **Tauri v2** for cross-platform desktop runtime
- **Rust** for system-level operations
- **Enigo 0.6.1** for native OS keyboard input simulation
- **Tauri Plugin Global Shortcut** for system-wide hotkey registration

### AI Services
- **Deepgram SDK 4.11.3** with Nova-2 model for speech-to-text
- **WebSocket API** for real-time audio streaming

## Architecture

The application follows a client-server architecture where the React frontend handles UI and audio capture, while the Rust backend manages system-level operations.

### Frontend Flow
1. User presses `Ctrl+T` or clicks the start button
2. React requests microphone access via `MediaRecorder` API
3. Audio is captured in 250ms chunks and streamed to Deepgram via WebSocket
4. Transcription results are received in real-time and displayed
5. Final transcript is sent to Rust backend via Tauri command
6. Rust uses Enigo to simulate keyboard input into the active window

### Backend Flow
1. Rust registers global shortcuts (`Ctrl+T` and `Ctrl+K`) at application startup
2. Shortcut events are emitted to the React frontend
3. React initiates or stops recording based on current state
4. When transcription completes, React invokes the `type_text` command
5. Rust receives the text and uses Enigo to type it character by character

## Prerequisites

- **Node.js** 18.x or higher
- **Rust** 1.70 or higher
- **npm** or **yarn** package manager
- **Deepgram API Key** (sign up at https://deepgram.com)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd breeze
```

2. Install frontend dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory:
```
VITE_DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

4. Install Rust dependencies (handled automatically by Tauri):
```bash
npm run tauri dev
```

## Development

Start the development server:
```bash
npm run tauri dev
```

This command will:
- Start the Vite dev server on port 1420
- Compile the Rust backend
- Launch the Tauri application window

The application will hot-reload on frontend changes. Rust changes require a restart.

## Building

Build the application for production:
```bash
npm run tauri build
```

This generates platform-specific installers in `src-tauri/target/release/bundle/`.

## Usage

### First Time Setup

1. Launch the application
2. Navigate to the "How to Use" tab
3. Complete the onboarding flow:
   - Grant microphone permissions
   - Review keyboard shortcuts
   - Test the microphone with a sample phrase
   - Complete setup

### Recording Transcription

1. Open any application where you want text to appear (VS Code, Notepad, Slack, etc.)
2. Press `Ctrl+T` to start recording
3. Speak naturally - your words will appear in real-time
4. Press `Ctrl+T` again or `Ctrl+K` to stop recording
5. The transcribed text will be automatically typed into the active window

### Keyboard Shortcuts

- **Ctrl+T**: Toggle recording (start if idle, stop if recording)
- **Ctrl+K**: Instant stop (kill switch) - always stops recording regardless of state

## Project Structure

```
breeze/
├── src/                          # React frontend source
│   ├── components/              # React components
│   │   ├── dashboard/          # Main dashboard views
│   │   ├── onboarding/         # Onboarding flow components
│   │   ├── sections/           # Left/Right section layouts
│   │   └── ui/                 # Reusable UI components
│   ├── hooks/                  # Custom React hooks
│   │   ├── useConfetti.ts      # Confetti animation logic
│   │   ├── useShortcut.ts      # Global shortcut handling
│   │   └── useTranscription.ts # Audio capture and Deepgram integration
│   ├── services/               # Service layer
│   │   ├── audio.ts            # MediaRecorder utilities
│   │   ├── deepgram.ts         # Deepgram WebSocket connection
│   │   └── tauri.ts            # Tauri command wrappers
│   ├── types.ts                # TypeScript type definitions
│   └── App.tsx                 # Main application component
├── src-tauri/                   # Rust backend source
│   ├── src/
│   │   ├── lib.rs              # Main Tauri application setup
│   │   └── main.rs             # Entry point
│   ├── Cargo.toml              # Rust dependencies
│   └── tauri.conf.json         # Tauri configuration
├── package.json                 # Node.js dependencies
├── tailwind.config.js          # Tailwind CSS configuration
└── vite.config.ts              # Vite build configuration
```

## Configuration

### Environment Variables

- `VITE_DEEPGRAM_API_KEY`: Your Deepgram API key for speech recognition

### Tauri Configuration

Window settings, permissions, and build options are configured in `src-tauri/tauri.conf.json`. Key settings include:
- Global shortcut permissions


## Technical Details

### Audio Processing
- Audio is captured using the browser's `MediaRecorder` API
- Chunks are sent to Deepgram every 250ms for low-latency transcription
- The WebSocket connection handles real-time streaming and error recovery

### Text Injection
- Uses the Enigo crate for cross-platform keyboard simulation
- Text is typed character by character to mimic natural typing
- Works with any application that accepts keyboard input

### State Management
- React hooks manage local component state
- Transcription state machine: Idle → Connecting → Listening → Idle/Error
- Global shortcuts are handled via Tauri event system

## Limitations

- Requires Deepgram API key (free tier available)
- Text injection works at the OS level and may be blocked by some security software
- Global shortcuts may conflict with other applications using the same key combinations

## Future Scope

The following features can be planned for future:

- **Minimize Window and Overlay Mode**: Ability to minimize the main window and display a floating overlay when actively typing, providing a compact interface that stays out of the way
- **Customizable Keyboard Shortcuts**: User-configurable global shortcuts, allowing users to set their preferred key combinations for toggle and kill switch actions
- **Multi-Provider Support**: Support for multiple voice-to-text transcription providers, with the ability to configure and switch between different API (OpenAI Whisper, Google Speech-to-Text, Azure Speech Services, etc.)
- **Contextual Awareness**: Intelligent detection of the active application window type (VS Code, text editors, markdown viewers, etc.) to provide context-aware formatting and behavior
- **Application-Specific Behavior**: Customizable typing behavior based on the detected application, such as markdown formatting in VS Code or plain text in Notepad


