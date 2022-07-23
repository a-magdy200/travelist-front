import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CountryListComponent from "../../components/Country/CountryListComponent";
import DisplayErrorsList from "../../components/DisplayErrors/DisplayErrorsList";
import Loader from "../../components/Loader";
import api from "../../config/api";
import { ICountryInterface } from "../../config/interfaces/ICountry.interface";
import { IResponseInterface } from "../../config/interfaces/IResponse.interface";

const CountryList = () => {
    const [countries, setCountries] = useState<ICountryInterface[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([]);
    const getCountries = async () => {
		toast.info("Getting Countries....");
		setErrors([]);
		setIsLoading(true);
		try {
			const response: IResponseInterface<ICountryInterface[]> = await api<
				ICountryInterface[]
			>({
				url: '/api/countries/show_all',
			})

			if (response.success) {
				if (response.data) {
					setCountries(response.data)
					toast.success("Getting Countries Successfully");
				}
			}
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || []);
			toast.error("An error has occurred");
		}
		setIsLoading(false);

	}
	useEffect(() => {
		getCountries()
	}, [])
	if (isLoading) {
		return <Loader/>
	  }
  return (
    <div>
      <h1>Countries</h1>
      {countries.length > 0 ? (
        countries.map((country, index) => (
          <CountryListComponent country={country} key={index} />
        ))
      ) : (
		<DisplayErrorsList errors={errors} />
		)}
    </div>
  );
}
export default CountryList