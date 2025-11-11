import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const reqBody = await request.json();
  const { name, email, image, googleId } = reqBody;

  try {
    let userData = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userData) {
      userData = await prisma.user.create({
        data: {
          name,
          email,
          avatar: image,
          providerId: googleId,
          provider: "google",
        },
      });
    }
    return new Response(JSON.stringify({ success: true, data: userData }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
