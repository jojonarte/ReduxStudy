import React from 'react';

import {
  View,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Switch,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: '#F7F7F7',
        flex: 1,
        justifyContent: 'flex-start',
    },
    button: {
        height: 60,
        borderColor: '#05A5D1',
        borderWidth: 2,
        backgroundColor: '#333',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FAFAFA',
        fontSize: 20,
        fontWeight: '600',
    },
    toggleRow: {
        flexDirection: 'row',
        padding: 10,
    },
    toggleText: {
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 3,
    },
});

import TaskRow from './TaskRow/Component';

class TaskList extends React.Component {
  constructor(props, context) {
      super(props, context);

      const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
      });

      this.state = {
          dataSource: ds.cloneWithRows(props.todos),
      };
  }

  componentWillReceiveProps(nextProps) {
      const dataSource = this
        .state
        .dataSource
        .cloneWithRows(nextProps.todos);

      this.setState({ dataSource }); // eslint-disable-line react/no-set-state
  }

  renderRow(todo) {
      return (
        <TaskRow
            onDone={this.props.onDone}
            todo={todo}
        />
    );
  }

  render() {
      return (
        <View style={styles.container}>
        <View
            style={styles.toggleRow}
        >
          <Switch
              onValueChange={this.props.onToggle}
              value={this.props.filter !== 'pending'}
          />
          <Text
              style={styles.toggleText}
          >
          Showing {this.props.todos.length} {this.props.filter} todo(s)
          </Text>
        </View>
          <ListView
              dataSource={this.state.dataSource}
              key={this.props.todos}
              renderRow={this.renderRow.bind(this)}
          />
          <TouchableHighlight
              onPress={this.props.onAddStarted}
              style={styles.button}
          >
            <Text
                style={styles.buttonText}
            >
                Add One
            </Text>
          </TouchableHighlight>
        </View>
      );
  }
}

TaskList.propTypes = {
    filter: React.PropTypes.string.isRequired,
    onAddStarted: React.PropTypes.func.isRequired,
    onDone: React.PropTypes.func.isRequired,
    onToggle: React.PropTypes.func.isRequired,
    todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default TaskList;
