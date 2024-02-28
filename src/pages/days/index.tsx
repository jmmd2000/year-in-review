import Head from "next/head";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { Suspense, use, useEffect, useRef, useState } from "react";
import Select, { ActionMeta, MultiValue } from "react-select";
import type { Emotion, Event } from "~/types";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "~/components/ui/sheet";
import { api } from "~/utils/api";
import { XCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/router";
import { Textarea } from "~/components/ui/textarea";

export default function Home() {
  const router = useRouter();
  const { date } = router.query;

  return (
    <>
      <Head>
        <title>YearInReview - Days</title>
        <meta
          name="description"
          content="YearInReview - A web-app for tracking your year"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <h1>Days</h1>
      {date && <NewDayForm date={date as string} />}
      <NewEmotionForm />
      <NewEventForm />
    </>
  );
}

interface NewEmotionFormProps {
  emotion?: Emotion;
}

const NewEmotionForm = (props: NewEmotionFormProps) => {
  const { emotion } = props;
  const {
    mutate: createEmotion,
    isError,
    isLoading,
    isSuccess,
    error,
  } = api.emotion.create.useMutation();

  const emotionSchema = z.object({
    name: z.string().min(1),
    colour: z.string().min(1),
  });

  const form = useForm<z.infer<typeof emotionSchema>>({
    resolver: zodResolver(emotionSchema),
  });

  const onSubmit = (data: z.infer<typeof emotionSchema>) => {
    createEmotion({
      emotion_name: data.name,
      emotion_colour: data.colour,
    });
    console.log(data);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">New Emotion</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="bg-emerald-400 p-6">
          <SheetTitle>{emotion ? "Update" : "New"} Emotion</SheetTitle>
          <SheetDescription>
            {emotion
              ? "Update an existing emotion"
              : "Create a new emotion and give it a colour"}
          </SheetDescription>
        </SheetHeader>
        <div className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emotion name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        defaultValue={emotion?.emotion_name}
                      />
                    </FormControl>
                    <FormMessage>{isError && error.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colour"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Emotion colour</FormLabel>
                    <FormControl>
                      <input
                        type="color"
                        {...field}
                        defaultValue={emotion?.emotion_colour}
                        className="h-8 w-16"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className={`flex gap-1 ${isError ? "bg-red-600 hover:bg-red-400" : "bg-emerald-600 hover:bg-emerald-400"}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  "Creating..."
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 />
                    Created!
                  </>
                ) : isError ? (
                  <>
                    <XCircle />
                    Error
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface NewEventFormProps {
  event?: Event;
}

const NewEventForm = (props: NewEventFormProps) => {
  const { event } = props;
  const {
    mutate: createEvent,
    isError,
    isLoading,
    isSuccess,
    error,
  } = api.event.create.useMutation();

  const eventSchema = z.object({
    name: z.string().min(1),
    colour: z.string().min(1),
  });

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = (data: z.infer<typeof eventSchema>) => {
    createEvent({
      event_name: data.name,
      event_colour: data.colour,
    });
    console.log(data);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">New Event</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="bg-emerald-400 p-6">
          <SheetTitle>{event ? "Update" : "New"} Event</SheetTitle>
          <SheetDescription>
            {event
              ? "Update an existing event"
              : "Create a new event and give it a colour"}
          </SheetDescription>
        </SheetHeader>
        <div className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emotion name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        defaultValue={event?.event_name}
                      />
                    </FormControl>
                    <FormMessage>{isError && error.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colour"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Event colour</FormLabel>
                    <FormControl>
                      <input
                        type="color"
                        {...field}
                        defaultValue={event?.event_colour}
                        className="h-8 w-16"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className={`flex gap-1 ${isError ? "bg-red-600 hover:bg-red-400" : "bg-emerald-600 hover:bg-emerald-400"}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  "Creating..."
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 />
                    Created!
                  </>
                ) : isError ? (
                  <>
                    <XCircle />
                    Error
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface NewDayFormProps {
  date: string;
}

interface FormEvents {
  events: {
    id: string;
    label: string;
    quantity: number;
  }[];
}

const NewDayForm = (props: NewDayFormProps) => {
  const { date } = props;
  const [selectedEvent, setSelectedEvent] = useState<{
    value: string;
    label: string;
  }>();

  const { data: emotions, isLoading: loadingEmotions } =
    api.emotion.fetchAll.useQuery();
  const { data: events, isLoading: loadingEvents } =
    api.event.fetchAll.useQuery();

  // Map the emotions and events to the format required by react-select
  const emotionOptions = emotions?.map((emotion) => ({
    label: emotion.emotion_name,
    value: emotion.id.toString(),
  }));

  const eventOptions = events?.map((event) => ({
    label: event.event_name,
    value: event.id.toString(),
  }));

  const daySchema = z.object({
    emotions: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    ),
    events: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
        quantity: z.number(),
      }),
    ),
    comments: z.string().optional(),
  });

  const form = useForm<z.infer<typeof daySchema>>({
    resolver: zodResolver(daySchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "events",
  });

  const onSubmit = (data: z.infer<typeof daySchema>) => {
    // createEvent({
    //   event_name: data.name,
    //   event_colour: data.colour,
    // });
    // console.log("Submitted form:", form.getValues());
    console.log("Submitted data:", data);
    // console.log("Fields:", fields);
  };

  // const handleEventChange = (
  //   value: MultiValue<{
  //     value: string;
  //     label: string;
  //   }>,
  //   _action: ActionMeta<{
  //     value: string;
  //     label: string;
  //   }>,
  // ) => {
  //   // Convert selected options to state format with default quantity
  //   const updatedSelectedEvents: SelectedEvent[] = value.map((option) => {
  //     const existing = selectedEvents.find(
  //       (event) => event.id === option.value,
  //     );
  //     return {
  //       id: option.value,
  //       label: option.label,
  //       quantity: existing ? existing.quantity : 1,
  //     };
  //   });
  //   setSelectedEvents(updatedSelectedEvents);
  //   console.log(updatedSelectedEvents);
  //   console.log(selectedEvents);
  // };

  // Render quantity inputs for each selected event
  // const renderQuantityInputs = () => {
  //   return selectedEvents.map((event, index) => (
  //     <div key={event.id}>
  //       <label>Quantity for {event.label}</label>
  //       <input
  //         type="number"
  //         value={event.quantity}
  //         onChange={(e) => {
  //           const updatedEvents = [...selectedEvents];
  //           updatedEvents[index]!.quantity = parseInt(e.target.value, 10);
  //           setSelectedEvents(updatedEvents);
  //         }}
  //         min="1"
  //       />
  //     </div>
  //   ));
  // };

  return (
    <div className="max-w-[750px] rounded-lg border border-green-200 p-3">
      <h2 className="mb-4 text-xl font-medium">New Day - {date.toString()}</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          onError={(errors) => console.log(errors)}
        >
          <FormField
            control={form.control}
            name="emotions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emotions</FormLabel>
                <FormControl>
                  {emotionOptions && (
                    <Select
                      {...field}
                      isMulti
                      isLoading={loadingEmotions}
                      options={emotionOptions}
                      placeholder="Select emotions..."
                    />
                  )}
                </FormControl>
                <FormDescription>
                  How did you feel today? Select all that apply from <b>most</b>{" "}
                  to <b>least</b> relevant.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3">
            <FormLabel>Events</FormLabel>
            <div className="flex gap-2">
              <Select
                options={eventOptions}
                placeholder="Select event..."
                onChange={(e) =>
                  setSelectedEvent({
                    value: e!.value,
                    label: e!.label,
                  })
                }
                className="w-5/6"
              />
              <Button
                className="w-1/6"
                onClick={(e) => {
                  e.preventDefault();
                  append({
                    value: selectedEvent?.value ?? "",
                    label: selectedEvent?.label ?? "",
                    quantity: 1,
                  });
                }}
              >
                Add event
              </Button>
            </div>
            <FormDescription>
              How many times did each event happen?
            </FormDescription>
          </div>
          <FormField
            control={form.control}
            name="events"
            render={() => (
              <FormItem>
                <FormControl>
                  <ul className="space-y-2">
                    {fields.map((item, index) => (
                      <li
                        key={item.id}
                        className="flex flex-col gap-1"
                      >
                        <span>{item.label}</span>
                        <div className="flex gap-1">
                          <Input
                            type="number"
                            defaultValue={item.quantity}
                            min="1"
                            className="w-5/6"
                            {...form.register(
                              `events.${index}.quantity` as const,
                              {
                                setValueAs: (value) =>
                                  value === "" ? undefined : Number(value),
                              },
                            )}
                          />
                          <Button
                            onClick={() => remove(index)}
                            className="w-1/6"
                          >
                            Remove
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comments</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Add a comment..."
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>
                  Anything else you&apos;d like to add?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
