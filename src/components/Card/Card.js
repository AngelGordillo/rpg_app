import React from 'react';

import imageCall from '../../assets/call.png';
import classes from './Card.module.css'
import { pjSchema } from '../../shared/PjSchemaForm';
import { monsterSchema } from '../../shared/MonsterSchemaForm';
const card = (props) => {
    let urlPicture = '';
    const dataInfo = [];

    for (let data in props.dataInfo) {
        if (props.playerData.isMonster) {
            console.log(data)
            if (data === 'uri') {
                urlPicture = props.dataInfo[data];
            } else {
                dataInfo.push({
                    name: data,
                    desc: props.dataInfo[data]
                })
            }

        } else {
            if (data === 'uri') {
                urlPicture = props.dataInfo[data];
            } else {
                dataInfo.push({
                    name: data,
                    desc: props.dataInfo[data]
                })
            }
        }

    }

    const dataStats = [];
    for (let data in props.dataStats) {
        dataStats.push({
            name: data,
            desc: props.dataStats[data],
        })
    }

    const dataLife = [];
    for (let data in props.dataLife) {
        dataLife.push({
            name: data,
            desc: props.dataLife[data],
        })
    }

    const dataInfoOutput = dataInfo.map((g, index) => {
        return g.name === 'name' ? <h1 className={classes.CardName}>{g.desc}</h1> : null
    })

    const dataStatsOutput = dataStats.map((g, index) => {
        return <tr key={g.key + index.toString()}>
            <th>{g.name}</th>
            <td>{g.desc}</td>
        </tr>
    })
    const dataLifeOutput = dataLife.map((g, index) => {
        return <React.Fragment key={g.key + index.toString()}> <p><span>{g.name}</span> <span>{g.desc}</span></p></React.Fragment>
    })
    return (
        <figure onClick={() => {
            props.onTargetPlayer(props.playerData.id)
        }}
            className={[classes.Card, classes['Card_' + props.type],classes[props.clickable]].join(' ')}>
            <div className={classes.CardImageContainer}>
                <img src={urlPicture} alt={urlPicture} className={classes.CardImage} />
            </div>

            <figcaption className={classes.CardCaption}>
                {dataInfoOutput}

                {/*       <h3 className={classes.card__type}>e
                    {{ type }}
                    </h3> */}

                <table className={classes.CardStats}>
                   {dataStats.map((g, index) =>  <tr key={g.key + index.toString()}> <th>{g.name}</th> <td>{g.desc}</td></tr>)}
                </table>

                {/*                     <div className={classes.card__abilities}>
                        <h4 className={classes.card__ability}>
                            <span className={classes.card__label}>Ability</span>
                            {{ ability1 }}
                        </h4>
                        <h4 className={classes.card__ability}>
                            <span className={classes.card__label}>Hidden Ability</span>
                            {{ ability2 }}
                        </h4>
                    </div> */}
            </figcaption>
        </figure>
    )

}

export default card;