import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import axios from "../../axios";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import RolCard from "../../components/RolCard/RolCard";
import Card from "../../components/Card/Card";
import MonsterCard from "../../components/MonsterCard/MonsterCard";
import { Button } from "@material-ui/core";
import { updateObject } from "../../shared/utility";

class Battlefield extends Component {
  team = {
    name: null,
    id: [],
  };
  participant = {
    stats: null,
    type: null,
    id: null,
    action: null,
    vit: null,
    maxVit: null,
    isMonster: null,
  };
  state = {
    participants: [],
    battleLog: [],
    isBattleActive: false,
    targetting: false,
    turnOrder: [],
    clickable: false,
    battleResult: {
      winner: null,
      looser: null
    },
    currentPlayer: "",
    currentAction: null,
    teams: [
      {
        name: "team1",
        pjIds: [],
      },
      {
        name: "team2",
        pjIds: [],
      },
    ],
  };



  componentDidMount() {
    this.props.onFetchMonster();
    this.props.onFetchPj();
  }

  checkCurrentVit = () => {
    this.state.teams.map(team => {
      //console.log('this.state.participants',this.state.participants)
      this.state.participants
        .map((p) => {
          if (p.vit <= 0) {
            //deleting from the orderTurn array
            const indexOrder = this.state.turnOrder.indexOf(p.id);
            const newTurnOrder = [...this.state.turnOrder];
            if (indexOrder > -1) {
              newTurnOrder.splice(indexOrder, 1)
            }
            //deleting element from the team 
            const newTeams = [...this.state.teams];
            const indexTeams = team.pjIds.indexOf(p.id);

            if (indexTeams > -1) {
              newTeams.map(m => {
                m.pjIds.splice(indexTeams, 1)
              })
            }
            this.setState({
              ...this.state,
              turnOrder: newTurnOrder,
              teams: newTeams
            });
          }
        })
    })
  }
  checkWinner = () => {
    this.state.teams.map(team => {
      //console.log('this.state.participants',this.state.participants)
      if (!team.pjIds.length) {
        this.setState(
          {
            ...this.state,
            isBattleActive: false,
            battleResult: {
              ...this.state.battleResult,
              winner: "PJ",
              looser: "targetPlayer",
            }
          },
          () => {
            this.addToLog(`[SOMEONE WON]`);
          }
        );
      }
    })
  };

  addToLog = (msg) => {
    this.setState((prevState) => ({
      ...prevState,
      battleLog: [...prevState.battleLog, msg],
    }));
  };

  getPlayer = (id) =>
    this.state.participants.find((element) => element.id === id);

  /*   applyAction = (senderId, targetId) => {
      const action = this.state.currentAction;
      logging(sendserId, targetId);
      action.doAction(targetId);
    } */

  getTarget = (id) => {
    if (this.state.targetting) {
      this.attack(this.state.currentPlayer, id)
      //this.applyAction(state.currentPlayer, id);
      this.setState({ ...this.state, targetting: false, clickable: false });
      this.addToLog(`[Disabled targetting]`);
    }
  };



  /*   getTargetAll = (teamName) => {
      const team = getTeam(teamName);
      foreach(string id: team.pjIds){
        applyAction(id, action);
      }
        this.setState({ ...this.state, targetting: !this.state.targetting });
        this.addToLog(`[Disabled targetting]`);
    }; */

  targetting = async () => {
    this.addToLog(`[Enter targetting mode]`);
    this.setState({ ...this.state, targetting: !this.state.targetting, clickable: !this.state.clickable, targettingAll: !this.state.targettingAll });

    // this.setState({ ...this.state, targetting: !this.state.targetting },(event)=>{
    //   this.getTarget(event);
    // });
    // change text on screen to indicate choose your target....
    // click target -> event calls getTarget....
    // using that event find out which participant is the target....
    // then call the attack with currentplayer, targetplayer
  };
  targettingAll = async () => {
    this.addToLog(`[Enter targetting mode]`);
    this.setState({ ...this.state, targettingAll: !this.state.targettingAll });

    // this.setState({ ...this.state, targetting: !this.state.targetting },(event)=>{
    //   this.getTarget(event);
    // });
    // change text on screen to indicate choose your target....
    // click target -> event calls getTarget....
    // using that event find out which participant is the target....
    // then call the attack with currentplayer, targetplayer
  };
  getNextParticipant = () => {
    const currentIndex = this.state.turnOrder.indexOf(this.state.currentPlayer);
    const nextIndex = (currentIndex + 1) % this.state.turnOrder.length;
    const nextPlayer = this.state.turnOrder[nextIndex];
    return nextPlayer;
  };

