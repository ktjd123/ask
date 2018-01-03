import React, { Component } from 'react';
import {Card} from 'components'
import './CardList.css'

class CardList extends Component {
    render() {
        const {posts, awI, awICount, onChange, isMine, onAnswer} = this.props
        return posts.map(posts => {
            return (
                <Card 
                data={posts}
                awI = {awI}
                awICount = {awICount}
                key = {posts._id}
                onChange={onChange}
                isMine={isMine}
                onAnswer ={onAnswer}
                />
            )
        })
    }
}

export default CardList;