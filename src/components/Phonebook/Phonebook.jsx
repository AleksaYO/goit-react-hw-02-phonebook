import React from 'react';
import { nanoid } from 'nanoid';
import { PhonebookList } from './PhonebookList';
import css from './Phonebook.module.css';
import { Form } from './Form';
import { Notify } from 'notiflix';

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

  onDelete = e => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(
        item => item.id !== e.target.parentElement.id
      ),
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
        <PhonebookList
          state={this.state}
          onFilter={this.onFilter}
          onDelete={this.onDelete}
        />
      </>
    );
  }
}
