import React from 'react';

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div key={book.id} className=" w-[100%] p-2 rounded shadow flex items-center">
      <div className="w-[100%] flex gap-[50px] rounded-[10px] border border-[#1E3A8A33] py-[10px] px-[5px] bg-white shadow-[3px_4px_10px_2px_#00000040] font-sans">
        <img
          src={book.image}
          alt={book.title || "Без названия"}
          className="rounded-[10px]  object-contain h-52"
        />
        <div className=" w-[500px]">
          <h2 className="text-[20px] text-[#202020] font-bold">{book.title || "Неизвестная книга"}</h2>
          <div className="flex justify-between mt-[15px] items-center">
            <div>
              <p>Формат: {book.format || "-"}</p>
              <p>Кол-во страниц: {book.pages || "-"}</p>
              <p>Язык: {book.language || "-"}</p>
            </div>
          </div>
      <div className="space-x-2 mt-4">
        <button
          onClick={() => onEdit(book)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Редактировать
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Удалить
        </button>
      </div>
        </div>
      </div>

    </div>
  );
};

export default BookCard;