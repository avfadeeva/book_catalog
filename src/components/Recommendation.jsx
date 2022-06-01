function Recommendation(props) {
  console.log('🚀 ~ file: Recommendation.jsx ~ line 2 ~ Recommendation ~ props', props);
  const { books } = props;
  let bestBooks = [];
  let bestBook;

  const currentYear = new Date().getFullYear();

  if (books.length) {
    console.log('🚀 ~ file: Recommendation.jsx ~ line 10 ~ Recommendation ~ books', books);
    bestBook = books
      ?.filter((book) => book.year < currentYear - 3 && book.score)
      ?.reduce((prev, current) => {
        if (prev.score > current.score) {
          bestBooks.push(prev);
        }
        return prev.score > current.score ? prev : current;
      });
    books.forEach((book) => {
      if (book.score === bestBook?.score) {
        bestBooks.push(book);
      }
    });
    console.log('🚀 ~ file: Recommendation.jsx ~ line 25 ~ books.forEach ~ bestBooks', bestBooks);

    console.log('🚀 ~ file: Recommendation.jsx ~ line 227 ~ books.forEach ~ books', books);
    bestBook = bestBooks[Math.floor(Math.random() * bestBooks?.length)];
    return (
      <section className="z-depth-4 recommendation-wrapper">
        <h3 className="recommendation-title">Рекомендации от редакции:</h3>
        <div className="waves-effect waves-block waves-light">
          {bestBook?.img === 'N/A' ? (
            <img
              className="activator recommendation-image"
              src={`https://via.placeholder.com/300x420?text=${bestBook?.title}`}
              alt=""
            />
          ) : (
            <img
              className="activator recommendation-image"
              src={bestBook?.img}
              alt=""
              width="310"
              height="480"
            />
          )}
        </div>
        <div className="recommendation-content">
          <span className="card-title recommendation-name">{bestBook?.title}</span>
          Автор: {bestBook?.author} <span className="right"></span>
          <p>Рейтинг: {bestBook?.score}</p>
          <p>Год: {bestBook?.year}</p>
          <span>{bestBook?.ISBN}</span>
        </div>
      </section>
    );
  }
}

export { Recommendation };
