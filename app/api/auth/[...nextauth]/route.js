import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

const USER_DATA = `${process.env.NEXT_PUBLIC_BACKEND_CONNECTION}`

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    // session: {
    //     secret: process.env.SESSION_SECRET
    // },
    secret: process.env.SESSION_SECRET,
    callbacks: {
        async signIn({ profile }) {
            try {
                await fetch(`${USER_DATA}/users/new`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: profile.name,
                        email: profile.email
                    })
                })

                return true
            } catch (error) {
                console.log('error signing in', error)
                return false
            }
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }