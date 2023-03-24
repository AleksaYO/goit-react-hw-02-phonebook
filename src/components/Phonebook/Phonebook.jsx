import React from 'react';
import { nanoid } from 'nanoid';
import { PhonebookList } from './PhonebookList';
import { Form } from './Form';
import { Notify } from 'notiflix';
import { Filter } from './Filter';

export class Phonebook extends React.Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const oldObj = this.state.contacts.find(
      item => item.name === this.state.name && item.number === this.state.number
    );
    if (this.state.contacts.includes(oldObj)) {
      Notify.failure('Контакт с таким номером уже есть в списке');
      return;
    }

    this.setState(prev => ({
      contacts: [
        {
          name: this.state.name,
          number: this.state.number,
          id: nanoid(),
        },
        ...prev.contacts,
      ],
    }));

    this.reset();
  };

  onFilter = e => {
    this.setState(() => ({
      filter: e.target.value,
    }));
  };

  onDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(item => item.id !== id),
    }));
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <>
        <Form
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          state={this.state}
        />
        {this.state.contacts.length > 0 && (
          <Filter state={this.state} onFilter={this.onFilter} />
        )}
        <PhonebookList state={this.state} onDelete={this.onDelete} />
      </>
    );
  }
}
