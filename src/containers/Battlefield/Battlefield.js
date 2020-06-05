import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import RolCard from '../../components/RolCard/RolCard';
import MonsterCard from '../../components/MonsterCard/MonsterCard';
import { Button } from '@material-ui/core';
import { updateObject } from '../../shared/utility';
class Battlefield extends Component {

    team = {
        name: null,
        id: [],
    }
    participant = {
        stats: null,
        type: null,
        id: null,
        action: null,
        vit: null,
        isMonster: null
    };
    state = {
        participants: [],
        isBattleActive: false,
        turns: [],
        turn: "",
        teams: [
            {
                name: 'team1',
                pjIds: [],
            },
            {
                name: 'team2',
                pjIds: [],
            }
        ]
    }


    componentDidMount() {
        this.props.onFetchMonster();
        this.props.onFetchPj();
    }


    checkWinner = () => {
        if (this.state.vitMonster <= 0) {
            this.setState({
                ...this.state,
                active: false,
                winner: "PJ",
                looser: "MONSTER"
            }, () => {
                console.log("PJ WINS");
                console.log(this.state);
            });
        } if (this.state.vitPj <= 0) {
            this.setState({
                ...this.state,
                active: false,
                winner: "MONSTER",
                looser: "PJ"
            }, () => {
                console.log("MONSTER WINS");
                console.log(this.state);
            });
        }
    }

    attack = () => {
        console.log('ataque de ' + this.state.turn)
        let totalDamage = 0;
        if (this.state.pjTurn) {
            totalDamage = (this.state.pj.stats.Fuerza - this.state.monster.stats.Resistencia) - 1;
            totalDamage <= 0 ? totalDamage = 0 : totalDamage = totalDamage;
            this.setState({
                ...this.state,
                vitMonster: this.state.vitMonster - totalDamage,
                pjTurn: !this.state.pjTurn,
                monsterTurn: !this.state.monsterTurn,
                turn: this.state.monster.info.name
            }, () => {
                console.log("Total damage: ", +totalDamage);
                console.log("Vida restante de:", this.state.turn, this.state.vitMonster);
                console.log("Turno de:", this.state.turn);
                this.checkWinner();
            })

        } else {
            totalDamage = (this.state.monster.stats.Fuerza - this.state.pj.stats.Resistencia) - 1;
            totalDamage <= 0 ? totalDamage = 0 : totalDamage = totalDamage;
            this.setState({
                ...this.state,
                vitPj: this.state.vitPj - totalDamage,
                pjTurn: !this.state.pjTurn,
                monsterTurn: !this.state.monsterTurn,
                turn: this.state.pj.info.name
            }, () => {
                console.log("Total damage: ", +totalDamage);
                console.log("Vida restante de:", this.state.turn, this.state.vitPj);
                console.log("Turno de:", this.state.turn);
                this.checkWinner();
            })
        }
    }

    def = () => {
        console.log('defensa de ' + this.state.turn)
        if (this.state.pjTurn) {
            this.setState({
                ...this.state,
                pj: {
                    ...this.state.pj,
                    stats: {
                        ...this.state.pj.stats,
                        Resistencia: this.state.pj.stats.Resistencia + 8
                    }

                },
                pjTurn: !this.state.pjTurn,
                monsterTurn: !this.state.monsterTurn,
                turn: this.state.monster.info.name,
                pfDeffending: true,

            })
        } if (this.state.monsterTurn) {
            this.setState({
                ...this.state,
                monster: {
                    ...this.state.monster,
                    stats: {
                        ...this.state.monster.stats,
                        Resistencia: this.state.monster.stats.Resistencia + 8
                    }

                },
                pjTurn: !this.state.pjTurn,
                monsterTurn: !this.state.monsterTurn,
                turn: this.state.pj.info.name,
                monsterDeffending: true
            })
        }
    }

    turn = (participant, action) => {
        console.log(action)
        switch (action) {
            case 'attack':
                return this.attack;
            case 'def':
                return this.def;
        }
    }


