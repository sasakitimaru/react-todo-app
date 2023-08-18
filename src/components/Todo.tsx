import { FormEvent } from "react";
import { useQueryClient } from '@tanstack/react-query'
import {
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid'
import useStore from '../store'
// import { useQueryTasks } from '../hooks/useQueryTasks'
// import { useMutateTask } from '../hooks/useMutateTask'
import { useMutateAuth } from '../hooks/useMutateAuth'
// import { TaskItem } from './TaskItem'

export const Todo = () => {
    const queryClient = useQueryClient()
    const { editedTask } = useStore()
    const updateTaske = useStore((state) => state.updateEditedTask)
    // const { data, isLoading } = useQueryTasks()
    const { logoutMutation } = useMutateAuth()
    const logout = async () => {
        await logoutMutation.mutateAsync()
    }
  return (
    <div>
        <ArrowRightOnRectangleIcon
            onClick={logout}
            className="w-6 h-6 mr-2 text-blue-500 cursor-pointer"
        />
    </div>
  )
}
