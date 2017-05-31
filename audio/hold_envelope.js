// NB: The node parameter MUST implement the AudioParam interface from the Web
// Audio API
class HoldEnvelope {
  constructor(node, ctx) {
    this.node = node;
    this.ctx = ctx;

    this.attackTime = 0.1;
    this.decayTime = 0.05;
    this.sustainTime = 10;
  }

  attackTime() {
    return this.attackTime;
  }

  decayTime() {
    return this.attackTime + this.decayTime;
  }

  sustainTime() {
    return this.attackTime + this.decayTime + this.sustainTime;
  }

  trigger() {
    const now = this.ctx.currentTime;

    this.node.cancelScheduledValues(now);
    this.node.setValueAtTime(0, now);

    // Set attack
    this.node.linearRampToValue(1, now + this.attackTime());

    // Set decay
    this.node.linearRampToValue(.9, now + this.decayTime());

    // Set sustain
    this.node.linearRampToValue(0, now + this.sustainTime());
  }
}

export default HoldEnvelope;
