import { RandomSensor } from './sensor';
import { IntervalEngine, DebugEngine } from './engine';
import { ConsoleBroadcaster } from './broadcaster';

export function beginScan(debug) {
  const broadcaster = new ConsoleBroadcaster();
  broadcaster.broadcast('Galactic Ansible coming online...');

  let engine = null;
  if (debug) {
    engine = new DebugEngine(new RandomSensor(), broadcaster, 100);
  } else {
    engine = new IntervalEngine(new RandomSensor(), broadcaster, 1000);
  }

  engine.run();
}
