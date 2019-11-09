import React, { useState } from "react";

import "../styles/mainApp.scss";

// redux
import { connect } from "react-redux";
import { addWord, removeWord, fetchWord } from "../redux/actions/Words";

// router
import { Redirect } from "react-router-dom";

// components
import Card from "../components/Card";
import WordsDisplay from "../components/WordsDisplay";

const tabs = [
  {
    label: `Search`,
    render: props => <WordsWithSearch {...props} />
  },
  {
    label: `Saved Words`,
    render: props => (
      <WordsDisplay
        getWord={props.getWord}
        addWord={props.addWord}
        removeWord={props.removeWord}
        status={props.words}
        savedWords={props.words.savedWords}
        wordsToDisplay={props.words.savedWords}
      />
    )
  }
];

const MainApp = props => {
  const { account, words, addWord, getWord, removeWord } = props;
  const [selectedTab, setSelectedTab] = useState(0);
  const [wordInput, setWordInput] = useState("");

  if (
    (!account.userData && account.useAccount) ||
    account.useAccount === null
  ) {
    return <Redirect to={`/login`} />;
  }

  return (
    <div className="mainApp">
      <div className="mainAppBody">{tabs[selectedTab].render(props)}</div>
      <div className="bottomBar">
        {tabs.map((tab, i) => (
          <div
            className={`tab${selectedTab == i ? ` selected` : ``}`}
            onClick={() => setSelectedTab(i)}
            key={`tab_button_${i}`}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
};

const WordsWithSearch = ({ words, addWord, getWord, removeWord }) => {
  const [wordInput, setWordInput] = useState("");

  return (
    <>
      <div className="topSearch">
        <Card>
          <form
            onSubmit={e => {
              e.preventDefault();
              getWord(wordInput);
              //addWord(wordInput);
              setWordInput("");
            }}
          >
            <input
              type="text"
              value={wordInput}
              onChange={e => setWordInput(e.target.value)}
            />
          </form>
        </Card>
      </div>
      <WordsDisplay
        getWord={getWord}
        addWord={addWord}
        removeWord={removeWord}
        status={words}
        savedWords={words.savedWords}
        wordsToDisplay={words.wordsShowing}
      />
    </>
  );
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    addWord: word => dispatch(addWord(word)),
    removeWord: word => dispatch(removeWord(word)),
    getWord: word => fetchWord(dispatch, word)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApp);
