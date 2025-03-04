import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SpecialLoadingButton from './SpecialLoadingButton'
import { clearAllMessageErrors, deleteMessage, getAllMessages, resetMessageSlice } from '@/store/slices/messagesSlice'
import { toast } from 'react-toastify'

const Messages = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleReturnToDashboard = () => {
    navigate("/")
  }
  const {loading, messages, error, message} = useSelector(state => state.messages)
  const [messageId, setMessageId] = useState("")
  const handleDeleteMessage = (id) => {
    setMessageId(id)
    dispatch(deleteMessage(id))
  }

  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch(clearAllMessageErrors())
    }
    if(message){
      toast.success(message)
      dispatch(resetMessageSlice())
      dispatch(getAllMessages())
    }
  }, [dispatch, error, message, loading])

  return (
    <>
      <div className='min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20'>
        <Tabs className='lg:mr-5 sm:mr-0'>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle className="text-xl">Your Messages</CardTitle>
                <Button className="w-fit" onClick={handleReturnToDashboard}>
                  Delete all Messages
                </Button>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {
                  messages && messages.length > 0 ? 
                  (
                    messages.map((element) => {
                      return (
                        <Card key={element._id} className="grid gap-2 p-4">
                          <CardDescription className="text-slate-950">
                            <span className='font-bold mr-2'>Sent by: </span>
                            {element.senderName}
                          </CardDescription>
                          <CardDescription className="text-slate-950">
                            <span className='font-bold mr-2'>Subject: </span>
                            {element.subject}
                          </CardDescription>
                          <CardDescription className="text-slate-950">
                            <span className='font-bold mr-2'>Message: </span>
                            {element.message}
                          </CardDescription>
                          <CardFooter className="justify-end">
                            {
                              loading && (messageId === element._id) ? (
                              <SpecialLoadingButton content={"Deleting"} width={"w-32"} />
                            ) : (
                              <Button
                                className="w-32"
                                onClick={() => handleDeleteMessage(element._id)}
                              >
                                Delete
                              </Button>
                            )
                            }
                          </CardFooter>
                        </Card>
                      )
                    })
                  )
                  : <CardHeader>No Messages Found!</CardHeader>
                }
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default Messages
