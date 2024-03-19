import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCreateTweet } from "../features/tweetApi";
import { Button, Input } from "./index";
import { useForm } from "react-hook-form";

const UploadTweetModal = ({ setUploadTweetModal }) => {
  const { register, handleSubmit } = useForm();

  const {
    mutateAsync: uploadTweetApi,
    isPending: uploadingTweet,
    isSuccess: tweetUploaded,
  } = useCreateTweet();

  const onTweetSubmit = async (data) => {
    console.log(data.content)
    try {
      const response = await uploadTweetApi({ content: data.content });

      if (response) {
        toast.success(response?.message);
      }
    } catch (error) {
        toast.error("Error uploading tweet")
      console.error(error);
    }
  };

  return (
    <div className="absolute z-[999999] left-0 top-0 right-0 bottom-0 bg-dark-2 bg-opacity-80 flex items-center justify-center p-3">
      <div className="max-w-3xl w-full mx-auto py-2 bg-light-1 dark:bg-dark-1 my-4 rounded-md">
        {uploadingTweet ? (
          <div className="w-full px-3 text-dark-1 dark:text-light-1">
            <h3 className="text-lg">Uploading Tweet...</h3>
            <p>Track your tweet uploading process.</p>
          </div>
        ) : tweetUploaded ? (
          <div className="w-full px-3 text-dark-1 dark:text-light-1">
            <h3 className="text-lg">Tweet Uploaded!</h3>
            <Button
              className="w-full mt-2"
              onClick={() => setUploadTweetModal(false)}>
              Finish
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onTweetSubmit)}
            className="flex flex-col justify-start gap-2 w-full h-[300px] overflow-x-hidden overflow-y-auto px-3 bg-light-1 dark:bg-dark-1">
            <div className="flex items-center justify-between gap-2 py-3 border-b border-b-dark-2 dark:border-b-light-2">
              <h4 className="font-semibold text-lg text-dark-2 dark:text-light-2">
                Upload Tweet
              </h4>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => setUploadTweetModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Tweet</Button>
              </div>
            </div>
            <div>
              <label className="text-dark-1 dark:text-light-1 font-medium">
                Tweet Content
              </label>
              <Input
                type="text"
                label=""
                className="pl-0 pr-0 dark:text-light-1"
                inputWrapperClassName="dark:border-light-2"
                labelClassName="text-dark-2 dark:text-light-2"
                {...register("content", { required: true })}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UploadTweetModal;
