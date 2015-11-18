import { RandomSensor } from './sensor';
import { IntervalEngine, DebugEngine } from './engine';
import { ConsoleBroadcaster } from './broadcaster';

const program = require('commander');

export function beginScan(args) {
  program
    .version('0.0.1')
    .option('--debug-engine', 'Use debug engine')
    .parse(args);

  const broadcaster = new ConsoleBroadcaster();
  broadcaster.broadcast('Galactic Ansible coming online...');

  let engine = null;
  if (program.debugEngine) {
    engine = new DebugEngine(new RandomSensor(), broadcaster, 100);
  } else {
    engine = new IntervalEngine(new RandomSensor(), broadcaster, 1000);
  }

  engine.run();
}
