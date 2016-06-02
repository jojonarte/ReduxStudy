/**
 * This is the entry point for your experience that you will run on Exponent.
 *
 * Start by looking at the render() method of the component called
 * FirstExperience. This is where the text and example components are.
 */

const React = require('react');
import {
  Navigator,
} from 'react-native';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import store from './todoStore';

export default class PluralTodo extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.state = store.getState();

      store.subscribe(() => {
          this.setState(store.getState()); // eslint-disable-line react/no-set-state
      });
  }

  onAddStarted() {
      this.nav.push({
          name: 'taskform',
      });
  }

  onCancel() {
      console.log('cancelled');
      this.nav.pop();
  }

  onAdd(task) {
      console.log('added', task);
      // this.state.todos.push({ task });
      // this.setState({ todos: this.state.todos });
      store.dispatch({
          type: 'ADD_TODO',
          task,
      });
      this.nav.pop();
  }

  onDone(todo) {
      console.log('done ', todo.task);
      store.dispatch({
          type: 'DONE_TODO',
          todo,
      });
  }

  onToggle() {
      store.dispatch({
          type: 'TOGGLE_STATE',
      });
  }

  renderScene(route, nav) {
      switch (route.name) {
      case 'taskform':
          return (
                <TaskForm
                    onAdd={this.onAdd.bind(this)}
                    onCancel={this.onCancel.bind(this)}
                />
            );
      default:
          return (
                  <TaskList
                      filter={this.state.filter}
                      onAddStarted={this.onAddStarted.bind(this)}
                      onDone={this.onDone.bind(this)}
                      onToggle={this.onToggle.bind(this)}
                      todos={this.state.todos}
                  />
            );
      }
  }

  configureScene() {
      return Navigator.SceneConfigs.FloatFromBottom;
  }

  render() {
      return (
      <Navigator
          configureScene={this.configureScene}
          initialRoute={{ name: 'tasklist', index: 0 }}
          ref={((nav) => {
              this.nav = nav;
          })}
          renderScene={this.renderScene.bind(this)}
      />
    );
  }

}
