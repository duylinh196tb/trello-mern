const initialData = {
  tasks: [
    { _id: "task-1", content: "task 1" },
    { _id: "task-2", content: "task 2" },
    { _id: "task-3", content: "task 3" },
    { _id: "task-4", content: "task 4" },
    { _id: "task-5", content: "task 5" },
    { _id: "task-6", content: "task 6" }
  ],

  columns: [
    {
      _id: "column-1",
      title: "To do",
      taskOrder: ["task-1", "task-2", "task-3", "task-4"]
    },
    {
      _id: "column-2",
      title: "Doing",
      taskOrder: ["task-5", "task-6"]
    },
    {
      _id: "column-3",
      title: "Done",
      taskOrder: []
    }
  ],
  // board: ['column-1']
  board: ["column-1", "column-2", "column-3"]
};

export default initialData;
