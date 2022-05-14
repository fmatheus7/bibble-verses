import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Button, Container } from '@mui/material';
import api from '../../utils/Api';
import bible from '../../utils/Bible';
import TransitionsModal from '../../components/Modal';
import styles from './styles.css';
export default function Home() {
  const [book, setBook] = useState();
  const [chapter, setChapter] = useState();
  const [verse, setVerse] = useState();
  const [display, setDisplay] = useState({
    text: 'Bem vindo ao versiculo do dia',
    reference: 'Que Deus te abençõe',
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const generateRandomVersicle = (bible) => {
    const randomBook = Math.floor(Math.random() * bible.length);
    const randomVersicle = Math.floor(
      Math.random() * bible[randomBook].chapters
    );
    setBook(bible[randomBook].book);
    setChapter(Math.floor(Math.random() * randomVersicle));
    setVerse(Math.floor(Math.random() * randomVersicle));
  };

  useEffect(() => {
    api
      .get(`${book} ${chapter}:${verse}?translation=almeida`)
      .then((r) => setDisplay(r.data))
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
        generateRandomVersicle(bible);
      });
  }, [book, chapter, verse]);

  return (
    <Container maxWidth="sm">
      <div className="app_Header">
        <Header />
      </div>
      <div className="app_Body">
        <Button
          variant="contained"
          id="generateButton"
          onClick={() => generateRandomVersicle(bible)}
        >
          Obter versiculos
        </Button>
        <Button variant="text" id="readVersicle" onClick={() => handleOpen()}>
          Ler o seu versiculo
        </Button>
      </div>
      <TransitionsModal
        open={open}
        text={display.text}
        reference={display.reference}
        handleClose={handleClose}
      />
    </Container>
  );
}
