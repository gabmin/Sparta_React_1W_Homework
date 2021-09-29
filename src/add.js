import React from "react";
import { useDispatch } from "react-redux";
import {
  createCentence,
  addWordFB,
  loadWordFB,
} from "./redux/modules/addSentence";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { db } from "./firebase";
import { collection, getDoc, getDocs, addDoc } from "firebase/firestore";

//함수형 Component 사용
const Add = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const my_word = React.useRef(null);
  const my_explain = React.useRef(null);
  const my_example = React.useRef(null);

  //useEffect를 이용하여 미들웨어에 디스패치 한다.
  React.useEffect(() => {
    dispatch(loadWordFB());
  });

  //Ref를 통해 3개의 input값을 가져와 미들웨어에 디스패치 한다.
  const addCard = () => {
    dispatch(
      addWordFB({
        word: my_word.current.value,
        explain: my_explain.current.value,
        example: my_example.current.value,
      })
    );
  };

  return (
    <div>
      <h1>단어 추가하기</h1>
      <Card>
        <div>
          <Title>단어</Title>
          <Input ref={my_word} type="text" />
        </div>
        <div>
          <Title>설명</Title>
          <Input ref={my_explain} type="text" />
        </div>
        <div>
          <Title>예시</Title>
          <Input ref={my_example} type="text" />
        </div>
      </Card>
      <Button
        onClick={() => {
          // 버튼 클릭시 input 값이 미들웨어로 디스패치 된다.
          addCard();
          // 디스패치 후 / 주소로 이동한다. (goback를 이용할 수 있다.)
          history.push("/");
          alert("저장 완료~!!");
        }}
      >
        추가하기
      </Button>
    </div>
  );
};

const Card = styled.div`
  border: 1px solid #561e81;
  border-radius: 10px;
  width: 90vw;
  height: auto;
  margin: 50px auto;
  background-color: #561e81;
`;

const Title = styled.div`
  font-family: fantasy;
  margin: 8px 15px;
  text-align: left;
  font-weight: bold;
  text-decoration: underline;
  color: #fff;
`;

const Input = styled.input`
  width: 80%;
  height: 30px;
  margin-top: -8px;
  margin-bottom: 30px;
  border-radius: 5px;
  border: hidden;
`;

const Button = styled.button`
  width: 90%;
  height: 40px;
  background-color: #561e81;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  border: hidden;
`;
export default Add;
