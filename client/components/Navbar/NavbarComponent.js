import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Header, Navigation, Drawer, Layout, Icon } from 'react-mdl';
import styles from './Navbar.scss';

class Navbar extends React.Component {
  render() {
    const { title, msgNumber } = this.props;

    return (
      <div className={styles.root}>
        <Layout fixedHeader fixedDrawer>
          <Header>
            <div className={'msgNumber'}> <span><Icon name={'create'} /> {msgNumber}</span></div>
          </Header>
          <Drawer title={<Link to='/'>{title}</Link>}>
            <Navigation>
              <a href='https://github.com/patiernom/react-relay-qraphql-post-it' target='_blank' rel='noopener noreferrer'>Help</a>
            </Navigation>
          </Drawer>
        </Layout>
      </div>
    );
  }
}

Navbar.propTypes = {
  title: PropTypes.string,
  msgNumber: PropTypes.number
};

Navbar.defaultProps = {
  title: '',
  msgNumber: 0
};

export default Navbar;
