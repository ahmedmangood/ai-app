import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../../models/user";
import connectToDB from "../../../../utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      console.log("i am here");
      try {
        await connectToDB();
        console.log("i am here 222");
        // check if user is alreadu exist
        const userExists = await User.findOne({
          email: profile.email,
        });

        // if user not exist
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", " ").toLowerCase(),
            image: profile.picture,
          });
        } else {
          console.log("User Is Exist");
        }

        return true;
      } catch (error) {
        console.log(error);

        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
