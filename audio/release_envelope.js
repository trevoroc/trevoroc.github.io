class ReleaseEnvelope {
  constructor(param, ctx) {
    this.param = param;
    this.ctx = ctx;

    this.releaseTime = 0.25;
  }

  totalReleaseTime() {
    return this.releaseTime;
  }

  trigger() {
    const now = this.ctx.currentTime;

    this.param.cancelScheduledValues(now);

    // Set release
    this.param.linearRampToValueAtTime(0, now + this.totalReleaseTime());
  }
}

export default ReleaseEnvelope;