  attack = async (currentPlayer, targetPlayer) => {
    let totalDamage = 0;
    if (this.state.currentPlayer) {
      //get currentPlayer
      await this.targetting();
      const currentPlayerInfo = this.getPlayer(currentPlayer);
      //get tarjetPlayer
      const targetPlayerInfo = this.getPlayer(targetPlayer);
      const { name: targetPlayerName } = targetPlayerInfo.stats.info;
      const { name: currentPlayerName } = currentPlayerInfo.stats.info;
      this.addToLog(
        `[Attack start] ${currentPlayerInfo.stats.info.name} is attacking ${targetPlayerInfo.stats.info.name}`
      );
      // damage calculation
      totalDamage =
        currentPlayerInfo.stats.stats.Fuerza -
        targetPlayerInfo.stats.stats.Resistencia -
        1;
      this.addToLog(
        ` [Damage Calc] ${currentPlayerName}:Str= ${currentPlayerInfo.stats.stats.Fuerza} to ${targetPlayerName}: ${targetPlayerInfo.stats.stats.Resistencia}.`
      );
      totalDamage <= 0 ? (totalDamage = 0) : (totalDamage = totalDamage);
      this.addToLog(`[Total Damage] ${totalDamage} to ${targetPlayerName}`);
      //   take damage from targer player
      targetPlayerInfo.vit = targetPlayerInfo.vit - totalDamage;
      const tt = this.state.participants.findIndex(
        (p) => p.id === targetPlayer
      );
      let newArrayParticipants = [...this.state.participants];
      newArrayParticipants[tt] = targetPlayerInfo;
      this.addToLog(
        `[Final Health Left] ${targetPlayerName}: ${targetPlayerInfo.vit} `
      );

      /*
       * checking current vit of each player 
       * removing the ones which do not have any vit left
       */
      this.checkCurrentVit();

      const nextPlayer = this.getNextParticipant();
      this.setState((prevState) => ({
        ...prevState.state,
        participants: newArrayParticipants,
        currentPlayer: nextPlayer

      }), () => {
        this.checkWinner(targetPlayerInfo);
        this.addToLog(
          `[NextTurn] ${nextPlayer}`
        );
      });

    }
  };

  def = () => {
    console.log("defensa de " + this.state.turn);
    if (this.state.pjTurn) {
      this.setState({
        ...this.state,
        pj: {
          ...this.state.pj,
          stats: {
            ...this.state.pj.stats,
            Resistencia: this.state.pj.stats.Resistencia + 8,
          },
        },
        pjTurn: !this.state.pjTurn,
        monsterTurn: !this.state.monsterTurn,
        turn: this.state.monster.info.name,
        pfDeffending: true,
      });
    }
    if (this.state.monsterTurn) {
      this.setState({
        ...this.state,
        monster: {
          ...this.state.monster,
          stats: {
            ...this.state.monster.stats,
            Resistencia: this.state.monster.stats.Resistencia + 8,
          },
        },
        pjTurn: !this.state.pjTurn,
        monsterTurn: !this.state.monsterTurn,
        turn: this.state.pj.info.name,
        monsterDeffending: true,
      });
    }
  };

  invokeAction = (action) => {
    switch (action) {
      case "attack":
        return this.targetting;
      case "special":
        return this.targettingAll;
      case "magic":
        return this.this.targetting;
      case "def":
        return this.def;
    }
  };

  whoStarts = (participants) => {
    let turnOrderCopy = [...this.state.turnOrder];
    const turnOrder = participants
      .sort((a, b) =>
        a.stats.stats.Destreza < b.stats.stats.Destreza ? 1 : -1
      )
      .map((m) => m.id);
    return turnOrderCopy.concat(turnOrder);
  };

  Battle = () => {
    //who starts
    const turnOrder = this.whoStarts(this.state.participants);
    this.setState(
      {
        ...this.setState,
        turnOrder: turnOrder,
        isBattleActive: true,
        currentPlayer: turnOrder[0],
      },
      () => {
        // Find the player name in the correct order
        this.state.turnOrder.forEach((playerId, index) => {
          const player = this.state.participants.find(
            (element) => element.id === playerId
          );
        });
      }
    );
    //while there is not a winner/looser
    /*     const playerIndex = this.state.participants.find(element => element.id === this.state.turns[1]);
        let turnsCopy = [...this.state.turns];
        let newTurns = turnsCopy[playerIndex]; */
  };

  assingToTeam = (idP, teamName) => {
    const teamIndex = this.state.teams.findIndex(
      (element) => element.name == teamName
    );
    let teamsCopy = [...this.state.teams];
    let newPjId = teamsCopy[teamIndex].pjIds.concat(idP);
    teamsCopy[teamIndex] = { ...teamsCopy[teamIndex], pjIds: newPjId };
    return teamsCopy;
  };

