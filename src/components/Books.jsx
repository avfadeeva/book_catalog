import { Book } from './Book';

function Books(props) {
  const { groups, deleteBook, editeBook, updateBook, setScore, setNewScore } = props;

  return (
    <div className="books">
      {groups.map((group) => (
        <Book
          setNewScore={setNewScore}
          updateBook={updateBook}
          deleteBook={deleteBook}
          editeBook={editeBook}
          setScore={setScore}
          key={group.year}
          group={group}
        />
      ))}
    </div>
  );
}

export { Books };
