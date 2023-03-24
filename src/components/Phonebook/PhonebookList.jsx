import css from './Phonebook.module.css';
import { Filter } from './Filter';

export function PhonebookList({ state, onFilter, onDelete }) {
  const newArr = state.contacts.filter(
    item =>
      item.name.toLowerCase().includes(state.filter.toLowerCase()) ||
      item.number.includes(state.filter)
  );
  return (
    <>
      {state.contacts.length > 0 && (
        <Filter state={state} onFilter={onFilter} />
      )}

      <ul className={css.list}>
        {newArr.map(item => {
          return (
            <li id={item.id} key={item.id}>
              {item.name}: {item.number}
              <button onClick={onDelete}>Удалить</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
