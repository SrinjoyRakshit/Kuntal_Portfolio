import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearAllForgotPasswordErrors,
  forgotPassword,
} from "@/store/slices/forgotResetPasswordSlice";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SpecialLoadingButton from "./subComponents/SpecialLoadingButton";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
    if (message !== null) {
      toast.success(message);
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
                  <h1 className="text-2xl font-bold">Forgot Your Password ?</h1>
                  <p className="text-balance text-sm text-muted-foreground">
                    Enter email for Reset password request
                  </p>
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Link
                        to={"/login"}
                        className="text-sm underline-offset-4 hover:underline"
                      >
                        Remember your password?
                      </Link>
                    </div>
                  </div>
                  {loading ? (
                    <SpecialLoadingButton content={"Requesting"} />
                  ) : (
                    <Button className="w-full" onClick={handleForgotPassword}>
                      Send Request
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center bg-muted">
          <img
            src="/forgot.png"
            alt="Image"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
