import React from "react";
import CountryFlag from "react-native-country-flag";

const Flag = ({country}) =>{
    switch(country) {
        case "Argentina":
            return <CountryFlag isoCode="ar" size={20} />
        case "Australia":
            return <CountryFlag isoCode= "au" size={20}  />
        case "Austria":
            return <CountryFlag isoCode= "at" size={20}  />
        case "Azerbaijan":
            return <CountryFlag isoCode="az" size={20}  />
        case "Bahrain":
            return <CountryFlag isoCode="bh" size={20}  />
        case "Belgium":
            return <CountryFlag isoCode="be" size={20}  />
        case "Brazil":
            return <CountryFlag isoCode="br" size={20}  />
        case "Canada":
            return <CountryFlag isoCode="ca" size={20}  />
        case "China":
            return <CountryFlag isoCode="cn" size={20}  />
        case "France":
            return <CountryFlag isoCode="fr" size={20}  />
        case "Germany":
            return <CountryFlag isoCode="de" size={20}  />
        case "Hungary":
            return <CountryFlag isoCode="hu" size={20}  />
        case "India":
            return <CountryFlag isoCode="in" size={20}  />
        case "Italy":
            return <CountryFlag isoCode="it" size={20}  />
        case "Japan":
            return <CountryFlag isoCode="jp" size={20}  />
        case "Korea":
            return <CountryFlag isoCode="kr" size={20}  />
        case "Malaysia":
            return <CountryFlag isoCode="my" size={20}  />
        case "Mexico":
            return <CountryFlag isoCode="mx" size={20}  />
        case "Monaco":
            return <CountryFlag isoCode="mc" size={20}  />
        case "Morocco":
            return <CountryFlag isoCode="ma" size={20}  />
        case "Netherlands":
            return <CountryFlag isoCode="nl" size={20}  />
        case "Portugal":
            return <CountryFlag isoCode="pt" size={20}  />
        case "Qatar":
            return <CountryFlag isoCode="qa" size={20}  />
        case "Russia":
            return <CountryFlag isoCode="ru" size={20}  />
        case "Saudi Arabia":
            return <CountryFlag isoCode="sa" size={20}  />
        case "Singapore":
            return <CountryFlag isoCode="sg" size={20}  />
        case "South Africa":
            return <CountryFlag isoCode="za" size={20}  />
        case "Spain":
            return <CountryFlag isoCode="es" size={20}  />
        case "Sweden":
            return <CountryFlag isoCode="se" size={20}  />
        case "Switzerland":
            return <CountryFlag isoCode="ch" size={20}  />
        case "Turkey":
            return <CountryFlag isoCode="tr" size={20}  />
        case "UAE":
            return <CountryFlag isoCode="ae" size={20}  />
        case "UK":
            return <CountryFlag isoCode="gb" size={20}  />
        case "United States":
            return <CountryFlag isoCode="us" size={20}  />
        case "USA":
            return <CountryFlag isoCode="us" size={20}  />
        case "Vietnam":
            return <CountryFlag isoCode="vn" size={20}  />
        default:
            return <CountryFlag isoCode="car" size={20} />
      }

}

export default Flag;