import React, { useEffect, useState } from 'react';
import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import './App.css';
import Infobox from './Infobox';
import Map from './Map';
import Table from './Table';
import { sortData, printState } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

// {Ashish Lalluram Gupta}
// API Link: https://disease.sh/v3/covid-19/countries

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 77 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');


  const onCountryChange = async (e) => {
    const conutryCode = await e.target.value;
    // console.log(conutryCode)

    const apiUrl = conutryCode === 'Worldwide' ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${conutryCode}`;

    await fetch(apiUrl)
      .then((response => response.json()))
      .then((data => {
        setCountry(conutryCode)
        setCountryInfo(data)
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4)
      }))
  }
  // console.log(countryInfo)

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then((data) => {
        setCountryInfo(data)

      })
  }, [])
  // console.log(tableData)

  useEffect(() => {
    const getCounriesdata = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const conutries = data.map((country) => (
            {
              name: country.country,
              flag: country.countryInfo.flag,
              value: country.countryInfo.iso2
            }
          ))
          const sortedData = sortData(data)
          setTableData(sortedData)
          setCountries(conutries)
          setMapCountries(data)
        }).catch((error) => console.log(error))
    }
    getCounriesdata()
  }, [])

  return (
    <>
      <div className="app">
        <div className="app_left">
          <div className="app_header">
            <h1>COVID 19 TRACKER</h1>
            <FormControl className="app_dropdown">
              <Select variant="outlined" onChange={onCountryChange} value={country}>
                <MenuItem value='Worldwide'>Worldwide</MenuItem>
                {
                  countries.map(((country, index) =>
                    <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className="app_stats">
            <Infobox isRed active={casesType === 'cases'} onClick={e => setCasesType('cases')} title="Coronavirus Cases" cases={printState(countryInfo.todayCases)} total={printState(countryInfo.cases)} />
            <Infobox isRecover active={casesType === 'recovered'} onClick={e => setCasesType('recovered')} title="Recovery" cases={printState(countryInfo.todayRecovered)} total={printState(countryInfo.recovered)} />
            <Infobox isRed active={casesType === 'deaths'} onClick={e => setCasesType('deaths')} title="Deaths" cases={printState(countryInfo.todayDeaths)} total={printState(countryInfo.deaths)} />
          </div>
          <Map
            casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom} />
        </div>
        <Card className="app_right">
          <CardContent>
            <h3>Live Case by Country</h3>
            <Table countries={tableData} />
            <h3 className="worldtite">Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default App;
