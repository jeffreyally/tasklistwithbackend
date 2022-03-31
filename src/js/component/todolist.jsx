import React from "react";
import { useState, useEffect } from "react";
import { TasksWithDeleteIcon } from "./taskswithdelete.jsx";

let URL = `https://3000-jeffreyally-tasklistwith-2becw0mjhk0.ws-us38.gitpod.io/tasks`;

let GetDB = (modifyTask) => {
	fetch(URL, {
		method: "GET",
		body: JSON.stringify(), // data can be `string` or {object}!
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((resp) => {
			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		})
		.then((data) => {
			// shout out to Christina for the
			//here is were your code should start after the fetch finishes
			console.log(data); //this will print on the console the exact object received from the server
			modifyTask(data);
		})
		.catch((error) => {
			//error handling
			console.log(error);
			//from class notes ----console.error("error", error);
		});
};

let PostToDB = (inputTask, modifyTask) => {
	fetch(URL, {
		method: "POST",
		body: JSON.stringify({ task: inputTask, label: false }), // data can be `string` or {object}!
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((resp) => {
			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		})
		.then((data) => {
			// shout out to Christina for the
			//here is were your code should start after the fetch finishes
			console.log(data); //this will print on the console the exact object received from the server
			modifyTask(data);
		})
		.catch((error) => {
			//error handling
			console.log(error);
			//from class notes ----console.error("error", error);
		});
};

//const URI = 'http://assets.breatheco.de/apis/fake/todos/user/jeffreyally'
//useEffect(() => {
//Runs only on the first render
//}, []); we need to populate our todo list on first render

export const TodoList = (props) => {
	const [inputTask, setInputTask] = useState("");
	const [taskList, modifyTask] = useState([]);
	useEffect(() => {
		//Runs only on the first render
		GetDB(modifyTask);
	}, []);
	useEffect(() => {
		//Runs on the first render
		//And any time any dependency value changes
	}, [taskList]);
	//update modifyTask to setTaskList in the future
	let saveTask = (e) => {
		if (e.keyCode == 13) {
			PostToDB(inputTask, modifyTask);
			// hold up modifyTask([...taskList, { task: inputTask, label: false }]);
			//above modifyTask([...taskList, newTask]) could also be used
			//this is where I think I will send a task to the backend(PUT request?)
			//it needs to be an array of objects so I believe that part is in place at least
			setInputTask("");
		}
	};

	return (
		<>
			<div className="todolistbox">
				<div className="h1box">
					<h1>To-Do List</h1>
					<input
						onKeyUp={(e) => saveTask(e)}
						type=""
						value={inputTask}
						onChange={(e) => setInputTask(e.target.value)}></input>
				</div>
				<TasksWithDeleteIcon
					tlist={taskList}
					modlist={modifyTask}
					URL={URL}
				/>
			</div>
		</>
	);
};
