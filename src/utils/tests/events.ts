import type { ChangeEvent, FormEvent, MouseEvent } from 'react';

export function createInputChangeEvent(name: string, value: string | number): ChangeEvent<HTMLInputElement> {
  return {
    target: { name, value },
  } as unknown as ChangeEvent<HTMLInputElement>;
}

export function createInputNumberChangeEvent(name: string, valueAsNumber: number): ChangeEvent<HTMLInputElement> {
  return {
    target: { name, valueAsNumber },
  } as unknown as ChangeEvent<HTMLInputElement>;
}

export function createTextAreaChangeEvent(name: string, value: string): ChangeEvent<HTMLTextAreaElement> {
  return {
    target: { name, value },
  } as unknown as ChangeEvent<HTMLTextAreaElement>;
}

export function createSelectChangeEvent(name: string, value: string): ChangeEvent<HTMLSelectElement> {
  return {
    target: { name, value },
  } as unknown as ChangeEvent<HTMLSelectElement>;
}

export function createRangeChangeEvent(name: string, value: number, min: number, max: number): ChangeEvent<HTMLInputElement> {
  return {
    target: { name, value, min, max },
  } as unknown as ChangeEvent<HTMLInputElement>;
}

export function createFormSubmitEvent(): FormEvent<HTMLFormElement> {
  return { preventDefault: () => {} } as unknown as FormEvent<HTMLFormElement>;
}

export function createMouseClickEvent(): MouseEvent<HTMLButtonElement> {
  return {} as unknown as MouseEvent<HTMLButtonElement>;
}
