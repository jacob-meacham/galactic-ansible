export class IntervalEngine {
  constructor(sensor, broadcaster, interval) {
    this.sensor = sensor;
    this.broadcaster = broadcaster;
    this.interval = interval;
  }

  run() {
    setInterval(() => {
      const message = this.sensor.retrieveData();
      this.broadcaster.broadcast(message);
    }, this.interval);
  }
}

export class DebugEngine {
  constructor(sensor, broadcaster, num) {
    this.sensor = sensor;
    this.broadcaster = broadcaster;
    this.num = num;
  }

  run() {
    for (let i = 0; i < this.num; i++) {
      const message = this.sensor.retrieveData();
      this.broadcaster.broadcast(message);
    }

    this.broadcaster.broadcast(this.sensor.debugOutput());
  }
}
