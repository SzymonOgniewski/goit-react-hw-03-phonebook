import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './form/Form';
import { Contacts } from './Contacts/Contacts';
import styled from 'styled-components';
const Msg = styled.h2`
  text-align: center;
`;

export class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  getStoragedContacts = e => {
    const savedContacts = JSON.parse(localStorage.getItem('savedContacts'));
    console.log(savedContacts);
    this.setState({ contacts: savedContacts });
  };

  handleRemove = id => {
    const updatedContacts = this.state.contacts.filter(c => c.id !== id);
    this.setState({ contacts: updatedContacts });
    localStorage.setItem('savedContacts', `${JSON.stringify(updatedContacts)}`);
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
      localStorage.setItem('savedContacts', `${JSON.stringify(addContact)}`);
    }
  };
  componentDidMount() {
    this.getStoragedContacts();
  }
  render() {
    console.log(this.state.contacts);
    return (
      <>
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          name={this.state.name}
          number={this.state.number}
        />
        {this.state.contacts.length === 0 ? (
          <>
            <Msg>Add some contacts to see the list</Msg>
          </>
        ) : (
          <Contacts
            contactsArr={this.state.contacts}
            filter={this.state.filter}
            handleChange={this.handleChange}
            handleRemove={this.handleRemove}
          />
        )}
      </>
    );
  }
}
