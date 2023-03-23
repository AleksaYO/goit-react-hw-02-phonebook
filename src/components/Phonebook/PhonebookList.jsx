export function PhonebookList({ state }) {
  return state.contacts.map(item => {
    return <li key={item.id}>{item.name}</li>;
  });
}
