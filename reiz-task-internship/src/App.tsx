import React, { useState, useEffect } from 'react';
import axios from 'axios';


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
          const result = await axios.get('https://restcountries.com/v2/all?fields=name,region,area');
          setCountries(result.data);
        } catch (error) {
          console.error('Something went wrong! Failed to fetch data');
        } finally {
          setLoading(false);
        }
      };

      fetchCountries();

  }, []);

  console.log(countries);

  return (
    <div>
      {loading && <h4>Please be patient! Data is loading...</h4>}
      {JSON.stringify(countries)}
    </div>
  );
};

export default App;
