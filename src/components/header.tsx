import React from "react";

interface Data {
  title: string;
  paragraph?: string;
}

interface Props {
  data: Data;
}

export const Header: React.FC<Props> = ({ data }) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {data.title}
                  <span></span>
                </h1>
                <p>{data.paragraph ? data.paragraph : "Loading.."}</p>
                <a href="/search" className="btn btn-custom btn-lg page-scroll">
                  Log In
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
