"use strict";

angular.module("TodoApp").factory("ItemFactory", () => {
    let items = [
        {
            id: 0,
            task: "mow the lawn",
            isCompleted: false,
            dueDate: "12/5/17",
            assignedTo: "Greg",
            location: "Joe's house",
            urgency: "low",
            dependencies: "sunshine, clippers, hat, water, headphones"
        },
        {
            id: 1,
            task: "grade quizzes, I mean Mastery Watzits",
            isCompleted: false,
            dueDate: "12/5/17",
            assignedTo: "Joe",
            location: "NSS",
            urgency: "high",
            dependencies: "wifi, tissues, vodka"
        },
        {
            id: 2,
            task: "take a nap",
            isCompleted: false,
            dueDate: "5/21/18",
            assignedTo: "Joe",
            location: "Porch of lakefront cabin",
            urgency: "medium",
            dependencies: "hammock, silence"
        }
    ];

    function getTodoItems() {
        return items;
    }

    function addNewItem(todoItem) {
        todoItem.id = items.length;
        items.push(todoItem);
    }

    return { getTodoItems, addNewItem };
});

