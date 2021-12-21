import React from "react";

import NavigationV1 from "../landingPage/navigation";
import Header from "../landingPage/header";
import Features from "../landingPage/features";
import About from "../landingPage/about";
import Services from "../landingPage/services";
import Testimonials from "../landingPage/testimonials";
import Contact from "../landingPage/contact";
import JsonData from "../data/data.json";

const Home: React.FC = () => {
  return (
    <div>
      <NavigationV1 />
      <Header
        data={{
          title: JsonData.Header.title,
          paragraph: JsonData.Header.paragraph
        }}
      />
      <Features data={JsonData.Features} />
      <About data={JsonData.About} />
      <Services data={JsonData.Services} />
      <Testimonials data={JsonData.Testimonials} />
      <Contact data={JsonData.Contact} />
    </div>
  );
};

export default Home;