    /*
     turno => action=>¿gana?=> ? final batalla : siguiente turno     
    turnsDef = (participants) => {
            participants.map(participant => {
    
            });
    
            if (des1 >= des2) {
                this.setState({
                    ...this.setState,
                    pjTurn: !this.state.pjTurn,
                    turn: this.state.pj.info.name
                }, () => {
                    console.log("Turn: ", this.state.turn);
                });
            } else {
                this.setState({
                    ...this.setState,
                    monsterTurn: !this.state.monsterTurn,
                    turn: this.state.monster.info.name
                }, () => {
                    console.log("Turn: ", this.state.turn);
                });
            }
    
        } */
    whoStarts = (participants) => {
        let turnsCopy = [...this.state.turns];
        const turns = participants
            .sort((a, b) => (a.stats.stats.Destreza < b.stats.stats.Destreza) ? 1 : -1)
            .map(m => m.id);
        return turnsCopy.concat(turns);
    }

    Battle = () => {
        //who starts
        const turns = this.whoStarts(this.state.participants);
        this.setState({ ...this.setState, turns: turns, active: true }, () => {
            
            const player = this.state.participants.find(element => element.id === this.state.turns.value);
            console.log(this.state.turns.value);
        });
        //while there is not a winner/looser
        const playerIndex = this.state.participants.find(element => element.id === this.state.turns[1]);
        let turnsCopy = [...this.state.turns];
        let newTurns = turnsCopy[playerIndex];
        

        for (let i = 0; i < turns.length * 5; i++) {

            console.log(turns[i % turns.length])
        }


    }


    assingToTeam = (idP, teamName) => {
        const teamIndex = this.state.teams.findIndex(element => element.name == teamName);
        let teamsCopy = [...this.state.teams];
        let newPjId = teamsCopy[teamIndex].pjIds.concat(idP)
        teamsCopy[teamIndex] = { ...teamsCopy[teamIndex], pjIds: newPjId }
        return teamsCopy;
    }

    loadParticipant = (event, isMonster) => {
        let newParticipant;
        let list = isMonster ? this.props.monsterData : this.props.pjData;
        list.filter(f => f.id === event.target.value).map(data => {
            newParticipant = {
                stats: data,
                id: data.id,
                vit: data.lifeAndMagic.Vida,
                isMonster: isMonster,
            }
            const team = this.assingToTeam(data.id, isMonster ? 'team2' : 'team1');
            const joint = this.state.participants.concat(newParticipant);
            return this.setState({
                ...this.state,
                participants: joint,
                teams: team
            })
        })
    }

    render() {
        let participants = null;
        if (this.state.participants.length) {
            participants = this.state.participants.map((p) => {
                if (p.isMonster) {
                    return (
                        <MonsterCard
                            key={p.stats.id}
                            dataInfo={p.stats.info}
                            dataStats={p.stats.stats}
                            dataLife={p.stats.lifeAndMagic}
                        />
                    )
                } else {
                    return (
                        <RolCard
                            key={p.stats.id}
                            dataInfo={p.stats.info}
                            dataStats={p.stats.stats}
                            dataLife={p.stats.lifeAndMagic}
                        />
                    )
                }
            })
        }


        //TODO: CHECK USSING MATERIAL-UI COMPONENTS INSTEAD OF NORMAL ONES
        let data = <Spinner />;
        if (!this.props.loading) {
            if (this.props.pjData && this.props.monsterData) {
                data = (
                    <React.Fragment>
                        <select onChange={(event) => this.loadParticipant(event, false)} multiple label="Multiple select">
                            <option value={""}></option>
                            {this.props.pjData.map(d => {
                                return (
                                    <option key={d.id} value={d.id}>{d.info.name}</option>
                                )
                            })}
                        </select>
                        <select onChange={(event) => this.loadParticipant(event, true)} multiple label="Multiple select">
                            <option value={""}></option>
                            {this.props.monsterData.map(d => {
                                return (
                                    <option key={d.id} value={d.id}>{d.info.name}</option>
                                )
                            })}
                        </select>
                    </React.Fragment>
                )
            }

        }
        return (<div>

            <div>
                {data}
            </div>
            <div style={{ float: "left", width: "42%" }}>
                {participants}
            </div>
            <div style={{ float: "left", width: "50%" }}>

            </div>

            <div style={{ clear: "both" }}>
                <Button onClick={this.Battle}>Start Battle</Button>
            </div>

            {this.state.active ? <div> <Button onClick={() => this.turn('attack')}>Attack</Button> <Button onClick={() => this.turn('def')}>Defense</Button> </div> : null}

        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        pjData: state.pjFetcher.pjData,
        monsterData: state.monsterFetcher.monsterData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchMonster: () => dispatch(actions.monsterFetchData()),
        onFetchPj: () => dispatch(actions.pjFetchData())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Battlefield, axios));