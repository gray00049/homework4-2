import { useState, useRef } from "react";
import TrainingsList from "./TrainingsList";
import Form from "./Form";

export default function StepForm() {
  // Состояние флага
  let [flag, changeFlag] = useState('save')

  // Состояния для полей формы
  let [date, changeDate] = useState('');
  let [count, changeCount] = useState('');

  // Состояния для объекта с тренировками
  let [trainings, setTrainings] = useState({
    '10.01.2023': 10,
    '12.01.2023': 20
  });

  // Состояние для отслеживания изменения даты
  let [oldDate, changeOldDate] = useState('');

  // Обработчик формы
  let handleFormSubmit = (e) => {

    if (!checkDate(date)) {
      alert('Введите корректное значение даты');
      return;
    }

    switch (flag){

      case "save":
        if (date in trainings) {
          let newCount = +trainings[date] + +count;
          setTrainings(prevTrainings => ({...prevTrainings, [date]: newCount}));
        } else {
          setTrainings(prevTrainings => ({...prevTrainings, [date]: count}));
        }
        break;

      case "edit":
        if (date == oldDate) {
          setTrainings(prevTrainings => ({...prevTrainings, [date]: count}));
        } else {
          deleteTrain(oldDate);
          setTrainings(prevTrainings => ({...prevTrainings, [date]: count}));
        }
        changeFlag('save');
        break;
    }
  }

  // Функция удаления тренировки
  let deleteTrain = (deleteItem) => {
    let copyState = Object.assign({}, trainings);
    delete copyState[deleteItem];

    setTrainings(copyState);
  }

  // Функция изменения тренировки
  let editTrain = (editItem) => {
    changeFlag('edit')

    changeDate(editItem);
    changeCount(trainings[editItem]);
    changeOldDate(editItem);
  }

  // Отслеживание количества записей для вывода контейнера
  let trainingsList = Object.keys(trainings).length == 0 
    ? '' 
    : <TrainingsList 
        trainings={trainings} 
        onDelete={deleteTrain} 
        onEdit={editTrain}
      />;


  return (
    <div className="stepForm">
      <Form 
        dateValue={date} 
        countValue={count} 
        onChangeDate={changeDate}
        onChangeCount={changeCount}
        handleSubmit={handleFormSubmit}
      />

      {trainingsList}
    </div>
  )
}


function checkDate(date) {
  let dateSplit = date.split('.');

  if (dateSplit[0] <= 31 && dateSplit[1] <= 12) {
    let regexp = /\d{2}\.\d{2}\.\d{4}/;
    return regexp.test(date)
  }

  return false;
}