"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    bio: "",
    date: new Date().toISOString().slice(0, 10),
  });

  // Handle change for both <input> and <textarea>
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Correct type for form submit event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const uuid = uuidv4();

    fetch(
      `/api/profiles?id=${uuid}&name=${formData.name}&bio=${formData.bio}&date=${formData.date}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, id: uuid }),
      }
    )
      .then(() => {
        setFormData({
          id: "",
          name: "",
          bio: "",
          date: "",
        });
        router.push("/?tab=profiles");
      })
      .catch(console.error);
  };

  return (
    <div className="bg-white p-8 rounded shadow">
      <h2 className="text-2xl mb-4 text-purple-700">New Profile Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-2 border-purple-100 p-2 rounded-md focus:border-purple-200 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="bio" className="block font-medium">
            Bio:
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4} // rows should be a number
            value={formData.bio}
            onChange={handleChange}
            className="w-full border-2 border-purple-100 p-2 rounded-md focus:border-purple-200 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="date" className="block font-medium">
            Date:
          </label>
          <input
            type="text"
            id="date"
            name="date"
            value={formData.date}
            readOnly
            className="w-full border-2 border-purple-100 p-2 rounded-md focus:border-purple-200 focus:outline-none"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-400 text-white px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
