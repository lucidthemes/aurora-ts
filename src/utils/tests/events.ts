import { ChangeEvent, FormEvent } from 'react';

export function createChangeEvent(name: string, value: string): ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {
  return {
    target: { name, value },
  } as unknown as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
}

export function createInputChangeEvent(name: string, value: string): ChangeEvent<HTMLInputElement> {
  return {
    target: { name, value },
  } as unknown as ChangeEvent<HTMLInputElement>;
}

export function createTextAreaChangeEvent(name: string, value: string): ChangeEvent<HTMLTextAreaElement> {
  return {
    target: { name, value },
  } as unknown as ChangeEvent<HTMLTextAreaElement>;
}

export function createFormSubmitEvent(): FormEvent<HTMLFormElement> {
  return { preventDefault: () => {} } as unknown as FormEvent<HTMLFormElement>;
}
