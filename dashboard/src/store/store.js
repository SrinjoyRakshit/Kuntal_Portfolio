import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice.js"
import forgotResetPassReducer from './slices/forgotResetPasswordSlice.js'
import messageReducer from './slices/messagesSlice.js'
import timelineReducer from './slices/timelineSlice.js'
import skillsReducer from './slices/skillSlice.js'
import applicationReducer from './slices/softwareApplicationSlice.js'
import projectReducer from './slices/projectSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotResetPassReducer,
    messages: messageReducer,
    timeline: timelineReducer,
    skill: skillsReducer,
    application: applicationReducer,
    project: projectReducer
  }, 
})