import React from "react";
import {
  Feature,
  FeatureMobile,
  FeatureOutline,
  Book,
  Boy,
  Star,
  Calendar,
  Rocket,
} from "../../../util/resources";
import FeatureBox from "../../atom/FeatureBox";

const Features = () => {
  return (
    <div className="">
      <img className="hidden md:absolute mt-16 z-10" src={Feature.default} alt="" />
      <img className="absolute md:hidden mt-16 z-10" src={FeatureMobile.default} alt="" />
      <img
        className="hidden md:absolute z-0 mt-16 -translate-y-8"
        src={FeatureOutline.default}
        alt=""
      />
      <div       
        className="overflow-y-hidden z-30 relative border-3"
      >
        <h1 className="text-4xl font-black text-center">Features of Smartle</h1>    
        <FeatureBox
          pos="left-8 top-20"
          img={Book}
          title={`Hybrid<br />Learning`}
          desc={`Choose courses as Hybrid ( Self-paced and Coach Led) or Completely Self-paced`}
        />
        <FeatureBox
          pos="left-1/4 top-48 -translate-x-10"
          img={Boy}
          title={`International<br />Cocahes`}
          desc={`Instructors and Coaches from around the world to share a global perspective`}
        />
        <FeatureBox
          pos="left-1/2 top-1/2 -translate-y-16 -translate-x-1/2"
          img={Star}
          title={`Earn Completion Credits`}
          desc={`Earn credits for specific courses which can be combined to earn a Micro-Masters Certificate`}
        />
        <FeatureBox
          pos="right-1/4 top-48 translate-x-10"
          img={Calendar}
          title={`Digital<br />Certification`}
          desc={`Earn a digital course competition certificate for successful completion of each course`}
        />
        <FeatureBox
          pos="right-8 top-20"
          img={Rocket}
          title={`Immersive<br />Content`}
          desc={`Story based learning delivered through a play and learn platform.`}
        />
        
      </div>
    </div>
  );
};

export default Features;
