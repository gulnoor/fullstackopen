import Header from "./Header";
import Content from "./Content";
import Total from "./Total";
const Course = ({ courseData }) => {
  console.log(courseData);
  return (
    <>
      <Header name={courseData.name} />
      <Content parts={courseData.parts} />
      <Total parts={courseData.parts} />
    </>
  );
};

export default Course;
