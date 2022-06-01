function Book(props) {
  const { group, deleteBook, editeBook, setScore, newScore, setNewScore } = props;

  const submitScore = (id, title, author, year, ISBN, score) => {
    if (!Number.isInteger(+score) && score > 10) {
      return alert('Введите целое число, небольше 10');
    }
    setScore(id, title, author, year, ISBN, score);
  };

  return (
    <div>
      <h3>{group?.year}</h3>
      {group?.books.map((book) => {
        const { id, title, img, author, score, ISBN } = book;
        return (
          <div id={id} className="card book" key={id}>
            <div className="card-image waves-effect waves-block waves-light">
              {img === 'N/A' && '' ? (
                <img className="activator" src={`https://via.placeholder.com/300x420?text=${title}`} alt="" />
              ) : (
                <img className="activator" src={process.env.PUBLIC_URL + `${img}`} alt="" />
              )}
            </div>
            <div className="card-content">
              <span className="card-title">{title}</span>
              <p>
                {author} <span className="right">{group?.year}</span>
              </p>
              <span>{ISBN}</span>
              {score ? <p> Рейтинг: {score}</p> : ''}
              <div>
                {editeBook ? (
                  <>
                    <button className="button-delete waves-effect" onClick={() => deleteBook(id)}>
                      Удалить
                    </button>
                    <button
                      className="button-edit waves-effect"
                      onClick={() => editeBook(id, title, author, group?.year, ISBN, img, score)}
                    >
                      Редактировать
                    </button>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Book };