  loadParticipant = (event, isMonster) => {
    let newParticipant;
    let list = isMonster ? this.props.monsterData : this.props.pjData;
    list
      .filter((f) => f.id === event.target.value)
      .map((data) => {
        newParticipant = {
          stats: data,
          id: data.id,
          vit: data.lifeAndMagic.Vida,
          maxVit: data.lifeAndMagic.Vida,
          isMonster: isMonster,
        };
        const team = this.assingToTeam(data.id, isMonster ? "team2" : "team1");
        const joint = this.state.participants.concat(newParticipant);
        return this.setState({
          ...this.state,
          participants: joint,
          teams: team,
        });
      });
  };

  render() {
    let participants = null;
    const { currentPlayer } = this.state;

    // const RolCard = React.forwardRef((props, ref) => (
    //   this.state.participants.map((p) => {
    //   return <RolCard
    //     ref={ref}
    //     key={p.stats.id}
    //     dataInfo={p.stats.info}
    //     dataStats={p.stats.stats}
    //     dataLife={p.stats.lifeAndMagic}
    //   />})
    // ));

    // You can now get a ref directly to the DOM button:
    // const ref = React.createRef();

    if (this.state.participants.length) {
      participants = this.state.participants.map((p) => {
        if (p.isMonster) {
          return (
            <Card
              clickable={!(this.state.clickable && p.vit > 0) ? '' : 'Clickable'}
              type={p.stats.info.tipo}
              onTargetPlayer={this.getTarget}
              key={p.stats.id}
              dataInfo={p.stats.info}
              dataStats={p.stats.stats}
              dataLife={p.stats.lifeAndMagic}
              playerData={p}
            />
          );
        } else {
          return (
            <Card
              clickable={!(this.state.clickable && p.vit > 0) ? '' : 'Clickable'}
              type={p.stats.info.tipo}
              onTargetPlayer={this.getTarget}
              key={p.stats.id}
              dataInfo={p.stats.info}
              dataStats={p.stats.stats}
              dataLife={p.stats.lifeAndMagic}
              playerData={p}
            />
          );
        }
      });
    }

    const currentPlayerName = currentPlayer
      ? this.state.participants.find((p) => p.id === currentPlayer).stats.info
        .name
      : "";

    //TODO: CHECK USSING MATERIAL-UI COMPONENTS INSTEAD OF NORMAL ONES
    let data = <Spinner />;
    if (!this.props.loading) {
      if (this.props.pjData && this.props.monsterData) {
        data = (
          <React.Fragment>
            <select
              onChange={(event) => this.loadParticipant(event, false)}
              multiple
              label="Multiple select"
            >
              <option value={""}></option>
              {this.props.pjData.map((d) => {
                return (
                  <option key={d.id} value={d.id}>
                    {d.info.name}
                  </option>
                );
              })}
            </select>
            <select
              onChange={(event) => this.loadParticipant(event, true)}
              multiple
              label="Multiple select"
            >
              <option value={""}></option>
              {this.props.monsterData.map((d) => {
                return (
                  <option key={d.id} value={d.id}>
                    {d.info.name}
                  </option>
                );
              })}
            </select>
          </React.Fragment>
        );
      }
    }
    return (
      <div>
        <div>{data}</div>
        <div style={{ float: "left", width: "42%" }}>{participants} </div>
{/*         {this.state.targettingAll ? <div onClick={this.getTargetAll}><h1>All</h1></div> : null} */}
        <div style={{ width: "45%", float: "left", padding: "50px" }}>
          <Button onClick={this.Battle}>Start Battle</Button>
          {this.state.isBattleActive ? (
            <div>
              {" "}
              <Button
                //onClick={this.targetting}
                onClick={this.invokeAction("attack")}
              >
                Attack
              </Button>
              <Button
                //onClick={this.targetting}
                onClick={this.invokeAction("special")}
              >
                Special
              </Button>
              {" "}
              <Button onClick={() => this.turn("def")}>Defense</Button>{" "}
            </div>
          ) : null}
          {this.state.isBattleActive && currentPlayer && (
            <div>Playing as: {currentPlayerName}</div>
          )}

          {this.state.isBattleActive && (
            <pre style={{ padding: "0.5rem", background: "#F5F5F5" }}>
              {this.state.battleLog.join("\n\n")}
            </pre>
          )}
          {this.state.targetting && <p>Choose your target</p>}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pjData: state.pjFetcher.pjData,
    monsterData: state.monsterFetcher.monsterData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMonster: () => dispatch(actions.monsterFetchData()),
    onFetchPj: () => dispatch(actions.pjFetchData()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Battlefield, axios));
