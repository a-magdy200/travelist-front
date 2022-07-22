import { useEffect, useState } from "react";
import CountryListComponent from "../../components/Country/CountryListComponent";
import api from "../../config/api";
import { ICountryInterface } from "../../config/interfaces/ICountry.interface";
import { IResponseInterface } from "../../config/interfaces/IResponse.interface";

const CountryList = () => {
    const [countries, setCountries] = useState<ICountryInterface[]>([]);

    const getCountries = async () => {
		try {
			const response: IResponseInterface<ICountryInterface[]> = await api<
				ICountryInterface[]
			>({
				url: '/api/countries/show_all',
			})

			if (response.success) {
				if (response.data) {
					setCountries(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getCountries()
	}, [])

  return (
    <div>
      <h1>Countries</h1>
      {countries.length > 0 ? (
        countries.map((country, index) => (
          <CountryListComponent country={country} key={index} />
        ))
      ) : (
        <div>No countries yet</div>
      )}
    </div>
  );
}
export default CountryList