import React from 'react';

import imageCall from '../../assets/call.png';
import classes from './MonsterCard.module.css'
import { schema } from '../../shared/MonsterSchemaForm';
const monsterCard = (props) => {
    let urlPicture = '';
    const monsterDataInfo = [];

    for (let data in props.dataInfo) {
        if (schema.properties[data].title === 'Link') {
            urlPicture = props.dataInfo[data];
        } else {
            monsterDataInfo.push({
                name: schema.properties[data].title,
                desc: props.dataInfo[data]
            })
        }

    }

    const monsterDataStats = [];
    for (let data in props.dataStats) {
        monsterDataStats.push({
            name: data,
            desc: props.dataStats[data],
        })
    }

    const monsterDataLife = [];
    for (let data in props.dataLife) {
        monsterDataLife.push({
            name: data,
            desc: props.dataLife[data],
        })
    }

    const dataInfoOutput = monsterDataInfo.map((g, index) => {
        return <React.Fragment key={g.key + index.toString()}>
            {g.name !== 'Link' ? <p>
                <span>{g.name} </span>
                <span>{g.desc}</span>
            </p> : null}

        </React.Fragment>
    })

    const dataStatsOutput = monsterDataStats.map((g, index) => {
        return <React.Fragment key={g.key + index.toString()}> <p><span>{g.name}</span> <span>{g.desc}</span></p></React.Fragment>
    })
    const dataLifeOutput = monsterDataLife.map((g, index) => {
        return <React.Fragment key={g.key + index.toString()}> <p><span>{g.name}</span> <span>{g.desc}</span></p></React.Fragment>
    })
    return (
        <div className={classes.MonsterCard}
        onClick={props.clicked}>
            <div className={classes.Section}>
                <div className={classes.Logo}>
                    <img src={imageCall} />
                </div>
                <div className={classes.Stats}>
                    <h2><span>CARACTERISTICAS</span></h2>
                    {dataStatsOutput}
                </div>

            </div>

            <div className={`${classes.Section} ${classes.BorderRight}`}>
                <div className={classes.Info}>
                    <div className={classes.InfoData}>
                        {dataInfoOutput}
                    </div>
                </div>
                <div className={classes.Life}>
                    <h2><span>VIDA Y MAGIA</span></h2>
                    {dataLifeOutput}
                </div>
            </div>

            <div className={classes.Section}>
                <div className={classes.Picture}>
                    <img src={urlPicture} />
                </div>
            </div>

        </div >


    )

}

export default monsterCard;