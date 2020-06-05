import React, { Component } from 'react';
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from 'rjsf-material-ui';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import * as actions from '../../store/actions/index';
import axios from '../../axios';
import { schema, uiOrder } from '../../shared/PjSchemaForm';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
const Form = withTheme(MuiTheme);
class PjGenerator extends Component {

    render() {
        const successRedirect = this.props.success ? <Redirect to='/' /> : null
        let form = (<Form schema={schema} onSubmit={this.props.onAddPj} uiSchema={uiOrder} >
            <Button type="submit" className="button button--primary button--large">
                Submit
          </Button>
        </Form>);
        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <Auxiliary>
                {successRedirect}
                {form}
            </Auxiliary>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        pjData: state.pjGenerator.pj,
        loading: state.pjGenerator.loading,
        success: state.pjGenerator.success
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddPj: (pjData) => dispatch(actions.pjGenerator(pjData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(PjGenerator, axios));
