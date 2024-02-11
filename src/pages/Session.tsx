import Stepper from "@/components/Stepper";
import StudentDetails from "@/components/Steps/StudentDetails";
import { TestDetails } from "@/components/Steps/TestDetails";
import Timeline from "@/components/Steps/Timeline";
import { RowType } from "@/types/types";
import { getASession } from "@/utils/FormInputHandling";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

export enum Step {
  STUDENT_DETAILS = "StudentDetails",
  TEST_DETAILS = "TestDetails",
  TIMELINE = "Timeline",
}

const stepArr: string[] = [
  Step.STUDENT_DETAILS,
  Step.TEST_DETAILS,
  Step.TIMELINE,
];

export default function SessionCreator(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const [isSessionAdded, setIsSessionAdded] = useState(false);

  const [activeStep, setActiveStep] = useState<string>(Step.STUDENT_DETAILS);
  const [data, setData] = useState<RowType>({
    ...props.FormData,
  });
  console.log(props.FormData.test.id);

  const OnSubmitSession = async () => {
    let response;
    if (props.FormType == "create") {
      response = await fetch("/api/PostFormData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else if (props.FormType === "edit") {
      response = await fetch(
        `/api/UpdateFormData?id=${props.FormData.test.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
    }

    const postResult = await response!.json();

    const sessionId = postResult.id;

    setIsSessionAdded(true);

    setTimeout(() => {
      router.push("/");
      setIsSessionAdded(false);
    }, 2000);
  };

  const activeForm = () => {
    if (activeStep === Step.STUDENT_DETAILS) {
      return (
        <StudentDetails
          data={data}
          setActiveStep={setActiveStep}
          setData={setData}
          isSessionAdded={isSessionAdded}
        />
      );
    } else if (activeStep === Step.TEST_DETAILS) {
      return (
        <TestDetails
          data={data}
          setActiveStep={setActiveStep}
          setData={setData}
          isSessionAdded={isSessionAdded}
        />
      );
    } else {
      return (
        <Timeline
          data={data}
          setActiveStep={setActiveStep}
          setData={setData}
          OnSubmitSession={OnSubmitSession}
          isSessionAdded={isSessionAdded}
        />
      );
    }
  };
  return (
    <>
      <div className="md:flex md:justify-around mt-5 flex flex-col items-center md:flex-row text-xs md:text-lg">
        <div>Session Creator</div>
        <div>Created Date: 26-06-2023</div>
        <div>Created By: Arya Jain</div>
      </div>
      <Stepper steps={stepArr} activeStep={activeStep} />
      {activeForm()}
    </>
  );
}
export const getServerSideProps = (async ({ query: { type, sessionId } }) => {
  if (type === "create") {
    return {
      props: {
        FormData: {
          student: {},
          test: {},
          timeline: {},
          session: {},
        },
        FormType: type,
      },
    };
  } else if (type === "edit" && sessionId) {
    const FormData = await getASession(Number(sessionId));

    return {
      props: { FormData: FormData as RowType, FormType: type },
    };
  } else {
    return {
      //Todo:Redirect to the error page
      props: {
        FormData: {
          student: {},
          test: {},
          timeline: {},
          session: {},
        },
        FormType: type as string,
      },
    };
  }
}) satisfies GetServerSideProps<{ FormData: RowType; FormType: string }>;