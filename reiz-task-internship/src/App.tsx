import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles/app.module.scss';


// Single country interface
interface Country {
  area: number,
  independent: boolean,
  name: string,
  region: string,
}

// Multiple countries type
type Countries = Country[];

// Order type
type OrderType = "asc" | "desc";

const App = () => {

  const [countries, setCountries] = useState<Countries>([]);
  const [filteredCountries, setFilteredCountries] = useState<Countries>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<OrderType>("asc");
  const [filterArea, setFilterArea] = useState<boolean>(false);

  // SORTING

  const sortCountries = (sortOrder: OrderType) => {
    const sortedCountries = [...countries].sort((a, b) => {
      if(sortOrder === 'asc') {
        return (a.name.localeCompare(b.name));
      } else {
        return (b.name.localeCompare(a.name));
      }
    });

    setFilteredCountries(sortedCountries);
  };

  const toggleOrderSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    sortCountries(newOrder);
  };


  // FILTERING BY AREA

  const smallerThenLithuania = () => {
    const countryName = "LitHuania";
    const findLithuania = countries.find((country: Country) => country.name.toLowerCase() === countryName.toLowerCase());
    const filter = countries.filter((country) => {
      if(findLithuania) {
        return country.area < findLithuania.area;
      }
    });
        setFilteredCountries(filter);
  };

  const toggleAreaFilter = () => {
    setFilterArea(!filterArea);

    if(!filterArea) {
      return smallerThenLithuania();
    } else {
      setFilteredCountries(countries);
    }
  };

  useEffect(() => {
    setLoading(true);

      const fetchCountries = async () => {

        try {
          const result = await axios.get<Countries>('https://restcountries.com/v2/all?fields=name,region,area');
          setCountries(result.data);
          setFilteredCountries(result.data);

        } catch (error) {
          console.error('Something went wrong! Failed to fetch data');
        } finally {
          setLoading(false);
        }
      };

      fetchCountries();
  }, []);

  return (
    <div className={styles.container}>
      <h1>List of countries:</h1>
      <div>
      {/* Sorting button */}
      <button onClick={toggleOrderSort}>
        {sortOrder === 'asc' ? 'Z - A' : 'A - Z'}
      </button>
      {/* Filtering button */}
      <button onClick={toggleAreaFilter}>{filterArea === true ? "All Countries" : "Area < Lithuania"}</button>
      </div>
      <ol className={styles.listContainer}>
        {loading && <h4>Data is loading...</h4>}
        {filteredCountries.map((country, index) =>
          <div key={index} className={styles.card}>
            <li>{country.name}</li>
            <li>{country.region}</li>
            <li>{country.area}</li>
          </div>)}
      </ol>
    </div>
  );
};

export default App;