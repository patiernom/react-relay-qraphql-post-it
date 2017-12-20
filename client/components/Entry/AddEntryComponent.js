import React from 'react';
import Relay from 'react-relay';
import { Grid, Cell, Button, Textfield, Icon } from 'react-mdl';
import AddEntryMutation from './AddEntryMutation';

export default class Feature extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  state = {
    form: {
      text: ''
    }
  };

  onChange = (e) => {
    e.persist();

    this.setState({ form: { text: e.target.value } });
  };

  addFeature = () => {
    const value = this.state.form.text;
    if (!value) return;

    const data = {
      viewerId: this.props.viewer.id,
      text: value,
      userId: '1'
    };

    const addEntryMutation = new AddEntryMutation(data);
    const onSuccess = () => {
      console.log('Mutation successful!');
    };
    const onFailure = (transaction) => {
      const error = transaction.getError() || new Error('Mutation failed.');
      console.error(error);
    };

    // const transaction = Relay.Store.applyUpdate(addEntryMutation, { onFailure, onSuccess });
    //
    // transaction.commit();

    Relay.Store.commitUpdate(addEntryMutation);
  };

  render() {
    return (
      <div>
        <Grid>
          <Cell col={10}>
            <Textfield
              onChange={this.onChange}
              label='Enter new entry...'
            />

          </Cell>
          <Cell col={2}>
            <Button className={'addEntry'} raised accent onClick={this.addFeature.bind(this)}><Icon name={'send'} /></Button>
          </Cell>
        </Grid>
      </div>
    );
  }
}
