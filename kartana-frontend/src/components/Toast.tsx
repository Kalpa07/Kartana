// components/Toast.tsx
import { Fragment } from "react";
import { Transition } from "@headlessui/react";

type ToastProps = {
  message: string;
  type: "error" | "success";
  show: boolean;
};

export default function Toast({ message, type, show }: ToastProps) {
  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transition ease-out duration-300"
      enterFrom="opacity-0 translate-y-4"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-4"
    >
      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 rounded-lg px-4 py-2 text-sm font-medium shadow-lg
          ${type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}
        `}
      >
        {message}
      </div>
    </Transition>
  );
}
