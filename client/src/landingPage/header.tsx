import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";

interface Data {
  title: string;
  paragraph?: string;
}

interface Props {
  data: Data;
}

export const Header: React.FC<Props> = ({ data }) => {
  //let location = useLocation();
  const [translateType, setType] = useState(" نسخة عربية للعرض فقط");
  let history = useHistory();
  useEffect(() => {
    let ele: HTMLAnchorElement | null = document.querySelector("a.bttn-custom");
    // wait for page translation
    setTimeout(() => {
      if (ele?.text == "تسجيل الدخول") {
        setType("English");
      }
    }, 1000);
  }, []);

  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 intro-text">
                <h1>
                  {translateType !== "English"
                    ? data.title
                    : "الحل الكلي في واحد لعيادتك"}
                </h1>
                <p className="my-4">
                  {data.paragraph ? data.paragraph : "Loading.."}
                </p>

                <Link to="/login" className=" bttn-custom   ">
                  Log In
                </Link>
                <div className="my-4" />
{/* 
                <button
                  className="bttn-custom "
                  onClick={() => {
                    if (translateType !== "English") {
                      history.push("#googtrans(en|ar)");
                      history.go(0);
                      window.location.reload();
                    } else {
                      console.log("Ar -> En");
                      history.push("#googtrans(en|en)");
                      history.go(0);
                      window.location.reload();
                    }
                  }}
                >
                  {translateType}
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
