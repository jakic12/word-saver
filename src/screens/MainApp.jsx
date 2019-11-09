import React, { useState } from "react";

import "../styles/mainApp.scss";

// redux
import { connect } from "react-redux";
import { addWord, removeWord, fetchWord } from "../redux/actions/Words";

// router
import { Redirect } from "react-router-dom";

// components
import Card from "../components/Card";
import { Ripple } from "react-awesome-spinners";

// resources
import arrow from "../res/arrow-point-to-right.png";

const MainApp = ({ account, words, addWord, getWord }) => {
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
              onInput={e => setWordInput(e.target.value)}
            />
          </form>
        </Card>
      </div>
      <div className="wordCards">
        {!words.wordLoading &&
          words.wordsShowing.map(word => {
            return (
              <Card className="wordCard">
                <div className="head">
                  <h1 className="word">{word.word}</h1>
                  <div className="phonetic">{word.phonetic}</div>
                </div>
                <div className="meanings">
                  {Object.keys(word.meaning).map(word_type => {
                    return (
                      <div className="meaning">
                        <div className="meaningHead">{word_type}</div>
                        <div className="definitions">
                          <ol>
                            {word.meaning[word_type].map(definition => (
                              <li>
                                <div className="definition">
                                  {definition.definition}
                                </div>
                                {definition.example && (
                                  <div className="example">
                                    {`"${definition.example}"`}
                                  </div>
                                )}
                                {definition.synonyms && (
                                  <Synonyms synonyms={definition.synonyms} />
                                )}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        {words.wordLoading && (
          <div className="loading">
            <Ripple />
          </div>
        )}
      </div>
    </div>
  );
};

const Synonyms = ({ synonyms }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="synonymsWrapper">
      <div
        className={`synonyms${open ? " open" : ""}`}
        style={
          open
            ? {
                "max-height": `calc(${
                  synonyms.length > 0 ? synonyms.length : 1
                } * 2.92em)`
              }
            : {}
        }
      >
        <div className="synonymBlock">
          <div className="similar">Similar:</div>
        </div>
        {synonyms.map(synonym => (
          <div className="synonymBlock">
            <div className="synonym">{synonym}</div>
          </div>
        ))}
      </div>
      <div className="openCloseButtonWrapper">
        <div
          className={`openCloseButton${open ? " open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <img src={arrow} alt="arrow" />
        </div>
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
    removeWord: word => dispatch(removeWord(word)),
    getWord: word => fetchWord(dispatch, word)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApp);
