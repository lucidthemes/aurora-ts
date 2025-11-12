import Textarea from '@components/Form/Textarea';

export default function NoteTextarea({ checkoutFormData, noteEnabled, handleFormChange }) {
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
