import Json from './courses.json';
import EnterpriseJson from './enterpriseCourses.json';
export const videoBase = "https://www.youtube.com/embed/";


export const courseList: any = [...Json];
export const enterpriseCourseList: any = [...EnterpriseJson];

export const instructorList = [
  {
    id: 1,    
    name: "George Smith",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas quos minima incidunt asperiores iure illum nihil, quod aspernatur praesentium dignissimos, repellat itaque reiciendis a ut.",
    stars: 5,
    reviews: 112,
    availability: "Once in a week",
    image: "/images/instructors/instructor1.png",
  },
];