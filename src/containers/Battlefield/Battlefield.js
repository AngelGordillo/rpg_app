import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import axios from "../../axios";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import RolCard from "../../components/RolCard/RolCard";
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
    currentPlayer: "",
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

  clickListener = (e) => {
    console.log("Boom I clicked ", e.target);
  };

  componentDidMount() {
    this.props.onFetchMonster();
    this.props.onFetchPj();
    // document.addEventListener("click", this.clickListener);
  }

  checkWinner = () => {
    if (this.state.vitMonster <= 0) {
      this.setState(
        {
          ...this.state,
          active: false,
          winner: "PJ",
          looser: "MONSTER",
        },
        () => {
          console.log("PJ WINS");
          console.log(this.state);
        }
      );
    }
    if (this.state.vitPj <= 0) {
      this.setState(
        {
          ...this.state,
          active: false,
          winner: "MONSTER",
          looser: "PJ",
        },
        () => {
          console.log("MONSTER WINS");
          console.log(this.state);
        }
      );
    }
  };

  addToLog = (msg) => {
    console.log("Adding to the batter log", msg);
    this.setState((prevState) => ({
      ...prevState,
      battleLog: [...prevState.battleLog, msg],
    }));
  };

  getPlayer = (id) =>
    this.state.participants.find((element) => element.id === id);

  getTarget = (id,e) => {
    console.log("Targetted!", e.target.value);
    if (this.state.targetting) {
      this.attack(this.state.currentPlayer, id);
      this.setState({ ...this.state, targetting: !this.state.targetting });
      this.addToLog(`[Disabled targetting]`);
    }
  };

  targetting = async () => {
    this.addToLog(`[Enter targetting mode]`);
    this.setState({ ...this.state, targetting: !this.state.targetting });

    // this.setState({ ...this.state, targetting: !this.state.targetting },(event)=>{
    //   this.getTarget(event);
    // });
    // change text on screen to indicate choose your target....
    // click target -> event calls getTarget....
    // using that event find out which participant is the target....
    // then call the attack with currentplayer, targetplayer
  };

  attack = async (currentPlayer, targetPlayer) => {
    console.log("ataque de " + this.state.currentPlayer);
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
      console.log(currentPlayerInfo);
      console.log(targetPlayerInfo);
      //damage calculation
      totalDamage =
        currentPlayerInfo.stats.stats.Fuerza -
        targetPlayerInfo.stats.stats.Resistencia -
        1;
      this.addToLog(
        `[Damage Calc] ${currentPlayerName}: ${currentPlayerInfo.stats.stats.Fuerza}. ${targetPlayerName}: ${targetPlayerInfo.stats.stats.Resistencia}.`
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
      console.log(newArrayParticipants);
      this.addToLog(
        `[Final Health Left] ${targetPlayerName}: ${targetPlayerInfo.vit} `
      );

      this.setState((prevState) => ({
        ...prevState.state,
        participants: newArrayParticipants,
      }));
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

  turn = (participantMakingAction, action, targetParticipant, { event }) => {
    console.log(
      "Triggered action: ",
      participantMakingAction,
      action,
      targetParticipant,
      event
    );
    switch (action) {
      case "attack":
        return this.attack(participantMakingAction, targetParticipant);
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
        active: true,
        currentPlayer: turnOrder[0],
      },
      () => {
        // Find the player name in the correct order
        this.state.turnOrder.forEach((playerId, index) => {
          const player = this.state.participants.find(
            (element) => element.id === playerId
          );
          console.log(`Player is ${index}`, player.stats.info.name);
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
            <MonsterCard
              clicked={(e) => this.getTarget(e, p.id)}
              key={p.stats.id}
              dataInfo={p.stats.info}
              dataStats={p.stats.stats}
              dataLife={p.stats.lifeAndMagic}
            />
          );
        } else {
          return (
            <RolCard
              clicked={(e) => this.getTarget(e, p.id)}
              key={p.stats.id}
              dataInfo={p.stats.info}
              dataStats={p.stats.stats}
              dataLife={p.stats.lifeAndMagic}
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
        <div style={{ float: "left", width: "42%" }}>{participants}</div>

        <div style={{ width: "45%", float: "left", padding: "50px" }}>
          <Button onClick={this.Battle}>Start Battle</Button>
          {this.state.active ? (
            <div>
              {" "}
              <Button
                onClick={this.targetting}
                //   this.turn(currentPlayer, "attack", currentPlayer, event)
              >
                Attack
              </Button>{" "}
              <Button onClick={() => this.turn("def")}>Defense</Button>{" "}
            </div>
          ) : null}
          {this.state.active && currentPlayer && (
            <div>Playing as: {currentPlayerName}</div>
          )}

          {this.state.active && (
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
