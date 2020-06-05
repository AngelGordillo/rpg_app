import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import MonsterCard from '../../components/MonsterCard/MonsterCard';

class MonsterDisplay extends Component {

    componentDidMount() {
        this.props.onFetchMonster();
    }
    render() {
        let monsters = <Spinner />;
        if (!this.props.loading) {
            if (this.props.monsterData) {
                monsters = (this.props.monsterData.map(data => (
                    <MonsterCard key={data.id} dataInfo={data.info} dataStats={data.stats} dataLife={data.lifeAndMagic} />
                ))
                )
            }
        }
        return monsters;
    }
}



const mapStateToProps = (state) => {
    return {
        monsterData: state.monsterFetcher.monsterData,
        loading: state.monsterFetcher.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchMonster: () => dispatch(actions.monsterFetchData())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MonsterDisplay, axios));