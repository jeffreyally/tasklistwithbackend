import React from "react";
import { useState, useEffect } from "react";
import { Todolist } from "./todolist.jsx";
let URL = `https://3000-jeffreyally-tasklistwith-2becw0mjhk0.ws-us38.gitpod.io/tasks`;
let DeleteTask = (modifyTask, id) => {
	fetch(`${URL}/${id}`, {
		method: "DELETE",
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
			//return data;
		})
		.catch((error) => {
			//error handling
			console.log(error);
			//from class notes ----console.error("error", error);
		});
};

export const TasksWithDeleteIcon = (props) => {
	useEffect(() => {
		//Runs on the first render
		//And any time any dependency value changes
		return () => {
			null;
		};
	}, [props.tList]);
	return (
		<>
			<ol type="1">
				{props.tlist.map((maptask, makespanIDtheindex) => {
					return (
						<>
							<br></br>
							<li>
								<span
									className="thetask"
									id={makespanIDtheindex}>
									{maptask.task}

									<i
										className="fa fa-trash"
										onClick={(e) =>
											DeleteTask(
												props.modlist,
												maptask.id
											)
										}></i>
								</span>
							</li>
						</>
					);
				})}
			</ol>
		</>
	);
};
