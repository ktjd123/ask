import React, { Component } from 'react';
import {MainTemplate, Ask, Menu, Profile, CardList} from 'components'

class Main extends Component {

    state = {
        input: '',
        count: 0,
        selected: 'ask'
    }

    handleChange = (e) => {
        let count = e.target.value.length
        this.setState({
            input: e.target.value,
            count: count
        })
    }

    handleToggle = (ask) => {
        this.setState({
            selected: ask
        })
    }

    render() {
        const {input, count, selected} = this.state
        const {
            handleChange,
            handleToggle
        } = this

        return (
            <div>
                <MainTemplate 
                Profile={Profile}
                Ask={Ask}
                Menu={Menu} 
                value={input} 
                onChange={handleChange} 
                count={count}
                onToggle={handleToggle}
                selected={selected}
                CardList={CardList}
                />
            </div>
        );
    }
}

export default Main;