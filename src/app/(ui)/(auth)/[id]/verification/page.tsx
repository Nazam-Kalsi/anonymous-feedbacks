"use client";

import React, { useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userVerificatioSchema } from "@/schema/userVerify.schema";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { ApiResponse } from "@/types/apiResponse";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {};

function page({}: Props) {
  const params=useParams<{id:string}>();
  const { toast } = useToast();
  const route = useRouter();
  const [loading,setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof userVerificatioSchema>>({
    resolver: zodResolver(userVerificatioSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const verifyOTP = async (values: z.infer<typeof userVerificatioSchema>) => {
    console.log(values);
    try {
        setLoading(true);
      const dataToSend = {
        verificationCode: values.verificationCode,
        id:params.id,
      };
      const res = await axios.post(`/api/verify-user`,dataToSend);
      console.log(res.data.data.setNewPassword);

      if(res.data.data.setNewPassword){
        console.log("passwordchange");
        toast({
          title: "Verify successfully",
          description:'Wait while we redricting to change password'
      })
        route.push(`/${params.id}/newPassword`);
        return;

      }
      toast({
        title: "Verify successfullly",
        description:'Wait while we redricting to dashboard'
    })
      route.push('/'); //to dashboard
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Internal server error, try again later.",
      });
    } finally{
        setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-3">
        <div className="flex flex-col items-center justify-center border rounded-xl p-12 w-[35%] h-[70%]">
        <h1 className="text-center text-5xl font-bold pb-8 uppercase bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-400 to-black">Verify your account</h1>
        {/* <h1 className="text-center text-2xl font-semibold pb-8">Enter your OTP</h1> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(verifyOTP)}>
              <FormField
                control={form.control}
                name="verificationCode"
                render={({ field }) => {
                  return (
                    <FormItem className="space-y-2">
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          {...field}
                          value={field.value || ""}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your mail.
                      </FormDescription>
                    </FormItem>
                  );
                }}
              />
              <Button variant={"default"}>
                {loading ? <Loader2 className="animate-spin" /> : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default page;
