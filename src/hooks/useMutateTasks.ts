import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { EditedTask, Task } from '../types'
import useStore from '../store'
import { useError } from '../hooks/useError'

export const useMutateTasks = () => {
    const queryClient = useQueryClient()
    const { swichErrorHandling } = useError()
    const resetEditedTask = useStore((state) => state.resetEditedTask)

    const createTaskMutation = useMutation(
        (task: {title: string}) =>
            axios.post<Task>(`${process.env.REACT_APP_API_URL}/tasks`, task),
        {
            onSuccess: (res) => {
                const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
                if (previousTasks) {
                    queryClient.setQueryData<Task[]>(['tasks'], [
                        ...previousTasks,
                        res.data,
                    ])
                }
                resetEditedTask()
            },
            onError: (error: any) => {
                if (error.response.data.message) {
                    swichErrorHandling(error.response.data.message)
                } else {
                    swichErrorHandling(error.message)
                }
            }
        }
    )

    const updateTaskMutation = useMutation(
        (task: EditedTask) =>
            axios.put<Task>(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, {
                title: task.title,
            }),
        {
            onSuccess: (res, variables) => {
                const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
                if (previousTasks) {
                    queryClient.setQueryData<Task[]>(
                        ['tasks'],
                        previousTasks.map((task) =>
                            task.id === variables.id ? res.data : task
                        )
                    )
                }
                resetEditedTask()
            },
            onError: (error: any, variables) => {
                if (error.response.data.message) {
                    swichErrorHandling(error.response.data.message)
                } else {
                    swichErrorHandling(error.response.data)
                }
            },
        }
    )
    const deleteTaskMutation = useMutation(
        (id: number) =>
        axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`),
        {
            onSuccess: (_, variables) => {
                const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
                if (previousTasks) {
                    queryClient.setQueryData<Task[]>(
                        ['tasks'],
                        previousTasks.filter((task) => task.id !== variables)
                    )
                }
                resetEditedTask()
            },
            onError: (error: any) => {
                if (error.response.data.message) {
                    swichErrorHandling(error.response.data.message)
                } else {
                    swichErrorHandling(error.message)
                }
            },
        }
    )
    return { createTaskMutation, updateTaskMutation, deleteTaskMutation }
}