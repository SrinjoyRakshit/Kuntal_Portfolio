import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import SpecialLoadingButton from './subComponents/SpecialLoadingButton'
import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllForgotPasswordErrors, resetPassword } from '@/store/slices/forgotResetPasswordSlice'
import { toast } from 'react-toastify'
import { getUser } from '@/store/slices/userSlice'

const ResetPassword = () => {
  const {token} = useParams()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { loading, error, message } = useSelector((state) => state.forgotPassword);

  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetPassword = () => {
      dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearAllForgotPasswordErrors());
      }
      if (isAuthenticated) {
        navigate("/login");
      }
      if (message !== null) {
        toast.success(message);
        dispatch(getUser())
      }
    }, [dispatch, isAuthenticated, error, loading]);

  return (
    <div>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <form className={cn("flex flex-col gap-6")}>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Reset Your Password ?</h1>
                  <p className="text-balance text-sm text-muted-foreground">
                    Reset your password and set a new one
                  </p>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label>Enter New Password</Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Confirm New Password</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {loading ? (
                    <SpecialLoadingButton content={"Resetting Password"} />
                  ) : (
                    <Button className="w-full" onClick={handleResetPassword}>
                      Reset Password
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <img
            src="/reset.png"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
