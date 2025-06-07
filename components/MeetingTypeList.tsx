"use client";
import React, { useState } from "react";
import Image from "next/image";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { useRouter } from "next/navigation";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from 'react-datepicker';
import { Input } from "./ui/input";


const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setmeetingState] = useState<
    "isScheduleMeeting" | "isJoinMeeting" | "isInstantMeeting" | undefined
  >();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  // const createMeeting = async () => {
  //   if (!client || !user) return;

  //   try {
  //     if (!values.dateTime) {
  //       toast({ title: "Please select a date and time" });
  //       return;
  //     }
  //     const id = crypto.randomUUID();
  //     const call = client.call("default", id);

  //     if (!call) throw new Error("Failed to create meeting");
  //     const startsAt =
  //       values.dateTime.toISOString() || new Date(Date.now()).toISOString();
  //     const description = values.description || "Instant Meeting";

  //     await call.getOrCreate({
  //       data: {
  //         starts_at: startsAt,
  //         custom: {
  //           description,
  //         },
  //       },
  //     });
  //     setCallDetails(call);

  //     if (!values.description) {
  //       router.push(`/meeting/${call.id}`);
  //     }

  //     toast({ title: "Meeting Created" });
  //   } catch (error) {
  //     console.log(error);
  //     toast({
  //       title: "Failed to Setup Meeting",
  //     });
  //   }
  // };

  const createMeeting = async () => {
    if (!client || !user) {
      toast({ title: "Please sign in to create a meeting" });
      return;
    }
  
    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" });
        return;
      }

      // Validate user email
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (!userEmail) {
        toast({ title: "No email address found for your account" });
        return;
      }

      // Validate base URL
      if (!process.env.NEXT_PUBLIC_BASE_URL) {
        toast({ title: "Server configuration error" });
        console.error('NEXT_PUBLIC_BASE_URL is not set');
        return;
      }
  
      const id = crypto.randomUUID();
      const call = client.call("default", id);
  
      if (!call) throw new Error("Failed to create meeting");
  
      const startsAt = values.dateTime.toISOString();
      const description = values.description || "Instant Meeting";
  
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
  
      setCallDetails(call);
  
      const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${id}`;
  
      // Send confirmation email
      const emailResponse = await fetch('/api/send-confirmation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: userEmail,
          subject: 'Meeting Confirmation',
          description,
          link: meetingLink,
          dateTime: values.dateTime,
        }),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        console.error('Email sending failed:', errorData);
        throw new Error(errorData.error || 'Failed to send confirmation email');
      }
      
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
  
      toast({ title: "Meeting Created & Email Sent" });
    } catch (error) {
      console.error('Meeting creation error:', error);
      toast({ 
        title: "Error", 
        description: error instanceof Error ? error.message : "Failed to setup meeting",
        variant: "destructive"
      });
    }
  };
  

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="  public/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setmeetingState("isInstantMeeting")}
        className="bg-orange-1"
      />
      <HomeCard
        img="  public/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setmeetingState("isScheduleMeeting")}
        className="bg-blue-1"
      />
      <HomeCard
        img="public/icons/recordings.svg"
        title=" View Recordings"
        description="Check Your recordings"
        handleClick={() => router.push('/recordings')}
        className="bg-purple-1"
      />
      <HomeCard
        img="public/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link   "
        handleClick={() => setmeetingState("isJoinMeeting")}
        className="bg-yellow-1"
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setmeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            />
          </div>

          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-2 p-2 focus:outline-none"
            />
          </div>
          
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setmeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast ({title:'Link copied'})
          }}
          image="public/icons/checked.svg"
          buttonIcon="public/icons/ccopy.svg"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setmeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start-meeting"
        handleClick={createMeeting}
      />

        <MeetingModal
        isOpen={meetingState === "isJoinMeeting"}
        onClose={() => setmeetingState(undefined)}
        title="Type the link Here"
        className="text-center"
        buttonText="Join Meeting Here"
        handleClick={()=>router.push(values.link)}
        >
          <Input placeholder="Meeting Link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
