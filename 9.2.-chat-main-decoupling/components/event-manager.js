import {EventEmitter} from 'node:events';

export const EventManager = new EventEmitter()

EventManager.MESSAGES_REQUEST = Symbol('MESSAGES_REQUEST')
EventManager.MESSAGE_INSERT = Symbol('MESSAGE_INSERT')