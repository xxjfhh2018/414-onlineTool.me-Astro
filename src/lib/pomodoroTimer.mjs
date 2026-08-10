export const POMODORO_LIMITS = Object.freeze({ workMinutes: Object.freeze({ min: 1, max: 60 }), breakMinutes: Object.freeze({ min: 1, max: 30 }) });

export function validatePomodoroSettings({ workMinutes, breakMinutes }) {
  return Number.isInteger(workMinutes)
    && workMinutes >= POMODORO_LIMITS.workMinutes.min
    && workMinutes <= POMODORO_LIMITS.workMinutes.max
    && Number.isInteger(breakMinutes)
    && breakMinutes >= POMODORO_LIMITS.breakMinutes.min
    && breakMinutes <= POMODORO_LIMITS.breakMinutes.max;
}

export function createPomodoroState(settings = { workMinutes: 25, breakMinutes: 5 }) {
  if (!validatePomodoroSettings(settings)) throw new RangeError('Focus must be 1–60 minutes and break must be 1–30 minutes.');
  const totalSeconds = settings.workMinutes * 60;
  return { settings: { ...settings }, mode: 'focus', remainingSeconds: totalSeconds, totalSeconds, running: false, endAtMs: null, completedFocusSessions: 0, status: 'Ready to focus' };
}

export function startPomodoro(state, nowMs = Date.now()) {
  if (state.running) return state;
  return { ...state, running: true, endAtMs: nowMs + state.remainingSeconds * 1000, status: state.mode === 'break' ? 'Break time' : 'Focusing…' };
}

export function pausePomodoro(state, nowMs = Date.now()) {
  if (!state.running) return state;
  const remainingSeconds = Math.max(0, Math.ceil((state.endAtMs - nowMs) / 1000));
  return { ...state, remainingSeconds, running: false, endAtMs: null, status: 'Paused' };
}

export function advancePomodoro(state, nowMs = Date.now()) {
  if (!state.running) return state;
  const remainingSeconds = Math.max(0, Math.ceil((state.endAtMs - nowMs) / 1000));
  if (remainingSeconds > 0) return { ...state, remainingSeconds };
  const completedFocusSessions = state.completedFocusSessions + (state.mode === 'focus' ? 1 : 0);
  const mode = state.mode === 'focus' ? 'break' : 'focus';
  const totalSeconds = (mode === 'focus' ? state.settings.workMinutes : state.settings.breakMinutes) * 60;
  return {
    ...state,
    mode,
    remainingSeconds: totalSeconds,
    totalSeconds,
    running: false,
    endAtMs: null,
    completedFocusSessions,
    status: mode === 'break' ? 'Focus complete — break ready' : 'Break complete — focus ready',
  };
}

export function resetPomodoro(state, settings = state.settings) {
  const reset = createPomodoroState(settings);
  return { ...reset, completedFocusSessions: state.completedFocusSessions };
}

export function formatPomodoroTime(seconds) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(safeSeconds / 60)).padStart(2, '0')}:${String(safeSeconds % 60).padStart(2, '0')}`;
}

export function pomodoroElapsedPercent(state) {
  return state.totalSeconds > 0 ? Math.max(0, Math.min(100, (1 - state.remainingSeconds / state.totalSeconds) * 100)) : 0;
}
