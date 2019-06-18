import { registerSchemes, registerEvents } from './main/routine';

// Register schemes as privileged in order to allow the `app` scheme protocol
registerSchemes();

// Register events and make our app ready
registerEvents();
