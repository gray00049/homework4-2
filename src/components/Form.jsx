import { useState } from "react";

export default function Form({ 
    dateValue = '', 
    countValue = '', 
    onChangeDate, 
    onChangeCount, 
    handleSubmit 
}) {

  let handleChangeDate = (e) => {
    onChangeDate(e.target.value)
  }

  let handleChangeCount = (e) => {
    onChangeCount(e.target.value)
  }


  let handleSubmitForm = (e) => {
    e.preventDefault();

    handleSubmit(e);

    onChangeDate('');
    onChangeCount('');
  }

  return (
    <form className="stepForm__form" onSubmit={handleSubmitForm}>
      <div>
        <label htmlFor="walkingDate" className="stepForm__label">
          Дата (ДД.ММ.ГГГГ)
        </label>
        <input 
          type="text" 
          id="walkingDate" 
          className="stepForm__input" 
          value={dateValue}
          onChange={handleChangeDate}
        />
      </div>

      <div>
        <label htmlFor="walkingCount" className="stepForm__label">
          Пройдено км
        </label>
        <input 
          type="number" 
          id="walkingCount" 
          className="stepForm__input" 
          value={countValue} 
          onChange={handleChangeCount}
        />
      </div>

      <button className="stepForm__input">OK</button>
    </form>
  )
}