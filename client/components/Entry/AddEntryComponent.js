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
    console.log('onChange', e.target.text);
    this.setState({ form: { text: e.value } });
  };

  addFeature = () => {
    const value = this.state.form.text.value;
    if (value === 'none') {
      return;
    }

    const addEntryMutation = new AddEntryMutation({ viewerId: this.props.viewer.id, ...{ text: value, timestamp: 1513542244724, userId: 1 } });
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
            <Button className={'addEntry'} raised accent onClick={this.addFeature}><Icon name={'send'} /></Button>
          </Cell>
        </Grid>
      </div>
    );
  }
}
