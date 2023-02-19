export default function TrainingsList({ trainings, onDelete, onEdit }) {
  let dateArray = Object.keys(trainings);

  // Сортировка тренировок по дате
  dateArray.sort((a, b) => {
    a = a.split('.');
    a = `${a[1]}.${a[0]}.${a[2]}`;

    b = b.split('.');
    b = `${b[1]}.${b[0]}.${b[2]}`;

    return new Date(b) - new Date(a)
  });

  return (
    <div className="trainList">

      <div className="trainList__header">
        <p>Дата (ДД.ММ.ГГГГ)</p>
        <p>Пройдено км</p>
        <p>Действия</p>
      </div>

      <div className="trainList__list">
      {dateArray.map(item => (
        <div key={item} className="trainList__item">
          <p>{item}</p>
          <p>{trainings[item]}</p>
          <p>
            <button className="trainList__control" onClick={() => onEdit(item)}>✎</button>
            <button className="trainList__control" onClick={() => onDelete(item)}>✘</button>
          </p>
        </div>
      ))}
      </div>
    </div>
  )
}

