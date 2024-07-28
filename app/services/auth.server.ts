import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";

import bcrypt from "bcrypt";

export type User = {
	id: string
	email: string
	username: string
	imageUrl?: string
}

export const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days
export const getSessionEXpirationDate = () => new Date(Date.now() + SESSION_EXPIRATION_TIME);

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage);

// authenticator.use(
//     new FormStrategy(async ({ form }) => {
//         let email = form.get("email");
//         let password = form.get("password");
//         let user = await login(email, password);
//         // the type of this user must match the type you pass to the Authenticator
//         // the strategy will automatically inherit the type if you instantiate
//         // directly inside the `use` method
//         return user;
//     }),
//     "user-pass"
// );

export async function getUserId(request: Request) {

}

export async function login(email: string, password: string) {
    
}

export async function resetPassword(email: string) {
    
}

export async function logout() {
    
}

export async function getPasswordHash(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;   
}

export async function verifyPassword(password: string, hash: string) {
    
}

