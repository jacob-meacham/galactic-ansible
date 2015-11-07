export default class IntervalEngine {
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
