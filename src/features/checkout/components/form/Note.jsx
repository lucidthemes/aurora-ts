import Checkbox from '@components/Form/Checkbox';
import NoteTextarea from './NoteTextarea';

export default function Note({ checkoutFormData, noteEnabled, setNoteEnabled, handleFormChange }) {
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
