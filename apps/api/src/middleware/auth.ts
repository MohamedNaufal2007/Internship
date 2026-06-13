import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authenticateToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded as any;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Role-based access control
export const authorize = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
};

// Validation schemas
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().optional(),
  role: z.enum(['CITIZEN', 'FIELD_WORKER', 'OFFICER', 'ADMIN']).default('CITIZEN'),
});

export const complaintSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  category: z.enum([
    'ROADS',
    'WATER_SUPPLY',
    'DRAINAGE',
    'STREET_LIGHTS',
    'GARBAGE_COLLECTION',
    'PUBLIC_TRANSPORT',
    'PARKS',
    'POLLUTION',
    'ELECTRICITY',
    'INFRASTRUCTURE',
    'PUBLIC_SAFETY',
    'OTHER',
  ]),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  address: z.string().optional(),
});
