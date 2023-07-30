import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, name, email } = body;

  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name,
      email,
    },
  });

  return NextResponse.json(user);
}
