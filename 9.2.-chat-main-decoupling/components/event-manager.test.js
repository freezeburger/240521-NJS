
import { test, describe, it, beforeEach } from 'node:test'
import { strict as assert } from 'node:assert';
import { EventManager } from './event-manager.js';

test('synchronous passing test', (t) => {
    assert.strictEqual(1, 1);
});

test('asynchronous passing test', async (t) => {
    assert.strictEqual(1, 1);
});

describe('suite', async () => {

    it('synchronous passing test', () => {
        assert.strictEqual(1, 1);
    });

    it('asynchronous passing test', async () => {
        assert.strictEqual(1, 1);
    });

});


describe('EventManager handles events', async () => {


    beforeEach(() => {
        // console.log('about to run a test')
    });

    it('Propagates events', (t, done) => {
        EventManager.once(EventManager.MESSAGES_REQUEST, () => { assert.strictEqual(1, 1); done() })
        EventManager.emit(EventManager.MESSAGES_REQUEST);
    });

    it('asynchronous passing test', async () => {
        assert.strictEqual(1, 1);
    });

});