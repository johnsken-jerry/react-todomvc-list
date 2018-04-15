import React, { Component } from 'react';
import classNames from 'classnames';
import * as Utils from './utils';

class Footer extends Component {
    
    render() {
        const nowShowing = this.props.nowShowing;
        const activeTodoWord = Utils.pluralize(this.props.count, 'item');
        let clearButton = null;
        if( this.props.completedCount > 0 ) {
            clearButton = (
                <button
                    className="clear-completed"
                    onClick={this.props.onClearCompleted}>
                    Clear completed!
                </button>
            )
        }
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{this.props.count}</strong> {activeTodoWord} left
                </span>
                <ul className="filters">
                    <li>
                        <a href="#/all" className={classNames({selected: nowShowing === 'all'})}>
                            All
                        </a>
                        </li>
                        {' '}
                        <li>
                            <a href="#/active" className={classNames({selected: nowShowing === 'active'})}>
                                Active
                            </a>
                        </li>
                        {' '}
                        <li>
                            <a href="#/completed" className={classNames({selected: nowShowing === 'completed'})}>
                            Completed
                            </a>
                        </li>
                    </ul>
                    {clearButton}
            </footer>
        )
    }
}

export default Footer;