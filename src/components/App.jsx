import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './form/Form';
import { Contacts } from './Contacts/Contacts';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'John Doe', number: '741-22-33' },
      { id: 'id-3', name: 'Jane Doe', number: '232-44-11' },
      { id: 'id-4', name: 'Jim Brown', number: '111-12-33' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  handleRemove = id => {
    const updatedContacts = this.state.contacts.filter(c => c.id !== id);
    this.setState({ contacts: updatedContacts });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const existing = this.state.contacts.find(c => c.name === this.state.name);
    if (existing) {
      alert(`${this.state.name} is already on your contact list`);
    } else {
      const contact = {
        id: nanoid(),
        name: this.state.name,
        number: this.state.number,
      };
      const addContact = [contact, ...this.state.contacts];
      this.setState({ contacts: addContact, number: '', name: '' });
    }
  };
  render() {
    return (
      <>
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          name={this.state.name}
          number={this.state.number}
        />
        <Contacts
          contactsArr={this.state.contacts}
          filter={this.state.filter}
          handleChange={this.handleChange}
          handleRemove={this.handleRemove}
        />
      </>
    );
  }
}
