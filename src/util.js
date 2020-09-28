import React from 'react'
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

export const casesTypeColor = {
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204, 16, 52)",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 2000,
    },
}

export const sortData = (data) => {
    const sortedData = [...data]
    return sortedData.sort((a, b) => a.cases < b.cases ? 1 : -1)
}

export const printState = (stat) => stat ? `+${numeral(stat).format("0.0a")}` : "+0";


export const showDataOnMap = (data, casesType = "cases") => (

    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColor[casesType].hex}
            fillColor={casesTypeColor[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColor[casesType].multiplier
            }
        >
            <Popup>
                <div className="map_info">
                    <div className="flag_info" style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                    <div className="country_nameinfo">{country.country}</div>
                    <div className="country_casesinfo"><span>Cases:</span> {numeral(country.cases).format("0,0")}</div>
                    <div className="country_recoveredinfo"><span>Recovered:</span> {numeral(country.recovered).format("0,0")}</div>
                    <div className="country_deathinfo"><span>Deaths:</span> {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))

)