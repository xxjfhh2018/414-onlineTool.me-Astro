import type { CalculatorSpecification } from '../../types/calculator';

export const pomodoroTimerSpecification = {
  slug: 'pomodoro-timer', template: 'custom',
  inputs: [
    { id: 'workMinutes', label: 'Focus duration', kind: 'number', unit: 'minutes', defaultValue: 25, min: 1, max: 60, step: 1, required: true },
    { id: 'breakMinutes', label: 'Break duration', kind: 'number', unit: 'minutes', defaultValue: 5, min: 1, max: 30, step: 1, required: true },
  ],
  outputs: [
    { id: 'remainingTime', label: 'Time remaining', unit: 'mm:ss', primary: true },
    { id: 'mode', label: 'Current interval' },
    { id: 'elapsedPercent', label: 'Interval elapsed', unit: '%', decimals: 1 },
    { id: 'completedFocusSessions', label: 'Completed focus sessions', decimals: 0 },
  ],
  formula: 'Interval seconds = selected minutes × 60; remaining time = interval end timestamp − current timestamp',
  calculationSteps: ['Validate focus and break durations.', 'Store an end timestamp when Start or Resume is pressed.', 'Derive remaining time from the timestamp on each display update.', 'At zero, prepare the opposite interval and wait for the user to start it.'],
  rounding: 'The display rounds remaining time up to the next whole second while running.',
  validation: [{ inputId: 'workMinutes', rule: 'minimum', value: 1, message: 'Focus duration must be at least one minute.' }, { inputId: 'workMinutes', rule: 'maximum', value: 60, message: 'Focus duration cannot exceed 60 minutes.' }, { inputId: 'breakMinutes', rule: 'minimum', value: 1, message: 'Break duration must be at least one minute.' }, { inputId: 'breakMinutes', rule: 'maximum', value: 30, message: 'Break duration cannot exceed 30 minutes.' }],
  exceptionalStates: ['Invalid settings show an inline error and do not start the timer.', 'Pause preserves the current remaining time.', 'Changing settings while stopped resets the active interval.', 'Completing an interval prepares the next one but does not autoplay it.', 'Reloading or closing the page clears the current session.'],
  provenance: { resultLabel: 'Exact calculation', sources: [], version: 'Timestamp-based browser timer scaffold', lastVerified: '2026-08-10', updateResponsibility: 'OnlineTool.me', assumptions: ['The browser clock is available and reasonably accurate.', 'The next interval requires an explicit Start action.', 'No alarm sound, notification, long-break schedule, or persistent history is provided.'] },
  testCases: [
    { name: 'Default focus state', kind: 'normal', inputs: { workMinutes: 25, breakMinutes: 5 }, expected: { remainingSeconds: 1500, mode: 'focus' } },
    { name: 'Focus completion prepares break', kind: 'boundary', inputs: { workMinutes: 1, breakMinutes: 1 }, expected: { remainingSeconds: 60, mode: 'break', completedFocusSessions: 1 } },
    { name: 'Zero focus duration rejected', kind: 'invalid', inputs: { workMinutes: 0, breakMinutes: 5 }, expected: { error: true } },
  ],
} satisfies CalculatorSpecification;
