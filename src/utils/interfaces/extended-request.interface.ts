import { Request } from 'express';

interface ExtendedRequest extends Request {
  user: { sub: string }; // Modify the type and structure based on your user object
}

export default ExtendedRequest;
