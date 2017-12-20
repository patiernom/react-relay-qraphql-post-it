import Relay from 'react-relay';

class AddEntryMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { addEntry }
    `;
  }

  getVariables() {
    return {
      text: this.props.text,
      userId: this.props.userId
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddEntryPayload {
        entryEdge,
        viewer(id: 1) { entries }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      connectionName: 'entries',
      edgeName: 'entryEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
}

export default AddEntryMutation;
