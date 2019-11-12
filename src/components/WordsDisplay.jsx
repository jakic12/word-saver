import React, { useState } from "react";

import "../styles/wordsDisplay.scss";

// components
import Card from "../components/Card";
import { Ripple, Ring } from "react-awesome-spinners";

// resources
import arrow from "../res/arrow-point-to-right.png";
import plus from "../res/plus.png";
import unchecked from "../res/unchecked.png";

const WordsDisplay = ({
  getWord,
  addWord,
  removeWord,
  status,
  savedWords,
  wordsToDisplay,
  savedWordsStatus,
  local,
  hideWordError
}) => {
  const selectWord = word => {
    getWord(word);
  };

  const wordSaved = word => {
    if (savedWords && savedWords.length > 0) {
      return (
        savedWords.filter(savedWord => {
          if (word.uid || savedWord.uid) {
            if (word.uid) {
              word = JSON.parse(JSON.stringify(word));
              delete word.uid;
            }

            if (savedWord.uid) {
              savedWord = JSON.parse(JSON.stringify(savedWord));
              delete savedWord.uid;
            }
          }
          return deepEquals(savedWord, word);
        }).length > 0
      );
    }

    return false;
  };

  const deepEquals = (object1, object2) => {
    if (!object1 || !object2) {
      return false;
    }
    if (
      typeof object1 === "object" &&
      object1 !== null &&
      object1 !== undefined
    ) {
      if (Object.keys(object1).length !== Object.keys(object2).length)
        return false;

      Object.keys(object1).forEach(key => {
        if (!deepEquals(object1[key], object2[key])) return false;
      });
      return true;
    } else {
      if (
        typeof object2 === "object" &&
        object2 !== null &&
        object2 !== undefined
      ) {
        // if object1 is object and object2 isn't
        return false;
      }
      return object1 === object2;
    }
  };

  return (
    <div className="wordCards">
      {status.error && (
        <Card className="error">
          <div className="message">{status.error}</div>
        </Card>
      )}
      {!status.error &&
        !status.wordLoading &&
        wordsToDisplay.map((word, word_i) => {
          const isWordSaved = wordSaved(word);
          const saveLoading =
            savedWordsStatus.addWordLoading[word_i] ||
            savedWordsStatus.removeWordLoading[word_i];

          const wordSaveError =
            (savedWordsStatus &&
              savedWordsStatus.addWordError &&
              savedWordsStatus.addWordError[word_i]) ||
            (savedWordsStatus &&
              savedWordsStatus.removeWordError &&
              savedWordsStatus.removeWordError[word_i]);
          if (wordSaveError)
            setTimeout(() => {
              hideWordError(word_i);
            }, 5000);
          return (
            <Card className="wordCard" key={`word_${word_i}`}>
              <div className="head">
                <div className="title">
                  <h1 className="word">{word.word}</h1>
                  <div className="phonetic">{word.phonetic}</div>
                </div>
                <div
                  className={`wordSaved${saveLoading ? ` saveLoading` : ``}`}
                  onClick={() =>
                    !saveLoading
                      ? isWordSaved
                        ? removeWord(word, word_i, local)
                        : addWord(word, word_i, local)
                      : null
                  }
                >
                  <div className={`wordSavedStatus`}>
                    {wordSaveError && (
                      <div className="wordSavedError">
                        {savedWordsStatus.addWordError[word_i] ||
                          savedWordsStatus.removeWordError[word_i]}
                      </div>
                    )}
                    {!saveLoading && (
                      <img
                        src={isWordSaved ? unchecked : plus}
                        alt="wordSavedStatus"
                      />
                    )}
                    {saveLoading && <Ring size={2} sizeUnit={`em`} />}
                  </div>
                </div>
              </div>
              <div className="meanings">
                {Object.keys(word.meaning).map((word_type, meaning_i) => {
                  return (
                    <div
                      className="meaning"
                      key={`meaning_${word_i}_${meaning_i}`}
                    >
                      <div className="meaningHead">{word_type}</div>
                      <div className="definitions">
                        <ol>
                          {word.meaning[word_type].map(
                            (definition, definition_i) => (
                              <li
                                key={`definition_${word_i}_${meaning_i}_${definition_i}`}
                              >
                                <div className="definition">
                                  {definition.definition}
                                </div>
                                {definition.example && (
                                  <div className="example">
                                    {`"${definition.example}"`}
                                  </div>
                                )}
                                {definition.synonyms && (
                                  <Synonyms
                                    synonyms={definition.synonyms}
                                    selectWord={selectWord}
                                    rootKey={`synonym_${word_i}_${meaning_i}_${definition_i}`}
                                  />
                                )}
                              </li>
                            )
                          )}
                        </ol>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      {status.wordLoading && (
        <div className="loading">
          <Ripple />
        </div>
      )}
    </div>
  );
};

const Synonyms = ({ synonyms, selectWord, rootKey }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="synonymsWrapper">
      <div
        className={`synonyms${open ? " open" : ""}`}
        style={
          open
            ? {
                maxHeight: `calc(${
                  synonyms.length > 0 ? synonyms.length : 1
                } * 2.92em)`
              }
            : {}
        }
      >
        <div className="synonymBlock">
          <div className="similar">Similar:</div>
        </div>
        {synonyms.map((synonym, i) => (
          <div
            className="synonymBlock"
            onClick={() => {
              selectWord(synonym);
            }}
            key={`${rootKey}_${i}`}
          >
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

export default WordsDisplay;
