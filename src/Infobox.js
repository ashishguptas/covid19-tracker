import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import './Infobox.css'

function Infobox({ title, cases, total, isRed, isRecover, active, ...props }) {
    return (
            <Card onClick={props.onClick} className={`Infobox ${active && 'infobox_select'} ${isRed && 'infobox_red'} ${isRecover && 'infobox_green'}`} >
                <CardContent>
                    <Typography className="infobox_title" color="textSecondary">
                        {title}
                    </Typography>
                    <h2 className={`infobox_cases ${!isRed && 'text_green'}`}>{cases}</h2>
                    <Typography className="infobox_total" color="textSecondary">
                        {total} Total
                    </Typography>
                </CardContent>
            </Card>
    )
}

export default Infobox
