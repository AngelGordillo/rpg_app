import React, { Component } from 'react';
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from 'rjsf-material-ui';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import * as actions from '../../store/actions/index';
import axios from '../../axios';
import { schema, uiOrder } from '../../shared/MonsterSchemaForm';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
const Form = withTheme(MuiTheme);
class MonsterGenerator extends Component {


    /*     closeModal = () => {
            this.setState({
                showModal: !this.props.success
            })
            this.props.history.replace('/');
        } */

    render() {
        const successRedirect = this.props.success ? <Redirect to='/' /> : null
        let form = (
            <Form schema={schema} onSubmit={this.props.onAddMonster} uiSchema={uiOrder} >
                <Button type="submit" className="button button--primary button--large">
                    Submit
          </Button>
            </Form>
        );
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
        monsterData: state.monsterGenerator.monster,
        loading: state.monsterGenerator.loading,
        success: state.monsterGenerator.success
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddMonster: (monsterData) => dispatch(actions.monsterGenerator(monsterData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MonsterGenerator, axios));
