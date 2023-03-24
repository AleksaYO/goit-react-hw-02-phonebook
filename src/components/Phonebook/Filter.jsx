import css from './Phonebook.module.css';

export function Filter({ onFilter, state }) {
  return (
    <div className={css.filter}>
      <h2>Contacts</h2>
      Find contacts by name
      <label className={css.label} htmlFor="">
        <input
          className={css.input}
          onInput={onFilter}
          name="text"
          type="text"
          value={state.filter}
        />
      </label>
    </div>
  );
}
