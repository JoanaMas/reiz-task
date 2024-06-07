import { FC, ReactElement } from 'react';
// Style
import styles from './countryCard.module.scss';

interface CountryCardProps {
    index: number,
    name: string,
    region: string,
    area: number,
}

const CountryCard: FC<CountryCardProps> = (props): ReactElement => {

    const {index, name, region, area} = props;

    return (
        <div key={index} className={styles.card}>
            <li>{name}</li>
            <li>{region}</li>
            <li>{area}</li>
        </div>
    );
};

export default CountryCard;