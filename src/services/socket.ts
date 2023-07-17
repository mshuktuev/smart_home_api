import express from './express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer(express);
const io = new Server(server);

export default io;
