import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import BaseForm from "@/components/form/base-form";
import eventService from "@/services/event-service";

export const getServerSideProps = async (context) => {
  const response = await eventService.fetchEventById(context.query?.id);
  const fetchedEvent = await response.json();

  return { props: { fetchedEvent: JSON.parse(JSON.stringify(fetchedEvent)) } };
};

export default function UpdatePage({ fetchedEvent }) {
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
      formData.append("image", selectedFile);
      formData.append("authorId", data?.user.email);
      formData.append("registeredImage", fetchedEvent.image);
      for (const key in form) formData.append(key, form[key]);
      await eventService.upateEvent(formData, router.query?.id);
      router.push("/home");
    } catch (err) {
      // If i have time add notification
      console.log(err);
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
