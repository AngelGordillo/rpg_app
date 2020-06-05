import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import RolCard from '../../components/RolCard/RolCard';

class RolBuilder extends Component {

/*     componentDidMount() {
        this.props.onFetchPj();
    } */
    render() {
       
        return (<div>
            AQUI PONDREMOS ALGO DE CONTENIDO (LOG DE BATALLA, ULTIMOS RESULTADOS, SCOREDBOARD...)
        </div>);
    }
}



/* const mapStateToProps = (state) => {
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
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(RolBuilder, axios));*/
export default RolBuilder;