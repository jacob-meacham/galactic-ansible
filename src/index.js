import { RandomSensor } from './sensor';
import IntervalEngine from './engine';
import { ConsoleBroadcaster } from './broadcaster';

export function beginScan() {
  const broadcaster = new ConsoleBroadcaster();
  broadcaster.broadcast('Galactic Ansible coming online...');

  const engine = new IntervalEngine(new RandomSensor(), broadcaster, 1000);
  engine.run();
}
