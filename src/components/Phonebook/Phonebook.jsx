import React from 'react';
import { nanoid } from 'nanoid';
import { PhonebookList } from './PhonebookList';

export class Phonebook extends React.Component {
  state = {
    contacts: [],
    name: '',
  };

  onChange = e => {
    this.setState({ name: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState(prev => ({
      contacts: [{ name: this.state.name, id: nanoid() }, ...prev.contacts],
    }));
    this.reset();
  };

  reset = () => {
    this.setState({ name: '' });
  };

  render() {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <button type="submit">Add Contact</button>
        </form>
        <PhonebookList state={this.state} />
      </>
    );
  }
}
