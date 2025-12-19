import type { ChangeEvent } from 'react';

import Textarea from '@components/Form/Textarea';
import type { CheckoutFormData } from '@typings/checkout/form';

interface NoteTextareaProps {
  checkoutFormData: CheckoutFormData;
  noteEnabled: boolean;
  handleFormChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, section: 'contact' | 'shipping' | 'billing' | 'note') => void;
}

export default function NoteTextarea({ checkoutFormData, noteEnabled, handleFormChange }: NoteTextareaProps) {
  if (!noteEnabled) return null;

  return (
    <Textarea
      name="note-text"
      value={checkoutFormData.note.text}
      onChange={(e) => handleFormChange(e, 'note')}
      placeholder="Notes about your order, e.g. special notes for delivery."
      required={false}
      label="Notes about your order, e.g. special notes for delivery."
    />
  );
}
