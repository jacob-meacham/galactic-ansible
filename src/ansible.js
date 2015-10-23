'use strict';

import StaticSensor from './sensor';
import IntervalEngine from './engine';
import { ConsoleBroadcaster } from './broadcaster';

export function beginScan() {
    let broadcaster = new ConsoleBroadcaster();
    broadcaster.broadcast('Galactic Ansible coming online...');
    let engine = new IntervalEngine(new StaticSensor(), broadcaster, 5000);
    engine.run();
}
