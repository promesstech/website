<script lang="ts">
    import type { Member, Task } from "promess";
    import { scale, slide } from "svelte/transition";
    import { userStore } from "../../../../stores/user";
    import { organizationStore } from "../../../../stores/organization";
    import { formatDate } from "../../../../utils/dates";
    import DateInput from "../../../../components/date/DateInput.svelte";
    import Document from "../../../../components/Document.svelte";

    let member: Member;
    const tasks: Task[] = [];

    let projects: {
        [projectId: string]: {
            name: string;
            id: string;
            expanded: boolean;
            tasks: Task[];
        };
    } = {};

    tasks.forEach((task, i) => {
        if (projects[task.project.id]) {
            projects = {
                ...projects,
                [task.project.id]: {
                    ...projects[task.project.id],
                    tasks: [...projects[task.project.id].tasks, task]
                }
            };
        } else {
            projects = {
                ...projects,
                [task.project.id]: {
                    ...task.project,
                    tasks: [task],
                    expanded: i === 0,
                },
            };
        };
    });

    $: active = "";

    const minimizeTask = () => active = "";

    window.onclick = e => {
        if (!e.target) return;
        // @ts-ignore
        const id = e.target.id;

        if (id === "click-off-task") minimizeTask();
    };

    const toggleProject = (projectId: string) => {
        projects = {
            ...projects,
            [projectId]: {
                ...projects[projectId],
                expanded: !projects[projectId].expanded,
            }
        };
    };

    let selectedTask: Task;
    $: selectedTask;

    const statusValues = {
        "todo": "To Do",
        "in-progress": "In Progress",
        "testing": "Testing",
        "done": "Done",
    };

    const priorityValues = {
        "none": "None",
        "low": "Low",
        "medium": "Medium",
        "high": "High",
        "urgent": "Urgent",
    };

    const selectTask = (id: string) => {
        const task = tasks.find(t => t.id === id);
        active = id;

        if (task) {
            selectedTask = task;
        } else {
            selectedTask = {
                assignees: [ member ],
                createdAt: Date.now(),
                createdBy: member,
                description: "Untitled task",
                dueDate: Date.now(),
                id: `task_${Math.random()}`,
                priority: "low",
                project: {
                    name: "",
                    id: "",
                },
                status: "todo",
                team: {
                    id: "",
                    name: "",
                },
            };
        }
    };
</script>

