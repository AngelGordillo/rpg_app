import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import RolCard from '../../components/RolCard/RolCard';

class PjDisplay extends Component {

    componentDidMount() {
        this.props.onFetchPj();
    }
    render() {
        let pjs = <Spinner />;
        if (!this.props.loading) {
            if (this.props.pjData) {
                pjs = (this.props.pjData.map(data => (
                    <RolCard key={data.id} dataInfo={data.info} dataStats={data.stats} dataLife={data.lifeAndMagic} />
                ))
                )
            }
        }
        return pjs;
    }
}



const mapStateToProps = (state) => {
    return {
        pjData: state.pjFetcher.pjData,
        loading: state.pjFetcher.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchPj: () => dispatch(actions.pjFetchData())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(PjDisplay, axios));