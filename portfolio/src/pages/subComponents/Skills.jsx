import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/skill/getall",
        {
          withCredentials: true,
        }
      );
      setSkills(data.skills);
    };
    getMySkills();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  return (
    <>
      <div className="w-full flex flex-col gap-8 sm:gap-12">
        <h1
          className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] tracking-[15px] dancing_text flex items-center justify-center w-fit"
        >
          Skills
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills &&
          skills.map((element, index) => (
            <motion.div
              key={element._id}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-fit p-7 flex flex-col justify-center items-center gap-3 cursor-pointer">
                <img src={element.svg?.url} alt="skill" className="h-12 sm:h-24 w-auto" />
                <p className="text-muted-foreground text-center">{element.title}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Skills;