{#if active && selectedTask}
    <div
        class="absolute w-screen h-screen bg-black bg-opacity-50 z-50 left-0 flex items-center justify-center"
        id="click-off-task"
    >
        <div 
            class="flex flex-col bg-very-dark-primary h-5/6 w-5/6 rounded-2xl"
            transition:scale={{ duration: 100 }}
        >
            <div class="flex justify-end py-3 px-6 border border-solid border-x-0 border-t-0 border-secondary">
                <span
                    class="flex items-center justify-center rounded-md h-6 w-6 bg-secondary font-bold hover:cursor-pointer"
                    on:click={minimizeTask}
                >
                    <img
                        src="/icons/dashboard/x.svg"
                        alt="exit"
                    />
                </span>
            </div>
            <div class="flex flex-row w-full h-full">
                <div class="flex flex-col overflow-y-scroll w-2/3 p-12 px-16 border border-solid border-y-0 border-l-0 border-secondary">
                    <input
                        class="bg-inherit text-3xl font-bold mb-4 p-2 pl-3 rounded-md border border-solid border-secondary"
                        value={selectedTask.description}
                    />
                    <div class="document-container p-2 border-solid border-secondary rounded-md">
                        <Document />
                    </div>
                </div>
                <div class="flex flex-col w-1/3 h-full">
                    <div class="flex flex-col h-full">
                        {#if active !== "create-new-task"}
                            <div class="flex flex-row w-full px-8 py-6 border border-solid border-x-0 border-t-0 border-secondary">
                                <div class="flex flex-col w-1/3">
                                    <span class="font-bold text-lg">Created Date</span>
                                    <span class="text-xs text-secondary mt-2 font-bold">{formatDate(selectedTask.createdAt, "dd/{MM}/yy hh:mm")}</span>
                                </div>
                                <div class="flex flex-col w-1/3">
                                    <span class="font-bold text-lg">Created By</span>
                                    <span class="flex flex-row items-center text-xs text-secondary mt-2 font-bold">
                                        <img
                                            src={selectedTask.createdBy.avatar.url}
                                            alt="avatar"
                                            class="w-4 h-4 rounded-sm"
                                        />
                                        <span class="font-bold ml-2">{selectedTask.createdBy.name}</span>
                                    </span>
                                </div>
                                <div class="flex flex-col w-1/3">
                                    <span class="font-bold text-lg">Id</span>
                                    <span class="text-xs text-secondary mt-2 font-bold">{selectedTask.id}</span>
                                </div>
                            </div>
                        {/if}
                        <div class="flex flex-col p-8 mutable">
                            <div class="field flex flex-row items-center">
                                <div class="flex flex-row w-64 items-center">
                                    <img
                                        src="/icons/dashboard/progress.svg"
                                        alt="progress"
                                        class="w-8 h-8"
                                    />
                                    <span class="text-lg text-secondary font-bold ml-4">Status</span>
                                </div>
                                <select
                                    class="priority no-arrow  {selectedTask.status} text-center hover:cursor-pointer"
                                    on:change={(e) => {
                                        if (!e.target) return;
                                        // @ts-ignore
                                        selectedTask.status = e.target.value;
                                    }}
                                >
                                    {#each Object.entries(statusValues) as [key, value]}
                                        <option class="w-full" value={key} selected={selectedTask.status === key}>{value}</option>
                                    {/each}
                                </select>
                            </div>
                            <div class="field flex flex-row items-center">
                                <div class="flex flex-row w-64 items-center">
                                    <img
                                        src="/icons/dashboard/priority.svg"
                                        alt="progress"
                                        class="w-8 h-8"
                                    />
                                    <span class="text-lg text-secondary font-bold ml-4">Priority</span>
                                </div>
                                <select
                                    class="priority no-arrow {selectedTask.priority} text-center hover:cursor-pointer"
                                    on:change={(e) => {
                                        if (!e.target) return;
                                        // @ts-ignore
                                        selectedTask.priority = e.target.value;
                                    }}
                                >
                                    {#each Object.entries(priorityValues) as [key, value]}
                                        <option class="w-full" value={key} selected={selectedTask.priority === key}>{value}</option>
                                    {/each}
                                </select>
                            </div>
                            <div class="field flex flex-row items-center">
                                <div class="flex flex-row w-64 items-center">
                                    <img
                                        src="/icons/dashboard/assignees.svg"
                                        alt="progress"
                                        class="w-8 h-8"
                                    />
                                    <span class="text-lg text-secondary font-bold ml-4">Assignees</span>
                                </div>
                                <div class="relative h-full w-32">
                                    {#each selectedTask.assignees as assignee, j}
                                        <div
                                            class="avatar absolute"
                                            style="left: {j*8}px;"
                                        >
                                            <img
                                                src={assignee.avatar.url}
                                                alt="avatar"
                                                class="w-8 h-8 rounded-md border border-solid border-black"
                                            />
                                        </div>
                                    {/each}
                                </div>
                            </div>
                            <div class="field flex flex-row items-center">
                                <div class="flex flex-row w-64 items-center">
                                    <img
                                        src="/icons/dashboard/team.svg"
                                        alt="progress"
                                        class="w-8 h-8"
                                    />
                                    <span class="text-lg text-secondary font-bold ml-4">Team</span>
                                </div>
                                <select class="no-arrow font-bold bg-inherit {!selectedTask.team.id && "text-center"} hover:cursor-pointer">
                                    {#each $organizationStore.teams as team}
                                        <option value="" selected>Select a team</option>
                                        <option value={team.id} selected={team.id === selectedTask.team.id}>{team.name}</option>
                                    {/each}
                                </select>
                            </div>
                            <div class="field flex flex-row items-center">
                                <div class="flex flex-row w-64 items-center">
                                    <img
                                        src="/icons/dashboard/dueby.svg"
                                        alt="progress"
                                        class="w-8 h-8"
                                    />
                                    <span class="text-lg text-secondary font-bold ml-4">Due By</span>
                                </div>
                                {#if !selectedTask.dueDate || selectedTask.dueDate !== "none"}
                                    <DateInput
                                        showTime={true}
                                        on:change={e => {
                                            console.log(e.detail.detail);
                                        }}
                                    />
                                {:else}
                                    <span class="font-bold text-xs">None</span>
                                {/if}
                            </div>
                            <div class="field flex flex-row items-center">
                                <div class="flex flex-row w-64 items-center">
                                    <img
                                        src="/icons/dashboard/project.svg"
                                        alt="progress"
                                        class="w-8 h-8"
                                    />
                                    <span class="text-lg text-secondary font-bold ml-4">Project</span>
                                </div>
                                <select class="no-arrow font-bold bg-inherit {!selectedTask.project && "text-center"} hover:cursor-pointer">
                                    {#each $organizationStore.projects as project}
                                        <option value="" selected>Select a project</option>
                                        <option value={project.id} selected={project.id === selectedTask.project.id}>{project.name}</option>
                                    {/each}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row items-center justify-end h-32 px-8">
                        {#if active === "create-new-task"}
                            <button class="bg-accent w-32 mx-4 rounded-md h-10 font-bold">Add Task</button>
                        {:else}
                            <button class="bg-red-500 w-32 mx-4 rounded-md h-10 font-bold">Delete task</button>
                            <button class="bg-accent w-32 mx-4 rounded-md h-10 font-bold">Save changes</button>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
<button
    class="absolute rounded-md py-2 px-8 bg-accent font-bold right-12 bottom-8"
    on:click={() => selectTask("create-new-task")}
>
    + Add Task
</button>
<div class="tasks p-16 h-full flex flex-col overflow-y-scroll">
    {#each Object.values(projects) as project}
        <div class="flex flex-col {project.expanded && "mb-16"}">
            <span
                class="flex flex-row font-bold mb-8 hover:cursor-pointer"
                on:click={() => toggleProject(project.id)}
            >
                <img
                    src="/icons/dashboard/down-arrow.svg"
                    alt="minimize-project"
                    class="arrow {!project.expanded && "collapsed"}"
                />
                <span>{project.name}</span>
            </span>
            {#if project.expanded}
                <div transition:slide={{ duration: 200 }}>
                    <div class="flex flex-row w-full mb-2">
                        <span class="header-column w-8"></span>
                        <span class="header-column w-full">Description</span>
                        <span class="header-column w-72">Team</span>
                        <span class="header-column w-64">Assignees</span>
                        <span class="header-column w-64">Due Date</span>
                        <span class="header-column w-48">Priority</span>
                    </div>
                    {#each project.tasks as task, i}
                        <div
                            class="flex flex-row border border-solid border-secondary border-x-0 {i === project.tasks.length - 1 ? "" : "border-b-0"} hover:cursor-pointer hover:bg-secondary transition-all hover:bg-opacity-5"
                            on:click={() => selectTask(task.id)}
                        >
                            <span class="field last w-8">
                                <span class="status {task.status}"></span>
                            </span>
                            <span class="field font-bold flex flex-row w-full">
                                <span class="text-xs pr-2">{task.description}</span>
                            </span>
                            <span class="field w-72 font-bold text-sm">{task.team.name}</span>
                            <span class="field w-64 flex flex-row ">
                                <div class="relative w-full h-full flex items-center">
                                    {#each task.assignees as assignee, j}
                                        <div
                                            class="avatar absolute"
                                            style="left: {j*8}px;"
                                        >
                                            <img
                                                src={assignee.avatar.url}
                                                alt="avatar"
                                                class="w-6 h-6 rounded-md border border-solid border-black"
                                            />
                                        </div>
                                    {/each}
                                </div>
                            </span>
                            <span class="field w-64 font-bold text-xs">{task.dueDate === "none" ? "none" : formatDate(task.dueDate, "MONTH dSUFFIX")}</span>
                            <span class="field last w-48">
                                <span class="priority {task.priority}">{priorityValues[task.priority]}</span>
                            </span>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    {/each}
</div>

<style lang="postcss">
    .header-column {
        @apply font-bold my-2 pl-4;
    }
    .tasks .field {
        @apply border border-solid border-secondary border-y-0 border-l-0 py-1.5 pl-4 flex flex-row items-center;
    }
    .field.last {
        @apply border-r-0;
    }
    .status {
        @apply w-3 h-3 rounded-sm bg-gray-400;
    }
    .status.todo {
        @apply bg-gray-200;
    }
    .status.in-progress {
        @apply bg-indigo-400;
    }
    .status.testing {
        @apply bg-blue-400;
    }
    .status.done {
        @apply bg-green-400;
    }
    .priority {
        @apply font-bold rounded-sm bg-gray-400 w-24 flex items-center justify-center text-xs h-5;
    }
    .priority.urgent {
        @apply bg-red-400;
    }
    .priority.high {
        @apply bg-orange-400;
    }
    .priority.medium {
        @apply bg-yellow-400;
    }
    .priority.low {
        @apply bg-green-400;
    }
    .arrow {
        -webkit-transition: -webkit-transform .2s ease-in-out;
        -ms-transition: -ms-transform .2s ease-in-out;
        transition: transform .2s ease-in-out;  
    }
    .arrow.collapsed {
        transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
    }
    .mutable .field {
        @apply my-3;
    }
    .mutable .priority.todo {
        @apply bg-gray-400;
    }
    .mutable .priority.in-progress {
        @apply bg-indigo-400;
    }
    .mutable .priority.testing {
        @apply bg-blue-400;
    }
    .mutable .priority.done {
        @apply bg-green-400;
    }
    .document-container {
        min-height: 400px;
    }
</style>