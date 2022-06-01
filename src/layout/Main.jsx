import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { Books } from '../components/Books';
import { Modal } from '../components/Modal';
import { Recommendation } from '../components/Recommendation';

export function Main() {
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState('');
  const [books, setBooks] = useState([]);
  const [groups, setGroups] = useState([]);

  const [bookId, setId] = useState('');

  let newTitle = useRef('');
  let newAuthor = useRef('');
  let newISBN = useRef('');
  let newScore = useRef('');
  let newYear = useRef('');

  const booksCollectionRef = collection(db, 'books');

  useEffect(() => {
    const getBooks = async () => {
      const data = await getDocs(booksCollectionRef);
      const booksList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBooks(booksList);

      const list = booksList?.reduce((acc, cur) => {
        acc[cur.year] = acc[cur.year] || {
          year: cur.year,
          books: [],
        };
        acc[cur.year].books.push(cur);
        return acc;
      }, {});

      setGroups(Object.values(list));
    };
    getBooks();
  }, [status]);

  const filterBooks = (type) => {
    const filtredBooks = books.filter((book) => book.type.includes(type));
    setBooks(filtredBooks);
  };

  const createBook = async (book) => {
    const { title, author, ISBN, year, score } = book;
    await addDoc(booksCollectionRef, {
      title,
      author,
      ISBN,
      year,
      score,
    });
    setStatus('added');
  };

  const deleteBook = async (id) => {
    const bookDoc = doc(db, 'books', id);
    await deleteDoc(bookDoc);
    setStatus('deleted');
  };

  const editeBook = (id, title, author, year, ISBN, image, score) => {
    newTitle.current.value = title;
    newAuthor.current.value = author;
    newYear.current.value = year;
    newISBN.current.value = ISBN;
    newScore.current.value = score;
    setId(id);
    setEdit(true);
    setModal(true);
  };

  const updateBook = async (book) => {
    const { title, author, ISBN, year, score } = book;

    const bookDoc = doc(db, 'books', bookId);
    const newField = {
      title,
      author,
      ISBN,
      year,
      score,
    };
    await updateDoc(bookDoc, newField);
    setStatus(`updated ${JSON.stringify(newField)}`);
  };

  const setScore = async (id, title, author, year, ISBN, score) => {
    const bookDoc = doc(db, 'books', id);

    await updateDoc(bookDoc, {
      score,
    });
  };

  const modalClose = () => {
    setModal(false);
    setEdit(false);
  };

  const openModal = () => {
    setModal(true);
    newTitle.current.value = '';
    newAuthor.current.value = '';
    newYear.current.value = '';
    newISBN.current.value = '';
    newScore.current.value = '';
    setId('');
  };


  return (
    <main>
      <div className="recommendation_wrapper">{<Recommendation books={books} />}</div>
      <div className="content container">
        <button className="modal_button" onClick={openModal}>
          Добавить книгу
        </button>
        <Modal
          isOpened={modal}
          isEdit={edit}
          modalClose={modalClose}
          createBook={createBook}
          updateBook={updateBook}
          newTitle={newTitle}
          newAuthor={newAuthor}
          newISBN={newISBN}
          newYear={newYear}
          newScore={newScore}
          bookId={bookId}
          setId={setId}
          setBooks={setBooks}
        />
        <Books
          groups={groups}
          deleteBook={deleteBook}
          editeBook={editeBook}
          newScore={newScore}
          setScore={setScore}
        />
      </div>
    </main>
  );
}
