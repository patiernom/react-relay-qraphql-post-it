import Relay from 'react-relay';
import Entry from './EntryComponent';

export default Relay.createContainer(Entry, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        entries(first: 20) {
          edges {
            node {
              id
              text
              timestamp
            }
          }
        }
      }`
  }
});
