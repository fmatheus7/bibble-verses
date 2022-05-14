import React from 'react';
import jesus from '../../assets/jesus.png';
import styles from './styles.css';
export default function Header() {
  return (
    <div className="header__container">
      <img src={jesus} alt="Jesus" />
    </div>
  );
}
