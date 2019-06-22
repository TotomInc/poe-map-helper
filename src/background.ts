import { registerSchemes, registerEvents, registerIpcEvents } from './main/routine';

// Register schemes as privileged in order to allow the `app` scheme protocol
registerSchemes();

// Register events and make our app ready
registerEvents();

// Register IPC events
registerIpcEvents();
