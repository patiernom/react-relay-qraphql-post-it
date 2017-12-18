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
      timestamp: this.props.timestamp,
      userId: this.props.userId
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on addEntryPayload {
        entryEdge,
        viewer { entries }
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
