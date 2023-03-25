import React from 'react';
import { PhonebookList } from './PhonebookList';
import { Form } from './Form';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

export class Phonebook extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onFilter = value => {
    this.setState(() => ({
      filter: value,
    }));
  };

  onDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(item => item.id !== id),
    }));
  };

  UpdateContacs = data => {
    data.id = nanoid();

    if (this.state.contacts.some(item => item.number === data.number)) {
      Notify.failure('Контакт с таким номером уже существует');
      return;
    }

    this.setState(prev => ({
      contacts: [data, ...prev.contacts],
    }));
  };

  render() {
    return (
      <>
        <Form
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          UpdateContacs={this.UpdateContacs}
        />
        {this.state.contacts.length > 0 && (
          <Filter state={this.state} onFilter={this.onFilter} />
        )}
        <PhonebookList state={this.state} onDelete={this.onDelete} />
      </>
    );
  }
}
