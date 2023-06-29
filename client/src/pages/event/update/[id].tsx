import { useState } from "react";
import { Event } from "../../../types";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import BaseForm from "@/components/form/base-form";
import eventService from "@/services/event-service";
import notificationService from "@/services/notification-service";

export const getServerSideProps = async (context: any) => {
  const response = await eventService.fetchEventById(context.query?.id);
  const fetchedEvent = response ? await response.json() : [];

  return { props: { fetchedEvent: JSON.parse(JSON.stringify(fetchedEvent)) } };
};

export default function UpdatePage({ fetchedEvent }: { fetchedEvent: Event }) {
  const [form, setForm] = useState({
    date: fetchedEvent.date,
    title: fetchedEvent.title,
    location: fetchedEvent.location,
    category: fetchedEvent.category,
    description: fetchedEvent.description,
  });

  const router = useRouter();
  const { data, status } = useSession();
  const [selectedImage, setSelectedImage] = useState(fetchedEvent.image);
  const [selectedFile, setSelectedFile] = useState<File>();

  const updateEvent = async () => {
    const formData = new FormData();

    try {
      // @ts-ignore
      formData.append("image", selectedFile);
      // @ts-ignore
      formData.append("authorId", data?.user.email);
      // @ts-ignore
      formData.append("registeredImage", fetchedEvent.image);
      // @ts-ignore
      for (const key in form) formData.append(key, form[key]);
      const response = await eventService.upateEvent(
        formData,
        router.query?.id
      );

      if (response?.ok === false)
        throw new Error("Image, location or date are invalid");

      notificationService.simpleNotification(
        "Event updated successfully",
        "success"
      );

      router.push("/home");
    } catch (err) {
      notificationService.simpleNotification(err, "error");
    }
  };
  return (
    <BaseForm
      form={form}
      isUpdate={true}
      setForm={setForm}
      action={updateEvent}
      selectedFile={selectedFile}
      selectedImage={selectedImage}
      setSelectedFile={setSelectedFile}
      setSelectedImage={setSelectedImage}
    />
  );
}
