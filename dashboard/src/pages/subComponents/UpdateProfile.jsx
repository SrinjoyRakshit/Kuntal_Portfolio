import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllUserErrors, getUser, resetProfile, updateProfile } from "@/store/slices/userSlice";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );
  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url
  );
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url
  );
  const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL);
  const [githubURL, setGithubURL] = useState(
    user && (user.githubURL === "undefined" ? "" : user.githubURL)
  );
  const [linkedInURL, setlinkedInURL] = useState(
    user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL)
  );
  const [instagramURL, setInstagramURL] = useState(
    user && (user.instagramURL === "undefined" ? "" : user.instagramURL)
  );
  const [facebookURL, setFacebookURL] = useState(
    user && (user.facebookURL === "undefined" ? "" : user.facebookURL)
  );
  const [twitterURL, setTwitterURL] = useState(
    user && (user.twitterURL === "undefined" ? "" : user.twitterURL)
  );

  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  }

  const updateProfileHandler = () => {
    const formData = new FormData()
    formData.append('fullName', fullName)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('aboutMe', aboutMe)
    formData.append('avatar', avatar)
    formData.append('resume', resume)
    formData.append('portfolioURL', portfolioURL)
    formData.append('githubURL', githubURL)
    formData.append('linkedInURL', linkedInURL)
    formData.append('instagramURL', instagramURL)
    formData.append('facebookURL', facebookURL)
    formData.append('twitterURL', twitterURL)
    dispatch(updateProfile(formData))
  }

  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch(clearAllUserErrors())
    }
    if(isUpdated){
      dispatch(getUser())
      dispatch(resetProfile())
    }
    if(message){
      toast.success(message)
    }
  }, [dispatch, loading, error, isUpdated])

  return (
      <div className='w-full h-full'>
        <div className='grid w-[100%] gap-6'>
          <div className='grid gap-2'>
            <h1 className='text-3xl font-bold'>Update Profile</h1>
            <p className='mb-5'>Update Your Profile</p>
          </div>
        </div>
        <div>
          <div className='grid gap-6'>
            <div className='flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5'>
              <div className='grid gap-2 w-full sm:w-72'>
                <Label>Profile Image</Label>
                <img 
                  src={avatarPreview ? avatarPreview : `/vite.svg`} 
                  alt="" 
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"  
                />
                <div className="relative">
                  <input 
                    type="file" 
                    onChange={avatarHandler} 
                    className='avatar-update-btn'
                  />
                </div>
              </div>
              <div className='grid gap-2 w-full sm:w-72'>
                <Label>Your Resume</Label>
                <Link to={user && user.resume && user.resume.url} target="_blank">
                  <img 
                    src={resumePreview ? resumePreview : `/vite.svg`} 
                    alt="" 
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"  
                  />
                </Link>
                <div className="relative">
                  <input 
                    type="file" 
                    multiple
                    onChange={resumeHandler} 
                    className='avatar-update-btn'
                  />
                </div>
              </div>
            </div>
            <div className='grid gap-2'>
              <Label>Full Name</Label>
              <Input 
                type='text' 
                placeholder='Enter your full name'
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
              />
            </div>
            <div className='grid gap-2'>
              <Label>Email</Label>
              <Input 
                type='email'
                placeholder='Enter your email'
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className='grid gap-2'>
              <Label>Phone</Label>
              <Input 
                type='text'
                placeholder='Enter your phone number' 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>
            <div className='grid gap-2'>
              <Label>About Me</Label>
              <Textarea 
                placeholder='Tell us about yourself'
                value={aboutMe} 
                onChange={(e) => setAboutMe(e.target.value)} 
              />
            </div>
            <div className='grid gap-2'>
              <Label>Portfolio URL</Label>
              <Input 
                type='text' 
                placeholder='Enter your Portfolio URL'
                value={portfolioURL} 
                onChange={(e) => setPortfolioURL(e.target.value)} 
              />
            </div>
            <div className='grid gap-2'>
              <Label>Github URL</Label>
              <Input 
                type='text' 
                placeholder='Enter your Github Profile URL'
                value={githubURL} 
                onChange={(e) => setGithubURL(e.target.value)} 
              />
            </div>
            <div className='grid gap-2'>
              <Label>LinkedIn URL</Label>
              <Input 
                type='text' 
                placeholder='Enter your LinkedIn Profile URL'
                value={linkedInURL} 
                onChange={(e) => setlinkedInURL(e.target.value)} 
              />
            </div>
            <div className='grid gap-2'>
              <Label>Instagram URL</Label>
              <Input 
                type='text' 
                placeholder='Enter your Instagram Profile URL'
                value={instagramURL} 
                onChange={(e) => setInstagramURL(e.target.value)} 
              />
            </div>
            <div className='grid gap-2'>
              <Label>Facebook URL</Label>
              <Input 
                type='text' 
                placeholder='Enter your Facebook Profile URL'
                value={facebookURL} 
                onChange={(e) => setFacebookURL(e.target.value)} 
              />
            </div>
            <div className='grid gap-2'>
              <Label>Twitter (X) URL</Label>
              <Input 
                type='text' 
                placeholder='Enter your Twitter (X) handle'
                value={twitterURL} 
                onChange={(e) => setTwitterURL(e.target.value)} 
              />
            </div>
            <div className="grid gap-2">
              {
                !loading ? 
                <Button onClick={updateProfileHandler}>
                  Update Profile
                </Button>
                : 
                <SpecialLoadingButton content={"Updating"} />
              }
            </div>
          </div>
        </div>
      </div>
    )
};

export default UpdateProfile;
