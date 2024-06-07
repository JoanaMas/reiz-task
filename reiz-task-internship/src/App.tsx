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

const App = () => {

  const [countries, setCountries] = useState<Countries>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

      const fetchCountries = async () => {

        try {
          const result = await axios.get<Countries>('https://restcountries.com/v2/all?fields=name,region,area');
          setCountries(result.data);
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
      <ol className={styles.listContainer}>
        {loading && <h4>Data is loading...</h4>}
        {countries.map((country, index) =>
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
