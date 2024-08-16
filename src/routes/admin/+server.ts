//import { error, json } from '@sveltejs/kit';
//import type { RequestHandler } from './$types';
//import { getUserByName, createUser } from '../../lib/server/api/users'
//
//export const GET: RequestHandler = async ({ request }) => {
//  const url = request.url.split("?")[1]; // EWWWWW
//  const params = new URLSearchParams(url);
//  const name = params.get("name");
//  console.log(url, params)
//
//  if (!name) {
//    error(404, {
//      message: "Please provide a name. " + params
//    });
//  }
//  const user = await getUserByName(String(name))
//  if (!user[0]) {
//    error(404, {
//      message: "User does not exist"
//    });
//  }
//  return json(user[0])
//}
//
//export const POST: RequestHandler = async ({ request }) => {
//  const data = await request.formData();
//  const name = data.get("name");
//  const password = data.get("password");
//
//  if (!name || !password) {
//    error(404, {
//      message: "Please provide a complete user. " + request.json()
//    });
//  }
//  const result = await createUser({"name": String(name), "password": String(password)});
//
//  if (!result) {
//    error(404, {
//      message: "Couldn't create user with params. " + request.json()
//    });
//  }
//  return new Response("created user")
//}
