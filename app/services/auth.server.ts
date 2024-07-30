import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import type { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage);

// Tell the Authenticator to use the form strategy
authenticator.use(
	// @ts-ignore
	new FormStrategy(async ({ form }) => {
	  let email = form.get("email");
	  // @ts-ignore
	  let user = await login(email);
	  // the type of this user must match the type you pass to the Authenticator
	  // the strategy will automatically inherit the type if you instantiate
	  // directly inside the `use` method
	  return user;
	}),
	// each strategy has a name and can be changed to use another one
	// same strategy multiple times, especially useful for the OAuth2 strategy.
	"user"
);

export async function login(email: string) {
	// Add your login logic here
	const user = await prisma.user.findUnique({
		where: { email },
	})

	return user;
}
