class ReleaseEnvelope {
  constructor(node, ctx) {
    this.node = node;
    this.ctx = ctx;

    this.releaseTime = 0.1;
  }

  releaseTime() {
    return this.releaseTime;
  }

  trigger() {
    const now = this.ctx.currentTime;

    this.node.cancelScheduledValues(now);

    // Set release
    this.node.linearRampToValue(0, now + this.releaseTime());
  }
}

export default ReleaseEnvelope;
