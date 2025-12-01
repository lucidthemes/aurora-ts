import { ChangeEvent, FormEvent } from 'react';

export function createChangeEvent(name: string, value: string): ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {
  return {
    target: { name, value },
  } as unknown as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
}

export function createFormSubmitEvent(): FormEvent<HTMLFormElement> {
  return { preventDefault: () => {} } as unknown as FormEvent<HTMLFormElement>;
}
