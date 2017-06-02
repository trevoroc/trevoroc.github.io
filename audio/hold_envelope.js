// NB: The node parameter MUST implement the AudioParam interface from the Web
// Audio API
class HoldEnvelope {
  constructor(param, ctx) {
    this.param = param;
    this.ctx = ctx;

    this.attackTime = 0.1;
    this.decayTime = 0.1;
    this.sustainTime = 5;
  }

  totalAttackTime() {
    return this.attackTime;
  }

  totalDecayTime() {
    return this.attackTime + this.decayTime;
  }

  totalSustainTime() {
    return this.attackTime + this.decayTime + this.sustainTime;
  }

  trigger(stopCallback) {
    const now = this.ctx.currentTime;

    this.param.cancelScheduledValues(now);
    this.param.setValueAtTime(0, now);

    console.log('attack');
    // debugger;
    // Set attack
    this.param.linearRampToValueAtTime(1, now + this.totalAttackTime());

    // Set decay
    this.param.linearRampToValueAtTime(.6, now + this.totalDecayTime());

    // Set sustain
    this.param.linearRampToValueAtTime(0, now + this.totalSustainTime());
    stopCallback(this.totalSustainTime());
  }
}

export default HoldEnvelope;
