import { useEffect } from 'react';

function Modal(props) {
  const {
    createBook,
    updateBook,
    modalClose,
    isOpened,
    isEdit,
    newTitle,
    newAuthor,
    newISBN,
    setBooks,
    newYear,
    newScore,
  } = props;

  useEffect(() => {
    newTitle.current.focus();
  });

  const submitForm = (isEdit) => {
    if (isEdit) {
      updateBook({
        title: newTitle?.current?.value,
        author: newAuthor?.current?.value,
        year: newYear?.current?.value,
        ISBN: newISBN?.current?.value,
        score: newScore?.current?.value,
      });
    } else {
      createBook({
        title: newTitle?.current?.value,
        author: newAuthor?.current?.value,
        year: newYear?.current?.value,
        ISBN: newISBN?.current?.value,
        score: newScore?.current?.value,
      });
    }
    modalClose();
    setBooks([]);
  };

  const validateForm = (string, type) => {
    if (type === 'title') {
      if (!string) {
        return alert('Неверно введен заголовок книги!');
      } else if (string.length >= 100) {
        return alert('Название должно быть короче 100 символов!');
      }
    }
    if (type === 'author') {
      if (!string) {
        return alert('Неверно введен заголовок книги!');
      }
    }
    if (type === 'year') {
      if (Number(string) < 1800) {
        alert('На сайте публикуются книги до 1800 г.');
      }
    }
  };

  return (
    <div className={`modal_wrapper ${isOpened ? 'open' : 'close'}`}>
      <div className="modal">
        <div className="modal_close" onClick={() => modalClose()}>
          ×
        </div>
        {isEdit ? <h4>Редактировать книгу</h4> : <h4>Добавить новую книгу</h4>}
        <input
          placeholder="Заголовок"
          type="text"
          ref={newTitle}
          onBlur={() => validateForm(newTitle.current.value, 'title')}
        />
        <input
          placeholder="Автор"
          type="text"
          ref={newAuthor}
          onBlur={() => validateForm(newAuthor.current.value, 'author')}
        />
        <input
          placeholder="Год"
          type="number"
          ref={newYear}
          onBlur={() => validateForm(newYear.current.value, 'year')}
        />
        <input
          placeholder="ISBN"
          type="text"
          ref={newISBN}
          onBlur={() => validateForm(newISBN.current.value, 'ISBN')}
        />
        <input
          placeholder="Рейтинг"
          type="number"
          ref={newScore}
          onBlur={() => validateForm(newScore.current.value, 'ISBN')}
        />
        <button onClick={() => submitForm(isEdit)}>Сохранить</button>
      </div>
    </div>
  );
}

export { Modal };
