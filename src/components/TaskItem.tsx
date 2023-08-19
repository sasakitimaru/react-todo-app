import { FC, memo } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import useStore from "../store";
import { EditedTask } from "../types";
import { useMutateTasks } from "../hooks/useMutateTasks";

const TaskItemMemo: FC<EditedTask> = ({
  id,
  title,
}) => {
  const updateTask = useStore((state) => state.updateEditedTask);
  const { deleteTaskMutation } = useMutateTasks();
  return (
    <li className="my-3">
      <span className="font-bold border-l-2 border-blue-500 pl-2">{title}</span>
      <div className="flex float-right ml-20">
        <PencilIcon
          onClick={() => updateTask({ id, title })}
          className="w-5 h-5 mx-2 text-blue-500 cursor-pointer"
        />
        <TrashIcon
          onClick={() => deleteTaskMutation.mutate(id)}
          className="w-5 h-5 text-red-500 cursor-pointer"
        />
      </div>
    </li>
  );
};
export const TaskItem = memo(TaskItemMemo);
