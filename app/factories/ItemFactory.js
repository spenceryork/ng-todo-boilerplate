"use strict";

angular.module("TodoApp").factory("ItemFactory", (FBUrl, $http, $q) => {
    // let items = [
    //     {
    //         id: 0,
    //         task: "mow the lawn",
    //         isCompleted: false,
    //         dueDate: "12/5/17",
    //         assignedTo: "Greg",
    //         location: "Joe's house",
    //         urgency: "low",
    //         dependencies: "sunshine, clippers, hat, water, headphones"
    //     },
    //     {
    //         id: 1,
    //         task: "grade quizzes, I mean Mastery Watzits",
    //         isCompleted: false,
    //         dueDate: "12/5/17",
    //         assignedTo: "Joe",
    //         location: "NSS",
    //         urgency: "high",
    //         dependencies: "wifi, tissues, vodka"
    //     },
    //     {
    //         id: 2,
    //         task: "take a nap",
    //         isCompleted: false,
    //         dueDate: "5/21/18",
    //         assignedTo: "Joe",
    //         location: "Porch of lakefront cabin",
    //         urgency: "medium",
    //         dependencies: "hammock, silence"
    //     }
    // ];


    function getTodoItems() {
        // return items;
        return $q( (resolve, reject) => {
            $http
            .get(`${FBUrl}/items.json`)
            .then( (todos) => {
                // console.log("todos data from FB", todos.data);
                let keys = Object.keys(todos.data);
                keys.forEach(key => {
                //    console.log("key", key); 
                   todos.data[key].id = key;
                });
                let todoArr = Object.values(todos.data);
                console.log("todos array from FB", todoArr);
                resolve(todoArr);
            })
            .catch( (error) => {
                reject(error);
            });
        });
        // return { getTodoItems }
    }


    function deleteTodoItems(id) {
        // return items;
        console.log("id", id);
        return $q( (resolve, reject) => {
            $http
            .delete(`${FBUrl}/items/${id}.json`)
            .then( (todos) => {
                console.log("Todo has been deleted");
                resolve();
            })
            .catch( (error) => {
                reject(error);
            });
        });
    }

    function addNewItem(todoItem) {
        // todoItem.id = items.length;
        // items.push(todoItem);
        return $q( (resolve, reject) => {
            $http.post(`${FBUrl}/items.json`,
                JSON.stringify(todoItem)
            )
            .then( (data) => {
                console.log("New Item posted", data.data.name);
            })
            .catch( (error) => {
                console.log(error);
            });
        });
    }
    return { getTodoItems, addNewItem, deleteTodoItems };
});

