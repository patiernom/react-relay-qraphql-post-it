import React from 'react';
import { Layout, Content } from 'react-mdl';
import 'normalize.css/normalize.css';
import 'react-mdl/extra/css/material.cyan-red.min.css';
import Navbar from '../Navbar/NavbarComponent';
import Footer from '../Footer/FooterContainer';
import styles from './App.scss';

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    const msgNumber = 0;
    const title = 'Post-it Relay';

    return (
      <div className={styles.root}>
        <Layout fixedHeader fixedDrawer className={styles.root}>
          <Navbar title={title} msgNumber={msgNumber} />
          <Content>
            <div className={styles.content}>
              {this.props.children}
            </div>
          </Content>
          <Footer viewer={this.props.viewer} />
        </Layout>
      </div>
    );
  }
}
