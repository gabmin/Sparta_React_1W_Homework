import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  orderBy,
  query,
  startAt,
  Timestamp,
} from "firebase/firestore";
// Actions
const CREATE = "addsentence/CREATE";
const LOAD = "addsentence/LOAD";

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "addsentence/LOAD": {
      return { list: action.word_list };
    }
    case "addsentence/CREATE": {
      //const new_card = [my_word, my_explain, my_example];
      const now_card = [...state.list, action.addsentence];
      return { list: now_card };
    }

    default:
      return state;
  }
}
const initialState = {
  list: [],
};
// middlewares
export const loadWordFB = () => {
  return async function (dispatch) {
    const myRef = collection(db, "mydictionary");
    const mydictionary_data = await getDocs(myRef);
    // const q = query(mydictionary_data, orderBy("Timestamp", "desc"));
    console.log(mydictionary_data);
    // console.log(q);

    let word_list = [];
    mydictionary_data.forEach((doc) => {
      word_list.push({ id: doc.id, ...doc.data() });
    });
    console.log(word_list);
    dispatch(loadCentence(word_list));
  };
};
export const addWordFB = (doc) => {
  return async function (dispatch) {
    const mydictionary_data = await addDoc(collection(db, "mydictionary"), doc);
    const _doc = await getDoc(mydictionary_data);
    const doc_data = { id: _doc.id, ..._doc.data() };
    console.log(doc_data);
    dispatch(createCentence(doc_data));
  };
};

// Action Creators

export const createCentence = (addsentence) => {
  return { type: CREATE, addsentence };
};

export const loadCentence = (word_list) => {
  return { type: LOAD, word_list };
};
