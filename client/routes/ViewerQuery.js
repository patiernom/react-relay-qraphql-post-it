import Relay from 'react-relay';

export default {
  viewer: (Component) => {
    return Relay.QL`
      query {
        viewer(id: 1) {
          ${Component.getFragment('viewer')}
        }
      }
    `;
  }
};
