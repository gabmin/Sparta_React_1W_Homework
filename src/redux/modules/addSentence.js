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

// Action를 정의해준다.
const CREATE = "addsentence/CREATE";
const LOAD = "addsentence/LOAD";

// 불러오기와 저장하기 Action Creators를 만든다.
export const createCentence = (addsentence) => {
  return { type: CREATE, addsentence };
};

export const loadCentence = (word_list) => {
  return { type: LOAD, word_list };
};

// Firestore에서 데이터를 불러올 수 있는 Middleware를 만든다.
export const loadWordFB = () => {
  // 비동기데이터 이므로 async와 await를 붙여준다.
  return async function (dispatch) {
    //Firestore에 저장되어 있는 mydictionary 컬랙션을 불러온다.
    const myRef = collection(db, "mydictionary");
    const mydictionary_data = await getDocs(myRef);
    // const q = query(mydictionary_data, orderBy("Timestamp", "desc"));
    console.log(mydictionary_data);

    // forEach를 통해 각각의 데이터에 ID를 부여한다.
    let word_list = [];
    mydictionary_data.forEach((doc) => {
      word_list.push({ id: doc.id, ...doc.data() });
    });
    console.log(word_list);
    dispatch(loadCentence(word_list));
  };
};
// Firestore에서 데이터를 저장할 수 있는 Middleware를 만든다.
export const addWordFB = (doc) => {
  return async function (dispatch) {
    // 데이터를 저장하기 전 기존 데이터를 불러온다.
    const mydictionary_data = await addDoc(collection(db, "mydictionary"), doc);
    const _doc = await getDoc(mydictionary_data);
    // 기존 데이터에 새 데이터를 합친다.
    const doc_data = { id: _doc.id, ..._doc.data() };
    console.log(doc_data);
    dispatch(createCentence(doc_data));
  };
};

// Reducer를 통해 데이터를 관리한다.
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "addsentence/LOAD": {
      return { list: action.word_list };
    }
    case "addsentence/CREATE": {
      const now_card = [...state.list, action.addsentence];
      return { list: now_card };
    }
    default:
      return state;
  }
}
// 초기값을 지정해준다.
const initialState = {
  list: [],
};
