import type { Dispatch, SetStateAction, ChangeEvent } from 'react';

import Checkbox from '@components/Form/Checkbox';
import type { CheckoutFormData } from '@typings/checkout/form';

import NoteTextarea from './NoteTextarea';

interface NoteProps {
  checkoutFormData: CheckoutFormData;
  noteEnabled: boolean;
  setNoteEnabled: Dispatch<SetStateAction<boolean>>;
  handleFormChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, section: 'contact' | 'shipping' | 'billing' | 'note') => void;
}

export default function Note({ checkoutFormData, noteEnabled, setNoteEnabled, handleFormChange }: NoteProps) {
  return (
    <div className="mb-10 flex flex-col gap-y-5">
      <Checkbox
        id="note"
        name="note"
        label="Add a note to your order"
        checked={noteEnabled}
        onChange={() => setNoteEnabled((prevState) => !prevState)}
        className="cursor-pointer"
      />
      <NoteTextarea checkoutFormData={checkoutFormData} noteEnabled={noteEnabled} handleFormChange={handleFormChange} />
    </div>
  );
}
