import { getUserById, createUser } from "../api/users";


const adminUser = await getUserById(1)

console.log("user in init: ", adminUser)

if(!adminUser) {
  console.log("create user in init ")
  await createUser("admin", "password")
} else {
  console.log("user already exists")
}
