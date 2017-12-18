/* eslint-disable global-require */
import React from 'react';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import Page from '../Page/PageComponent';
import styles from './Feature.scss';
import AddEntry from './AddEntryComponent';

export default class Entry extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <Page heading='Entries'>
          <Grid>
            {this.props.viewer.entries.edges.map((edge) => {
              return (
                <Cell col={4} key={edge.node.id}>
                  <Card className={styles.card}>
                    <CardText className={styles.description}>
                      {edge.node.userId}
                    </CardText>
                    <CardText className={styles.description}>
                      {edge.node.timestamp}
                    </CardText>
                    <CardText className={styles.description}>
                      {edge.node.text}
                    </CardText>
                  </Card>
                </Cell>
              );
            })}
          </Grid>
        </Page>
        <AddEntry viewer={this.props.viewer} />
      </div>
    );
  }
}
