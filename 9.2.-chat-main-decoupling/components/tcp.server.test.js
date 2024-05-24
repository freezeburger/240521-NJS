
import { test, describe, it, beforeEach, mock } from 'node:test'
import { strict as assert } from 'node:assert';
import { bindTCPServer } from './tcp.server.js';
import { EventManager } from './event-manager.js';
import { createServer } from 'node:http';
import { Socket } from 'node:net';


test('TCP ',  (t,done) => {

    t.mock.method(EventManager, 'emit');

    t.test('asynchronous passing test', (t,done) => {

        assert.strictEqual(EventManager.emit.mock.calls.length, 0);
        const server =  createServer(() => false)
        bindTCPServer(server, {})
        server.listen(5050)

        const client = new Socket();
        client.connect(5050, '127.0.0.1', () => {
            /* 
                client.destroy()
                server.closeAllConnections()
            */
            server.close() 
            assert.strictEqual(EventManager.emit.mock.calls.length, 1);
            
            done()
        });

    });

});

