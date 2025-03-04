import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [technologies, setTechnologies] = useState("");

  const { id } = useParams();
  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/project/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setProjectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
          setGitRepoLink(res.data.project.gitRepoLink);
          setDownloadLink(res.data.project.downloadLink);
          setTechnologies(res.data.project.technologies);
        })
        .catch((error) => {
          toast(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  const descriptionInListFormat = description.split(". ");
  const technologiesInListFormat = technologies.split(", ");

  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <div className="w-[100%] px-5 md:w-[1000px]">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="flex justify-between items-center my-5">
                <h2 className="font-semibold leading-7 text-gray-100 text-2xl text-center">
                  View Project
                </h2>
                <Link to="/">
                  <Button>Return to Home</Button>
                </Link>
              </div>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <h1 className="text-2xl font-bold mb-4">{title}</h1>
                  <img
                    src={projectBanner ? projectBanner : "/docholder.svg"}
                    alt=""
                    className="w-full h-auto"
                  />
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-xl mb-2">Description</p>
                  <ul className="list-disc">
                    {descriptionInListFormat.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-xl mb-2">Technologies</p>
                  <ul className="list-disc">
                    {technologiesInListFormat.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-xl mb-2">Github Repository Link:</p>
                  <Link
                    to={gitRepoLink}
                    target="_blank"
                    className="text-sky-700"
                  >
                    {gitRepoLink}
                  </Link>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-xl mb-2">Download Link:</p>
                  <Link
                    to={downloadLink ? `${downloadLink}` : "/"}
                    target="_blank"
                    className="text-sky-700"
                  >
                    {downloadLink
                      ? `${downloadLink}`
                      : "Still not generated Link"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectView;
