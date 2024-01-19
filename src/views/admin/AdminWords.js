import React, { useState, useContext, useEffect } from "react";
import { AnalyticsContext } from "../../context/AnalyticsContext";
import { formatMonto } from "../../utils";
import PanelTitleDate from "../../components/global/PanelTitleDate";

const AdminWords = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const { messages_words, getWords } = useContext(AnalyticsContext);

  useEffect(() => {
    getTotalWords();
  }, [messages_words]);

  const renderWords = () => {
    if (Array.isArray(messages_words)) {
      return messages_words.map((user) => (
        <tr key={user.user_id} className="text-dark">
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.used_words}</td>
          <td>{user.messages}</td>
          <td>${formatMonto(user.paid)}</td>
        </tr>
      ));
    }
  };

  const getTotalWords = () => {
    if (Array.isArray(messages_words)) {
      let words = 0;
      let messages = 0;
      messages_words.forEach((user) => {
        words += parseInt(user.used_words);
        messages += parseInt(user.messages);
      });
      setTotalMessages(messages);
      setTotalWords(words);
      setTotalUsers(messages_words.length);
    }
  };

  return (
    <div>
      <PanelTitleDate title="Users" callback={getWords} />
      <div className="row mt-4">
        <div className="col-12 col-md-4 my-2">
          <div className="card p-3 ">
            <p className="bold">Words</p>
            <h3 className="mb-0">{formatMonto(totalWords)}</h3>
          </div>
        </div>
        <div className="col-12 col-md-4 my-2">
          <div className="card p-3  mb-4">
            <p className="bold">Messages</p>
            <h3 className="mb-0">{formatMonto(totalMessages)}</h3>
          </div>
        </div>
        <div className="col-12 col-md-4 my-2">
          <div className="card p-3 ">
            <p className="bold">Users</p>
            <h3 className="mb-0">{formatMonto(totalUsers)}</h3>
          </div>
        </div>
      </div>
      <div className="card p-3 shadow-sm">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr className="text-dark">
                <th>Name</th>
                <th>Email</th>
                <th>Used</th>
                <th>Messages</th>
                <th>Paid</th>
              </tr>
            </thead>
            <tbody>{renderWords()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminWords;
