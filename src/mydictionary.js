import React from "react";
import Add from "./add";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { CgArrowDownR } from "react-icons/cg";
import { db } from "./firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
import {
  createCentence,
  loadCentence,
  loadWordFB,
} from "./redux/modules/addSentence";

const MyDictionary = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.addSentence.list);

  const scroll_ref = React.useRef();
  const executeScroll = () => {
    scroll_ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  React.useEffect(() => {
    dispatch(loadWordFB());
  }, []);
  return (
    <div>
      <h1>MY DICTIONARY</h1>
      <Body>
        {data.map((query, index) => {
          return (
            <Card key={index} ref={scroll_ref}>
              <div>
                <Title>단어</Title>
                <Text>{query.word}</Text>
              </div>
              <div>
                <Title>설명</Title>
                <Text>{query.explain}</Text>
              </div>
              <div>
                <Title>예시</Title>
                <Text
                  style={{
                    color: "#89BDFD",
                  }}
                >
                  {query.example}
                </Text>
              </div>
            </Card>
          );
        })}
      </Body>
      <CgArrowDownR
        onClick={executeScroll}
        style={{
          position: "fixed",
          bottom: "2%",
          right: "7%",
        }}
        size="3em"
        color="#561e81"
      />
      <Button
        onClick={() => {
          history.push("/add");
        }}
      >
        추가하기
      </Button>
    </div>
  );
};
const Body = styled.div`
  height: 77vh;

  margin: auto;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
`;
const Card = styled.div`
  border: 1px solid #561e81;
  border-radius: 10px;
  width: 90%;
  height: auto;
  margin: 10px auto;
  background-color: #561e81;
`;

const Word = styled.div`
  max-width: 80vw;
  max-height: 15vh;
  margin: 10px auto;
  display: block;
  border-radius: 15px;
`;

const Title = styled.div`
  font-family: fantasy;
  margin: 8px 15px;
  text-align: left;
  font-weight: bold;
  text-decoration: underline;
  color: #fff;
`;

const Text = styled.h3`
  margin: 10px 13px;
  color: #fff;
  font-weight: bold;
  text-align: left;
`;

const Button = styled.button`
  width: 70%;
  height: 40px;
  background-color: #561e81;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  border: hidden;
  position: fixed;
  bottom: 2%;
  left: 4.5%;
`;

export default MyDictionary;
