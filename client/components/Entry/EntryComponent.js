/* eslint-disable global-require */
import React from 'react';
import { ListItem, List, ListItemContent, ListItemAction, Icon, Grid, Cell } from 'react-mdl';
import styles from './Entry.scss';
import AddEntry from './AddEntryComponent';

export default class Entry extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={styles.root}>
        <Grid>
          <Cell col={11}>
            <List>
              {this.props.viewer.entries.edges.map((edge) => {
                return (
                  <ListItem key={edge.node.id}>
                    <ListItemContent icon='person'>{edge.node.userId} {edge.node.timestamp} {edge.node.text}</ListItemContent>
                    <ListItemAction>
                      <a href='#'><Icon name='edit' /></a>
                    </ListItemAction>
                    <ListItemAction>
                      <a href='#'><Icon name='delete' /></a>
                    </ListItemAction>
                  </ListItem>
                );
              })}
            </List>
          </Cell>
        </Grid>
        <AddEntry viewer={this.props.viewer} />
      </div>
    );
  }
}
