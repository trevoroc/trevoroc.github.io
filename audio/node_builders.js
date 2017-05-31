export const buildOscillator = (frequency, ctx) => {
  const oscillator = ctx.createOscillator();
  oscillator.frequency.value = frequency;
  return oscillator;
};
