import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Container from "./common/Container";


const CATEGORIES = [
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Books" },
  { id: 11, name: "Film" },
  { id: 12, name: "Music" },
  { id: 13, name: "Musicals & Theatres" },
  { id: 14, name: "Television" },
  { id: 15, name: "Video Games" },
  { id: 16, name: "Board Games" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Computers" },
  { id: 19, name: "Mathematics" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Comics" },
  { id: 30, name: "Gadgets" },
  { id: 31, name: "Japanese Anime & Manga" },
  { id: 32, name: "Cartoon & Animations" }
];

const Root = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 10em);
  grid-template-columns: repeat(6, 10em);
  align-content: center;
  justify-content: center;
  grid-gap: 16px;
  width: 100%;
  height: 100%;
  padding: 16px;

  & a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    text-align: center;
    font-size: 10pt;
    width: 100%;
    height: 100%;
  }
`;

const Label = ({ children: value }) => {
  const index = value.indexOf("&");

  if (index > 0) {
    const s1 = value.slice(0, index);
    const s2 = value.slice(index, index + 1);
    const s3 = value.slice(index + 1);

    return (
      <>
        <div>{s1}</div>
        <div>{s2}</div>
        <div>{s3}</div>
      </>
    );
  }
  return <div>{value}</div>;
};
const Catergories = () => {
  return (
    <Root>
      {CATEGORIES.map(({ name, id }) => (
        <Container rounded key={id}>
          <Link to={`question/${id}`}>
            <div>
              <Label>{name}</Label>
            </div>
          </Link>
        </Container>
      ))}
    </Root>
  );
};

export default Catergories;
