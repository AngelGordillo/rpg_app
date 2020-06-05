import React from 'react';

import image from '../../assets/investigador.jpg';
import imageCall from '../../assets/call.png';
import classes from './RolCard.module.css'
import { schema } from '../../shared/PjSchemaForm';
const rolCard = (props) => {
    let urlPicture = '';
    const pjDataInfo = [];

    for (let data in props.dataInfo) {
        if (schema.properties[data].title === 'Link') {
            urlPicture = props.dataInfo[data];
        } else {
            pjDataInfo.push({
                name: schema.properties[data].title,
                desc: props.dataInfo[data]
            })
        }

    }

    const pjDataStats = [];
    for (let data in props.dataStats) {
        pjDataStats.push({
            name: data,
            desc: props.dataStats[data],
        })
    }

    const pjDataLife = [];
    for (let data in props.dataLife) {
        pjDataLife.push({
            name: data,
            desc: props.dataLife[data],
        })
    }

    const dataInfoOutput = pjDataInfo.map((g, index) => {
        return <React.Fragment key={g.key + index.toString()}>
            {g.name !== 'Link' ? <p>
                <span>{g.name} </span>
                <span>{g.desc}</span>
            </p> : null}

        </React.Fragment>
    })

    const dataStatsOutput = pjDataStats.map((g, index) => {
        return <React.Fragment key={g.key + index.toString()}> <p><span>{g.name}</span> <span>{g.desc}</span></p></React.Fragment>
    })
    const dataLifeOutput = pjDataLife.map((g, index) => {
        return <React.Fragment key={g.key + index.toString()}> <p><span>{g.name}</span> <span>{g.desc}</span></p></React.Fragment>
    })
    return (
        <div className={classes.RolCard}
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

export default rolCard;