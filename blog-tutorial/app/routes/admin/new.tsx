import { Form, useActionData, useTransition } from "@remix-run/react";
import { ActionFunction, redirect, json } from "@remix-run/node";
import { prisma } from "~/db.server";

export const action: ActionFunction = async ({ request }) => {
  console.log("in action");
  const formData = await request.formData();
  console.log(formData, "formData");
  const name = formData.get("name");
  const mobile = formData.get("mobile");
  const address = formData.get("address");

  const errors = {
    name: name ? null : "Name is required",
    mobile: mobile ? null : "Mobile number is required",
    address: address ? null : "Address is required",
  };

  const hasErrors = Object.values(errors).some((error) => error);
  if (hasErrors) {
    return json(errors);
  }

  createPost({ name, mobile, address });
  return redirect("admin");
};

function createPost(request) {
  return prisma.note.create({ data: request });
}

export default function NewNestedRoute() {
  const errors = useActionData();
  const transition = useTransition();
  const isCreating = Boolean(transition.submission);
  return (
    <Form method="post" className="flex flex-col">
      <label>
        Enter Name :{" "}
        {errors?.name ? <em className="text-red-600">{errors?.name}</em> : null}
        <input
          className="mb-2 border border-solid"
          type="text"
          name="name"
          placeholder="Enter your name"
        />
      </label>
      <label>
        Mobile Number :
        {errors?.mobile ? (
          <em className="text-red-600">{errors?.mobile}</em>
        ) : null}
        <input
          className="mb-2 border border-solid"
          type="number"
          name="mobile"
          placeholder="Enter your mobile number"
        />
      </label>
      <label>
        Address :
        {errors?.address ? (
          <em className="text-red-600">{errors?.address}</em>
        ) : null}
        <input
          className="mb-2 border border-solid"
          name="address"
          placeholder="Enter your address"
        />
      </label>
      <button
        className={
          isCreating
            ? "bg-blue-gray-500 mb-2 w-24 border border-solid text-black"
            : "mb-2 w-24 border border-solid bg-blue-500 text-white"
        }
        type="submit"
        placeholder="Enter your address"
      >
        Submit
      </button>
    </Form>
  );
}
