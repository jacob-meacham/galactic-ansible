'use strict';

import StaticSensor from './sensor';
import IntervalEngine from './engine';
import { ConsoleBroadcaster } from './broadcaster';

function _beginScan() {
    let engine = new IntervalEngine(new StaticSensor(), new ConsoleBroadcaster(), 5000);
    engine.run();
}

export var ansible = {
    beginScan: _beginScan
};