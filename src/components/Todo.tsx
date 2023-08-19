import { FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import useStore from "../store";
import { useQueryTasks } from "../hooks/useQueryTasks";
import { useMutateTasks } from "../hooks/useMutateTasks";
import { useMutateAuth } from "../hooks/useMutateAuth";
import { TaskItem } from "./TaskItem";

export const Todo = () => {
  const queryClient = useQueryClient();
  const { editedTask } = useStore();
  const updateTask = useStore((state) => state.updateEditedTask);
  const { data, isLoading } = useQueryTasks();
  const { createTaskMutation, updateTaskMutation } = useMutateTasks();
  const { logoutMutation } = useMutateAuth();
  const submitTaskHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedTask.id === 0) {
      await createTaskMutation.mutateAsync({ title: editedTask.title });
    } else {
      await updateTaskMutation.mutateAsync(editedTask);
    }
    await queryClient.invalidateQueries(["tasks"]);
    updateTask({ id: 0, title: "" });
  };
  const logout = async () => {
    await logoutMutation.mutateAsync();
    await queryClient.invalidateQueries(["tasks"]);
  };
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div className="flex items-center my-3">
        <ShieldCheckIcon className="w-8 h-8 mr-3 text-indigo-500 cursor-pointer" />
        <span className="text-center text-3xl font-extrabold">
          Task Manager
        </span>
      </div>
      <ArrowRightOnRectangleIcon
        className="w-6 h-6 mb-2 text-blue-500 cursor-pointer"
        onClick={logout}
      />
      <form onSubmit={submitTaskHandler}>
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="title here"
          type="text"
          value={editedTask.title}
          onChange={(e) => updateTask({ ...editedTask, title: e.target.value })}
        />
        <button
          className="disabled:opacity-40 disabled:cursor-not-allowed ml-2 py-2 px-3 bg-indigo-600 hover:bg-indigo-900 text-white rounded focus:outline-none"
          disabled={!editedTask.title}
          type="submit"
        >
          {editedTask.id === 0 ? "Create" : "Update"}
        </button>
      </form>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="my-5">
          {data?.map((task) => (
            <TaskItem key={task.id} id={task.id} title={task.title} />
          ))}
        </ul>
      )}
    </div>
  );
};
