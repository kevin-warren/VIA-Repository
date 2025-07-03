// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { name, email, password } = body;

//     if (!email || !password || !name) {
//       return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
//     }

//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return NextResponse.json({ error: 'User already exists' }, { status: 409 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });

//     return NextResponse.json({ user: { id: newUser.id, email: newUser.email } }, { status: 201 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
