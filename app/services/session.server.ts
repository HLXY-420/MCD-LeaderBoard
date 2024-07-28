import { createCookieSessionStorage } from "@remix-run/node";

// export the whole sessionStorage object
export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "mcd_leaderboard_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ["subit_mcd_leaderboard"], // replace this with an actual secret
    secure: process.env.NODE_ENV === "production", // enable this in prod only
  },
});

const {
	getSession,
	commitSession: rootCommitSession,
	destroySession,
} = sessionStorage
export { getSession, destroySession }

// we have to do this because every time you commit the session you overwrite it
// so we store the expiration time in the cookie and reset it every time we commit
export async function commitSession(
	...args: Parameters<typeof rootCommitSession>
) {
	const [session, options] = args
	if (options?.expires) {
		session.set('expires', options.expires)
	}
	const expires = session.get('expires')
		? new Date(session.get('expires'))
		: undefined
	return rootCommitSession(session, { expires, ...options })
}