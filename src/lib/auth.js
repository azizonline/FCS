import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './database.js';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret';

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function createAdminUser(email, password, name) {
  const hashedPassword = await hashPassword(password);
  return await prisma.adminUser.create({
    data: {
      email,
      passwordHash: hashedPassword,
      name,
    },
  });
}

export async function authenticateAdmin(email, password) {
  const admin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!admin) {
    return null;
  }

  const isValid = await verifyPassword(password, admin.passwordHash);
  if (!isValid) {
    return null;
  }

  // Update last login
  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { lastLogin: new Date() },
  });

  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
  };
}

