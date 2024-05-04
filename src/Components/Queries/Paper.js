import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { FaBook } from "react-icons/fa6";
import styled from "styled-components";

const MainPaper = styled.main`
  background-color: #9fecbc;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 0.25rem;
  margin-top: 0.5rem;
  white-space: break-spaces;
  font-size: 3rem;
  font-weight: bold;
  color: #cf6684;
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
  .dark & {
    margin-top: 0;
    color: #e5e5e5;
  }
`;

const PaperLists = styled.section`
  padding-top: 1rem;
  @media (min-width: 1024px) {
    column-count: 2;
  }
`;

const ArticleWrapper = styled.article`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  white-space: break-spaces;
  border-radius: 0.5rem;
  background-color: #cfb684;
  padding: 0.5rem;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #4b7dff;
  }
  @media (min-width: 1024px) {
    padding: 1rem;
  }
  &.dark {
    background-color: rgba(30, 41, 59, 0.8);
    &:hover {
      background-color: rgba(30, 41, 59, 0.5);
      color: #e2e8f0;
    }
  }
`;

const TitleSub = styled.h3`
  padding: 0 0.25rem;
  font-size: 1.05rem;
  font-weight: 700;
  line-clamp: 1;
  @media (min-width: 1024px) {
    padding: 0 0.5rem;
    font-size: 1.25rem;
  }
`;

const HorizontalRule = styled.hr`
  border: 1.25px solid #710075;
  &.dark {
    border-color: #475569;
  }
`;

const TitleYear = styled.p`
  padding: 0 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  @media (min-width: 1024px) {
    font-size: 1.1rem;
  }
`;

const Paper = () => {
  const { setPaper, paperList } = useContext(UserContext);
  return (
    <MainPaper>
      <Title>
        Subject
      </Title>
      {paperList.length ? (
        <PaperLists>
          {paperList.map((paper, index) => (
            <Link to={paper.paper} key={index} onClick={() => setPaper(paper)}>
              <ArticleWrapper>
                <FaBook className="text-[3rem] lg:text-[4rem]" />
                <div className="">
                  <TitleSub>
                    {paper.paper}
                  </TitleSub>
                  <HorizontalRule />
                  <TitleYear>
                    {paper.year}
                  </TitleYear>
                </div>
              </ArticleWrapper>
            </Link>
          ))}
        </PaperLists>
      ) : (
        <p className="text-lg">No Subject Found.</p>
      )}
    </MainPaper>
  );
};

export default Paper;
