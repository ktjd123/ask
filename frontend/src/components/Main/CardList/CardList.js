import React, { Component } from 'react';
import {Card} from 'components'
import './CardList.css'

class CardList extends Component {
    render() {
        const {posts} = this.props
        return posts.map(posts => {
            return (
                <Card 
                data={posts}
                key = {posts._id}
                />
            )
        })
    }
}

export default CardList;