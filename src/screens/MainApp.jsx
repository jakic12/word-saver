import React, { useState } from "react";

import "../styles/mainApp.scss";

// redux
import { connect } from "react-redux";
import { addWord, removeWord } from "../redux/actions/Words";

// router
import { Redirect } from "react-router-dom";

const MainApp = ({ account, words, addWord }) => {
  const [wordInput, setWordInput] = useState("");
  if (
    (!account.userData && account.useAccount) ||
    account.useAccount === null
  ) {
    return <Redirect to={`/login`} />;
  }
  return (
    <div className="mainApp">
      <div className="topSearch">
        <form
          onSubmit={e => {
            e.preventDefault();
            setWordInput("");
            addWord(wordInput);
          }}
        >
          <input
            type="text"
            value={wordInput}
            onInput={e => setWordInput(e.target.value)}
          />
        </form>
      </div>
      <div className="wordCards">
        {words.savedWords.map(word => {
          return <div className="wordCard">{word}</div>;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    addWord: word => dispatch(addWord(word)),
    removeWord: word => dispatch(removeWord(word))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApp);
